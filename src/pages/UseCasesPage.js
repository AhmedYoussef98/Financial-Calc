import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import CTABanner from '../components/Home/CTABanner';

const UseCase = ({ title, industry, description, keyMetrics, image, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      style={{
        background: 'white',
        borderRadius: '0.75rem',
        overflow: 'hidden',
        boxShadow: 'var(--shadow)',
        display: 'flex',
        flexDirection: index % 2 === 0 ? 'row' : 'row-reverse',
        marginBottom: '3rem'
      }}
    >
      <div style={{ 
        flex: '1 1 50%',
        padding: '3rem'
      }}>
        <div style={{ 
          display: 'inline-block',
          background: 'rgba(37, 99, 235, 0.1)',
          color: 'var(--primary)',
          fontSize: '0.875rem',
          fontWeight: 600,
          padding: '0.375rem 0.75rem',
          borderRadius: '1.25rem',
          marginBottom: '1.25rem'
        }}>
          {industry}
        </div>
        
        <h2 style={{ marginBottom: '1.5rem' }}>{title}</h2>
        <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>{description}</p>
        
        <div style={{ marginBottom: '2.5rem' }}>
          <h4 style={{ marginBottom: '1rem' }}>Key Performance Metrics:</h4>
          <ul style={{ 
            listStyle: 'none',
            padding: 0
          }}>
            {keyMetrics.map((metric, i) => (
              <li key={i} style={{ 
                marginBottom: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <div style={{ 
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'var(--primary)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: '0.75rem',
                  fontWeight: 'bold'
                }}>
                  {i + 1}
                </div>
                {metric}
              </li>
            ))}
          </ul>
        </div>
        
        <Link to="/calculator">
          <button className="btn btn-primary">Try This Calculator</button>
        </Link>
      </div>
      
      <div style={{ 
        flex: '1 1 50%',
        background: `url(${image}) center/cover no-repeat`
      }}>
      </div>
    </motion.div>
  );
};

const UseCasesPage = () => {
  const useCases = [
    {
      id: 1,
      title: "Café Profitability Optimization",
      industry: "Food & Beverage",
      description: "Help café owners maximize profitability through strategic menu pricing, staff scheduling, and inventory management. Our calculator analyzes key performance indicators to recommend actionable improvements.",
      keyMetrics: [
        "Menu price optimization for maximum margin",
        "Staff scheduling efficiency based on traffic patterns",
        "Inventory turnover rate improvement",
        "Break-even period calculation",
        "Seating optimization for revenue per square foot"
      ],
      image: "https://images.unsplash.com/photo-1525610553991-2bede1a236e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 2,
      title: "Retail Space ROI Analysis",
      industry: "Retail",
      description: "Maximize retail space profitability by optimizing product placement, pricing strategies, and store layout. Our calculator helps retailers make data-driven decisions about inventory investment and space allocation.",
      keyMetrics: [
        "Product mix optimization for maximum revenue",
        "Shelf space ROI analysis by category",
        "Pricing strategy modeling with elasticity factors",
        "Customer flow simulation and optimization",
        "Seasonal inventory planning based on historical data"
      ],
      image: "https://images.unsplash.com/photo-1555529771-122e5d9f2341?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 3,
      title: "Manufacturing Cost Optimization",
      industry: "Manufacturing",
      description: "Improve manufacturing efficiency by identifying cost-saving opportunities in production processes, material usage, and labor allocation. Our calculator provides insights for streamlining operations while maintaining quality.",
      keyMetrics: [
        "Production line efficiency analysis",
        "Material cost optimization and waste reduction",
        "Labor allocation modeling across shifts",
        "Equipment ROI and replacement timing",
        "Make vs. buy decision analysis for components"
      ],
      image: "https://images.unsplash.com/photo-1533417147006-603b3d5d6fa7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      id: 4,
      title: "Real Estate Investment Analysis",
      industry: "Real Estate",
      description: "Evaluate potential real estate investments with comprehensive cash flow projections, ROI calculations, and risk assessments. Our calculator helps investors compare properties and make informed decisions.",
      keyMetrics: [
        "Cash flow projections with variable assumptions",
        "Cap rate analysis and comparison",
        "Mortgage payment optimization",
        "Renovation ROI analysis",
        "Long-term appreciation scenarios"
      ],
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    }
  ];

  return (
    <div style={{ paddingTop: '5rem' }}>
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
            style={{ marginBottom: '4rem' }}
          >
            <h1>Calculator Use Cases</h1>
            <p style={{ 
              fontSize: '1.25rem', 
              color: 'var(--text-light)',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Discover how our specialized calculators help businesses across industries make smarter financial decisions
            </p>
          </motion.div>
          
          {useCases.map((useCase, index) => (
            <UseCase 
              key={useCase.id}
              {...useCase}
              index={index}
            />
          ))}
        </div>
      </section>
      
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
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Real businesses that transformed their decision-making with our calculators
            </p>
          </motion.div>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              style={{
                background: 'white',
                borderRadius: '0.75rem',
                overflow: 'hidden',
                boxShadow: 'var(--shadow)'
              }}
            >
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <img 
                  src="https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Success Story" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ marginBottom: '1rem' }}>Urban Brew Cafés</h3>
                <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem' }}>
                  Increased profit margin by 23% within the first quarter by implementing our calculator's menu pricing and staff scheduling recommendations.
                </p>
                <Link to="/cases" style={{ 
                  color: 'var(--primary)',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  Read full case study 
                  <span className="arrow">→</span>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              style={{
                background: 'white',
                borderRadius: '0.75rem',
                overflow: 'hidden',
                boxShadow: 'var(--shadow)'
              }}
            >
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <img 
                  src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Success Story" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ marginBottom: '1rem' }}>RetailPro Stores</h3>
                <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem' }}>
                  Reduced financial planning time by 80% while increasing accuracy. Their team now tests multiple scenarios in minutes instead of weeks.
                </p>
                <Link to="/cases" style={{ 
                  color: 'var(--primary)',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  Read full case study 
                  <span className="arrow">→</span>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              style={{
                background: 'white',
                borderRadius: '0.75rem',
                overflow: 'hidden',
                boxShadow: 'var(--shadow)'
              }}
            >
              <div style={{ height: '200px', overflow: 'hidden' }}>
                <img 
                  src="https://images.unsplash.com/photo-1533417147006-603b3d5d6fa7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Success Story" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ marginBottom: '1rem' }}>Global Fabrication</h3>
                <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem' }}>
                  Saved over $150,000 annually in production costs by identifying inefficiencies in their manufacturing process previously overlooked.
                </p>
                <Link to="/cases" style={{ 
                  color: 'var(--primary)',
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  Read full case study 
                  <span className="arrow">→</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      <CTABanner />
    </div>
  );
};

export default UseCasesPage;