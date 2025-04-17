import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  const backgroundStyle = {
    backgroundImage: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
    paddingTop: '8rem',
    paddingBottom: '5rem'
  };

  const floatingNumbers = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    value: Math.floor(Math.random() * 10),
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    size: `${Math.random() * 1 + 1}rem`,
    duration: `${Math.random() * 20 + 10}s`,
    delay: `${Math.random() * 5}s`,
    opacity: Math.random() * 0.3 + 0.1
  }));

  return (
    <section style={backgroundStyle}>
      {/* Floating numbers background */}
      {floatingNumbers.map(num => (
        <div 
          key={num.id}
          style={{
            position: 'absolute',
            left: num.x,
            top: num.y,
            fontSize: num.size,
            opacity: num.opacity,
            color: 'rgba(255, 255, 255, 0.3)',
            animation: `float ${num.duration} linear infinite`,
            animationDelay: num.delay
          }}
        >
          {num.value}
        </div>
      ))}
      
      <div className="container">
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '4rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 style={{ color: 'white', marginBottom: '1.5rem' }}>
              Business Decisions,<br />Calculated Wisely
            </h1>
            <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>
              Transform complex financials into clear business insights with our premium calculator tools.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/calculator">
                <button className="btn btn-accent">Try Demo Calculator</button>
              </Link>
              <Link to="/contact">
                <button className="btn" style={{ background: 'rgba(255, 255, 255, 0.15)', color: 'white', border: 'none' }}>
                  Book a Consultation
                </button>
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div style={{
              background: 'white',
              borderRadius: '1rem',
              boxShadow: 'var(--shadow-lg)',
              overflow: 'hidden'
            }}>
              <div style={{ padding: '1.5rem', background: 'var(--bg-light)' }}>
                <div style={{ 
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'flex-end',
                  height: '150px',
                  padding: '1rem',
                  background: 'white',
                  borderRadius: '0.5rem',
                  boxShadow: 'inset 0 0 5px rgba(0, 0, 0, 0.05)'
                }}>
                  {[60, 80, 40, 70, 90].map((height, i) => (
                    <div 
                      key={i}
                      style={{
                        width: '30px',
                        height: `${height}%`,
                        background: 'linear-gradient(180deg, var(--primary-light) 0%, var(--primary) 100%)',
                        borderRadius: '4px 4px 0 0',
                        transition: 'height 0.5s ease'
                      }}
                    />
                  ))}
                </div>
                
                <div style={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '1.5rem'
                }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: 'var(--text-light)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>ROI</div>
                    <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '1.25rem' }}>34.2%</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: 'var(--text-light)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Payback</div>
                    <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '1.25rem' }}>14 mo</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ color: 'var(--text-light)', fontSize: '0.875rem', marginBottom: '0.25rem' }}>Profit</div>
                    <div style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '1.25rem' }}>$124k</div>
                  </div>
                </div>
              </div>
              
              <div style={{ padding: '1.5rem' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-dark)' }}>Investment</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-dark)' }}>$75,000</div>
                  </div>
                  <div style={{ 
                    height: '0.375rem', 
                    background: '#e2e8f0',
                    borderRadius: '0.25rem',
                    position: 'relative'
                  }}>
                    <div style={{ 
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      height: '100%',
                      width: '70%',
                      background: 'var(--primary-light)',
                      borderRadius: '0.25rem'
                    }} />
                  </div>
                </div>
                
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-dark)' }}>Revenue</div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-dark)' }}>$27,500/mo</div>
                  </div>
                  <div style={{ 
                    height: '0.375rem', 
                    background: '#e2e8f0',
                    borderRadius: '0.25rem',
                    position: 'relative'
                  }}>
                    <div style={{ 
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      height: '100%',
                      width: '60%',
                      background: 'var(--primary-light)',
                      borderRadius: '0.25rem'
                    }} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(10deg); }
            100% { transform: translateY(0) rotate(0deg); }
          }
        `}
      </style>
    </section>
  );
};

export default Hero;
