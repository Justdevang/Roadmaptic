import { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Mail, MapPin, MessageSquare, ArrowRight, CheckCircle } from 'lucide-react';

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
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
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
      className="page-container"
      style={{ maxWidth: '1000px', padding: '20px 20px 60px' }}
    >
      <Helmet>
        <title>Contact Us | Support for Roadmaptic</title>
        <meta name="description" content="Reach out to the Roadmaptic team for support, partnership opportunities, or to provide feedback." />
      </Helmet>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
        {/* Left Side Content */}
        <div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: '12px', fontWeight: '800', lineHeight: 1.2 }}>
            Get in <span className="text-gradient">touch</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', fontSize: '1rem', lineHeight: 1.6 }}>
            Whether you have a question about our learning roadmaps, need support with your account, or want to explore partnership opportunities, our team is here to help you succeed.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '12px', borderRadius: '12px', color: 'var(--accent-primary)' }}>
                <Mail size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', marginBottom: '4px', fontWeight: '700' }}>Email Us</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '6px' }}>Our friendly team is here to help.</p>
                <a href="mailto:nexoraio99@gmail.com" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '500', fontSize: '0.9rem' }}>nexoraio99@gmail.com</a>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '12px', borderRadius: '12px', color: 'var(--accent-primary)' }}>
                <MapPin size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', marginBottom: '4px', fontWeight: '700' }}>Headquarters</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '6px' }}>Come say hello at our office.</p>
                <span style={{ color: 'var(--text-primary)', fontWeight: '500', fontSize: '0.9rem' }}>Pune, Maharashtra, India</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '12px', borderRadius: '12px', color: 'var(--accent-primary)' }}>
                <MessageSquare size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', marginBottom: '4px', fontWeight: '700' }}>Support Hours</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '6px' }}>When we're online and ready.</p>
                <span style={{ color: 'var(--text-primary)', fontWeight: '500', fontSize: '0.9rem' }}>Mon-Fri, 9am - 6pm IST</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="glass" style={{ padding: '24px', borderRadius: '12px' }}>
          {isSuccess ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-tertiary)', margin: '0 auto 20px' }}>
                <CheckCircle size={32} />
              </div>
              <h2 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Message Sent!</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: '0.95rem' }}>Thanks for reaching out. We'll get back to you within 24 hours.</p>
              <button className="btn-secondary" onClick={() => setIsSuccess(false)}>Send Another Message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ marginBottom: '8px' }}>
                <h2 style={{ fontSize: '1.4rem', marginBottom: '4px' }}>Send a message</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Fill out the form below and we'll reply shortly.</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label htmlFor="contact-name" className="input-label" style={{ fontSize: '0.8rem' }}>Full Name</label>
                  <input
                    required
                    id="contact-name"
                    type="text"
                    name="name"
                    className="input-field"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    style={{ background: 'rgba(255, 255, 255, 0.02)' }}
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="input-label" style={{ fontSize: '0.8rem' }}>Email Address</label>
                  <input
                    required
                    id="contact-email"
                    type="email"
                    name="email"
                    className="input-field"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    style={{ background: 'rgba(255, 255, 255, 0.02)' }}
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="input-label" style={{ fontSize: '0.8rem' }}>Your Message</label>
                  <textarea
                    required
                    id="contact-message"
                    name="message"
                    className="input-field"
                    placeholder="How can we help you today?"
                    style={{ minHeight: '100px', resize: 'vertical', background: 'rgba(255, 255, 255, 0.02)' }}
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              {error && (
                <div style={{ color: '#ef4444', fontSize: '12px', background: 'rgba(239,68,68,0.1)', padding: '8px', borderRadius: '4px', border: '1px solid rgba(239,68,68,0.2)' }}>
                  {error}
                </div>
              )}

              <button type="submit" className="btn-primary" disabled={isSubmitting} style={{ width: '100%', marginTop: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                {isSubmitting ? (
                  <span className="spinner" style={{ width: '16px', height: '16px' }}></span>
                ) : (
                  <>Send Message <ArrowRight size={16} /></>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  );
};
