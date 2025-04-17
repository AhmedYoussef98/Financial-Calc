import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      quote: "The custom calculator helped us identify a pricing strategy that increased our profit margin by 23% in just the first quarter.",
      name: "Sarah Johnson",
      title: "CEO",
      company: "Urban Brew Cafés",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      logoImage: "https://via.placeholder.com/120x50?text=Urban+Brew"
    },
    {
      id: 2,
      quote: "We used to spend weeks creating financial projections. Now we can test multiple scenarios in minutes and make confident decisions.",
      name: "Michael Chen",
      title: "Finance Director",
      company: "RetailPro Stores",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      logoImage: "https://via.placeholder.com/120x50?text=RetailPro"
    },
    {
      id: 3,
      quote: "Their manufacturing calculator revealed inefficiencies we'd never noticed before, saving us over $150,000 annually in production costs.",
      name: "Amira Hassan",
      title: "Operations Manager",
      company: "Global Fabrication",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      logoImage: "https://via.placeholder.com/120x50?text=Global+Fab"
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
          <h2>Success Stories</h2>
          <p style={{ 
            fontSize: '1.125rem', 
            color: 'var(--text-light)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            See how our calculators have transformed financial decision-making for businesses like yours
          </p>
        </motion.div>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -10, 
                boxShadow: 'var(--shadow-md)'
              }}
              style={{
                background: 'white',
                borderRadius: '0.75rem',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ padding: '2rem', position: 'relative', flex: 1 }}>
                <div style={{ 
                  fontSize: '3rem', 
                  color: '#e2e8f0', 
                  position: 'absolute',
                  top: '1.25rem',
                  left: '1.25rem',
                  lineHeight: 1
                }}>
                  ❝
                </div>
                <p style={{ 
                  position: 'relative',
                  zIndex: 1,
                  color: 'var(--text-dark)',
                  fontStyle: 'italic',
                  lineHeight: 1.6,
                  marginBottom: '1.25rem'
                }}>
                  {testimonial.quote}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '3rem',
                    height: '3rem',
                    borderRadius: '50%',
                    overflow: 'hidden'
                  }}>
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', margin: '0 0 0.25rem' }}>{testimonial.name}</h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-light)', margin: 0 }}>
                      {testimonial.title}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ 
                height: '3.75rem',
                padding: '0.625rem 1.875rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderTop: '1px solid #f0f0f0'
              }}>
                <img 
                  src={testimonial.logoImage} 
                  alt={testimonial.company} 
                  style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                />
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p style={{ color: 'var(--text-light)', marginBottom: '1rem' }}>
            Want to see detailed results and implementation stories?
          </p>
          <Link to="/cases" style={{ 
            color: 'var(--primary)',
            fontWeight: 600,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            View our case studies 
            <span style={{ 
              transition: 'transform 0.3s ease',
              display: 'inline-block'
            }}
              className="arrow"
            >
              →
            </span>
          </Link>
        </motion.div>
      </div>

      <style>
        {`
          .arrow {
            transition: transform 0.3s ease;
          }
          a:hover .arrow {
            transform: translateX(5px);
          }
        `}
      </style>
    </section>
  );
};

export default Testimonials;