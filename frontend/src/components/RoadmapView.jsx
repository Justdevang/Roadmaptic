import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Play, ExternalLink, Share2, Save, Copy } from 'lucide-react';
import { D3Graph } from './D3Graph';
import { saveRoadmapToFirebase } from '../firebase/api';

export const RoadmapView = ({ roadmapData, originalParams }) => {
  const navigate = useNavigate();
  const [completedTopics, setCompletedTopics] = useState([]);
  const [shareLink, setShareLink] = useState('');
  const [isSharing, setIsSharing] = useState(false);
  
  useEffect(() => {
    if (!roadmapData) {
      navigate('/');
    }
  }, [roadmapData, navigate]);

  if (!roadmapData) return null;

  // Calculate progress
  const totalTopics = roadmapData.reduce((acc, week) => acc + week.topics.length, 0);
  const progressPercent = totalTopics === 0 ? 0 : Math.round((completedTopics.length / totalTopics) * 100);

  const toggleTopic = (topicId) => {
    if (completedTopics.includes(topicId)) {
      setCompletedTopics(completedTopics.filter(id => id !== topicId));
    } else {
      setCompletedTopics([...completedTopics, topicId]);
    }
  };

  const handleShare = async () => {
    try {
      setIsSharing(true);
      // Ensure we don't save progress, only the template
      const id = await saveRoadmapToFirebase(roadmapData, originalParams || { targetRole: 'Custom Roadmap', currentSkills: '', hoursPerWeek: 10 });
      const link = `${window.location.origin}/shared/${id}`;
      setShareLink(link);
    } catch (err) {
      alert("Failed to share roadmap. Check Firebase config.");
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      style={{ paddingBottom: '60px' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '28px', marginBottom: '6px', fontWeight: '800' }}>Your Learning <span className="text-gradient">Roadmap</span></h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Follow this structured path to achieve your goals.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {shareLink ? (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', background: 'var(--bg-secondary)', padding: '8px 12px', border: '1px solid var(--accent-primary)', borderRadius: 'var(--border-radius)' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-primary)' }}>{shareLink}</span>
              <button onClick={() => navigator.clipboard.writeText(shareLink)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent-primary)', display: 'flex' }}>
                <Copy size={16} />
              </button>
            </div>
          ) : (
            <button className="btn-secondary" onClick={handleShare} disabled={isSharing} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {isSharing ? <span className="spinner" style={{ width: '16px', height: '16px' }} /> : <Share2 size={16} />} 
              Share Publicly
            </button>
          )}
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Save size={16} /> Save to Profile
          </button>
        </div>
      </div>

      {/* D3 Graph Visualization */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '18px', marginBottom: '12px', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Path Overview</h3>
        <D3Graph data={roadmapData} />
      </div>

      {/* Progress Bar */}
      <div className="glass" style={{ padding: '20px 24px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontWeight: '600', fontSize: '0.95rem' }}>Overall Progress</span>
          <span className="text-gradient" style={{ fontWeight: '800', fontSize: '1.1rem' }}>{progressPercent}%</span>
        </div>
        <div style={{ width: '100%', height: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px', overflow: 'hidden' }}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ height: '100%', background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))' }}
          />
        </div>
      </div>

      {/* Weekly Breakdown */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {roadmapData.map((weekData, weekIndex) => (
          <motion.div 
            key={weekIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: weekIndex * 0.08 }}
            className="glass"
            style={{ padding: '24px', borderLeft: '4px solid var(--accent-primary)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ background: 'var(--bg-secondary)', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', border: '1px solid var(--border-color)', color: 'var(--accent-secondary)', textTransform: 'uppercase' }}>
                Week {weekData.week}
              </div>
              <h3 style={{ fontSize: '20px', margin: 0 }}>{weekData.focus}</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {weekData.topics.map((topic, topicIndex) => {
                const topicId = `week-${weekData.week}-topic-${topicIndex}`;
                const isCompleted = completedTopics.includes(topicId);
                
                return (
                  <div 
                    key={topicId}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between',
                      padding: '14px 16px',
                      background: 'var(--bg-tertiary)',
                      borderRadius: 'var(--border-radius)',
                      border: isCompleted ? '1px solid var(--accent-tertiary)' : '1px solid var(--border-color)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <button 
                        onClick={() => toggleTopic(topicId)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 0 }}
                      >
                        {isCompleted ? (
                          <CheckCircle size={22} color="var(--accent-tertiary)" />
                        ) : (
                          <Circle size={22} color="var(--text-secondary)" />
                        )}
                      </button>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '15px', fontWeight: '600', textDecoration: isCompleted ? 'line-through' : 'none', color: isCompleted ? 'var(--text-secondary)' : 'var(--text-primary)' }}>
                          {topic.name}
                        </h4>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                          <Play size={12} color="var(--accent-primary)" />
                          <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{topic.resourceName}</span>
                        </div>
                      </div>
                    </div>
                    
                    <a 
                      href={topic.resourceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-secondary"
                      style={{ padding: '6px 12px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
                    >
                      Learn <ExternalLink size={14} />
                    </a>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
