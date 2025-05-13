import React from 'react';
import { motion } from 'framer-motion';

const EnterpriseLogos = () => {
  return (
    <section className="section" style={{ background: 'white', padding: '3rem 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <p style={{ 
            fontSize: '1rem', 
            color: 'var(--text-light)',
            fontWeight: 500
          }}>
            Trusted by businesses of all sizes
          </p>
        </div>
        
        <div style={{ 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '3rem',
          flexWrap: 'wrap'
        }}>
          {/* These would be actual logos in a real implementation */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            style={{ 
              height: '40px',
              opacity: 0.7,
              filter: 'grayscale(100%)',
              transition: 'all 0.3s ease'
            }}
            whileHover={{ opacity: 1, filter: 'grayscale(0%)' }}
          >
            <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>UrbanBrew</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            style={{ 
              height: '40px',
              opacity: 0.7,
              filter: 'grayscale(100%)',
              transition: 'all 0.3s ease'
            }}
            whileHover={{ opacity: 1, filter: 'grayscale(0%)' }}
          >
            <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>RetailPro</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            style={{ 
              height: '40px',
              opacity: 0.7,
              filter: 'grayscale(100%)',
              transition: 'all 0.3s ease'
            }}
            whileHover={{ opacity: 1, filter: 'grayscale(0%)' }}
          >
            <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>Global Fab</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            style={{ 
              height: '40px',
              opacity: 0.7,
              filter: 'grayscale(100%)',
              transition: 'all 0.3s ease'
            }}
            whileHover={{ opacity: 1, filter: 'grayscale(0%)' }}
          >
            <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>TechConsult</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            style={{ 
              height: '40px',
              opacity: 0.7,
              filter: 'grayscale(100%)',
              transition: 'all 0.3s ease'
            }}
            whileHover={{ opacity: 1, filter: 'grayscale(0%)' }}
          >
            <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>MediServe</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseLogos;