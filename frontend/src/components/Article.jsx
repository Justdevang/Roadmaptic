import { useParams, Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { ArrowLeft, Clock, TrendingUp, Share2, Bookmark, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { articles } from '../data/articles';
import { AdPlaceholder } from './AdPlaceholder';

export const Article = () => {
  const { id } = useParams();
  const article = articles.find(a => a.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

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

  const getArticleImage = () => {
    const images = {
      'ai-agents': 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200&h=600',
      'quantum-safe': 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1200&h=600',
      'rust-edge': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200&h=600'
    };
    return images[id] || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200&h=600';
  };

  const articleImage = getArticleImage();

  // Enhanced renderer for the more complex markdown template
  const renderContent = (content) => {
    return content.split('\n').map((line, index) => {
      const trimmedLine = line.trim();

      if (!trimmedLine) return <div key={index} style={{ height: '16px' }} />;

      // Headers
      if (trimmedLine.startsWith('### ')) {
        return <h3 key={index} style={{ fontSize: '1.75rem', marginTop: '48px', marginBottom: '20px', color: 'var(--text-primary)', fontWeight: '800', letterSpacing: '-0.01em' }}>{trimmedLine.replace('### ', '')}</h3>;
      }
      if (trimmedLine.startsWith('## ')) {
        return <h2 key={index} style={{ fontSize: '2.25rem', marginTop: '56px', marginBottom: '28px', color: 'var(--text-primary)', fontWeight: '800', letterSpacing: '-0.02em', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>{trimmedLine.replace('## ', '')}</h2>;
      }
      if (trimmedLine.startsWith('# ')) {
        return null; // The H1 is already rendered at the top of the component
      }

      // Horizontal Rule
      if (trimmedLine === '---') {
        return <hr key={index} style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '48px 0' }} />;
      }

      // Big CTA Button Mapping
      if (trimmedLine.startsWith('[BIG CTA BUTTON:')) {
        const buttonText = trimmedLine.match(/\[BIG CTA BUTTON: (.*?)\]/)?.[1] || "Generate My Roadmap";
        return (
          <div key={index} style={{ margin: '56px 0', textAlign: 'center' }}>
            <Link to="/" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 40px', fontSize: '1.15rem', textDecoration: 'none', borderRadius: '100px' }}>
              {buttonText} <ArrowRight size={18} />
            </Link>
          </div>
        );
      }

      // List items
      if (trimmedLine.startsWith('- ')) {
        return (
          <div key={index} style={{ display: 'flex', gap: '16px', marginBottom: '16px', paddingLeft: '8px' }}>
            <span style={{ color: 'var(--accent-primary)', fontWeight: 'bold', fontSize: '1.2rem', lineHeight: '1.5' }}>•</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: '1.8' }}>{parseBoldText(trimmedLine.substring(2))}</span>
          </div>
        );
      }

      // Regular Paragraphs with bold text parsing
      return (
        <React.Fragment key={index}>
          <p style={{ marginBottom: '24px', fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: '1.9' }}>
            {parseBoldText(trimmedLine)}
          </p>
          {/* Inject an ad after the 2nd H2 section (approximately) */}
          {trimmedLine.startsWith('## ') && index > 10 && <div style={{ margin: '48px 0' }}><AdPlaceholder type="in-content" /></div>}
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
    <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '120px', paddingLeft: '20px', paddingRight: '20px' }}>
      <Helmet>
        <title>{article.title} | Roadmaptic</title>
        <meta name="description" content={article.metaDescription} />
        <meta name="keywords" content={`${article.skillName}, tutorial, guide, career roadmap, learn ${article.skillName}, developer skills`} />
        <link rel="canonical" href={`https://roadmaptic.qzz.io/blog/${article.id}`} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Roadmaptic" />
        <meta property="og:title" content={`${article.title} | Roadmaptic`} />
        <meta property="og:description" content={article.metaDescription} />
        <meta property="og:url" content={`https://roadmaptic.qzz.io/blog/${article.id}`} />
        <meta property="og:image" content="https://roadmaptic.qzz.io/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${article.title} | Roadmaptic`} />
        <meta name="twitter:description" content={article.metaDescription} />
        <meta name="twitter:image" content="https://roadmaptic.qzz.io/og-image.png" />
        <script type="application/ld+json">
          {JSON.stringify(article.schema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://roadmaptic.qzz.io/" },
              { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://roadmaptic.qzz.io/blog" },
              { "@type": "ListItem", "position": 3, "name": article.title, "item": `https://roadmaptic.qzz.io/blog/${article.id}` }
            ]
          })}
        </script>
      </Helmet>

      <div style={{ marginTop: '20px', marginBottom: '40px' }}>
        <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem', fontWeight: '600', transition: 'color 0.2s' }}>
          <ArrowLeft size={16} /> Back to Learning Guides
        </Link>
      </div>

      {/* Dribbble Style Hero */}
      <div style={{ textAlign: 'center', marginBottom: '56px', maxWidth: '800px', margin: '0 auto 56px' }}>
        <div style={{ display: 'inline-block', marginBottom: '24px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'rgba(59,130,246, 0.1)', padding: '8px 20px', borderRadius: '100px' }}>
            {article.category}
          </span>
        </div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '32px', lineHeight: '1.1', fontWeight: '800', letterSpacing: '-0.02em' }}>{article.title}</h1>

        {/* Author Byline */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          <img src="https://ui-avatars.com/api/?name=Roadmaptic+Team&background=3b82f6&color=fff" alt="Roadmaptic Team" style={{ width: '56px', height: '56px', borderRadius: '50%', border: '2px solid var(--border-color)' }} />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontWeight: '700', fontSize: '1.1rem', color: 'var(--text-primary)' }}>Roadmaptic Team</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Published {(() => {
                const index = articles.findIndex(a => a.id === article.id);
                const d = new Date();
                d.setDate(d.getDate() - (index % 5));
                return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
              })()} &bull; 8 min read
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div style={{ width: '100%', height: 'clamp(300px, 50vw, 550px)', borderRadius: '32px', overflow: 'hidden', marginBottom: '80px', position: 'relative', border: '1px solid var(--border-color)', background: 'var(--bg-tertiary)' }}>
        <img 
          src={articleImage} 
          alt={article.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200&h=600';
          }}
        />
      </div>

      {/* Main Content Layout with Sticky Sidebar */}
      <div style={{ display: 'flex', gap: '60px', alignItems: 'flex-start', flexWrap: 'wrap' }}>

        {/* Left Sticky Sidebar (Meta Info) */}
        <div style={{ flex: '1 1 250px', position: 'sticky', top: '100px' }}>
          <div className="glass" style={{ padding: '32px', borderRadius: '24px' }}>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px', fontWeight: '700' }}>Article Details</h4>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '12px', borderRadius: '12px' }}><Clock size={20} style={{ color: 'var(--accent-primary)' }} /></div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Time to complete</div>
                <div style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-primary)' }}>{article.timeCommitment}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '12px', borderRadius: '12px' }}><TrendingUp size={20} style={{ color: 'var(--accent-primary)' }} /></div>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Market Demand</div>
                <div style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--text-primary)' }}>{article.marketDemand}</div>
              </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '0 0 24px 0' }} />

            <div style={{ display: 'flex', gap: '16px' }}>
              <button className="btn-secondary" style={{ padding: '12px', borderRadius: '12px', flex: 1, display: 'flex', justifyContent: 'center' }}><Share2 size={20} /></button>
              <button className="btn-secondary" style={{ padding: '12px', borderRadius: '12px', flex: 1, display: 'flex', justifyContent: 'center' }}><Bookmark size={20} /></button>
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div style={{ flex: '3 1 600px', maxWidth: '800px' }}>
          <div className="article-body">
            <p style={{ color: 'var(--text-primary)', fontSize: '1.4rem', lineHeight: '1.7', marginBottom: '48px', fontWeight: '500' }}>
              {article.snippet}
            </p>

            <div style={{ color: 'var(--text-primary)', lineHeight: '1.9', fontSize: '1.15rem' }}>
              {renderContent(article.content)}

              <div style={{ marginTop: '80px' }}>
                <AdPlaceholder type="post-content" />
              </div>

              {/* Enhanced Minimalist CTA */}
              <div className="glass" style={{
                marginTop: '80px',
                padding: '64px 40px',
                borderRadius: '32px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, rgba(24,24,27,0.8), rgba(9,9,11,1))',
                border: '1px solid rgba(59, 130, 246, 0.2)'
              }}>
                <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.08) 0%, transparent 50%)', zIndex: 0 }}></div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h3 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '16px', fontWeight: '800', letterSpacing: '-0.02em' }}>
                    Master <span className="text-gradient">{article.skillName}</span> Today.
                  </h3>
                  <p style={{ marginBottom: '40px', color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '450px', margin: '0 auto 40px', lineHeight: 1.6 }}>
                    Stop watching random tutorials. Get a structured, step-by-step learning roadmap tailored just for you.
                  </p>
                  <Link to="/" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '16px 40px', fontSize: '1.1rem', textDecoration: 'none', borderRadius: '100px' }}>
                    Generate Free Roadmap <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

