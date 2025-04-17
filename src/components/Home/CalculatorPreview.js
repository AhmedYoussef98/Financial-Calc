import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PieChart, Pie, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const CalculatorPreview = () => {
  const [activeTab, setActiveTab] = useState('profit');
  const [animateChart, setAnimateChart] = useState(false);

  // Sample data for the charts
  const profitData = [
    { month: 'Jan', profit: 12000 },
    { month: 'Feb', profit: 14000 },
    { month: 'Mar', profit: 13000 },
    { month: 'Apr', profit: 15000 },
    { month: 'May', profit: 18000 },
    { month: 'Jun', profit: 19000 },
    { month: 'Jul', profit: 22000 },
    { month: 'Aug', profit: 21000 },
    { month: 'Sep', profit: 24000 },
    { month: 'Oct', profit: 26000 },
    { month: 'Nov', profit: 28000 },
    { month: 'Dec', profit: 30000 },
  ];
  
  const roiData = [
    { year: 1, roi: 15 },
    { year: 2, roi: 22 },
    { year: 3, roi: 28 },
    { year: 4, roi: 34 },
    { year: 5, roi: 39 },
  ];
  
  const breakdownData = [
    { name: 'Revenue', value: 420000 },
    { name: 'Costs', value: 280000 },
    { name: 'Profit', value: 140000 },
  ];
  
  const COLORS = ['#2563EB', '#0F766E', '#F59E0B'];
  
  useEffect(() => {
    // Trigger chart animation when tab changes
    setAnimateChart(false);
    const timer = setTimeout(() => setAnimateChart(true), 100);
    
    return () => clearTimeout(timer);
  }, [activeTab]);
  
  const renderChart = () => {
    switch (activeTab) {
      case 'profit':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={profitData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Line 
                type="monotone" 
                dataKey="profit" 
                stroke="#2563EB" 
                strokeWidth={3}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
                isAnimationActive={animateChart}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        );
        
      case 'roi':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={roiData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -5 }} />
              <YAxis tickFormatter={(value) => `${value}%`} />
              <Tooltip formatter={(value) => `${value}%`} />
              <Bar 
                dataKey="roi" 
                fill="#0F766E"
                isAnimationActive={animateChart}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        );
        
      case 'breakdown':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={breakdownData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                isAnimationActive={animateChart}
                animationDuration={1500}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {breakdownData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      style={{
        background: 'white',
        borderRadius: '1rem',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)',
        maxWidth: '900px',
        margin: '0 auto'
      }}
    >
      <div style={{ 
        padding: '1.5rem', 
        borderBottom: '1px solid #f0f0f0',
        background: 'var(--bg-light)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h3 style={{ margin: 0, color: 'var(--primary)' }}>Interactive Business Analysis</h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            style={{
              padding: '0.5rem 0.75rem',
              background: activeTab === 'profit' ? 'white' : 'transparent',
              border: activeTab === 'profit' ? '1px solid var(--primary)' : '1px solid #e0e0e0',
              borderRadius: '0.375rem',
              color: activeTab === 'profit' ? 'var(--primary)' : 'var(--text-dark)',
              fontSize: '0.875rem',
              fontWeight: activeTab === 'profit' ? 600 : 400,
              cursor: 'pointer'
            }}
            onClick={() => setActiveTab('profit')}
          >
            Profit Growth
          </button>
          <button 
            style={{
              padding: '0.5rem 0.75rem',
              background: activeTab === 'roi' ? 'white' : 'transparent',
              border: activeTab === 'roi' ? '1px solid var(--primary)' : '1px solid #e0e0e0',
              borderRadius: '0.375rem',
              color: activeTab === 'roi' ? 'var(--primary)' : 'var(--text-dark)',
              fontSize: '0.875rem',
              fontWeight: activeTab === 'roi' ? 600 : 400,
              cursor: 'pointer'
            }}
            onClick={() => setActiveTab('roi')}
          >
            ROI Projection
          </button>
          <button 
            style={{
              padding: '0.5rem 0.75rem',
              background: activeTab === 'breakdown' ? 'white' : 'transparent',
              border: activeTab === 'breakdown' ? '1px solid var(--primary)' : '1px solid #e0e0e0',
              borderRadius: '0.375rem',
              color: activeTab === 'breakdown' ? 'var(--primary)' : 'var(--text-dark)',
              fontSize: '0.875rem',
              fontWeight: activeTab === 'breakdown' ? 600 : 400,
              cursor: 'pointer'
            }}
            onClick={() => setActiveTab('breakdown')}
          >
            Financial Breakdown
          </button>
        </div>
      </div>
      
      <div style={{ padding: '1.5rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          {renderChart()}
        </div>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{ 
            background: 'var(--bg-light)',
            borderRadius: '0.5rem',
            padding: '1rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginBottom: '0.25rem' }}>Investment</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)' }}>$350,000</div>
          </div>
          <div style={{ 
            background: 'var(--bg-light)',
            borderRadius: '0.5rem',
            padding: '1rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginBottom: '0.25rem' }}>Payback Period</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)' }}>2.3 years</div>
          </div>
          <div style={{ 
            background: 'var(--bg-light)',
            borderRadius: '0.5rem',
            padding: '1rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginBottom: '0.25rem' }}>ROI</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)' }}>39.2%</div>
          </div>
          <div style={{ 
            background: 'var(--bg-light)',
            borderRadius: '0.5rem',
            padding: '1rem',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-light)', marginBottom: '0.25rem' }}>Risk Rating</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)' }}>3.2/10</div>
          </div>
        </div>
        
        <div style={{ 
          padding: '1rem',
          background: 'rgba(37, 99, 235, 0.05)',
          borderLeft: '4px solid var(--primary)',
          borderRadius: '0 0.5rem 0.5rem 0',
          marginBottom: '2rem'
        }}>
          <p style={{ margin: 0, fontWeight: 500 }}>
            <span style={{ color: 'var(--primary)', fontWeight: 600 }}>AI Insight:</span> This business model demonstrates strong profit potential with a 39.2% ROI and moderate risk profile. Consider optimizing inventory turnover to further improve cash flow and reduce working capital requirements.
          </p>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <Link to="/calculator">
            <button className="btn btn-primary animate-pulse" style={{ 
              padding: '0.75rem 1.5rem',
              boxShadow: 'var(--shadow)'
            }}>
              Try Full Interactive Calculator
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CalculatorPreview;
