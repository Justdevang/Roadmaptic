import { useState } from 'react';
import { motion } from 'framer-motion';

export const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Note: Replace with your actual Formspree ID if needed
      const response = await fetch('https://formspree.io/f/mnnjlnyg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setError('Failed to send message. Please try again later.');
      }
    } catch (err) {
      setError('Connection error. Please check your internet.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass page-container"
      style={{ maxWidth: '600px' }}
    >
      <h2 style={{ fontSize: '32px', marginBottom: '24px', fontWeight: '800' }}>Contact <span className="text-gradient">Us</span></h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
      </p>

      {isSuccess ? (
        <div className="glass" style={{ textAlign: 'center', padding: '30px', borderTop: '4px solid var(--accent-primary)' }}>
          <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>Message Received!</h3>
          <p style={{ color: 'var(--text-secondary)' }}>We'll get back to you as soon as possible.</p>
          <button className="btn-secondary" style={{ marginTop: '20px' }} onClick={() => setIsSuccess(false)}>Send Another</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label className="input-label">Name</label>
            <input 
              type="text" 
              name="name"
              className="input-field" 
              placeholder="John Doe" 
              required 
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label className="input-label">Email Address</label>
            <input 
              type="email" 
              name="email"
              className="input-field" 
              placeholder="john@example.com" 
              required 
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          <div>
            <label className="input-label">Message</label>
            <textarea 
              name="message"
              className="input-field" 
              placeholder="How can we help you?" 
              style={{ minHeight: '120px', resize: 'vertical' }} 
              required
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>

          {error && (
            <div style={{ color: '#ef4444', fontSize: '13px', background: 'rgba(239,68,68,0.1)', padding: '10px', borderRadius: 'var(--border-radius)' }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="spinner" style={{ width: '16px', height: '16px' }}></span>
            ) : (
              'Send Message'
            )}
          </button>
        </form>
      )}
      
      <div style={{ marginTop: '40px', borderTop: '1px solid var(--border-color)', paddingTop: '20px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        <p>Email: contact@learnpath.com</p>
        <p>Address: 123 Learning Ave, Suite 400, Tech City, TC 12345</p>
      </div>
    </motion.div>
  );
};
