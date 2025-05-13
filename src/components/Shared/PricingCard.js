import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const PricingCard = ({ plan, isRecommended, billingCycle = 'monthly' }) => {
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
          {plan.price !== 'Custom' && (
            <span style={{ 
              color: 'var(--text-light)',
              fontSize: '0.875rem',
              marginLeft: '0.25rem',
              verticalAlign: 'bottom'
            }}>
              /{billingCycle === 'monthly' ? 'mo' : 'year'}
            </span>
          )}
        </div>
        <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem' }}>{plan.description}</p>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
            What's included:
          </h4>
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
                <span style={{ color: 'var(--primary)', fontSize: '0.875rem', flexShrink: 0 }}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span style={{ fontSize: '0.875rem' }}>{feature}</span>
              </li>
            ))}
          </ul>
          
          {plan.limitations && plan.limitations.length > 0 && (
            <>
              <h4 style={{ fontSize: '0.875rem', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
                Not included:
              </h4>
              <ul style={{ 
                listStyle: 'none',
                padding: 0,
                margin: '0 0 2rem'
              }}>
                {plan.limitations.map((limitation, i) => (
                  <li key={i} style={{ 
                    marginBottom: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--text-light)'
                  }}>
                    <span style={{ color: 'var(--text-light)', fontSize: '0.875rem', flexShrink: 0 }}>
                      <FontAwesomeIcon icon={faTimes} />
                    </span>
                    <span style={{ fontSize: '0.875rem' }}>{limitation}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
      
      <div style={{ padding: '0 2rem 2rem' }}>
        <Link to="/contact" style={{ textDecoration: 'none', display: 'block' }}>
          <button className={isRecommended ? 'btn btn-primary' : 'btn btn-secondary'} style={{ 
            width: '100%'
          }}>
            {plan.callToAction || 'Get Started'}
          </button>
        </Link>
        {plan.price !== 'Custom' && (
          <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', textAlign: 'center', marginTop: '0.75rem' }}>
            No credit card required
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default PricingCard;