import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Target, Clock, Zap, Video, Youtube, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export const CreateRoadmap = ({ setRoadmapData }) => {
  const [role, setRole] = useState('');
  const [skills, setSkills] = useState('');
  const [hours, setHours] = useState('10');
  const [resourcePref, setResourcePref] = useState('mixed');
  const [includeYouTube, setIncludeYouTube] = useState(false);
  const [language, setLanguage] = useState('English');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('learnpath_history') || '[]');
      setHistory(saved);
    } catch(e) {}
  }, []);

  const handleGenerate = async (e) => {
    setError('');
    setLoading(true);
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      if (!apiUrl) {
        setError('API not configured.');
        setLoading(false);
        return;
      }

      const fetchParams = { 
        currentSkills: skills, 
        targetRole: role, 
        hoursPerWeek: hours,
        resourcePreference: resourcePref,
        includeYouTube,
        language
      };
      
      const response = await fetch(`${apiUrl}/api/generate-roadmap`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fetchParams),
      });
      
      const data = await response.json();
      
      if (data.roadmap) {
        setRoadmapData(data.roadmap, fetchParams);
        navigate('/roadmap');
      } else {
        setError('Failed to generate roadmap: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error(error);
      setError('Could not connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ maxWidth: '580px', margin: '40px auto 0' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ 
          background: 'rgba(204, 255, 0, 0.08)', 
          width: '56px', height: '56px', 
          borderRadius: '14px', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', 
          margin: '0 auto 20px',
          border: '1px solid rgba(204, 255, 0, 0.2)',
          boxShadow: '0 4px 20px rgba(204, 255, 0, 0.15)'
        }}>
          <Zap size={28} color="var(--accent-primary)" strokeWidth={2.5} />
        </div>
        <h1 className="text-smaller-on-mobile" style={{ marginBottom: '8px', fontWeight: '800', lineHeight: 1.2 }}>Generate your <span className="text-gradient">AI Personalized Learning Roadmap</span></h1>
        <h2 style={{ fontSize: '20px', marginBottom: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>What do you want to learn?</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto' }}>Get a custom, week-by-week learning path generated specifically for your goals and schedule.</p>
      </div>

      <div className="glass glass-container">
        <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label className="input-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Target size={14} /> Target Role / Goal</span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{role.length}/200</span>
            </label>
            <input 
              required
              type="text" 
              className="input-field" 
              placeholder="e.g. Full Stack Developer, Data Scientist..." 
              value={role}
              maxLength={200}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>

          <div>
            <label className="input-label" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><BookOpen size={14} /> Current Skills</span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{skills.length}/500</span>
            </label>
            <textarea 
              required
              className="input-field" 
              placeholder="e.g. Basic HTML/CSS, some Python, SQL..." 
              style={{ minHeight: '90px', resize: 'vertical' }}
              value={skills}
              maxLength={500}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>

          <div className="flex-responsive">
            <div style={{ flex: 1 }}>
              <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={14} /> Hours / Week
              </label>
              <input 
                required
                type="number" 
                className="input-field" 
                min="1" 
                max="100"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
            </div>
            
            <div style={{ flex: 1 }}>
              <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Video size={14} /> Preferred Style
              </label>
              <select 
                className="input-field" 
                value={resourcePref}
                onChange={(e) => setResourcePref(e.target.value)}
                style={{ appearance: 'none' }}
              >
                <option value="mixed">Mixed (Best Available)</option>
                <option value="video">Mostly Video Tutorials</option>
                <option value="docs">Mostly Written Documentation</option>
              </select>
            </div>
          </div>
          
          <div className="flex-responsive">
            <div style={{ flex: 1 }}>
              <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Globe size={14} /> Language
              </label>
              <select 
                className="input-field" 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={{ appearance: 'none' }}
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
              </select>
            </div>

            <div style={{ flex: 1.5 }}>
              <label className="input-label" style={{ visibility: 'hidden', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Globe size={14} /> Spacer
              </label>
              <div 
                onClick={() => setIncludeYouTube(!includeYouTube)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 14px',
                  borderRadius: 'var(--border-radius)',
                  cursor: 'pointer',
                  border: `1px solid ${includeYouTube ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.1)'}`,
                  background: includeYouTube ? 'rgba(204, 255, 0, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                  transition: 'all 0.2s',
                  height: '46px'
                }}
              >
                <div style={{
                  width: '18px', height: '18px',
                  borderRadius: '4px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: includeYouTube ? 'var(--accent-primary)' : 'transparent',
                  border: `1px solid ${includeYouTube ? 'var(--accent-primary)' : 'var(--text-muted)'}`
                }}>
                  {includeYouTube && <Zap size={12} color="#000" />}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: 0, fontSize: '13.5px', display: 'flex', alignItems: 'center', gap: '6px', color: includeYouTube ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                    <Youtube size={14} color={includeYouTube ? '#ff0000' : 'var(--text-secondary)'} /> Real YouTube Videos
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.4)',
              padding: '12px',
              color: '#ef4444',
              borderRadius: 'var(--border-radius)',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '14px' }}>
            {loading ? (
              <><span className="spinner"></span> <span>Generating Timeline...</span></>
            ) : (
              'Generate My Roadmap'
            )}
          </button>
        </form>
      </div>
      
      {history.length > 0 && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          style={{ marginTop: '32px' }}
        >
          <h3 style={{ fontSize: '18px', marginBottom: '16px', color: 'var(--text-secondary)', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Clock size={16} color="var(--accent-primary)" style={{ display: 'inline', marginRight: '6px', verticalAlign: '-3px' }} /> 
            Recent Roadmaps
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            {history.map((h, i) => (
              <div 
                key={i} 
                className="glass" 
                style={{ padding: '14px 20px', borderRadius: 'var(--border-radius)', cursor: 'pointer', flex: '1 1 auto', maxWidth: '48%', minWidth: '180px', textAlign: 'center', transition: 'all 0.2s', border: '1px solid var(--border-color)' }}
                onClick={() => {
                  setRoadmapData(h.data, h.params);
                  navigate('/roadmap');
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-primary)';
                  e.currentTarget.style.background = 'rgba(204, 255, 0, 0.08)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.background = 'rgba(10, 10, 12, 0.85)';
                }}
              >
                <div style={{ fontWeight: '700', color: 'var(--text-primary)', fontSize: '1rem', marginBottom: '4px' }}>{h.params?.targetRole}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <span>{h.params?.hoursPerWeek} hrs/week</span> • <span>{h.params?.language || 'English'}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <div style={{ marginTop: '40px', padding: '0 20px', color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.6', textAlign: 'center', opacity: 0.7 }}>
        <p>LearnPath is an advanced <strong>AI Personalized Learning Roadmap</strong> generator designed for developers, designers, and tech enthusiasts. Tell us your target career, current skills, and weekly availability, and our system builds a comprehensive, week-by-week curriculum using the best free tutorials, documentation, and real YouTube videos on the internet. Start your structured tech career journey today.</p>
      </div>
    </motion.div>
  );
};
