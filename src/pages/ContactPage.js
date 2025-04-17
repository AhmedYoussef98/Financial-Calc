import React from 'react';
import { motion } from 'framer-motion';

const ContactPage = () => {
  return (
    <div style={{ paddingTop: '5rem' }}>
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
            style={{ marginBottom: '3rem' }}
          >
            <h1>Ready to Transform Your Financial Planning?</h1>
            <p style={{ 
              fontSize: '1.125rem', 
              color: 'var(--text-light)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Get in touch with our team of experts today
            </p>
          </motion.div>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem'
          }}>
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div style={{ 
                background: 'white',
                borderRadius: '0.75rem',
                padding: '2rem',
                boxShadow: 'var(--shadow)'
              }}>
                <form>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter your name" 
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        border: '1px solid #e2e8f0',
                        borderRadius: '0.375rem',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email Address</label>
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        border: '1px solid #e2e8f0',
                        borderRadius: '0.375rem',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Company Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter your company name" 
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        border: '1px solid #e2e8f0',
                        borderRadius: '0.375rem',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Industry</label>
                    <select 
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        border: '1px solid #e2e8f0',
                        borderRadius: '0.375rem',
                        fontSize: '1rem',
                        backgroundColor: 'white'
                      }}
                    >
                      <option value="">Select your industry</option>
                      <option value="cafe">Café / Restaurant</option>
                      <option value="retail">Retail</option>
                      <option value="service">Service Business</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="technology">Technology</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Message</label>
                    <textarea 
                      rows="4" 
                      placeholder="Tell us about your project or questions..." 
                      style={{
                        width: '100%',
                        padding: '0.75rem 1rem',
                        border: '1px solid #e2e8f0',
                        borderRadius: '0.375rem',
                        fontSize: '1rem',
                        resize: 'vertical'
                      }}
                      ></textarea>
                      </div>
                      
                      <button 
                        type="submit" 
                        className="btn btn-primary"
                        style={{ width: '100%' }}
                      >
                        Send Message
                      </button>
                    </form>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <div style={{ 
                    background: 'white',
                    borderRadius: '0.75rem',
                    padding: '2rem',
                    boxShadow: 'var(--shadow)',
                    marginBottom: '2rem'
                  }}>
                    <h3 style={{ marginBottom: '1.5rem' }}>Why Contact Us?</h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      <li style={{ 
                        display: 'flex', 
                        gap: '1rem',
                        marginBottom: '1.5rem'
                      }}>
                        <div style={{ 
                          fontSize: '1.5rem',
                          color: 'var(--primary)',
                          flexShrink: 0
                        }}>
                          💼
                        </div>
                        <div>
                          <h4 style={{ marginBottom: '0.5rem' }}>Expert Consultation</h4>
                          <p style={{ color: 'var(--text-light)', margin: 0 }}>
                            Our financial analysts understand your industry-specific challenges
                          </p>
                        </div>
                      </li>
                      <li style={{ 
                        display: 'flex', 
                        gap: '1rem',
                        marginBottom: '1.5rem'
                      }}>
                        <div style={{ 
                          fontSize: '1.5rem',
                          color: 'var(--primary)',
                          flexShrink: 0
                        }}>
                          💡
                        </div>
                        <div>
                          <h4 style={{ marginBottom: '0.5rem' }}>Custom Solutions</h4>
                          <p style={{ color: 'var(--text-light)', margin: 0 }}>
                            We tailor our software to match your unique business needs
                          </p>
                        </div>
                      </li>
                      <li style={{ 
                        display: 'flex', 
                        gap: '1rem'
                      }}>
                        <div style={{ 
                          fontSize: '1.5rem',
                          color: 'var(--primary)',
                          flexShrink: 0
                        }}>
                          🚀
                        </div>
                        <div>
                          <h4 style={{ marginBottom: '0.5rem' }}>Ongoing Support</h4>
                          <p style={{ color: 'var(--text-light)', margin: 0 }}>
                            We're with you every step of the way as your business grows
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div style={{ 
                    background: 'white',
                    borderRadius: '0.75rem',
                    padding: '2rem',
                    boxShadow: 'var(--shadow)'
                  }}>
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '1.5rem'
                    }}>
                      <div style={{ 
                        fontSize: '1.5rem',
                        color: 'var(--primary)',
                        flexShrink: 0
                      }}>
                        📱
                      </div>
                      <div>
                        <h4 style={{ marginBottom: '0.5rem' }}>Phone</h4>
                        <p style={{ color: 'var(--text-light)', margin: 0 }}>+1 (555) 123-4567</p>
                      </div>
                    </div>
                    
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      marginBottom: '1.5rem'
                    }}>
                      <div style={{ 
                        fontSize: '1.5rem',
                        color: 'var(--primary)',
                        flexShrink: 0
                      }}>
                        ✉️
                      </div>
                      <div>
                        <h4 style={{ marginBottom: '0.5rem' }}>Email</h4>
                        <p style={{ color: 'var(--text-light)', margin: 0 }}>info@wisecalculator.com</p>
                      </div>
                    </div>
                    
                    <div style={{ 
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem'
                    }}>
                      <div style={{ 
                        fontSize: '1.5rem',
                        color: 'var(--primary)',
                        flexShrink: 0
                      }}>
                        🏢
                      </div>
                      <div>
                        <h4 style={{ marginBottom: '0.5rem' }}>Office</h4>
                        <p style={{ color: 'var(--text-light)', margin: 0 }}>
                          123 Financial District, Suite 500<br />
                          San Francisco, CA 94111
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
          
          <section className="section" style={{ background: 'var(--bg-light)' }}>
            <div className="container text-center">
              <h2 style={{ marginBottom: '1.5rem' }}>Our Global Presence</h2>
              <p style={{ 
                color: 'var(--text-light)',
                maxWidth: '600px',
                margin: '0 auto 3rem'
              }}>
                With offices in major financial centers around the world, we're ready to serve your business wherever you are.
              </p>
              
              <div style={{ 
                background: 'white',
                borderRadius: '0.75rem',
                padding: '2rem',
                boxShadow: 'var(--shadow)',
                height: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img 
                  src="https://via.placeholder.com/800x350?text=World+Map+with+Office+Locations" 
                  alt="Global Offices Map" 
                  style={{ maxWidth: '100%', maxHeight: '100%' }}
                />
              </div>
            </div>
          </section>
        </div>
      );
    };
    
    export default ContactPage;