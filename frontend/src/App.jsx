import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useState, lazy, Suspense, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Moon, Sun } from 'lucide-react';

import { CreateRoadmap } from './components/CreateRoadmap';
import { Footer } from './components/Footer';
import { MazeBackground } from './components/MazeBackground';
import { CookieBanner } from './components/CookieBanner';
import { AdPlaceholder } from './components/AdPlaceholder';

// Lazy load non-critical routes for better performance (splitting chunks)
const Home = lazy(() => import('./components/Home').then(m => ({ default: m.Home })));
const RoadmapPage = lazy(() => import('./components/RoadmapPage').then(m => ({ default: m.RoadmapPage })));
const SharedRoadmap = lazy(() => import('./components/SharedRoadmap').then(m => ({ default: m.SharedRoadmap })));
const AboutUs = lazy(() => import('./components/AboutUs').then(m => ({ default: m.AboutUs })));
const ContactUs = lazy(() => import('./components/ContactUs').then(m => ({ default: m.ContactUs })));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const Blog = lazy(() => import('./components/Blog').then(m => ({ default: m.Blog })));
const Article = lazy(() => import('./components/Article').then(m => ({ default: m.Article })));
const NotFound = lazy(() => import('./components/NotFound').then(m => ({ default: m.NotFound })));
const AuthPage = lazy(() => import('./components/AuthPage').then(m => ({ default: m.AuthPage })));

// Lightweight loader for Suspense transitions
const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
    <div className="spinner"></div>
  </div>
);

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('roadmaptic_user');
  const location = useLocation();

  if (!user) {
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  }

  return children;
};

function AppContent() {
  const location = useLocation();
  const canonicalUrl = `https://roadmaptic.qzz.io${location.pathname === '/' ? '' : location.pathname.replace(/\/$/, '')}`;

  // Track page views on route change manually (in case enhanced measurement is off)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  const [roadmapData, setRoadmapData] = useState(() => {
    try {
      const saved = localStorage.getItem('roadmaptic_active_roadmap');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const [originalParams, setOriginalParams] = useState(() => {
    try {
      const saved = localStorage.getItem('roadmaptic_active_params');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('roadmaptic_theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('roadmaptic_theme', theme);
  }, [theme]);

  const handleSetRoadmapData = (data, params) => {
    setRoadmapData(data);
    if (params) {
      setOriginalParams(params);
      localStorage.setItem('roadmaptic_active_params', JSON.stringify(params));
    }
    if (data) {
      localStorage.setItem('roadmaptic_active_roadmap', JSON.stringify(data));
      if (params) {
        try {
          const history = JSON.parse(localStorage.getItem('roadmaptic_history') || '[]');
          const newHistory = history.filter(h => h.params?.targetRole !== params.targetRole);
          newHistory.unshift({ data, params, timestamp: Date.now() });
          localStorage.setItem('roadmaptic_history', JSON.stringify(newHistory.slice(0, 5)));
        } catch (e) { }
      }
    }
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Check if user is logged in for nav rendering
  const isLoggedIn = !!localStorage.getItem('roadmaptic_user');

  return (
    <>
      <Helmet>
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:url" content={canonicalUrl} />
      </Helmet>

      <MazeBackground />
      <CookieBanner />

      <div className="app-wrapper" style={{ position: 'relative', zIndex: 1, paddingBottom: '60px' }}>
        <header style={{ padding: '8px 0 16px', borderBottom: '1px solid var(--border-color)', marginBottom: '24px', background: 'var(--bg-primary)', transition: 'background 0.3s ease' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <AdPlaceholder type="sticky-header" />
            </div>
            <div className="header-content">
              <div className="logo text-gradient" onClick={() => window.location.href = '/'} style={{ margin: 0, fontSize: '24px', cursor: 'pointer', fontWeight: 'bold' }}>
                Roadmaptic
              </div>
              <nav className="main-nav">
                <a href="/blog">Blog</a>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>

                {/* Show auth links in nav */}
                {!isLoggedIn ? (
                  <a href="/auth" className="auth-link">Sign In</a>
                ) : (
                  <button className="sign-out-btn" onClick={() => { localStorage.removeItem('roadmaptic_user'); window.location.reload(); }}>Sign Out</button>
                )}

                <button
                  className="theme-toggle"
                  onClick={toggleTheme}
                  title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                  {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                </button>
              </nav>
            </div>
          </div>
        </header>

        <main className="container animate-fade-in">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/roadmap" element={
                <ProtectedRoute>
                  <RoadmapPage setRoadmapData={handleSetRoadmapData} roadmapData={roadmapData} originalParams={originalParams} />
                </ProtectedRoute>
              } />
              <Route path="/shared/:id" element={<SharedRoadmap />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<Article />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
        <AdPlaceholder type="mobile-anchor" />
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
