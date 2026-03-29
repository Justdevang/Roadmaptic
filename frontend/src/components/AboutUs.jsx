import { motion } from 'framer-motion';

export const AboutUs = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass"
      style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', marginBottom: '40px' }}
    >
      <h2 style={{ fontSize: '32px', marginBottom: '24px', fontWeight: '800' }}>About <span className="text-gradient">LearnPath</span></h2>
      
      <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.05rem', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <p>
          Welcome to LearnPath, the premier platform for AI-powered personalized learning. Our mission is to democratize education by curating the best free resources on the internet into structured, highly effective learning roadmaps.
        </p>
        
        <h3 style={{ color: 'var(--text-primary)', fontSize: '24px', marginTop: '16px', marginBottom: '8px' }}>Our Mission</h3>
        <p>
          The internet holds an infinite amount of knowledge, but navigating it can be overwhelming. Self-taught developers, data scientists, and designers often waste hundreds of hours figuring out <em>what</em> to learn and <em>in what order</em>. LearnPath solves that problem.
        </p>

        <h3 style={{ color: 'var(--text-primary)', fontSize: '24px', marginTop: '16px', marginBottom: '8px' }}>How It Works</h3>
        <p>
          By leveraging advanced AI models like Google Gemini and native YouTube search integrations, we build custom curricula based on your current skill level, target role, and time budget. We aggregate top-tier tutorials from sources like freeCodeCamp, MDN, and Traversy Media.
        </p>
        
        <h3 style={{ color: 'var(--text-primary)', fontSize: '24px', marginTop: '16px', marginBottom: '8px' }}>Quality Content First</h3>
        <p>
          We pride ourselves on original content curation. Our algorithms bypass SEO-spam blogs and direct you only to highly-rated, industry-recognized materials to ensure your learning is efficient and correct.
        </p>
      </div>
    </motion.div>
  );
};
