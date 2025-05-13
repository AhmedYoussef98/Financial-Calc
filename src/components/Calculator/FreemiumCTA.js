import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faUnlock, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const FreemiumCTA = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{
        background: 'white',
        borderRadius: '0.75rem',
        boxShadow: 'var(--shadow)',
        padding: '1.5rem',
        margin: '2rem 0',
        border: '1px solid var(--primary-light)'
      }}
    >
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ color: 'var(--primary)', marginBottom: '0.75rem' }}>
            Unlock the Full Power of WiseCalculator
          </h3>
          <p style={{ color: 'var(--text-light)', maxWidth: '700px', margin: '0 auto' }}>
            You're using the free version. Upgrade to access advanced features and AI-powered insights.
          </p>
        </div>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          <div style={{ 
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
            padding: '1rem',
            background: 'var(--bg-light)',
            borderRadius: '0.5rem'
          }}>
            <FontAwesomeIcon icon={faClock} style={{ color: 'var(--primary)', fontSize: '1.25rem', marginTop: '0.25rem' }} />
            <div>
              <h4 style={{ fontSize: '1rem', margin: '0 0 0.5rem' }}>14-Day Free Trial</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-light)', margin: 0 }}>
                Try all premium features for 14 days at no cost.
              </p>
            </div>
          </div>
          
          <div style={{ 
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
            padding: '1rem',
            background: 'var(--bg-light)',
            borderRadius: '0.5rem'
          }}>
            <FontAwesomeIcon icon={faUnlock} style={{ color: 'var(--primary)', fontSize: '1.25rem', marginTop: '0.25rem' }} />
            <div>
              <h4 style={{ fontSize: '1rem', margin: '0 0 0.5rem' }}>No Credit Card</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-light)', margin: 0 }}>
                Start your trial with just your email – no payment info required.
              </p>
            </div>
          </div>
          
          <div style={{ 
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
            padding: '1rem',
            background: 'var(--bg-light)',
            borderRadius: '0.5rem'
          }}>
            <FontAwesomeIcon icon={faCalendarAlt} style={{ color: 'var(--primary)', fontSize: '1.25rem', marginTop: '0.25rem' }} />
            <div>
              <h4 style={{ fontSize: '1rem', margin: '0 0 0.5rem' }}>30% Early Adopter Discount</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-light)', margin: 0 }}>
                Special pricing for our first 100 customers.
              </p>
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '0.5rem' }}>
          <Link to="/pricing" style={{ textDecoration: 'none' }}>
            <button className="btn btn-primary" style={{ 
              padding: '0.75rem 2rem'
            }}>
              Start Free Trial
            </button>
          </Link>
          <Link to="/pricing" style={{ textDecoration: 'none' }}>
            <button className="btn btn-secondary" style={{ 
              padding: '0.75rem 2rem'
            }}>
              View Pricing Plans
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default FreemiumCTA;