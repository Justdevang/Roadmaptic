import { useParams, Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { ArrowLeft, Clock, TrendingUp, DollarSign } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { articles } from '../data/articles';
import { AdPlaceholder } from './AdPlaceholder';

export const Article = () => {
  const { id } = useParams();
  const article = articles.find(a => a.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (article) {
      document.title = `${article.title} | LearnPath`;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute('content', article.metaDescription);
      }
    }
    
    return () => {
      document.title = "LearnPath | AI Personalized Learning Roadmaps";
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute('content', "LearnPath - An AI-powered personalized learning roadmap generator. Tell us your goals and we will generate a free, step-by-step curriculum for you using top-tier tutorials.");
      }
    };
  }, [id, article]);

  if (!article) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-secondary)' }}>
        <h2 style={{ fontSize: '24px', color: 'var(--text-primary)' }}>Article not found</h2>
        <Link to="/blog" style={{ color: 'var(--accent-primary)', textDecoration: 'none', marginTop: '16px', display: 'inline-block' }}>
          &larr; Back to articles
        </Link>
      </div>
    );
  }

  // Enhanced renderer for the more complex markdown template
  const renderContent = (content) => {
    return content.split('\n').map((line, index) => {
      const trimmedLine = line.trim();
      
      if (!trimmedLine) return <div key={index} style={{ height: '16px' }} />;
      
      // Headers
      if (trimmedLine.startsWith('### ')) {
        return <h3 key={index} style={{ fontSize: '22px', marginTop: '32px', marginBottom: '16px', color: 'var(--text-primary)', fontWeight: '700' }}>{trimmedLine.replace('### ', '')}</h3>;
      }
      if (trimmedLine.startsWith('## ')) {
        return <h2 key={index} style={{ fontSize: '32px', marginTop: '48px', marginBottom: '24px', color: 'var(--text-primary)', fontWeight: '800', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>{trimmedLine.replace('## ', '')}</h2>;
      }
      if (trimmedLine.startsWith('# ')) {
        return null; // The H1 is already rendered at the top of the component
      }
      
      // Horizontal Rule
      if (trimmedLine === '---') {
        return <hr key={index} style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '40px 0' }} />;
      }
      
      // Big CTA Button Mapping
      if (trimmedLine.startsWith('[BIG CTA BUTTON:')) {
        const buttonText = trimmedLine.match(/\[BIG CTA BUTTON: (.*?)\]/)?.[1] || "Generate My Roadmap";
        return (
          <div key={index} style={{ margin: '48px 0', textAlign: 'center' }}>
            <Link to="/" className="btn-primary" style={{ display: 'inline-block', padding: '16px 48px', fontSize: '1.2rem', textDecoration: 'none' }}>
              {buttonText}
            </Link>
          </div>
        );
      }
      
      // List items
      if (trimmedLine.startsWith('- ')) {
        return (
          <div key={index} style={{ display: 'flex', gap: '12px', marginBottom: '12px', paddingLeft: '8px' }}>
            <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold' }}>•</span>
            <span style={{ color: 'var(--text-secondary)' }}>{parseBoldText(trimmedLine.substring(2))}</span>
          </div>
        );
      }
      
      // Regular Paragraphs with bold text parsing
      return (
        <React.Fragment key={index}>
          <p style={{ marginBottom: '20px', fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            {parseBoldText(trimmedLine)}
          </p>
          {/* Inject an ad after the 2nd H2 section (approximately) */}
          {trimmedLine.startsWith('## ') && index > 10 && <AdPlaceholder type="in-content" />}
        </React.Fragment>
      );
    });
  };

  // Helper to parse **bold** text within a string
  const parseBoldText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} style={{ color: 'var(--text-primary)', fontWeight: '700' }}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', paddingBottom: '100px' }}>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(article.schema)}
        </script>
      </Helmet>

      <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', textDecoration: 'none', marginBottom: '32px', fontSize: '0.9rem', fontWeight: '600' }}>
        <ArrowLeft size={16} /> Back to Learning Guides
      </Link>
      
      <div className="glass" style={{ padding: '0', overflow: 'hidden' }}>
        <div className="article-header" style={{ borderBottom: '1px solid var(--border-color)', background: 'rgba(255,255,255,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-secondary)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'rgba(var(--accent-secondary-rgb), 0.1)', padding: '4px 12px', borderRadius: '100px' }}>
              {article.category}
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>&bull;</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Updated {(() => {
                const index = articles.findIndex(a => a.id === article.id);
                const d = new Date();
                d.setDate(d.getDate() - (index % 5));
                return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
              })()}
            </span>
          </div>
          
          <h1 style={{ fontSize: '42px', marginBottom: '32px', lineHeight: '1.2', fontWeight: '800' }}>{article.title}</h1>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
              <Clock size={20} style={{ color: 'var(--accent-primary)' }} />
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Time Commitment</div>
                <div style={{ fontWeight: '600' }}>{article.timeCommitment}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px' }}>
              <TrendingUp size={20} style={{ color: 'var(--accent-primary)' }} />
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Market Demand</div>
                <div style={{ fontWeight: '600' }}>{article.marketDemand}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="article-body">
          <div style={{ color: 'var(--text-primary)', lineHeight: '1.8', fontSize: '1.15rem' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.3rem', lineHeight: '1.6', marginBottom: '48px', borderLeft: '4px solid var(--accent-primary)', paddingLeft: '24px' }}>
              {article.snippet}
            </p>
            
            {renderContent(article.content)}
            
            <div style={{ marginTop: '60px' }}>
              <AdPlaceholder type="post-content" />
            </div>

            <div className="glass page-container" style={{ 
              marginTop: '80px', 
              borderRadius: '24px', 
              textAlign: 'center', 
              position: 'relative', 
              overflow: 'hidden',
              border: '1px solid var(--accent-primary)',
              background: 'rgba(255, 255, 255, 0.02)'
            }}>
              {/* Subtle background glow */}
              <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'radial-gradient(circle, rgba(204, 255, 0, 0.03) 0%, transparent 70%)', zIndex: 0 }}></div>
              
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{ fontSize: '32px', marginBottom: '20px', fontWeight: '800' }}>
                  Ready to Master <span className="text-gradient">{article.skillName}</span>?
                </h3>
                <p style={{ marginBottom: '32px', opacity: 0.8, fontSize: '1.1rem', maxWidth: '400px', margin: '0 auto 32px' }}>
                  Get your step-by-step, personalized roadmap in under 60 seconds.
                </p>
                <Link to="/" className="btn-primary" style={{ display: 'inline-block', padding: '16px 48px', fontSize: '1.1rem', textDecoration: 'none' }}>
                  Generate My Free Roadmap
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

