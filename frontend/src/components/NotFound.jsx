import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Compass } from 'lucide-react';

export const NotFound = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass page-container"
      style={{ textAlign: 'center', padding: '80px 40px', maxWidth: '600px', marginTop: '40px' }}
    >
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
        <Compass size={64} style={{ color: 'var(--accent-primary)', opacity: 0.8 }} />
      </div>
      <h1 style={{ fontSize: '48px', marginBottom: '16px', fontWeight: '800' }}>
        4<span className="text-gradient">0</span>4
      </h1>
      <h2 style={{ fontSize: '24px', marginBottom: '16px', color: 'var(--text-primary)' }}>
        Off the Beaten Path
      </h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '32px', lineHeight: '1.6' }}>
        We couldn't find the page you're looking for. It might have been moved, deleted, or perhaps it never existed in the first place.
      </p>
      
      <Link to="/" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', padding: '12px 24px', fontSize: '1rem' }}>
        <Home size={18} /> Back to Homepage
      </Link>
    </motion.div>
  );
};
