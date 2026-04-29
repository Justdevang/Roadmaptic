import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Lock, Mail, User, ArrowRight, Github, Chrome } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, githubProvider } from '../firebase';

export const AuthPage = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSocialLogin = async (provider) => {
    try {
      setIsSubmitting(true);
      const result = await signInWithPopup(auth, provider);
      const fbUser = result.user;
      
      // Sync with backend to get a valid backend token
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/api/auth/social-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: fbUser.email,
          name: fbUser.displayName,
          uid: fbUser.uid
        })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('roadmaptic_user', JSON.stringify(data));
        if (onSuccess) {
          onSuccess();
        } else {
          navigate(location.state?.from || '/roadmap');
        }
      } else {
        alert(data.error || 'Backend sync failed');
      }
    } catch (err) {
      console.error(err);
      alert('Social login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
      
      const res = await fetch(`${apiUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('roadmaptic_user', JSON.stringify(data));
        if (onSuccess) {
          onSuccess();
        } else {
          navigate(location.state?.from || '/roadmap');
        }
      } else {
        alert(data.error || 'Authentication failed');
      }
    } catch (err) {
      console.error(err);
      alert('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const socialButtonStyle = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '12px',
    borderRadius: '12px',
    border: '1px solid var(--border-color)',
    background: 'rgba(255, 255, 255, 0.03)',
    color: 'var(--text-primary)',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  };

  return (
    <div style={{ padding: '100px 20px 100px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Helmet>
        <title>{isLogin ? 'Welcome Back' : 'Join Roadmaptic'} | AI Roadmaps</title>
        <meta name="description" content="Sign in or create an account to generate your personalized learning roadmap." />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="glass"
        style={{ 
          maxWidth: '480px', 
          width: '100%', 
          padding: '48px 40px', 
          borderRadius: '24px', 
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          background: 'var(--bg-secondary)', // Ensure card background is solid
          zIndex: 10
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            background: 'var(--accent-primary)', 
            borderRadius: '16px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 20px',
            boxShadow: '0 0 20px rgba(204, 255, 0, 0.3)'
          }}>
            <Lock size={28} color="#000" />
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '10px', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            {isLogin ? 'Sign In' : 'Get Started'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.5 }}>
            {isLogin ? 'Enter your credentials to access your account' : 'Start your personalized 12-week learning journey today'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
          <button 
            type="button"
            onClick={() => handleSocialLogin(googleProvider)}
            style={socialButtonStyle}
            onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'var(--accent-primary)'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
          >
            <Chrome size={18} /> Google
          </button>
          <button 
            type="button"
            onClick={() => handleSocialLogin(githubProvider)}
            style={socialButtonStyle}
            onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'var(--accent-primary)'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
          >
            <Github size={18} /> GitHub
          </button>
        </div>

        <div style={{ position: 'relative', textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: 'var(--border-color)', zIndex: 0 }}></div>
          <span style={{ position: 'relative', background: 'var(--bg-secondary)', padding: '0 16px', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: '700', letterSpacing: '0.05em' }}>
            OR CONTINUE WITH EMAIL
          </span>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <AnimatePresence mode="wait">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label htmlFor="name" className="input-label" style={{ fontSize: '0.75rem', marginBottom: '8px', opacity: 0.8 }}>Full Name</label>
                <div style={{ position: 'relative', marginBottom: '4px' }}>
                  <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', opacity: 0.6, zIndex: 1 }}>
                    <User size={18} />
                  </div>
                  <input
                    required={!isLogin}
                    id="name"
                    type="text"
                    name="name"
                    className="input-field"
                    placeholder="e.g. James Wilson"
                    value={formData.name}
                    onChange={handleChange}
                    style={{ paddingLeft: '52px', height: '52px', fontSize: '0.95rem' }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div style={{ marginTop: isLogin ? '0' : '4px' }}>
            <label htmlFor="email" className="input-label" style={{ fontSize: '0.75rem', marginBottom: '8px', opacity: 0.8 }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', opacity: 0.6, zIndex: 1 }}>
                <Mail size={18} />
              </div>
              <input
                required
                id="email"
                type="email"
                name="email"
                className="input-field"
                placeholder="james@company.com"
                value={formData.email}
                onChange={handleChange}
                style={{ paddingLeft: '52px', height: '52px', fontSize: '0.95rem' }}
              />
            </div>
          </div>

          <div style={{ marginTop: '4px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label htmlFor="password" className="input-label" style={{ fontSize: '0.75rem', marginBottom: 0, opacity: 0.8 }}>Password</label>
              {isLogin && (
                <button type="button" style={{ background: 'none', border: 'none', color: 'var(--accent-primary)', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer', opacity: 0.9 }}>
                  Forgot password?
                </button>
              )}
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', opacity: 0.6, zIndex: 1 }}>
                <Lock size={18} />
              </div>
              <input
                required
                id="password"
                type="password"
                name="password"
                className="input-field"
                placeholder="Minimum 6 characters"
                value={formData.password}
                onChange={handleChange}
                style={{ paddingLeft: '52px', height: '52px', fontSize: '0.95rem' }}
                minLength={6}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={isSubmitting} 
            style={{ 
              width: '100%', 
              marginTop: '8px', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              gap: '10px', 
              height: '56px',
              fontSize: '1rem',
              fontWeight: '700',
              color: '#fff' // Force white text
            }}
          >
            {isSubmitting ? (
              <span className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2.5px' }}></span>
            ) : (
              <>{isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={20} /></>
            )}
          </button>
        </form>

        <div style={{ marginTop: '32px', textAlign: 'center', fontSize: '1rem', color: 'var(--text-secondary)' }}>
          {isLogin ? "New to Roadmaptic? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent-primary)',
              fontWeight: '700',
              cursor: 'pointer',
              padding: '0 4px',
              fontSize: '1rem'
            }}
          >
            {isLogin ? 'Create one now' : 'Log in here'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

