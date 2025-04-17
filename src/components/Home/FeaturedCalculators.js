import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CalculatorPreview = ({ title, industry, description, features, image, active, onClick }) => {
  return (
    <motion.div 
      className={`calculator-preview-card ${active ? 'active' : ''}`}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      style={{
        background: 'white',
        borderRadius: '0.75rem',
        overflow: 'hidden',
        boxShadow: active ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div style={{ padding: '1.5rem' }}>
        <div style={{ 
          display: 'inline-block',
          background: 'rgba(37, 99, 235, 0.1)',
          color: 'var(--primary)',
          fontSize: '0.75rem',
          fontWeight: 600,
          padding: '0.25rem 0.625rem',
          borderRadius: '1.25rem',
          marginBottom: '0.875rem'
        }}>
          {industry}
        </div>
        <h3 style={{ marginBottom: '0.625rem' }}>{title}</h3>
        <p style={{ color: 'var(--text-light)', fontSize: '0.875rem', lineHeight: 1.5 }}>{description}</p>
      </div>
      
      <div style={{ position: 'relative', height: '200px', overflow: 'hidden', marginTop: 'auto' }}>
        <img 
          src={image || "https://via.placeholder.com/400x250?text=Calculator+Preview"} 
          alt={title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
        />
        
        {active && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(37, 99, 235, 0.9)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1.25rem',
            color: 'white',
            animation: 'fadeIn 0.3s ease'
          }}>
            <ul style={{ 
              listStyle: 'none',
              padding: 0,
              margin: '0 0 1.25rem',
              textAlign: 'center'
            }}>
              {features.map((feature, index) => (
                <li key={index} style={{ marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--accent)', marginRight: '0.25rem' }}>✓</span> {feature}
                </li>
              ))}
            </ul>
            
            <button style={{
              background: 'white',
              color: 'var(--primary)',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '0.25rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              View Details
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const FeaturedCalculators = () => {
  const [activePreview, setActivePreview] = useState(null);
  
  const calculators = [
    {
      id: 1,
      title: "Café Profitability Calculator",
      industry: "Food & Beverage",
      description: "Optimize your café's menu pricing, staff scheduling, and inventory for maximum profitability.",
      features: [
        "Menu price optimization",
        "Staff scheduling efficiency",
        "Inventory turnover analysis",
        "Break-even calculations",
        "Seating optimization"
      ],
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 2,
      title: "Retail Space ROI Analyzer",
      industry: "Retail",
      description: "Determine the optimal product mix, pricing strategy, and store layout for your retail business.",
      features: [
        "Product mix optimization",
        "Shelf space ROI analysis",
        "Pricing strategy modeling",
        "Customer flow simulation",
        "Seasonal inventory planning"
      ],
      image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 3,
      title: "Manufacturing Cost Optimizer",
      industry: "Manufacturing",
      description: "Reduce production costs while maintaining quality through advanced cost modeling.",
      features: [
        "Production line efficiency",
        "Material cost optimization",
        "Labor allocation modeling",
        "Equipment ROI analysis",
        "Make vs. buy decisions"
      ],
      image: "https://images.unsplash.com/photo-1556912998-c57cc6b63cd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    }
  ];

  return (
    <section id="calculators" className="section" style={{ background: 'white' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
          style={{ marginBottom: '3rem' }}
        >
          <h2>Featured Financial Calculators</h2>
          <p style={{ 
            fontSize: '1.125rem', 
            color: 'var(--text-light)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Explore some of our most popular industry-specific calculators
          </p>
        </motion.div>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {calculators.map(calculator => (
            <CalculatorPreview
              key={calculator.id}
              {...calculator}
              active={activePreview === calculator.id}
              onClick={() => setActivePreview(calculator.id === activePreview ? null : calculator.id)}
            />
          ))}
        </div>
        
        <div className="text-center">
          <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem' }}>
            Looking for a different industry or specialized calculator?
          </p>
          <Link to="/calculator">
            <button className="btn btn-primary">View All Calculators</button>
          </Link>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
    </section>
  );
};

export default FeaturedCalculators;