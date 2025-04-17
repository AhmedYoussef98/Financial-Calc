import React from 'react';
import Hero from '../components/Home/Hero';
import ValueProposition from '../components/Home/ValueProposition';
import CalculatorPreview from '../components/Home/CalculatorPreview';
import FeaturedCalculators from '../components/Home/FeaturedCalculators';
import Testimonials from '../components/Home/Testimonials';
import CTABanner from '../components/Home/CTABanner';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <ValueProposition />
      
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
      
      <FeaturedCalculators />
      <Testimonials />
      <CTABanner />
    </div>
  );
};

export default HomePage;
