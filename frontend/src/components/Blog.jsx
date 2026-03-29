import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { articles } from '../data/articles';

export const Blog = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ padding: '20px 0', maxWidth: '800px', margin: '0 auto', marginBottom: '40px' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '12px', fontWeight: '800' }}>Articles & <span className="text-gradient">Guides</span></h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
          In-depth tutorials, career advice, and deep dives into technology.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {articles.map((article) => (
          <Link key={article.id} to={`/blog/${article.id}`} style={{ textDecoration: 'none', display: 'block' }}>
            <div className="glass" style={{ padding: '24px', cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: '600', textTransform: 'uppercase' }}>{article.category}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{article.date}</span>
              </div>
              <h3 style={{ fontSize: '20px', margin: '12px 0 8px', color: 'var(--text-primary)' }}>{article.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>{article.snippet}</p>
              <div style={{ marginTop: '16px', fontSize: '0.9rem', color: 'var(--accent-primary)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                Read Article &rarr;
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '40px', padding: '20px', background: 'rgba(255,255,255,0.02)', borderRadius: 'var(--border-radius)', border: '1px dashed var(--border-color)'}}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
          <em>Note: To fully comply with AdSense "Sufficient Content Volume", you should replace these with 15-30 actual high-quality articles (500-1000+ words each).</em>
        </p>
      </div>
    </motion.div>
  );
};
