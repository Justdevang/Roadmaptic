import { useNavigate } from 'react-router-dom';
import { Zap, ArrowRight, BookOpen, Star, CheckCircle, Mail, Map, Settings, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const sampleRoadmapData = [
  {
    week: 1,
    focus: "Foundations & Basics",
    topics: [
      { name: "Introduction to Core Concepts", resourceName: "FreeCodeCamp", resourceUrl: "#" },
      { name: "Setting up your Environment", resourceName: "YouTube", resourceUrl: "#" }
    ]
  },
  {
    week: 2,
    focus: "Advanced Topics",
    topics: [
      { name: "Building your first project", resourceName: "GitHub Docs", resourceUrl: "#" },
      { name: "Best Practices & Optimization", resourceName: "Dev.to", resourceUrl: "#" }
    ]
  }
];

export const Home = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setEmail('');
    }
  };

  return (
    <div style={{ paddingBottom: '80px' }}>
      {/* Hero Section */}
      <motion.div
        className="hero-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ display: 'flex', alignItems: 'center', textAlign: 'center', flexDirection: 'column', justifyContent: 'center' }}
      >
        <div style={{
          background: 'rgba(59, 130, 246, 0.1)',
          width: '48px', height: '48px',
          borderRadius: '12px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          boxShadow: '0 4px 16px rgba(59, 130, 246, 0.1)'
        }}>
          <Zap size={24} color="var(--accent-primary)" strokeWidth={2.5} />
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw + 1rem, 2.75rem)', fontWeight: '800', lineHeight: 1.2, marginBottom: '16px', maxWidth: '800px', margin: '0 auto 16px' }}>
          Your personalized <span className="text-gradient">12-week coding plan</span>, built in 30 seconds
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 24px', lineHeight: 1.5 }}>
          Tell us your target career, current skills, and weekly availability. We'll build a custom, step-by-step curriculum using the best resources on the internet.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => navigate('/roadmap')}
            className="btn-primary"
            style={{ fontSize: '1rem', padding: '12px 24px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            Generate My Roadmap <ArrowRight size={18} />
          </button>

        </div>
      </motion.div>

      {/* Feature Hooks */}
      <div style={{ maxWidth: '1000px', margin: '0 auto 60px', padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass" style={{ padding: '24px 20px', textAlign: 'center' }}>
            <Map size={24} color="var(--accent-primary)" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Your skills + target job → a week-by-week curriculum</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>We map out exactly what you need to learn based on where you are and where you want to be.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="glass" style={{ padding: '24px 20px', textAlign: 'center' }}>
            <Settings size={24} color="var(--accent-primary)" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Curated Top Tutorials & Projects</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Stop getting lost in tutorial hell. We link you straight to the highest-rated free resources.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="glass" style={{ padding: '24px 20px', textAlign: 'center' }}>
            <Calendar size={24} color="var(--accent-primary)" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Optimized for Your Schedule</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Have 5 hours a week? Or 40? Your timeline automatically adjusts to fit your life.</p>
          </motion.div>
        </div>
      </div>

      {/* How it works */}
      <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '60px 20px', marginBottom: '60px', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '12px' }}>How it works</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>Three simple steps to start your structured learning journey.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', position: 'relative' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-secondary)', border: '2px solid var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: '700', marginBottom: '16px', color: 'var(--text-primary)' }}>1</div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Tell us your goal</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Input your target role, current skills, and weekly availability.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-secondary)', border: '2px solid var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: '700', marginBottom: '16px', color: 'var(--text-primary)' }}>2</div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>AI builds your plan</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Our engine processes your inputs and generates a structured curriculum in seconds.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--accent-primary)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: '700', marginBottom: '16px' }}>3</div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Follow it week by week</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Track your progress, learn from curated resources, and achieve your goal.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sample Output Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{ maxWidth: '800px', margin: '0 auto 60px', padding: '0 20px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '12px' }}>See what you get</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>No fluff. Just a perfectly structured timeline tailored to your goals.</p>
        </div>

        <div className="glass" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
          {/* Faded overlay at bottom to show it's a snippet */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '100px',
            background: 'linear-gradient(to bottom, transparent, var(--bg-primary))',
            zIndex: 10,
            pointerEvents: 'none'
          }}></div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <div style={{ background: 'var(--bg-secondary)', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: '700', border: '1px solid var(--accent-secondary)', color: 'var(--accent-secondary)' }}>
              SAMPLE
            </div>
            <h3 style={{ fontSize: '18px', margin: 0 }}>Frontend Developer (React)</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {sampleRoadmapData.map((week, idx) => (
              <div key={idx} style={{ borderLeft: '2px solid var(--accent-primary)', paddingLeft: '20px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-6px', top: '2px', width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent-primary)' }}></div>
                <h4 style={{ fontSize: '16px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--accent-primary)', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Week {week.week}:</span> {week.focus}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {week.topics.map((topic, tIdx) => (
                    <div key={tIdx} style={{
                      background: 'rgba(255, 255, 255, 0.03)',
                      padding: '12px 16px',
                      borderRadius: '6px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      border: '1px solid var(--border-color)'
                    }}>
                      <div>
                        <div style={{ fontWeight: '600', marginBottom: '4px', fontSize: '0.95rem' }}>{topic.name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <BookOpen size={12} /> {topic.resourceName}
                        </div>
                      </div>
                      <div style={{ color: 'var(--accent-primary)', opacity: 0.7 }}>
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Social Proof / Testimonials */}
      <div style={{ maxWidth: '1000px', margin: '0 auto 60px', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700' }}>Loved by learners worldwide</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div className="glass" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} color="var(--accent-warning)" fill="var(--accent-warning)" />)}
            </div>
            <p style={{ fontSize: '0.95rem', fontStyle: 'italic', marginBottom: '16px', lineHeight: 1.5 }}>"I was overwhelmed by tutorials. This generated a clear 8-week Python roadmap that completely changed my learning process. I actually stuck to it."</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="testimonial-avatar" style={{ background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.85rem' }}>JD</div>
              <div>
                <div style={{ fontWeight: '600' }}>James D.</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Data Analyst</div>
              </div>
            </div>
          </div>

          <div className="glass" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} color="var(--accent-warning)" fill="var(--accent-warning)" />)}
            </div>
            <p style={{ fontSize: '0.95rem', fontStyle: 'italic', marginBottom: '16px', lineHeight: 1.5 }}>"The fact that it calculates what I need based on my available hours is incredible. It gave me realistic expectations and exact links to study."</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="testimonial-avatar" style={{ background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.85rem' }}>SM</div>
              <div>
                <div style={{ fontWeight: '600' }}>Sarah M.</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Frontend Developer</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Capture / Newsletter */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px' }}>
        <div className="glass bg-gradient" style={{ padding: '32px 24px', textAlign: 'center', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(0, 0, 0, 0))' }}>
          <Mail size={32} color="var(--accent-primary)" style={{ margin: '0 auto 16px' }} />
          <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '12px' }}>Get a free roadmap sent to your inbox</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '24px', maxWidth: '500px', margin: '0 auto 24px' }}>
            Not ready to commit? Enter your email and we'll send you an example roadmap to get a taste of what's possible.
          </p>

          {subscribed ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--accent-tertiary)', fontWeight: '600', padding: '14px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--border-radius)', maxWidth: '400px', margin: '0 auto' }}>
              <CheckCircle size={20} /> Example roadmap sent! Check your email.
            </motion.div>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '12px', maxWidth: '500px', margin: '0 auto', flexDirection: 'column' }}>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="input-field"
                  style={{ flex: '1', minWidth: '200px' }}
                />
                <button type="submit" className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
                  Send it to me
                </button>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'left', marginTop: '8px' }}>
                We respect your inbox. No spam, ever.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
