import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer style={{ marginTop: '60px', padding: '40px 0', borderTop: '1px solid var(--border-color)', background: 'var(--bg-secondary)', minHeight: '200px', contain: 'layout' }}>
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '20px' }}>
        <div style={{ maxWidth: '300px', minHeight: '100px' }}>
          <h3 className="text-gradient" style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Roadmaptic</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            AI-powered personalized learning roadmaps. Tell us your goals, and we give you the exact path to get there using the best resources.
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '40px' }}>
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Company</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><Link to="/about" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>About Us</Link></li>
              <li><Link to="/contact" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontSize: '1rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Resources</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><Link to="/blog" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Articles & Guides</Link></li>
              <li><Link to="/privacy-policy" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="container" style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
        &copy; {new Date().getFullYear()} Roadmaptic. All rights reserved.
      </div>
    </footer>
  );
};
