import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('learnpath_cookie_consent');
    if (!consent) {
      // Small delay so it animates in nicely after initial load
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('learnpath_cookie_consent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '24px',
            right: '24px',
            maxWidth: '600px',
            margin: '0 auto',
            zIndex: 9999,
          }}
          className="glass"
        >
          <div style={{ padding: '20px 24px', position: 'relative' }}>
            <button 
              onClick={acceptCookies} 
              style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h3 style={{ fontSize: '18px', marginBottom: '8px', color: 'var(--text-primary)' }}>🍪 We use cookies</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.5' }}>
                  We use cookies to personalize content, ads (via Google AdSense), and to analyze our traffic. By clicking "Accept", you consent to our use of cookies. Read our <Link to="/privacy-policy" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Privacy Policy</Link> for more details.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                <Link to="/privacy-policy" className="btn-secondary" onClick={acceptCookies} style={{ textDecoration: 'none', fontSize: '14px', padding: '8px 16px' }}>
                  Learn More
                </Link>
                <button className="btn-primary" onClick={acceptCookies} style={{ fontSize: '14px', padding: '8px 24px' }}>
                  Accept & Close
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
