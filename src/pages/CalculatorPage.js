import React from 'react';
import EnhancedDashboard from '../components/Calculator/EnhancedDashboard';
import FreemiumCTA from '../components/Calculator/FreemiumCTA'; // Add this import
import CTABanner from '../components/Home/CTABanner';

const CalculatorPage = () => {
  return (
    <div style={{ paddingTop: '5rem' }}>
      <section className="section">
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <h1>Interactive Financial Dashboard</h1>
            <p style={{ 
              fontSize: '1.125rem', 
              color: 'var(--text-light)',
              maxWidth: '700px',
              margin: '1rem auto 0'
            }}>
              Experience the power of our premium financial analysis tools with this interactive dashboard
            </p>
          </div>
          
          <EnhancedDashboard />
          <FreemiumCTA /> {/* Add this component */}
        </div>
      </section>
      
      <CTABanner />
    </div>
  );
};

export default CalculatorPage;
