import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faUsers, faIndustry, faLightbulb } from '@fortawesome/free-solid-svg-icons';

const ValuePropositionBanner = () => {
  const valueProps = [
    {
      icon: faChartLine,
      title: 'CFO-Level Insights',
      description: 'Get executive-grade financial analysis without the six-figure salary'
    },
    {
      icon: faUsers,
      title: 'Built for Your Business',
      description: 'Tailored calculators for cafés, retail, manufacturing, and service businesses'
    },
    {
      icon: faLightbulb,
      title: 'AI-Powered Recommendations',
      description: 'Get strategic insights that turn complex data into actionable steps'
    },
    {
      icon: faIndustry,
      title: 'Industry Benchmarking',
      description: 'Compare your business against industry standards to identify opportunities'
    }
  ];

  return (
    <section className="section" style={{ background: 'white' }}>
      <div className="container">
        <div className="text-center" style={{ marginBottom: '3rem' }}>
          <h2>Why Businesses Choose WiseCalculator</h2>
          <p style={{ 
            fontSize: '1.125rem', 
            color: 'var(--text-light)',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Make confident financial decisions with our powerful suite of tools
          </p>
        </div>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          {valueProps.map((prop, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{
                background: 'var(--bg-light)',
                borderRadius: '0.75rem',
                padding: '2rem',
                boxShadow: 'var(--shadow-sm)',
                height: '100%'
              }}
            >
              <div style={{ 
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                background: 'rgba(37, 99, 235, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.5rem',
                color: 'var(--primary)'
              }}>
                <FontAwesomeIcon icon={prop.icon} size="lg" />
              </div>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>{prop.title}</h3>
              <p style={{ color: 'var(--text-light)', margin: 0 }}>{prop.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuePropositionBanner;