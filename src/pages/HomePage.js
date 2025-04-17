import React from 'react';
import Hero from '../components/Home/Hero';
import ValueProposition from '../components/Home/ValueProposition';
import FeaturedCalculators from '../components/Home/FeaturedCalculators';
import Testimonials from '../components/Home/Testimonials';
import CTABanner from '../components/Home/CTABanner';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <ValueProposition />
      <FeaturedCalculators />
      <Testimonials />
      <CTABanner />
    </div>
  );
};

export default HomePage;