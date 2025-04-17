import React from 'react';
import { motion } from 'framer-motion';

const ValueProposition = () => {
  const benefits = [
    {
      id: 1,
      icon: '📊',
      title: 'Clear Visualizations',
      description: 'Transform complex data into intuitive charts and graphs that make financial insights immediately visible.'
    },
    {
      id: 2,
      icon: '🔄',
      title: 'Instant Scenario Testing',
      description: 'Test multiple business scenarios with real-time results to identify the most profitable path forward.'
    },
    {
      id: 3,
      icon: '🏭',
      title: 'Industry-Specific Insights',
      description: 'Calculators tailored to your industry\'s unique metrics, benchmarks, and success factors.'
    },
    {
      id: 4,
      icon: '👨‍💼',
      title: 'Expert Support',
      description: 'Our financial experts help you interpret results and implement strategic recommendations.'
    }
  ];

  return (
    <section className="section" style={{ background: 'var(--bg-light)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
          style={{ marginBottom: '3rem' }}
        >
          <h2>What Makes Our Calculators Different</h2>
          <p style={{ 
            fontSize: '1.125rem', 
            color: 'var(--text-light)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            We don't just calculate numbers. We deliver financial clarity and confidence.
          </p>
        </motion.div>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem'
        }}>
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10, 
                boxShadow: 'var(--shadow-md)',
                background: 'linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)' 
              }}
              style={{
                background: 'white',
                borderRadius: '0.75rem',
                padding: '2rem',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{benefit.icon}</div>
              <h3 style={{ marginBottom: '1rem' }}>{benefit.title}</h3>
              <p style={{ color: 'var(--text-light)' }}>{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
