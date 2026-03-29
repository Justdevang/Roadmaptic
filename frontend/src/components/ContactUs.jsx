import { motion } from 'framer-motion';

export const ContactUs = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass"
      style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', marginBottom: '40px' }}
    >
      <h2 style={{ fontSize: '32px', marginBottom: '24px', fontWeight: '800' }}>Contact <span className="text-gradient">Us</span></h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
      </p>

      <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label className="input-label">Name</label>
          <input type="text" className="input-field" placeholder="John Doe" required />
        </div>
        
        <div>
          <label className="input-label">Email Address</label>
          <input type="email" className="input-field" placeholder="john@example.com" required />
        </div>
        
        <div>
          <label className="input-label">Message</label>
          <textarea className="input-field" placeholder="How can we help you?" style={{ minHeight: '120px', resize: 'vertical' }} required></textarea>
        </div>

        <button type="button" className="btn-primary" onClick={() => alert("Message Sent! (Mock Action)")}>
          Send Message
        </button>
      </form>
      
      <div style={{ marginTop: '40px', borderTop: '1px solid var(--border-color)', paddingTop: '20px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        <p>Email: contact@learnpath.com</p>
        <p>Address: 123 Learning Ave, Suite 400, Tech City, TC 12345</p>
      </div>
    </motion.div>
  );
};
