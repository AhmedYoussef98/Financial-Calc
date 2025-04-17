import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Cell, ResponsiveContainer, LineChart, Line
} from 'recharts';

const Calculator = () => {
  const [businessType, setBusinessType] = useState('cafe');
  const [investment, setInvestment] = useState(100000);
  const [monthlyRevenue, setMonthlyRevenue] = useState(30000);
  const [operatingCosts, setOperatingCosts] = useState(18000);
  const [results, setResults] = useState(null);
  
  const businessTypes = [
    { id: 'cafe', name: 'Café / Restaurant' },
    { id: 'retail', name: 'Retail Store' },
    { id: 'service', name: 'Service Business' },
    { id: 'manufacturing', name: 'Small Manufacturing' },
  ];

  useEffect(() => {
    calculateResults();
  }, [investment, monthlyRevenue, operatingCosts, businessType]);

  const calculateResults = () => {
    const monthlyProfit = monthlyRevenue - operatingCosts;
    const annualProfit = monthlyProfit * 12;
    const roi = (annualProfit / investment) * 100;
    const paybackPeriod = investment / monthlyProfit;
    
    let riskFactor = 1.0;
    let growthPotential = 5;
    
    switch (businessType) {
      case 'cafe':
        riskFactor = 1.2;
        growthPotential = 4;
        break;
      case 'retail':
        riskFactor = 1.1;
        growthPotential = 6;
        break;
      case 'service':
        riskFactor = 0.9;
        growthPotential = 8;
        break;
      case 'manufacturing':
        riskFactor = 1.3;
        growthPotential = 7;
        break;
      default:
        break;
    }
    
    const adjustedRoi = roi / riskFactor;
    
    const fiveYearProjection = [];
    let yearlyRevenue = monthlyRevenue * 12;
    let yearlyCosts = operatingCosts * 12;
    
    for (let year = 1; year <= 5; year++) {
      yearlyRevenue *= (1 + growthPotential / 100);
      yearlyCosts *= (1 + (growthPotential / 2) / 100);
      
      fiveYearProjection.push({
        year,
        revenue: yearlyRevenue,
        costs: yearlyCosts,
        profit: yearlyRevenue - yearlyCosts
      });
    }
    
    setResults({
      monthlyProfit,
      annualProfit,
      roi,
      adjustedRoi,
      paybackPeriod,
      fiveYearProjection
    });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const COLORS = ['#1E3A8A', '#2563EB', '#F59E0B', '#059669', '#DC2626'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="container"
      style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1.5rem' }}
    >
      <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Financial Feasibility Calculator</h1>
      
      <div style={{ 
        background: 'white',
        borderRadius: '0.75rem',
        boxShadow: 'var(--shadow)',
        overflow: 'hidden',
        marginBottom: '3rem'
      }}>
        <div style={{ padding: '2rem', borderBottom: '1px solid #f0f0f0' }}>
          <h2 style={{ marginBottom: '1.5rem' }}>Business Information</h2>
          
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 500 }}>Business Type</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {businessTypes.map(type => (
                <button 
                  key={type.id}
                  style={{
                    padding: '0.625rem 1rem',
                    background: businessType === type.id ? 'rgba(37, 99, 235, 0.1)' : '#f1f5f9',
                    border: businessType === type.id ? '2px solid var(--primary)' : '2px solid transparent',
                    borderRadius: '0.375rem',
                    cursor: 'pointer',
                    fontWeight: businessType === type.id ? 600 : 400,
                    color: businessType === type.id ? 'var(--primary)' : 'var(--text-dark)',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => setBusinessType(type.id)}
                >
                  {type.name}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 500 }}>
              Initial Investment: {formatCurrency(investment)}
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <input 
                type="range" 
                min="10000" 
                max="1000000" 
                step="10000" 
                value={investment}
                onChange={(e) => setInvestment(Number(e.target.value))}
                style={{ flex: 1 }}
              />
            </div>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 500 }}>
              Monthly Revenue: {formatCurrency(monthlyRevenue)}
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <input 
                type="range" 
                min="5000" 
                max="200000" 
                step="1000" 
                value={monthlyRevenue}
                onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
                style={{ flex: 1 }}
              />
            </div>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 500 }}>
              Monthly Operating Costs: {formatCurrency(operatingCosts)}
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <input 
                type="range" 
                min="1000" 
                max="150000" 
                step="1000" 
                value={operatingCosts}
                onChange={(e) => setOperatingCosts(Number(e.target.value))}
                style={{ flex: 1 }}
              />
            </div>
          </div>
        </div>
        
        {results && (
          <div style={{ padding: '2rem' }}>
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ marginBottom: '1rem' }}>Financial Projections</h2>
              <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>
                Based on your inputs, here's how your business could perform:
              </p>
            </div>
            
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2.5rem'
            }}>
              <div style={{ 
                background: 'var(--bg-light)',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                textAlign: 'center'
              }}>
                <h4 style={{ color: 'var(--text-light)', marginBottom: '0.625rem', fontWeight: 500 }}>Monthly Profit</h4>
                <p style={{ 
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--primary)',
                  margin: 0
                }}>
                  {formatCurrency(results.monthlyProfit)}
                </p>
              </div>
              
              <div style={{ 
                background: 'var(--bg-light)',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                textAlign: 'center'
              }}>
                <h4 style={{ color: 'var(--text-light)', marginBottom: '0.625rem', fontWeight: 500 }}>Annual Return</h4>
                <p style={{ 
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--primary)',
                  margin: 0
                }}>
                  {formatCurrency(results.annualProfit)}
                </p>
              </div>
              
              <div style={{ 
                background: 'var(--bg-light)',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                textAlign: 'center'
              }}>
                <h4 style={{ color: 'var(--text-light)', marginBottom: '0.625rem', fontWeight: 500 }}>ROI</h4>
                <p style={{ 
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--primary)',
                  margin: 0
                }}>
                  {results.roi.toFixed(1)}%
                </p>
              </div>
              
              <div style={{ 
                background: 'var(--bg-light)',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                textAlign: 'center'
              }}>
                <h4 style={{ color: 'var(--text-light)', marginBottom: '0.625rem', fontWeight: 500 }}>Payback Period</h4>
                <p style={{ 
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: 'var(--primary)',
                  margin: 0
                }}>
                  {results.paybackPeriod.toFixed(1)} months
                </p>
              </div>
            </div>
            
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))',
              gap: '2rem',
              marginBottom: '2.5rem'
            }}>
              <div>
                <h3 style={{ marginBottom: '1rem' }}>5-Year Profit Projection</h3>
                <div style={{ height: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={results.fiveYearProjection}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -5 }} />
                      <YAxis tickFormatter={(value) => `$${Math.round(value / 1000)}k`} />
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Line type="monotone" dataKey="profit" stroke="#2563EB" name="Annual Profit" strokeWidth={2} />
                      <Line type="monotone" dataKey="revenue" stroke="#059669" name="Annual Revenue" strokeWidth={2} />
                      <Line type="monotone" dataKey="costs" stroke="#DC2626" name="Annual Costs" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div>
                <h3 style={{ marginBottom: '1rem' }}>Monthly Breakdown</h3>
                <div style={{ height: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Profit', value: results.monthlyProfit },
                          { name: 'Operating Costs', value: operatingCosts }
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {[
                          { name: 'Profit', value: results.monthlyProfit },
                          { name: 'Operating Costs', value: operatingCosts }
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
            
            <div style={{ 
              background: 'rgba(37, 99, 235, 0.05)',
              borderLeft: '4px solid var(--primary)',
              padding: '1.5rem',
              borderRadius: '0 0.5rem 0.5rem 0'
            }}>
              <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>AI Insights</h3>
              <p style={{ marginBottom: '1rem' }}>
                {results.roi > 25 
                  ? `This ${businessTypes.find(t => t.id === businessType).name.toLowerCase()} shows excellent potential with a ${results.roi.toFixed(1)}% ROI. Consider scaling operations after the initial ${results.paybackPeriod.toFixed(1)} month payback period.` 
                  : results.roi > 15
                    ? `This ${businessTypes.find(t => t.id === businessType).name.toLowerCase()} shows good potential with a ${results.roi.toFixed(1)}% ROI. Focus on operational efficiencies to increase margins.`
                    : `This ${businessTypes.find(t => t.id === businessType).name.toLowerCase()} shows moderate potential with a ${results.roi.toFixed(1)}% ROI. Consider ways to increase revenue or reduce costs to improve profitability.`
                }
              </p>
              <p style={{ marginBottom: 0 }}>
                Want a more detailed analysis? <a href="/contact" style={{ color: 'var(--primary)', fontWeight: 600 }}>Contact us</a> for a custom feasibility study.
              </p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Calculator;