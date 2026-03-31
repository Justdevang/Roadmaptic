import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const generateMaze = (width, height) => {
  const grid = [];
  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      row.push({ x, y, visited: false, top: true, right: true, bottom: true, left: true });
    }
    grid.push(row);
  }

  const stack = [];
  const startCell = grid[0][0];
  startCell.visited = true;
  stack.push(startCell);

  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    const { x, y } = current;
    
    const neighbors = [];
    if (y > 0 && !grid[y - 1][x].visited) neighbors.push({ dir: 'top', cell: grid[y - 1][x] });
    if (x < width - 1 && !grid[y][x + 1].visited) neighbors.push({ dir: 'right', cell: grid[y][x + 1] });
    if (y < height - 1 && !grid[y + 1][x].visited) neighbors.push({ dir: 'bottom', cell: grid[y + 1][x] });
    if (x > 0 && !grid[y][x - 1].visited) neighbors.push({ dir: 'left', cell: grid[y][x - 1] });

    if (neighbors.length > 0) {
      const next = neighbors[Math.floor(Math.random() * neighbors.length)];
      
      if (next.dir === 'top') { current.top = false; next.cell.bottom = false; }
      if (next.dir === 'right') { current.right = false; next.cell.left = false; }
      if (next.dir === 'bottom') { current.bottom = false; next.cell.top = false; }
      if (next.dir === 'left') { current.left = false; next.cell.right = false; }
      
      next.cell.visited = true;
      stack.push(next.cell);
    } else {
      stack.pop();
    }
  }
  
  // Make bottom of last row and top of first row open so scrolling feels connected
  for(let x = 0; x < width; x++) {
    grid[0][x].top = false;
    grid[height-1][x].bottom = false;
  }

  return grid;
};

export const MazeBackground = () => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const width = isMobile ? 12 : 20; 
  const height = isMobile ? 20 : 25; 
  const cellSize = isMobile ? 45 : 50; 

  const maze = useMemo(() => generateMaze(width, height), [width, height]);
  const mazeHeightPixels = height * cellSize;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -1,
      overflow: 'hidden',
      backgroundColor: 'var(--bg-primary)',
      perspective: isMobile ? '800px' : '1200px'
    }}>
      {/* 3D Rotated Container */}
      <motion.div
        animate={isMobile ? {} : { 
          rotateZ: [0, 2, 0, -2, 0], // Gentle swaying only on desktop
        }}
        transition={{ repeat: Infinity, duration: 15, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: isMobile ? '45%' : '40%',
          left: '50%',
          width: `${width * cellSize}px`,
          height: `${mazeHeightPixels * 2}px`,
          marginLeft: `-${(width * cellSize) / 2}px`,
          marginTop: `-${mazeHeightPixels}px`,
          transformStyle: 'preserve-3d',
          transform: isMobile ? 'rotateX(45deg)' : 'rotateX(55deg)',
        }}
      >
        <motion.div
          animate={{
            y: [0, -mazeHeightPixels],
          }}
          transition={{ repeat: Infinity, duration: isMobile ? 18 : 12, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: 0, left: 0,
            width: '100%', height: '100%',
            transformStyle: 'preserve-3d',
            willChange: 'transform'
          }}
        >
          {/* Render the maze twice for infinite scrolling effect */}
          {[0, 1].map((blockIndex) => (
            <div key={blockIndex} style={{
              position: 'absolute',
              top: blockIndex * mazeHeightPixels,
              left: 0,
              width: '100%',
              height: `${mazeHeightPixels}px`,
              display: 'grid',
              gridTemplateColumns: `repeat(${width}, ${cellSize}px)`,
              gridTemplateRows: `repeat(${height}, ${cellSize}px)`,
              transformStyle: 'preserve-3d',
            }}>
              {maze.map((row, y) => row.map((cell, x) => {
                const borderStyle = `1px solid rgba(204, 255, 0, ${isMobile ? '0.25' : '0.4'})`; 
                
                return (
                  <div key={`${x}-${y}`} style={{
                    position: 'relative',
                    width: `${cellSize}px`, 
                    height: `${cellSize}px`,
                    boxSizing: 'border-box',
                    borderTop: cell.top ? borderStyle : '1px solid rgba(204, 255, 0, 0.05)',
                    borderRight: cell.right ? borderStyle : '1px solid rgba(204, 255, 0, 0.05)',
                    borderBottom: cell.bottom ? borderStyle : '1px solid rgba(204, 255, 0, 0.05)',
                    borderLeft: cell.left ? borderStyle : '1px solid rgba(204, 255, 0, 0.05)',
                    backgroundColor: 'rgba(10, 10, 12, 0.1)', // Slightly lighter for visibility
                  }} />
                );
              }))}
            </div>
          ))}
          
          {/* The Falling Ball */}
          <motion.div
            animate={{
              y: [0, mazeHeightPixels],
              x: [0, cellSize * (isMobile ? 1.5 : 2), -cellSize * (isMobile ? 1.5 : 2), cellSize, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              y: { repeat: Infinity, duration: isMobile ? 18 : 12, ease: 'linear' },
              x: { repeat: Infinity, duration: 8, ease: 'easeInOut' },
              scale: { repeat: Infinity, duration: 0.5, ease: 'easeInOut' }
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: `${(width / 2) * cellSize}px`, 
              width: `${cellSize * 0.6}px`,
              height: `${cellSize * 0.6}px`,
              marginLeft: `-${(cellSize * 0.6) / 2}px`,
              marginTop: `-${(cellSize * 0.6) / 2}px`,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, #ffea00, #b2a300)',
              boxShadow: '0 0 20px rgba(255, 234, 0, 0.8), 0 10px 10px rgba(0,0,0,0.5)',
              transform: 'translateZ(10px)',
              zIndex: 10
            }}
          />
        </motion.div>
      </motion.div>

      {/* Vignette Overlay (Now optimized and active on mobile) */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: isMobile 
          ? 'radial-gradient(circle at center, transparent 30%, var(--bg-primary) 100%)'
          : 'radial-gradient(ellipse at center, transparent 0%, var(--bg-primary) 70%)',
        pointerEvents: 'none'
      }} />
      
      {/* Top and Bottom gradient fade */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, height: isMobile ? '25vh' : '30vh',
          background: 'linear-gradient(to bottom, var(--bg-primary), transparent)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0, height: isMobile ? '25vh' : '30vh',
          background: 'linear-gradient(to top, var(--bg-primary), transparent)',
        }} />
      </div>
    </div>
  );
};
