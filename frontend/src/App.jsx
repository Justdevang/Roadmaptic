import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useState, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';

import { CreateRoadmap } from './components/CreateRoadmap';
import { Footer } from './components/Footer';
import { MazeBackground } from './components/MazeBackground';
import { CookieBanner } from './components/CookieBanner';
import { AdPlaceholder } from './components/AdPlaceholder';

// Lazy load non-critical routes for better performance (splitting chunks)
const RoadmapView = lazy(() => import('./components/RoadmapView').then(m => ({ default: m.RoadmapView })));
const SharedRoadmap = lazy(() => import('./components/SharedRoadmap').then(m => ({ default: m.SharedRoadmap })));
const AboutUs = lazy(() => import('./components/AboutUs').then(m => ({ default: m.AboutUs })));
const ContactUs = lazy(() => import('./components/ContactUs').then(m => ({ default: m.ContactUs })));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const Blog = lazy(() => import('./components/Blog').then(m => ({ default: m.Blog })));
const Article = lazy(() => import('./components/Article').then(m => ({ default: m.Article })));
const NotFound = lazy(() => import('./components/NotFound').then(m => ({ default: m.NotFound })));

// Lightweight loader for Suspense transitions
const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
    <div className="spinner"></div>
  </div>
);

function App() {
  const [roadmapData, setRoadmapData] = useState(() => {
    try {
      const saved = localStorage.getItem('learnpath_active_roadmap');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });
  
  const [originalParams, setOriginalParams] = useState(() => {
    try {
      const saved = localStorage.getItem('learnpath_active_params');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const handleSetRoadmapData = (data, params) => {
    setRoadmapData(data);
    if(params) {
      setOriginalParams(params);
      localStorage.setItem('learnpath_active_params', JSON.stringify(params));
    }
    if(data) {
      localStorage.setItem('learnpath_active_roadmap', JSON.stringify(data));
      if (params) {
        try {
          const history = JSON.parse(localStorage.getItem('learnpath_history') || '[]');
          const newHistory = history.filter(h => h.params?.targetRole !== params.targetRole);
          newHistory.unshift({ data, params, timestamp: Date.now() });
          localStorage.setItem('learnpath_history', JSON.stringify(newHistory.slice(0, 5)));
        } catch(e) {}
      }
    }
  };

  return (
    <Router>
      <MazeBackground />
      <CookieBanner />

      <div className="app-wrapper" style={{ position: 'relative', zIndex: 1, paddingBottom: '60px' }}>
        <header style={{ padding: '12px 0 24px', borderBottom: '1px solid var(--border-color)', marginBottom: '40px' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <AdPlaceholder type="sticky-header" />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div className="text-gradient" onClick={() => window.location.href='/'} style={{ margin: 0, fontSize: '24px', cursor: 'pointer', fontWeight: 'bold' }}>
                LearnPath
              </div>
              <nav style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <a href="/blog" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='var(--accent-primary)'} onMouseOut={e => e.target.style.color='var(--text-secondary)'}>Blog</a>
                <a href="/about" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='var(--accent-primary)'} onMouseOut={e => e.target.style.color='var(--text-secondary)'}>About</a>
                <a href="/contact" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color='var(--accent-primary)'} onMouseOut={e => e.target.style.color='var(--text-secondary)'}>Contact</a>
              </nav>
            </div>
          </div>
        </header>
        
        <main className="container animate-fade-in">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<CreateRoadmap setRoadmapData={handleSetRoadmapData} />} />
              <Route path="/roadmap" element={<RoadmapView roadmapData={roadmapData} originalParams={originalParams} />} />
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
    </Router>
  );
}


export default App;
