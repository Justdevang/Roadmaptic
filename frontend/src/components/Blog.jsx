import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { articles } from '../data/articles';
import { ArrowRight, Search, ArrowDown } from 'lucide-react';

export const Blog = () => {
  const getDynamicDate = (index) => {
    const d = new Date();
    d.setDate(d.getDate() - (index % 5));
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getImage = (index) => {
    const unsplashIds = [
      '1488590528505-98d2b5aba04b', // Coding/Tech
      '1517694712202-14dd9538aa97', // Laptop/Code
      '1498050108023-c5249f4df085', // Dev desk
      '1555066931-4365d14bab8c', // Programming
      '1587620962725-abab7fe55159', // Modern code
      '1516116216624-53e697fedbea', // Software engineering
      '1504384308090-c89eec243612', // Tech office
      '1519389950473-47ba0277781c'  // People in tech
    ];
    const id = unsplashIds[index % unsplashIds.length];
    return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=800&h=600`;
  };

  const heroImage = "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?auto=format&fit=crop&q=80&w=1600&h=800";
  const ctaImage = "https://images.unsplash.com/photo-1451187557450-575637b59240?auto=format&fit=crop&q=80&w=1600&h=600";

  // If there are not enough articles, fallback gracefully
  const popularMain = articles[0] || articles[0];
  const popularSide = articles.slice(1, 4);
  const latestArticles = articles.slice(4);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="page-container"
      style={{ maxWidth: '1200px', padding: '0 20px 80px', margin: '0 auto' }}
    >
      <Helmet>
        <title>Roadmaptic Blog | Expert Guides, Tutorials & Career Insights</title>
        <meta name="description" content="Explore our library of technology-focused articles, career advice, and deep dives into AI, development, and business skills." />
      </Helmet>

      {/* 1. Hero Section */}
      <div style={{
        width: '100%',
        height: 'clamp(400px, 60vh, 600px)',
        borderRadius: '32px',
        overflow: 'hidden',
        position: 'relative',
        marginBottom: '80px',
        marginTop: '20px'
      }}>
        <img src={heroImage} alt="Tech learning" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(9,9,11,0.85) 0%, rgba(9,9,11,0.4) 100%)' }}></div>

        <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 8%' }}>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: '800', lineHeight: 1.1, color: '#fff', maxWidth: '800px', marginBottom: '40px', letterSpacing: '-0.02em' }}>
            Utilization of Technology to Supercharge Your Career
          </h1>

          {/* Search Bar */}
          <div style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: '100px', padding: '8px', maxWidth: '500px', width: '100%' }}>
            <Search size={20} color="#666" style={{ marginLeft: '16px', marginRight: '12px' }} />
            <input
              type="text"
              placeholder="Search articles..."
              style={{ border: 'none', outline: 'none', flex: 1, background: 'transparent', fontSize: '1rem', color: '#000', minWidth: 0 }}
            />
            <button style={{ background: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: '100px', padding: '12px 24px', fontSize: '0.95rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              Search <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Explore More Bottom Right */}
        <div style={{ position: 'absolute', bottom: '40px', right: '40px', display: 'none', alignItems: 'center', gap: '12px', color: '#fff', fontWeight: '500' }} className="desktop-only-flex">
          Explore More
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
            <ArrowDown size={20} />
          </div>
        </div>
      </div>

      {/* 2. Popular Articles */}
      {popularMain && (
        <div style={{ marginBottom: '100px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '40px', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>Popular Articles</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px', alignItems: 'start' }}>
            {/* Left Large Article */}
            <Link to={`/blog/${popularMain.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div>
                <div style={{ width: '100%', aspectRatio: '16/10', borderRadius: '24px', overflow: 'hidden', marginBottom: '24px', border: '1px solid var(--border-color)' }}>
                  <img src={getImage(0)} alt={popularMain.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} />
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '12px' }}>{getDynamicDate(0)}</div>
                <h3 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '16px', lineHeight: 1.3, color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>{popularMain.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6 }}>{popularMain.snippet}</p>
              </div>
            </Link>

            {/* Right Side Stacked Articles */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {popularSide.map((article, i) => (
                <Link key={article.id} to={`/blog/${article.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', gap: '24px', alignItems: 'center' }}>
                  <div style={{ width: 'clamp(120px, 30%, 200px)', aspectRatio: '4/3', borderRadius: '16px', overflow: 'hidden', flexShrink: 0, border: '1px solid var(--border-color)' }}>
                    <img src={getImage(i + 1)} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>{getDynamicDate(i + 1)}</div>
                    <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)', lineHeight: 1.4, marginBottom: '8px' }}>{article.title}</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{article.snippet}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. Latest Articles Grid */}
      {latestArticles.length > 0 && (
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '40px', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>Latest Articles</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
            {latestArticles.map((article, i) => (
              <Link key={article.id} to={`/blog/${article.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div>
                  <div style={{ width: '100%', aspectRatio: '4/3', borderRadius: '20px', overflow: 'hidden', marginBottom: '20px', border: '1px solid var(--border-color)' }}>
                    <img src={getImage(i + 4)} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>{getDynamicDate(i + 4)}</div>
                  <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)', lineHeight: 1.4, marginBottom: '12px' }}>{article.title}</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{article.snippet}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', marginBottom: '120px', flexWrap: 'wrap' }}>
        <button style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '10px 20px', borderRadius: '100px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500' }}>
          &larr; Previous
        </button>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: 'var(--accent-primary)', color: '#fff', fontWeight: '600' }}>1</span>
          <span style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', color: 'var(--text-primary)', fontWeight: '500', cursor: 'pointer', border: '1px solid transparent' }}>2</span>
          <span style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', color: 'var(--text-primary)', fontWeight: '500', cursor: 'pointer', border: '1px solid transparent' }}>3</span>
        </div>
        <button style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)', padding: '10px 20px', borderRadius: '100px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500' }}>
          Next &rarr;
        </button>
      </div>

      {/* 4. Bottom CTA */}
      <div style={{
        width: '100%',
        height: '400px',
        borderRadius: '32px',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <img src={ctaImage} alt="CTA" style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(9,9,11,0.75)' }}></div>

        <div style={{ position: 'relative', zIndex: 1, padding: '0 20px', width: '100%' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', color: '#fff', marginBottom: '40px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Get involved in the <br />tech learning uprising
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', background: '#fff', borderRadius: '100px', padding: '6px', maxWidth: '450px', margin: '0 auto', width: '100%' }}>
            <input
              type="email"
              placeholder="Type your email address"
              style={{ border: 'none', outline: 'none', flex: 1, background: 'transparent', fontSize: '1rem', color: '#000', paddingLeft: '20px', minWidth: 0 }}
            />
            <button style={{ background: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: '100px', padding: '12px 28px', fontSize: '1rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              Join Now <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
