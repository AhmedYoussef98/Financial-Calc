import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PricingCard = ({ plan, isRecommended }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, boxShadow: 'var(--shadow-lg)' }}
      style={{
        background: 'white',
        borderRadius: '0.75rem',
        overflow: 'hidden',
        boxShadow: isRecommended ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        border: isRecommended ? '2px solid var(--primary)' : '1px solid #f0f0f0',
        transform: isRecommended ? 'scale(1.05)' : 'scale(1)',
        position: 'relative',
        transition: 'all 0.3s ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {isRecommended && (
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'var(--primary)',
          color: 'white',
          padding: '0.375rem 0.875rem',
          borderRadius: '1.25rem',
          fontSize: '0.75rem',
          fontWeight: 600
        }}>
          Most Popular
        </div>
      )}
      
      <div style={{ padding: '2rem', flex: 1 }}>
        <h3 style={{ marginBottom: '0.5rem' }}>{plan.name}</h3>
        <div style={{ marginBottom: '1rem' }}>
          <span style={{ 
            color: 'var(--text-dark)',
            fontSize: '0.875rem',
            marginRight: '0.25rem',
            verticalAlign: 'top'
          }}>
            $
          </span>
          <span style={{ 
            fontSize: '3rem',
            fontWeight: 700,
            color: 'var(--text-dark)'
          }}>
            {plan.price}
          </span>
        </div>
        <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem' }}>{plan.description}</p>
        
        <ul style={{ 
          listStyle: 'none',
          padding: 0,
          margin: '0 0 2rem'
        }}>
          {plan.features.map((feature, i) => (
            <li key={i} style={{ 
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      
      <div style={{ padding: '0 2rem 2rem' }}>
        <Link to="/contact" style={{ textDecoration: 'none', display: 'block' }}>
          <button className={isRecommended ? 'btn btn-primary' : 'btn btn-secondary'} style={{ 
            width: '100%'
          }}>
            Get Started
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default PricingCard;