import React from 'react';
import { motion } from 'framer-motion';
import PricingCard from '../components/Shared/PricingCard';
import CTABanner from '../components/Home/CTABanner';

const PricingPage = () => {
  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '499',
      description: 'Essential tools for small businesses',
      features: [
        'Simple financial model',
        'Basic revenue and cost projections',
        'Break-even analysis',
        'Basic reporting',
        '30-day support'
      ],
      recommended: false
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '999',
      description: 'Advanced analysis for growing businesses',
      features: [
        'Comprehensive financial model',
        'Detailed cash flow projections',
        'Multiple scenario analysis',
        'Interactive dashboards',
        'ROI and NPV calculations',
        '90-day support and training'
      ],
      recommended: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '2499',
      description: 'Complete solution for complex business needs',
      features: [
        'Custom industry-specific models',
        'Advanced sensitivity analysis',
        'Multi-year projections',
        'Integration with existing systems',
        'Executive report generation',
        'Dedicated support representative',
        'Unlimited updates for 1 year'
      ],
      recommended: false
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
            style={{ marginBottom: '3rem' }}
          >
            <h1>Simple, Transparent Pricing</h1>
            <p style={{ 
              fontSize: '1.125rem', 
              color: 'var(--text-light)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Choose the plan that fits your business needs
            </p>
          </motion.div>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {plans.map(plan => (
              <PricingCard key={plan.id} plan={plan} isRecommended={plan.recommended} />
            ))}
          </div>
          
          <div style={{ 
            background: 'var(--bg-light)',
            borderRadius: '0.75rem',
            padding: '2.5rem',
            textAlign: 'center',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <h3 style={{ marginBottom: '1rem' }}>Need a custom solution?</h3>
            <p style={{ 
              color: 'var(--text-light)',
              maxWidth: '600px',
              margin: '0 auto 1.5rem'
            }}>
              Contact us to discuss your specific requirements and get a tailored quote.
            </p>
            <button className="btn" style={{ 
              background: 'transparent',
              border: '2px solid var(--primary)',
              color: 'var(--primary)',
              fontWeight: 600
            }}>
              Contact Sales
            </button>
          </div>
        </div>
      </section>
      
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
            style={{ marginBottom: '3rem' }}
          >
            <h2>Frequently Asked Questions</h2>
            <p style={{ 
              fontSize: '1.125rem', 
              color: 'var(--text-light)',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Everything you need to know about our calculators
            </p>
          </motion.div>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{ 
              background: 'var(--bg-light)',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h4 style={{ marginBottom: '0.75rem' }}>How are the calculators customized for my business?</h4>
              <p style={{ color: 'var(--text-light)' }}>
                Our expert team works closely with you to understand your unique business requirements and industry benchmarks. We then tailor our calculator models to incorporate your specific variables, constraints, and goals.
              </p>
            </div>
            
            <div style={{ 
              background: 'var(--bg-light)',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h4 style={{ marginBottom: '0.75rem' }}>Can I upgrade my plan later?</h4>
              <p style={{ color: 'var(--text-light)' }}>
                Absolutely! You can upgrade your plan at any time as your business grows and your needs evolve. We'll apply a prorated credit from your current plan to your new subscription.
              </p>
            </div>
            
            <div style={{ 
              background: 'var(--bg-light)',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h4 style={{ marginBottom: '0.75rem' }}>What kind of support is included?</h4>
              <p style={{ color: 'var(--text-light)' }}>
                All plans include access to our help center and documentation. The Professional and Enterprise plans include personalized support from our financial experts who can help you interpret results and make strategic decisions.
              </p>
            </div>
            
            <div style={{ 
              background: 'var(--bg-light)',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h4 style={{ marginBottom: '0.75rem' }}>How accurate are the calculator predictions?</h4>
              <p style={{ color: 'var(--text-light)' }}>
                Our calculators use industry-standard financial modeling techniques and are regularly updated with current market data. While no prediction is perfect, our models provide reliable projections for informed decision-making.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <CTABanner />
    </div>
  );
};

export default PricingPage;