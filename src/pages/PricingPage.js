import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PricingCard from '../components/Shared/PricingCard';
import CTABanner from '../components/Home/CTABanner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('annually'); // 'monthly' or 'annually'
  
  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: billingCycle === 'monthly' ? '49' : '470',
      description: 'Essential tools for very small businesses and solopreneurs',
      features: [
        'Basic financial modeling',
        'Single business type',
        '3 saved scenarios',
        'Basic reports and visualizations',
        'Email support',
        'Export to PDF'
      ],
      limitations: [
        'No AI insights',
        'No scenario comparison',
        'No industry benchmarking'
      ],
      recommended: false,
      callToAction: 'Start 14-Day Free Trial'
    },
    {
      id: 'professional',
      name: 'Professional',
      price: billingCycle === 'monthly' ? '99' : '950',
      description: 'Advanced analysis for growing businesses',
      features: [
        'Advanced financial modeling',
        'All business types',
        '10 saved scenarios',
        'Scenario comparison',
        'Basic AI insights',
        'Email + chat support',
        'PDF report exports',
        'Break-even analysis'
      ],
      limitations: [
        'Limited team access',
        'No industry benchmarking'
      ],
      recommended: true,
      callToAction: 'Start 14-Day Free Trial'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: billingCycle === 'monthly' ? '199' : '1910',
      description: 'Complete solution for established SMBs and consultants',
      features: [
        'Everything in Professional',
        'Unlimited scenarios',
        'Advanced AI insights',
        'Industry benchmarking',
        'Accounting software integration',
        'Priority support',
        'Team collaboration',
        'Custom investor reports'
      ],
      limitations: [],
      recommended: false,
      callToAction: 'Start 14-Day Free Trial'
    }
  ];
  
  const enterprisePlan = {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Custom',
    description: 'Tailored solution for multi-location businesses and consultancies',
    features: [
      'Everything in Premium',
      'Multi-business management',
      'White-labeling options',
      'Custom integrations',
      'API access',
      'Onboarding training',
      'Dedicated account manager'
    ],
    recommended: false
  };

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
            <h1>Pricing Plans for Every Business Stage</h1>
            <p style={{ 
              fontSize: '1.25rem', 
              color: 'var(--text-light)',
              maxWidth: '700px',
              margin: '1rem auto 2rem'
            }}>
              Financial clarity shouldn't be expensive. Choose the plan that fits your business needs.
            </p>
            
            <div style={{ 
              display: 'inline-flex',
              background: 'var(--bg-light)',
              borderRadius: '9999px',
              padding: '0.25rem',
              marginBottom: '2rem'
            }}>
              <button
                onClick={() => setBillingCycle('monthly')}
                style={{
                  padding: '0.625rem 1.25rem',
                  borderRadius: '9999px',
                  border: 'none',
                  background: billingCycle === 'monthly' ? 'white' : 'transparent',
                  boxShadow: billingCycle === 'monthly' ? 'var(--shadow-sm)' : 'none',
                  fontWeight: billingCycle === 'monthly' ? '600' : '400',
                  cursor: 'pointer'
                }}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annually')}
                style={{
                  padding: '0.625rem 1.25rem',
                  borderRadius: '9999px',
                  border: 'none',
                  background: billingCycle === 'annually' ? 'white' : 'transparent',
                  boxShadow: billingCycle === 'annually' ? 'var(--shadow-sm)' : 'none',
                  fontWeight: billingCycle === 'annually' ? '600' : '400',
                  cursor: 'pointer',
                  position: 'relative'
                }}
              >
                Annually
                <span style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '0',
                  background: 'var(--accent)',
                  color: 'black',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '9999px',
                  whiteSpace: 'nowrap'
                }}>
                  Save 20%
                </span>
              </button>
            </div>
          </motion.div>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {plans.map(plan => (
              <PricingCard 
                key={plan.id} 
                plan={plan} 
                isRecommended={plan.recommended} 
                billingCycle={billingCycle}
              />
            ))}
          </div>
          
          <div style={{ 
            background: 'var(--bg-light)',
            borderRadius: '0.75rem',
            padding: '2.5rem',
            textAlign: 'center',
            boxShadow: 'var(--shadow-sm)',
            marginBottom: '3rem'
          }}>
            <h3 style={{ marginBottom: '1rem' }}>Need an Enterprise solution?</h3>
            <p style={{ 
              color: 'var(--text-light)',
              maxWidth: '700px',
              margin: '0 auto 1.5rem'
            }}>
              Managing multiple businesses or need custom features? Our Enterprise plan offers white-labeling, API access, and dedicated support.
            </p>
            <ul style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem',
              maxWidth: '800px',
              margin: '0 auto 2rem',
              listStyle: 'none',
              padding: 0,
              textAlign: 'left'
            }}>
              {enterprisePlan.features.map((feature, index) => (
                <li key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FontAwesomeIcon icon={faCheck} style={{ color: 'var(--success)' }} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button className="btn" style={{ 
              background: 'transparent',
              border: '2px solid var(--primary)',
              color: 'var(--primary)',
              fontWeight: 600,
              padding: '0.75rem 2rem'
            }}>
              Contact Sales for Pricing
            </button>
          </div>
          
          <div style={{ marginBottom: '3rem' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>Compare Plans</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '1px solid var(--border-light)' }}>Feature</th>
                    {plans.map(plan => (
                      <th key={plan.id} style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)', textAlign: 'center' }}>
                        {plan.name}
                      </th>
                    ))}
                    <th style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)', textAlign: 'center' }}>
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)' }}>Pricing</td>
                    {plans.map(plan => (
                      <td key={plan.id} style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)', textAlign: 'center' }}>
                        ${plan.price}{billingCycle === 'monthly' ? '/mo' : '/year'}
                      </td>
                    ))}
                    <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)', textAlign: 'center' }}>Custom</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)' }}>Business Types</td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)', textAlign: 'center' }}>1</td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)', textAlign: 'center' }}>All</td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)', textAlign: 'center' }}>All</td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)', textAlign: 'center' }}>All + Custom</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)' }}>Saved Scenarios</td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)', textAlign: 'center' }}>3</td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)', textAlign: 'center' }}>10</td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)', textAlign: 'center' }}>Unlimited</td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)', textAlign: 'center' }}>Unlimited</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)' }}>AI Insights</td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)', textAlign: 'center' }}>
                      <FontAwesomeIcon icon={faTimes} style={{ color: 'var(--error)' }} />
                    </td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)', textAlign: 'center' }}>Basic</td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)', textAlign: 'center' }}>Advanced</td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)', textAlign: 'center' }}>Advanced + Custom</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)' }}>Industry Benchmarking</td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)', textAlign: 'center' }}>
                      <FontAwesomeIcon icon={faTimes} style={{ color: 'var(--error)' }} />
                    </td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)', textAlign: 'center' }}>
                      <FontAwesomeIcon icon={faTimes} style={{ color: 'var(--error)' }} />
                    </td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)', textAlign: 'center' }}>
                      <FontAwesomeIcon icon={faCheck} style={{ color: 'var(--success)' }} />
                    </td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)', textAlign: 'center' }}>
                      <FontAwesomeIcon icon={faCheck} style={{ color: 'var(--success)' }} />
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)' }}>White Labeling</td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)', textAlign: 'center' }}>
                      <FontAwesomeIcon icon={faTimes} style={{ color: 'var(--error)' }} />
                    </td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)', textAlign: 'center' }}>
                      <FontAwesomeIcon icon={faTimes} style={{ color: 'var(--error)' }} />
                    </td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)', textAlign: 'center' }}>
                      <FontAwesomeIcon icon={faTimes} style={{ color: 'var(--error)' }} />
                    </td>
                    <td style={{ padding: '1rem', borderBottom: '1px solid var(--border-light)', textAlign: 'center' }}>
                      <FontAwesomeIcon icon={faCheck} style={{ color: 'var(--success)' }} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
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
              <h4 style={{ marginBottom: '0.75rem' }}>How does the 14-day free trial work?</h4>
              <p style={{ color: 'var(--text-light)' }}>
                You get full access to your chosen plan for 14 days with no obligation. No credit card required to start your trial. If you decide to continue, you'll only be billed after the trial period ends.
              </p>
            </div>
            
            <div style={{ 
              background: 'var(--bg-light)',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h4 style={{ marginBottom: '0.75rem' }}>Can I upgrade or downgrade my plan?</h4>
              <p style={{ color: 'var(--text-light)' }}>
                Yes! You can upgrade your plan at any time. When upgrading, we'll apply a prorated credit from your current plan to your new subscription. Downgrades take effect at the end of your current billing cycle.
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
                All plans include access to our help center and documentation. The Professional and Premium plans include personalized support from our financial experts who can help you interpret results and make strategic decisions.
              </p>
            </div>
            
            <div style={{ 
              background: 'var(--bg-light)',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h4 style={{ marginBottom: '0.75rem' }}>Is my data secure?</h4>
              <p style={{ color: 'var(--text-light)' }}>
                Absolutely. We use bank-level encryption to protect your data. We never share your information with third parties, and all data is backed up daily. Your sensitive financial information stays private and secure.
              </p>
            </div>
            
            <div style={{ 
              background: 'var(--bg-light)',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h4 style={{ marginBottom: '0.75rem' }}>Do you offer refunds?</h4>
              <p style={{ color: 'var(--text-light)' }}>
                We offer a 30-day money-back guarantee if you're not satisfied with our service. Simply contact our support team within 30 days of your purchase for a full refund.
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