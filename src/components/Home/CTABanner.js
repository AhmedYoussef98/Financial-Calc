import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CTABanner = () => {
  return (
    <section style={{ 
      background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
      padding: '4rem 1.5rem',
      color: 'white',
      textAlign: 'center'
    }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 style={{ color: 'white', marginBottom: '1rem', fontSize: '2.5rem' }}>
            Ready to Calculate Wisely?
          </h2>
          <p style={{ fontSize: '1.25rem', opacity: 0.9, marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Get started with your industry-specific financial calculator today
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/calculator">
              <button className="btn" style={{ 
                background: 'var(--accent)',
                color: 'var(--bg-dark)',
                border: 'none',
                padding: '0.75rem 1.5rem',
                fontWeight: 600,
                borderRadius: '0.375rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                Try Full Demo
              </button>
            </Link>
            <Link to="/contact">
              <button className="btn" style={{ 
                background: 'transparent',
                color: 'white',
                border: '2px solid white',
                padding: '0.75rem 1.5rem',
                fontWeight: 600,
                borderRadius: '0.375rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                Book a Consultation
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;