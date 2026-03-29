import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const D3Graph = ({ data }) => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (data && d3Container.current) {
      // Calculate dynamic width and height based on data
      const nodeWidth = 280;
      const nodeHeight = 100;
      const horizontalSpacing = 350;
      const verticalSpacing = 150;
      
      const width = Math.max(800, (data.length + 2) * horizontalSpacing);
      
      // Calculate max topics to determine height
      const maxTopics = Math.max(...data.map(w => w.topics.length));
      const height = Math.max(600, (maxTopics + 2) * verticalSpacing);
      
      d3.select(d3Container.current).selectAll("*").remove();
      
      const svg = d3.select(d3Container.current)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("background", "#000000") // Black background
        .style("border-radius", "16px");

      // Create a grid pattern definition
      const defs = svg.append("defs");
      const gridSize = 40;
      
      const pattern = defs.append("pattern")
        .attr("id", "grid")
        .attr("width", gridSize)
        .attr("height", gridSize)
        .attr("patternUnits", "userSpaceOnUse");
        
      pattern.append("rect")
        .attr("width", gridSize)
        .attr("height", gridSize)
        .attr("fill", "none");
        
      pattern.append("path")
        .attr("d", `M ${gridSize} 0 L 0 0 0 ${gridSize}`)
        .attr("fill", "none")
        .attr("stroke", "#1f1f1f") // Subtle grey grid
        .attr("stroke-width", 1);

      // Add grid background to handle panning properly
      const gridRect = svg.append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("fill", "url(#grid)");

      // Main group for zoom/pan
      const g = svg.append("g");

      // Transform raw data into graph nodes and links
      const nodes = [];
      const links = [];
      
      const startX = 100;
      const startY = 150; // Pin Weeks to the top
      
      // Add start node
      nodes.push({ 
        id: 'start', 
        name: 'Start Your Journey', 
        group: 0, 
        x: startX, 
        y: startY 
      });

      let prevWeekId = 'start';

      data.forEach((weekData, i) => {
        const weekId = `week-${weekData.week}`;
        const weekX = startX + (i + 1) * horizontalSpacing;
        
        nodes.push({ 
          id: weekId, 
          title: `Week ${weekData.week}`,
          subtitle: weekData.focus, 
          group: 1, 
          x: weekX, 
          y: startY 
        });
        
        links.push({ source: prevWeekId, target: weekId, type: 'main' });
        
        // Add topics for this week
        weekData.topics.forEach((topic, j) => {
          const topicId = `topic-${weekData.week}-${j}`;
          const topicY = startY + verticalSpacing + (j * verticalSpacing);
          
          nodes.push({ 
            id: topicId, 
            name: topic.name,
            resource: topic.resourceName,
            url: topic.resourceUrl,
            group: 2, 
            x: weekX, 
            y: topicY 
          });
          
          // Link from week to first topic, then topic to topic
          if (j === 0) {
            links.push({ source: weekId, target: topicId, type: 'sub' });
          } else {
            links.push({ source: `topic-${weekData.week}-${j-1}`, target: topicId, type: 'sub' });
          }
        });

        prevWeekId = weekId;
      });

      // Add goal node
      const goalId = 'goal';
      nodes.push({ 
        id: goalId, 
        name: 'Goal Achieved! \uD83C\uDF89', 
        group: 3, 
        x: startX + (data.length + 1) * horizontalSpacing, 
        y: startY 
      });
      links.push({ source: prevWeekId, target: goalId, type: 'main' });

      // Build the arrow for paths
      defs.append("marker")
        .attr("id", "arrowhead")
        .attr("viewBox", "-0 -5 10 10")
        .attr("refX", 25) 
        .attr("refY", 0)
        .attr("orient", "auto")
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("xoverflow", "visible")
        .append("svg:path")
        .attr("d", "M 0,-5 L 10 ,0 L 0,5")
        .attr("fill", "#6b7280")
        .style("stroke","none");

      // Draw links
      g.append("g")
        .attr("class", "links")
        .selectAll("path")
        .data(links)
        .enter().append("path")
        .attr("class", "link")
        .attr("d", d => {
          const source = nodes.find(n => n.id === d.source);
          const target = nodes.find(n => n.id === d.target);
          
          if (d.type === 'sub') {
             // Vertical line for topics
             return `M ${source.x} ${source.y + (source.group === 1 ? nodeHeight/2 : nodeHeight/2)} L ${target.x} ${target.y - nodeHeight/2}`;
          } else {
             // Horizontal line for main path
             // Start and Goal nodes are circles (radius 40), Week nodes are rects (width 280)
             const sourceOffset = source.group === 0 ? 40 : nodeWidth / 2;
             const targetOffset = target.group === 3 ? 40 : nodeWidth / 2;
             return `M ${source.x + sourceOffset} ${source.y} L ${target.x - targetOffset} ${target.y}`;
          }
        })
        .attr("stroke", d => d.type === 'main' ? "var(--accent-primary)" : "#4b5563") // Main path is Lime
        .attr("stroke-width", d => d.type === 'main' ? 4 : 2)
        .attr("stroke-dasharray", d => d.type === 'sub' ? "5,5" : "none")
        .attr("fill", "none")
        .attr("marker-end", d => d.type === 'main' ? "url(#arrowhead)" : "none");

      // Draw nodes
      const nodeGroups = g.append("g")
        .attr("class", "nodes")
        .selectAll("g")
        .data(nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.x},${d.y})`);

      // Draw different shapes based on group
      
      // Group 0 & 3: Start and End (Circles)
      const circleNodes = nodeGroups.filter(d => d.group === 0 || d.group === 3);
      
      circleNodes.append("circle")
        .attr("r", 50)
        .attr("fill", "var(--bg-secondary)") // Dark bg
        .attr("stroke", d => d.group === 0 ? "var(--accent-primary)" : "var(--accent-secondary)") // Lime start, Yellow end
        .attr("stroke-width", 3)
        .style("filter", "drop-shadow(0 0 15px rgba(204,255,0,0.3))");
        
      circleNodes.append("text")
        .attr("text-anchor", "middle")
        .attr("dy", "0.3em")
        .text(d => d.name)
        .style("font-size", "14px")
        .style("font-weight", "bold")
        .style("fill", "var(--text-primary)")
        .call(wrapText, 80);

      // Group 1: Week Nodes (Rectangles)
      const weekNodes = nodeGroups.filter(d => d.group === 1);
      
      weekNodes.append("rect")
        .attr("x", -nodeWidth / 2)
        .attr("y", -nodeHeight / 2)
        .attr("width", nodeWidth)
        .attr("height", nodeHeight)
        .attr("rx", 6)
        .attr("fill", "var(--bg-secondary)") // Dark gray
        .attr("stroke", "var(--border-color)") // Lime border with opacity
        .attr("stroke-width", 2)
        .style("filter", "drop-shadow(0 4px 6px rgba(0,0,0,0.5))");
        
      weekNodes.append("text")
        .attr("text-anchor", "middle")
        .attr("y", -10)
        .text(d => d.title)
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .style("fill", "var(--accent-secondary)"); // Yellow for title
        
      weekNodes.append("text")
        .attr("text-anchor", "middle")
        .attr("y", 15)
        .text(d => d.subtitle)
        .style("font-size", "14px")
        .style("fill", "var(--text-secondary)") // Gray text
        .call(wrapText, nodeWidth - 40);

      // Group 2: Topic Nodes (Cards)
      const topicNodes = nodeGroups.filter(d => d.group === 2);
      
      topicNodes.append("rect")
        .attr("x", -nodeWidth / 2)
        .attr("y", -nodeHeight / 2)
        .attr("width", nodeWidth)
        .attr("height", nodeHeight)
        .attr("rx", 6)
        .attr("fill", "#000000") // Pitch black
        .attr("stroke", "#27272a") // Subtle gray border
        .attr("stroke-width", 1)
        .style("cursor", "pointer")
        .on("mouseover", function() {
          d3.select(this).attr("stroke", "var(--accent-primary)").attr("stroke-width", 1.5).attr("fill", "var(--bg-secondary)"); // Lime border on hover
        })
        .on("mouseout", function() {
          d3.select(this).attr("stroke", "#27272a").attr("stroke-width", 1).attr("fill", "#000000");;
        })
        .on("click", (e, d) => {
           if(d.url) window.open(d.url, '_blank');
        });
        
      topicNodes.append("text")
        .attr("text-anchor", "middle")
        .attr("y", -15)
        .text(d => d.name)
        .style("font-size", "14px")
        .style("font-weight", "bold")
        .style("fill", "var(--text-primary)")
        .style("pointer-events", "none")
        .call(wrapText, nodeWidth - 20);
        
      topicNodes.append("text")
        .attr("text-anchor", "middle")
        .attr("y", 25)
        .text(d => d.resource ? `📄 ${d.resource}` : '')
        .style("font-size", "12px")
        .style("fill", "var(--text-secondary)")
        .style("pointer-events", "none")
        .call(wrapText, nodeWidth - 30);


      // Helper function to wrap text within a specific width
      function wrapText(text, width) {
        text.each(function() {
          const textElement = d3.select(this);
          const words = textElement.text().split(/\s+/).reverse();
          let word;
          let line = [];
          let lineNumber = 0;
          const lineHeight = 1.2; // ems
          const y = textElement.attr("y") || 0;
          const dy = parseFloat(textElement.attr("dy")) || 0;
          let tspan = textElement.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
          
          while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width && line.length > 1) {
              line.pop();
              tspan.text(line.join(" "));
              line = [word];
              tspan = textElement.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
          }
          
          // Re-center vertically if there are multiple lines
          if(lineNumber > 0) {
              const currentY = parseFloat(textElement.attr("y") || 0);
              const offset = (lineNumber * lineHeight * 12) / 2; // Approximate height offset in pixels
              textElement.selectAll("tspan").attr("y", currentY - offset);
          }
        });
      }

      // Add zoom capability
      const zoom = d3.zoom()
        .scaleExtent([0.3, 2])
        .on("zoom", (e) => {
          g.attr("transform", e.transform);
          // Sync grid pattern with pan (don't scale grid to avoid visual clutter)
          pattern.attr("x", e.transform.x).attr("y", e.transform.y);
        });
      
      svg.call(zoom);
      
      // Center the graph initially to show Start and Week 1
      const initialScale = 0.85;
      const initialTranslate = [50, 50];
      svg.call(zoom.transform, d3.zoomIdentity.translate(initialTranslate[0], initialTranslate[1]).scale(initialScale));
      
    }
  }, [data]);

  return (
    <div style={{ width: '100%', overflowX: 'auto', overflowY: 'hidden', cursor: 'grab' }}>
      <div 
        ref={d3Container} 
        style={{ width: '100%', height: '600px', backgroundColor: '#000000', borderRadius: '16px', border: '1px solid #27272a' }}
      />
    </div>
  );
};

