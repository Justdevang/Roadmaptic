import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRoadmapFromFirebase } from '../firebase/api';
import { RoadmapView } from './RoadmapView';

export const SharedRoadmap = () => {
  const { id } = useParams();
  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const data = await getRoadmapFromFirebase(id);
        if (data) {
          setRoadmapData(data);
        } else {
          setError("Roadmap not found.");
        }
      } catch (err) {
        setError("Error fetching roadmap. Check Firebase config.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchRoadmap();
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '40px' }}><span className="spinner"></span></div>;
  if (error) return <div style={{ textAlign: 'center', color: '#ef4444', marginTop: '40px' }}>{error}</div>;

  return (
    <div>
      <div style={{ marginBottom: '24px', background: 'rgba(204, 255, 0, 0.05)', padding: '16px 20px', borderRadius: 'var(--border-radius)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: '0 0 6px 0', color: 'var(--accent-secondary)', fontSize: '18px' }}>Shared View: {roadmapData.originalParams?.targetRole || 'Custom Role'}</h3>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>You are viewing a roadmap created by someone else.</p>
        </div>
        <Link to="/" className="btn-primary" style={{ textDecoration: 'none' }}>Create Your Own</Link>
      </div>
      <RoadmapView roadmapData={roadmapData.roadmapData} originalParams={roadmapData.originalParams} />
    </div>
  );
};
