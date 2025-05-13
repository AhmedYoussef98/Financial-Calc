import React from 'react';
import Hero from '../components/Home/Hero';
import ValueProposition from '../components/Home/ValueProposition';
import CalculatorPreview from '../components/Home/CalculatorPreview';
import FeaturedCalculators from '../components/Home/FeaturedCalculators';
import Testimonials from '../components/Home/Testimonials';
import CTABanner from '../components/Home/CTABanner';
import { Link } from 'react-router-dom';
import ValuePropositionBanner from '../components/Home/ValuePropositionBanner'; // Add this import
import EnterpriseLogos from '../components/Home/EnterpriseLogos';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <EnterpriseLogos />
      <ValueProposition />
      <ValuePropositionBanner /> {/* Add this component */}
      
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <h2>Experience Our Interactive Calculator</h2>
            <p style={{ 
              fontSize: '1.125rem', 
              color: 'var(--text-light)',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              See how our powerful tools transform complex financial data into clear business insights
            </p>
          </div>
          
          <CalculatorPreview />
        </div>
      </section>

      {/* Add Free Trial CTA Section */}
      <section className="section" style={{ background: 'var(--bg-light)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <h2>Start Making Better Financial Decisions Today</h2>
            <p style={{ 
              fontSize: '1.125rem', 
              color: 'var(--text-light)',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Try WiseCalculator free for 14 days. No credit card required.
            </p>
          </div>
          
          <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
            marginBottom: '3rem'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '0.75rem',
              padding: '2rem',
              boxShadow: 'var(--shadow)',
              maxWidth: '400px',
              textAlign: 'center'
            }}>
              <h3 style={{ marginBottom: '1rem' }}>Free 14-Day Trial</h3>
              <p style={{ marginBottom: '1.5rem', color: 'var(--text-light)' }}>
                Full access to all features with no commitments. Start making better financial decisions today.
              </p>
              <Link to="/calculator">
                <button className="btn btn-primary">
                  Start Free Trial
                </button>
              </Link>
            </div>
            
            <div style={{
              background: 'white',
              borderRadius: '0.75rem',
              padding: '2rem',
              boxShadow: 'var(--shadow)',
              maxWidth: '400px',
              textAlign: 'center'
            }}>
              <h3 style={{ marginBottom: '1rem' }}>Early Adopter Discount</h3>
              <p style={{ marginBottom: '1.5rem', color: 'var(--text-light)' }}>
                Get 30% off for life as one of our first 100 customers. Limited-time offer.
              </p>
              <Link to="/pricing">
                <button className="btn btn-secondary">
                  View Pricing Plans
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FeaturedCalculators />
      <Testimonials />
      <CTABanner />
    </div>
  );
};

export default HomePage;
