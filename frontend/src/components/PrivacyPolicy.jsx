import { motion } from 'framer-motion';

export const PrivacyPolicy = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass"
      style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', marginBottom: '40px' }}
    >
      <h2 style={{ fontSize: '32px', marginBottom: '24px', fontWeight: '800' }}>Privacy <span className="text-gradient">Policy</span></h2>
      
      <div style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '1.05rem', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        
        <p>
          LearnPath ("we", "us", or "our") operates the learnpath.com website (the "Service"). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
        </p>

        <h3 style={{ color: 'var(--text-primary)', fontSize: '20px', marginTop: '16px', marginBottom: '8px' }}>1. Information Collection and Use</h3>
        <p>
          We collect several different types of information for various purposes to provide and improve our Service to you. We may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data").
        </p>

        <h3 style={{ color: 'var(--text-primary)', fontSize: '20px', marginTop: '16px', marginBottom: '8px' }}>2. Cookies and Usage Data</h3>
        <p>
          We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
        </p>

        <h3 style={{ color: 'var(--text-primary)', fontSize: '20px', marginTop: '16px', marginBottom: '8px' }}>3. Third-Party Services & Advertising (Google AdSense)</h3>
        <p>
          We use third-party Service Providers, such as Google AdSense, to show advertisements to you to help support and maintain our Service.
        </p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>Third party vendors, including Google, use cookies to serve ads based on a user's prior visits to your website or other websites.</li>
          <li>Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</li>
          <li>Users may opt out of personalized advertising by visiting <a href="https://myadcenter.google.com/" target="_blank" rel="noopener noreferrer" style={{color: 'var(--accent-primary)'}}>Ads Settings</a>.</li>
        </ul>

        <h3 style={{ color: 'var(--text-primary)', fontSize: '20px', marginTop: '16px', marginBottom: '8px' }}>4. Changes to This Privacy Policy</h3>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
        </p>
        
        <h3 style={{ color: 'var(--text-primary)', fontSize: '20px', marginTop: '16px', marginBottom: '8px' }}>5. Contact Us</h3>
        <p>
          If you have any questions about this Privacy Policy, please visit our Contact Us page.
        </p>
      </div>
    </motion.div>
  );
};
