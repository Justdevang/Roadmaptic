import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import { CreateRoadmap } from './components/CreateRoadmap';
import { RoadmapView } from './components/RoadmapView';
import { SharedRoadmap } from './components/SharedRoadmap';
import { MazeBackground } from './components/MazeBackground';
import { Footer } from './components/Footer';
import { AboutUs } from './components/AboutUs';
import { ContactUs } from './components/ContactUs';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { Blog } from './components/Blog';
import { Article } from './components/Article';
import { AdPlaceholder } from './components/AdPlaceholder';
import { CookieBanner } from './components/CookieBanner';
import { NotFound } from './components/NotFound';

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
            </div>
          </div>
        </header>
        
        <main className="container animate-fade-in">
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
        </main>
        
        <Footer />
        <AdPlaceholder type="mobile-anchor" />
      </div>
    </Router>
  );
}


export default App;
