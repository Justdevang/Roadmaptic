import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Target, Zap, ShieldCheck } from 'lucide-react';

export const AboutUs = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="page-container"
      style={{ maxWidth: '1200px', padding: '0 20px 80px', margin: '0 auto' }}
    >
      <Helmet>
        <title>About Roadmaptic | Our Mission to Democratize Education</title>
        <meta name="description" content="Learn more about Roadmaptic, our mission to provide AI-powered personalized learning roadmaps, and how we curate the best free educational resources." />
      </Helmet>

      {/* 1. Hero Section */}
      <div style={{ textAlign: 'center', marginTop: '60px', marginBottom: '60px' }}>
        <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: '800', lineHeight: 1.1, color: 'var(--text-primary)', marginBottom: '24px', letterSpacing: '-0.02em' }}>
          Learning, <span style={{ color: 'var(--accent-secondary)' }}>Reimagined.</span>
        </h1>
        <p style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>
          We are on a mission to democratize education by turning the internet's infinite noise into clear, actionable, and personalized learning roadmaps.
        </p>
      </div>

      {/* Hero Image */}
      <div style={{ width: '100%', height: 'clamp(300px, 50vh, 500px)', borderRadius: '32px', overflow: 'hidden', marginBottom: '100px', border: '1px solid var(--border-color)' }}>
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1600&h=800"
          alt="Team collaborating"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* 2. Bento Grid / The Problem & Solution */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px', marginBottom: '100px' }}>
        <div style={{ background: 'var(--bg-secondary)', padding: 'clamp(32px, 5vw, 48px)', borderRadius: '32px', border: '1px solid var(--border-color)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', color: 'var(--accent-secondary)' }}>
            <Target size={24} />
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '16px', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>The Problem</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>
            The internet holds an infinite amount of knowledge, but navigating it is overwhelming. Self-taught developers, data scientists, and designers waste hundreds of hours figuring out <em>what</em> to learn and <em>in what order</em>.
          </p>
        </div>

        <div style={{ background: 'var(--accent-primary)', padding: 'clamp(32px, 5vw, 48px)', borderRadius: '32px', border: '1px solid var(--border-color)' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', color: 'var(--bg-primary)' }}>
            <Zap size={24} />
          </div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '16px', color: 'var(--bg-primary)', letterSpacing: '-0.02em' }}>The Solution</h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--bg-primary)', opacity: 0.9, lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>
            Roadmaptic leverages advanced AI to bypass SEO-spam and build custom, week-by-week curricula using only the highest-rated free tutorials, documentation, and videos. Structured learning in 30 seconds.
          </p>
        </div>
      </div>

      {/* 3. Stats / Image Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginBottom: '100px' }}>
        <div style={{ aspectRatio: '4/3', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
          <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800&h=600" alt="Coding" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 24px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '4rem', fontWeight: '800', marginBottom: '8px', color: 'var(--text-primary)', lineHeight: 1 }}>10k+</h2>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', fontWeight: '500', fontFamily: "'Inter', sans-serif" }}>Custom roadmaps generated by users worldwide to accelerate their careers.</p>
        </div>
        <div style={{ aspectRatio: '4/3', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
          <img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800&h=600" alt="Desk setup" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>

      {/* 4. Values */}
      <div style={{ background: 'var(--bg-secondary)', borderRadius: '32px', padding: 'clamp(40px, 8vw, 80px) clamp(20px, 4vw, 40px)', border: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '40px', color: 'var(--text-primary)', letterSpacing: '-0.02em', textAlign: 'center' }}>Our Core Values</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>

          <div>
            <ShieldCheck size={32} color="var(--accent-secondary)" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '12px', color: 'var(--text-primary)' }}>Quality First</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>We bypass algorithmic noise to curate only top-tier, industry-recognized materials from trusted creators.</p>
          </div>

          <div>
            <Target size={32} color="var(--accent-secondary)" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '12px', color: 'var(--text-primary)' }}>Pragmatic Focus</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>We focus on practical, actionable steps that lead directly to employable skills, cutting out unnecessary fluff.</p>
          </div>

          <div>
            <Zap size={32} color="var(--accent-secondary)" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '12px', color: 'var(--text-primary)' }}>Free Forever</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, fontFamily: "'Inter', sans-serif" }}>Education should not be gatekept by expensive paywalls. We strictly source high-quality, free internet content.</p>
          </div>

        </div>
      </div>

    </motion.div>
  );
};
