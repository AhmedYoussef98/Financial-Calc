import React from 'react';
import Calculator from '../components/Calculator/Calculator';
import CTABanner from '../components/Home/CTABanner';

const CalculatorPage = () => {
  return (
    <div style={{ paddingTop: '5rem' }}>
      <Calculator />
      <CTABanner />
    </div>
  );
};

export default CalculatorPage;