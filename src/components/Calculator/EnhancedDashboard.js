import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../../styles/themes/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartLine, faChartPie, faMoneyBillWave, faChartArea,
  faBrain, faFilePdf, faCloudDownloadAlt, faCog, faLightbulb,
  faHistory, faSyncAlt, faClock, faChartBar, faDollarSign,
  faPiggyBank, faProjectDiagram, faRocket, faBalanceScale,
  faCalculator
} from '@fortawesome/free-solid-svg-icons';
import CalculatorSidebar from './CalculatorSidebar';

// Dashboard content component
const DashboardContent = () => (
  <>
    <div className="metrics-grid" style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '1rem',
      marginBottom: '1.5rem'
    }}>
      <div className="metric-card" style={{
        background: 'var(--background-card, white)',
        borderRadius: '0.75rem',
        boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
        padding: '1.25rem',
        transition: 'all 0.3s ease'
      }}>
        <div className="metric-icon" style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          color: 'var(--primary-main, #3B82F6)'
        }}>
          <FontAwesomeIcon icon={faMoneyBillWave} size="lg" />
        </div>
        <div className="metric-label" style={{
          fontSize: '0.875rem',
          color: 'var(--text-secondary, #6B7280)',
          margin: 0
        }}>Monthly Revenue</div>
        <h3 className="metric-value" style={{
          fontSize: '1.75rem',
          fontWeight: 700,
          margin: '0.5rem 0',
          color: 'var(--text-primary, #111827)'
        }}>$32,500</h3>
        <div className="metric-change" style={{
          fontSize: '0.875rem',
          fontWeight: 600,
          color: 'var(--success, #10B981)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem'
        }}>
          <FontAwesomeIcon icon={faChartLine} />
          +12.4% vs last month
        </div>
      </div>
      
      <div className="metric-card" style={{
        background: 'var(--background-card, white)',
        borderRadius: '0.75rem',
        boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
        padding: '1.25rem',
        transition: 'all 0.3s ease'
      }}>
        <div className="metric-icon" style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          color: 'var(--secondary-main, #10B981)'
        }}>
          <FontAwesomeIcon icon={faChartPie} size="lg" />
        </div>
        <div className="metric-label" style={{
          fontSize: '0.875rem',
          color: 'var(--text-secondary, #6B7280)',
          margin: 0
        }}>Profit Margin</div>
        <h3 className="metric-value" style={{
          fontSize: '1.75rem',
          fontWeight: 700,
          margin: '0.5rem 0',
          color: 'var(--text-primary, #111827)'
        }}>24.8%</h3>
        <div className="metric-change" style={{
          fontSize: '0.875rem',
          fontWeight: 600,
          color: 'var(--success, #10B981)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem'
        }}>
          <FontAwesomeIcon icon={faChartLine} />
          +3.2% vs last month
        </div>
      </div>
      
      <div className="metric-card" style={{
        background: 'var(--background-card, white)',
        borderRadius: '0.75rem',
        boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
        padding: '1.25rem',
        transition: 'all 0.3s ease'
      }}>
        <div className="metric-icon" style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          color: 'var(--accent-main, #F59E0B)'
        }}>
          <FontAwesomeIcon icon={faChartLine} size="lg" />
        </div>
        <div className="metric-label" style={{
          fontSize: '0.875rem',
          color: 'var(--text-secondary, #6B7280)',
          margin: 0
        }}>ROI</div>
        <h3 className="metric-value" style={{
          fontSize: '1.75rem',
          fontWeight: 700,
          margin: '0.5rem 0',
          color: 'var(--text-primary, #111827)'
        }}>32.5%</h3>
        <div className="metric-change" style={{
          fontSize: '0.875rem',
          fontWeight: 600,
          color: 'var(--success, #10B981)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem'
        }}>
          <FontAwesomeIcon icon={faChartLine} />
          Industry avg: 22.3%
        </div>
      </div>
      
      <div className="metric-card" style={{
        background: 'var(--background-card, white)',
        borderRadius: '0.75rem',
        boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
        padding: '1.25rem',
        transition: 'all 0.3s ease'
      }}>
        <div className="metric-icon" style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1rem',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          color: 'var(--secondary-main, #10B981)'
        }}>
          <FontAwesomeIcon icon={faClock} size="lg" />
        </div>
        <div className="metric-label" style={{
          fontSize: '0.875rem',
          color: 'var(--text-secondary, #6B7280)',
          margin: 0
        }}>Payback Period</div>
        <h3 className="metric-value" style={{
          fontSize: '1.75rem',
          fontWeight: 700,
          margin: '0.5rem 0',
          color: 'var(--text-primary, #111827)'
        }}>14 months</h3>
        <div className="metric-change" style={{
          fontSize: '0.875rem',
          fontWeight: 600,
          color: 'var(--success, #10B981)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem'
        }}>
          <FontAwesomeIcon icon={faChartLine} />
          Industry avg: 18 months
        </div>
      </div>
    </div>
    
    <div className="chart-container" style={{
      background: 'var(--background-card, white)',
      borderRadius: '0.75rem',
      boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
      marginBottom: '1.5rem',
      height: '400px',
      overflow: 'hidden'
    }}>
      <div className="chart-header" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 1.5rem',
        borderBottom: '1px solid var(--border-light, #E5E7EB)'
      }}>
        <h3 className="chart-title" style={{
          margin: 0,
          fontSize: '1.125rem',
          fontWeight: 600
        }}>Financial Projections</h3>
        <div className="chart-controls" style={{
          display: 'flex',
          gap: '0.5rem'
        }}>
          <button style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 0.75rem',
            background: 'transparent',
            border: '1px solid var(--border-main, #D1D5DB)',
            borderRadius: '0.375rem',
            color: 'var(--text-primary, #111827)',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}>
            <FontAwesomeIcon icon={faSyncAlt} />
            Refresh
          </button>
          <button style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 0.75rem',
            background: 'transparent',
            border: '1px solid var(--border-main, #D1D5DB)',
            borderRadius: '0.375rem',
            color: 'var(--text-primary, #111827)',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}>
            <FontAwesomeIcon icon={faHistory} />
            History
          </button>
        </div>
      </div>
      <div className="chart-content" style={{
        padding: '1.5rem',
        height: 'calc(400px - 70px)'
      }}>
        <div style={{ 
          height: '100%', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          color: 'var(--text-secondary, #6B7280)'
        }}>
          Interactive chart will be rendered here
        </div>
      </div>
    </div>
    
    <div className="insights-container" style={{
      background: 'var(--background-card, white)',
      borderRadius: '0.75rem',
      boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
      marginBottom: '1.5rem',
      overflow: 'hidden'
    }}>
      <div className="insights-header" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 1.5rem',
        borderBottom: '1px solid var(--border-light, #E5E7EB)'
      }}>
        <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 600 }}>
          AI-Powered Insights
        </h3>
        <button style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 0.75rem',
          background: 'var(--secondary-main, #10B981)',
          color: 'white',
          border: 'none',
          borderRadius: '0.375rem',
          fontSize: '0.875rem',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}>
          <FontAwesomeIcon icon={faBrain} />
          Generate New Insights
        </button>
      </div>
      <div className="insights-content" style={{ padding: '1.5rem' }}>
        <div className="insights-list" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1rem',
          padding: '0.5rem'
        }}>
          <div className="insight-item" style={{
            padding: '1rem',
            borderRadius: '0.5rem',
            backgroundColor: 'rgba(59, 130, 246, 0.05)',
            borderLeft: '4px solid var(--primary-main, #3B82F6)',
            transition: 'all 0.2s ease'
          }}>
            <h4 style={{
              margin: '0 0 0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--primary-dark, #2563EB)'
            }}>
              <FontAwesomeIcon icon={faMoneyBillWave} />
              Profit Optimization
            </h4>
            <p style={{
              margin: 0,
              fontSize: '0.9375rem',
              color: 'var(--text-secondary, #6B7280)'
            }}>
              Increasing your average ticket price by 8% could improve profit margins by 14.3%.
            </p>
          </div>
          
          <div className="insight-item" style={{
            padding: '1rem',
            borderRadius: '0.5rem',
            backgroundColor: 'rgba(59, 130, 246, 0.05)',
            borderLeft: '4px solid var(--primary-main, #3B82F6)',
            transition: 'all 0.2s ease'
          }}>
            <h4 style={{
              margin: '0 0 0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--primary-dark, #2563EB)'
            }}>
              <FontAwesomeIcon icon={faClock} />
              Break-even Analysis
            </h4>
            <p style={{
              margin: 0,
              fontSize: '0.9375rem',
              color: 'var(--text-secondary, #6B7280)'
            }}>
              Your business is projected to break even in 14 months, which is better than the industry average of 18-24 months.
            </p>
          </div>
          
          <div className="insight-item" style={{
            padding: '1rem',
            borderRadius: '0.5rem',
            backgroundColor: 'rgba(59, 130, 246, 0.05)',
            borderLeft: '4px solid var(--primary-main, #3B82F6)',
            transition: 'all 0.2s ease'
          }}>
            <h4 style={{
              margin: '0 0 0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--primary-dark, #2563EB)'
            }}>
              <FontAwesomeIcon icon={faChartLine} />
              Risk Assessment
            </h4>
            <p style={{
              margin: 0,
              fontSize: '0.9375rem',
              color: 'var(--text-secondary, #6B7280)'
            }}>
              Your current debt-to-income ratio is 1.6, which is within safe parameters but could be improved to enhance financial stability.
            </p>
          </div>
          
          <div className="insight-item" style={{
            padding: '1rem',
            borderRadius: '0.5rem',
            backgroundColor: 'rgba(59, 130, 246, 0.05)',
            borderLeft: '4px solid var(--primary-main, #3B82F6)',
            transition: 'all 0.2s ease'
          }}>
            <h4 style={{
              margin: '0 0 0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--primary-dark, #2563EB)'
            }}>
              <FontAwesomeIcon icon={faChartArea} />
              Cash Flow Management
            </h4>
            <p style={{
              margin: 0,
              fontSize: '0.9375rem',
              color: 'var(--text-secondary, #6B7280)'
            }}>
              Consider establishing a 3-month operating expense reserve to weather potential market fluctuations and seasonal variations.
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
);

// Revenue content component
const RevenueContent = () => (
  <div style={{ padding: '1rem' }}>
    <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-main, #3B82F6)' }}>
      <FontAwesomeIcon icon={faMoneyBillWave} style={{ marginRight: '0.75rem' }} />
      Revenue Analysis
    </h2>
    
    <div style={{
      background: 'var(--background-card, white)',
      borderRadius: '0.75rem',
      boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
      padding: '1.5rem',
      marginBottom: '1.5rem'
    }}>
      <h3 style={{ marginBottom: '1rem' }}>Revenue Streams</h3>
      
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: 'var(--bg-light, #F8FAFC)',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          border: '1px solid var(--border-light, #E5E7EB)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: 'rgba(59, 130, 246, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary-main, #3B82F6)'
            }}>
              <FontAwesomeIcon icon={faDollarSign} />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1rem' }}>Product Sales</h4>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary, #6B7280)' }}>
                Primary revenue stream
              </p>
            </div>
          </div>
          
          <div style={{ marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary, #6B7280)' }}>
                Monthly Revenue
              </span>
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                $24,500
              </span>
            </div>
            <div style={{ 
              width: '100%',
              height: '8px',
              background: 'var(--border-light, #E5E7EB)',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{ 
                width: '75%',
                height: '100%',
                background: 'var(--primary-main, #3B82F6)',
                borderRadius: '4px'
              }}></div>
            </div>
          </div>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary, #6B7280)' }}>
                Growth (MoM)
              </span>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--success, #10B981)' }}>
                +8.2%
              </span>
            </div>
          </div>
        </div>
        
        <div style={{
          background: 'var(--bg-light, #F8FAFC)',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          border: '1px solid var(--border-light, #E5E7EB)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: 'rgba(16, 185, 129, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--secondary-main, #10B981)'
            }}>
              <FontAwesomeIcon icon={faCalculator} />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1rem' }}>Services</h4>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary, #6B7280)' }}>
                Secondary revenue stream
              </p>
            </div>
          </div>
          
          <div style={{ marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary, #6B7280)' }}>
                Monthly Revenue
              </span>
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                $8,000
              </span>
            </div>
            <div style={{ 
              width: '100%',
              height: '8px',
              background: 'var(--border-light, #E5E7EB)',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{ 
                width: '25%',
                height: '100%',
                background: 'var(--secondary-main, #10B981)',
                borderRadius: '4px'
              }}></div>
            </div>
          </div>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary, #6B7280)' }}>
                Growth (MoM)
              </span>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--success, #10B981)' }}>
                +12.5%
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ 
        height: '300px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        color: 'var(--text-secondary, #6B7280)',
        background: 'var(--bg-light, #F8FAFC)',
        border: '1px solid var(--border-light, #E5E7EB)',
        borderRadius: '0.5rem'
      }}>
        Revenue trend chart will be displayed here
      </div>
    </div>
    
    <div style={{
      background: 'var(--background-card, white)',
      borderRadius: '0.75rem',
      boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
      padding: '1.5rem',
      marginBottom: '1.5rem'
    }}>
      <h3 style={{ marginBottom: '1rem' }}>Revenue Optimization</h3>
      
      <div style={{
        background: 'rgba(59, 130, 246, 0.05)',
        borderLeft: '4px solid var(--primary-main, #3B82F6)',
        padding: '1rem',
        borderRadius: '0 0.5rem 0.5rem 0',
        marginBottom: '1.5rem'
      }}>
        <h4 style={{ margin: '0 0 0.5rem', color: 'var(--primary-dark, #2563EB)' }}>AI Recommendation</h4>
        <p style={{ margin: 0, color: 'var(--text-secondary, #6B7280)' }}>
          Increasing your product pricing by 5% while bundling with services could increase overall revenue by up to 12% with minimal impact on customer acquisition.
        </p>
      </div>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem'
      }}>
        <div style={{
          padding: '1rem',
          background: 'var(--bg-light, #F8FAFC)',
          borderRadius: '0.5rem',
          border: '1px solid var(--border-light, #E5E7EB)'
        }}>
          <h4 style={{ margin: '0 0 0.75rem', fontSize: '1rem' }}>Upselling Opportunity</h4>
          <p style={{ margin: '0 0 0.75rem', fontSize: '0.875rem', color: 'var(--text-secondary, #6B7280)' }}>
            Customers who purchase product A are 64% more likely to purchase product B within 30 days.
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary, #6B7280)' }}>Conversion Rate</span>
            <span style={{ fontWeight: 600, color: 'var(--primary-main, #3B82F6)' }}>64%</span>
          </div>
        </div>
        
        <div style={{
          padding: '1rem',
          background: 'var(--bg-light, #F8FAFC)',
          borderRadius: '0.5rem',
          border: '1px solid var(--border-light, #E5E7EB)'
        }}>
          <h4 style={{ margin: '0 0 0.75rem', fontSize: '1rem' }}>Pricing Elasticity</h4>
          <p style={{ margin: '0 0 0.75rem', fontSize: '0.875rem', color: 'var(--text-secondary, #6B7280)' }}>
            Based on historical data, a 10% price increase results in only a 3% decrease in volume.
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary, #6B7280)' }}>Elasticity Coefficient</span>
            <span style={{ fontWeight: 600, color: 'var(--primary-main, #3B82F6)' }}>0.3</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Expenses content component
const ExpensesContent = () => (
  <div style={{ padding: '1rem' }}>
    <h2 style={{ marginBottom: '1.5rem', color: 'var(--secondary-main, #10B981)' }}>
      <FontAwesomeIcon icon={faChartBar} style={{ marginRight: '0.75rem' }} />
      Expense Analysis
    </h2>
    
    <div style={{
      background: 'var(--background-card, white)',
      borderRadius: '0.75rem',
      boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
      padding: '1.5rem',
      marginBottom: '1.5rem'
    }}>
      <h3 style={{ marginBottom: '1rem' }}>Expense Breakdown</h3>
      
      <div style={{ 
        height: '300px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        color: 'var(--text-secondary, #6B7280)',
        background: 'var(--bg-light, #F8FAFC)',
        border: '1px solid var(--border-light, #E5E7EB)',
        borderRadius: '0.5rem',
        marginBottom: '2rem'
      }}>
        Expense breakdown pie chart will be displayed here
      </div>
      
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem'
      }}>
        <div style={{
          background: 'var(--bg-light, #F8FAFC)',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          border: '1px solid var(--border-light, #E5E7EB)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: 'rgba(239, 68, 68, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--error, #EF4444)'
            }}>
              <FontAwesomeIcon icon={faMoneyBillWave} />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1rem' }}>Operating Expenses</h4>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary, #6B7280)' }}>
                Monthly total
              </p>
            </div>
          </div>
          
          <div style={{ 
            fontSize: '1.5rem', 
            fontWeight: 700, 
            marginBottom: '1rem',
            color: 'var(--text-primary, #111827)'
          }}>
            $18,000
          </div>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary, #6B7280)' }}>vs Previous Month</span>
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--error, #EF4444)' }}>+3.2%</span>
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary, #6B7280)' }}>
              Increase primarily due to seasonal utility costs
            </div>
          </div>
        </div>
        
        <div style={{
          background: 'var(--bg-light, #F8FAFC)',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          border: '1px solid var(--border-light, #E5E7EB)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: 'rgba(245, 158, 11, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--warning, #F59E0B)'
            }}>
              <FontAwesomeIcon icon={faPiggyBank} />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '1rem' }}>Expense to Revenue Ratio</h4>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary, #6B7280)' }}>
                Current performance
              </p>
            </div>
          </div>
          
          <div style={{ 
            fontSize: '1.5rem', 
            fontWeight: 700, 
            marginBottom: '1rem',
            color: 'var(--text-primary, #111827)'
          }}>
            58%
          </div>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary, #6B7280)' }}>Industry Average</span>
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>62%</span>
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--success, #10B981)' }}>
              Better than industry benchmark by 4%
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div style={{
      background: 'var(--background-card, white)',
      borderRadius: '0.75rem',
      boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
      padding: '1.5rem'
    }}>
      <h3 style={{ marginBottom: '1rem' }}>Cost Optimization Opportunities</h3>
      
      <div style={{
        background: 'rgba(16, 185, 129, 0.05)',
        borderLeft: '4px solid var(--secondary-main, #10B981)',
        padding: '1rem',
        borderRadius: '0 0.5rem 0.5rem 0',
        marginBottom: '1.5rem'
      }}>
        <h4 style={{ margin: '0 0 0.5rem', color: 'var(--secondary-main, #10B981)' }}>AI Recommendation</h4>
        <p style={{ margin: 0, color: 'var(--text-secondary, #6B7280)' }}>
          Consolidating vendors for office supplies could save approximately $850 per month (15% reduction in this category).
        </p>
      </div>
      
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '0.875rem'
      }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border-light, #E5E7EB)' }}>
            <th style={{ textAlign: 'left', padding: '0.75rem' }}>Expense Category</th>
            <th style={{ textAlign: 'right', padding: '0.75rem' }}>Current Monthly</th>
            <th style={{ textAlign: 'right', padding: '0.75rem' }}>Potential Savings</th>
            <th style={{ textAlign: 'right', padding: '0.75rem' }}>Optimization Strategy</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid var(--border-light, #E5E7EB)' }}>
            <td style={{ padding: '0.75rem' }}>Office Supplies</td>
            <td style={{ padding: '0.75rem', textAlign: 'right' }}>$5,600</td>
            <td style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--success, #10B981)' }}>$850</td>
            <td style={{ padding: '0.75rem', textAlign: 'right' }}>Vendor consolidation</td>
          </tr>
          <tr style={{ borderBottom: '1px solid var(--border-light, #E5E7EB)' }}>
            <td style={{ padding: '0.75rem' }}>Utilities</td>
            <td style={{ padding: '0.75rem', textAlign: 'right' }}>$2,800</td>
            <td style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--success, #10B981)' }}>$420</td>
            <td style={{ padding: '0.75rem', textAlign: 'right' }}>Energy efficiency upgrade</td>
          </tr>
          <tr style={{ borderBottom: '1px solid var(--border-light, #E5E7EB)' }}>
            <td style={{ padding: '0.75rem' }}>Marketing</td>
            <td style={{ padding: '0.75rem', textAlign: 'right' }}>$4,200</td>
            <td style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--success, #10B981)' }}>$630</td>
            <td style={{ padding: '0.75rem', textAlign: 'right' }}>Channel optimization</td>
          </tr>
          <tr>
            <td style={{ padding: '0.75rem' }}>Software Subscriptions</td>
            <td style={{ padding: '0.75rem', textAlign: 'right' }}>$1,200</td>
            <td style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--success, #10B981)' }}>$350</td>
            <td style={{ padding: '0.75rem', textAlign: 'right' }}>Consolidate licenses</td>
          </tr>
        </tbody>
        <tfoot>
          <tr style={{ borderTop: '2px solid var(--border-light, #E5E7EB)', fontWeight: 600 }}>
            <td style={{ padding: '0.75rem' }}>Total Potential Savings</td>
            <td style={{ padding: '0.75rem', textAlign: 'right' }}></td>
            <td style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--success, #10B981)' }}>$2,250</td>
            <td style={{ padding: '0.75rem', textAlign: 'right' }}></td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
);

// Projections content component
const ProjectionsContent = () => (
  <div style={{ padding: '1rem' }}>
    <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-main, #3B82F6)' }}>
      <FontAwesomeIcon icon={faChartLine} style={{ marginRight: '0.75rem' }} />
      Financial Projections
    </h2>
    
    <div style={{
      background: 'var(--background-card, white)',
      borderRadius: '0.75rem',
      boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
      padding: '1.5rem',
      marginBottom: '1.5rem'
    }}>
      <h3 style={{ marginBottom: '1rem' }}>5-Year Projections</h3>
      
      <div style={{ 
        height: '400px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        color: 'var(--text-secondary, #6B7280)',
        background: 'var(--bg-light, #F8FAFC)',
        border: '1px solid var(--border-light, #E5E7EB)',
        borderRadius: '0.5rem',
        marginBottom: '2rem'
      }}>
        5-year financial projection chart will be displayed here
      </div>
      
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem'
      }}>
        <div style={{
          background: 'var(--bg-light, #F8FAFC)',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          border: '1px solid var(--border-light, #E5E7EB)'
        }}>
          <h4 style={{ margin: '0 0 1rem', fontSize: '1rem' }}>Revenue Projection</h4>
          <div style={{ 
            fontSize: '1.5rem', 
            fontWeight: 700, 
            marginBottom: '0.5rem',
            color: 'var(--primary-main, #3B82F6)'
          }}>
            $2.4M
          </div>
          <p style={{ margin: '0', fontSize: '0.875rem', color: 'var(--text-secondary, #6B7280)' }}>
            Cumulative 5-year revenue
          </p>
        </div>
        
        <div style={{
          background: 'var(--bg-light, #F8FAFC)',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          border: '1px solid var(--border-light, #E5E7EB)'
        }}>
          <h4 style={{ margin: '0 0 1rem', fontSize: '1rem' }}>Profit Projection</h4>
          <div style={{ 
            fontSize: '1.5rem', 
            fontWeight: 700, 
            marginBottom: '0.5rem',
            color: 'var(--secondary-main, #10B981)'
          }}>
            $620K
          </div>
          <p style={{ margin: '0', fontSize: '0.875rem', color: 'var(--text-secondary, #6B7280)' }}>
            Cumulative 5-year profit
          </p>
        </div>
        
        <div style={{
          background: 'var(--bg-light, #F8FAFC)',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          border: '1px solid var(--border-light, #E5E7EB)'
        }}>
          <h4 style={{ margin: '0 0 1rem', fontSize: '1rem' }}>Growth Rate</h4>
          <div style={{ 
            fontSize: '1.5rem', 
            fontWeight: 700, 
            marginBottom: '0.5rem',
            color: 'var(--accent-main, #F59E0B)'
          }}>
            14.2%
          </div>
          <p style={{ margin: '0', fontSize: '0.875rem', color: 'var(--text-secondary, #6B7280)' }}>
            Compound annual growth rate
          </p>
        </div>
        
        <div style={{
          background: 'var(--bg-light, #F8FAFC)',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          border: '1px solid var(--border-light, #E5E7EB)'
        }}>
          <h4 style={{ margin: '0 0 1rem', fontSize: '1rem' }}>Final Year ROI</h4>
          <div style={{ 
            fontSize: '1.5rem', 
            fontWeight: 700, 
            marginBottom: '0.5rem',
            color: 'var(--primary-dark, #2563EB)'
          }}>
            42.5%
          </div>
          <p style={{ margin: '0', fontSize: '0.875rem', color: 'var(--text-secondary, #6B7280)' }}>
            Year 5 return on investment
          </p>
        </div>
      </div>
    </div>
    
    <div style={{
      background: 'var(--background-card, white)',
      borderRadius: '0.75rem',
      boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
      padding: '1.5rem',
      marginBottom: '1.5rem'
    }}>
      <h3 style={{ marginBottom: '1rem' }}>Sensitivity Analysis</h3>
      
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '0.875rem',
        marginBottom: '1.5rem'
      }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border-light, #E5E7EB)' }}>
            <th style={{ textAlign: 'left', padding: '0.75rem' }}>Scenario</th>
            <th style={{ textAlign: 'right', padding: '0.75rem' }}>Revenue Impact</th>
            <th style={{ textAlign: 'right', padding: '0.75rem' }}>Profit Impact</th>
            <th style={{ textAlign: 'right', padding: '0.75rem' }}>ROI Impact</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid var(--border-light, #E5E7EB)' }}>
            <td style={{ padding: '0.75rem' }}>Price increase by 10%</td>
            <td style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--success, #10B981)' }}>+7.5%</td>
            <td style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--success, #10B981)' }}>+15.2%</td>
            <td style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--success, #10B981)' }}>+14.8%</td>
          </tr>
          <tr style={{ borderBottom: '1px solid var(--border-light, #E5E7EB)' }}>
            <td style={{ padding: '0.75rem' }}>Market downturn (20% decrease)</td>
            <td style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--error, #EF4444)' }}>-20.0%</td>
            <td style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--error, #EF4444)' }}>-45.6%</td>
            <td style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--error, #EF4444)' }}>-48.2%</td>
          </tr>
          <tr style={{ borderBottom: '1px solid var(--border-light, #E5E7EB)' }}>
            <td style={{ padding: '0.75rem' }}>Cost reduction initiatives</td>
            <td style={{ padding: '0.75rem', textAlign: 'right' }}>0.0%</td>
            <td style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--success, #10B981)' }}>+12.5%</td>
            <td style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--success, #10B981)' }}>+12.5%</td>
          </tr>
          <tr>
            <td style={{ padding: '0.75rem' }}>Expansion to new markets</td>
            <td style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--success, #10B981)' }}>+35.0%</td>
            <td style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--success, #10B981)' }}>+28.7%</td>
            <td style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--success, #10B981)' }}>+22.4%</td>
          </tr>
        </tbody>
      </table>
      
      <div style={{
        background: 'rgba(59, 130, 246, 0.05)',
        borderLeft: '4px solid var(--primary-main, #3B82F6)',
        padding: '1rem',
        borderRadius: '0 0.5rem 0.5rem 0',
      }}>
        <h4 style={{ margin: '0 0 0.5rem', color: 'var(--primary-dark, #2563EB)' }}>Risk Assessment</h4>
        <p style={{ margin: '0 0 0.5rem', color: 'var(--text-secondary, #6B7280)' }}>
          This business model demonstrates moderate sensitivity to market conditions, with downside risks partially offset by cost structure flexibility.
        </p>
        <p style={{ margin: 0, color: 'var(--text-secondary, #6B7280)' }}>
          <strong>Recommendation:</strong> Consider implementing the cost reduction initiatives alongside gradual price increases to mitigate potential market volatility.
        </p>
      </div>
    </div>
  </div>
);

// AI Insights content component
const InsightsContent = () => (
  <div style={{ padding: '1rem' }}>
    <h2 style={{ marginBottom: '1.5rem', color: 'var(--accent-main, #F59E0B)' }}>
      <FontAwesomeIcon icon={faBrain} style={{ marginRight: '0.75rem' }} />
      AI Financial Insights
    </h2>
    
    <div style={{
      background: 'var(--background-card, white)',
      borderRadius: '0.75rem',
      boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
      padding: '1.5rem',
      marginBottom: '1.5rem'
    }}>
      <div style={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{ margin: 0 }}>Strategic Recommendations</h3>
        <button style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.625rem 1rem',
          background: 'var(--primary-main, #3B82F6)',
          color: 'white',
          border: 'none',
          borderRadius: '0.375rem',
          fontSize: '0.875rem',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}>
          <FontAwesomeIcon icon={faSyncAlt} />
          Regenerate Insights
        </button>
      </div>
      
      <div style={{
        background: 'rgba(59, 130, 246, 0.05)',
        borderRadius: '0.5rem',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <h4 style={{ 
          margin: '0 0 1rem', 
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--primary-dark, #2563EB)'
        }}>
          <FontAwesomeIcon icon={faLightbulb} />
          Executive Summary
        </h4>
        <p style={{ margin: '0 0 1rem', color: 'var(--text-secondary, #6B7280)' }}>
          Your business demonstrates strong foundational financial health with a 24.8% profit margin and 32.5% ROI, both exceeding industry averages. The 14-month payback period indicates efficient capital utilization.
        </p>
        <p style={{ margin: 0, color: 'var(--text-secondary, #6B7280)' }}>
          Key opportunities for optimization include pricing strategy refinement, cost consolidation in specific categories, and targeted expansion to complementary product/service lines.
        </p>
      </div>
      
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        <div style={{
          background: 'var(--bg-light, #F8FAFC)',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          border: '1px solid var(--border-light, #E5E7EB)'
        }}>
          <h4 style={{ 
            margin: '0 0 1rem', 
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--secondary-main, #10B981)'
          }}>
            <FontAwesomeIcon icon={faRocket} />
            Growth Strategies
          </h4>
          <ul style={{ 
            margin: 0,
            padding: '0 0 0 1.25rem',
            color: 'var(--text-secondary, #6B7280)'
          }}>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>Product Line Expansion:</strong> Data indicates 68% of current customers would purchase complementary products if available.
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>Geographic Expansion:</strong> Markets within 100 miles show 23% higher demand and 15% lower competition.
            </li>
            <li>
              <strong>Subscription Model:</strong> Converting 25% of customers to a subscription model could increase lifetime value by 340%.
            </li>
          </ul>
        </div>
        
        <div style={{
          background: 'var(--bg-light, #F8FAFC)',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          border: '1px solid var(--border-light, #E5E7EB)'
        }}>
          <h4 style={{ 
            margin: '0 0 1rem', 
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--error, #EF4444)'
          }}>
            <FontAwesomeIcon icon={faBalanceScale} />
            Risk Management
          </h4>
          <ul style={{ 
            margin: 0,
            padding: '0 0 0 1.25rem',
            color: 'var(--text-secondary, #6B7280)'
          }}>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>Cash Reserve:</strong> Current reserves cover 1.8 months of operations; recommend increasing to 3-4 months.
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>Client Concentration:</strong> Top 3 clients represent 42% of revenue; diversification recommended.
            </li>
            <li>
              <strong>Supplier Dependency:</strong> Critical components sourced from single supplier poses continuity risk; develop alternative sources.
            </li>
          </ul>
        </div>
        
        <div style={{
          background: 'var(--bg-light, #F8FAFC)',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          border: '1px solid var(--border-light, #E5E7EB)'
        }}>
          <h4 style={{ 
            margin: '0 0 1rem', 
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--primary-main, #3B82F6)'
          }}>
            <FontAwesomeIcon icon={faProjectDiagram} />
            Operational Efficiency
          </h4>
          <ul style={{ 
            margin: 0,
            padding: '0 0 0 1.25rem',
            color: 'var(--text-secondary, #6B7280)'
          }}>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>Automation Potential:</strong> 35% of current manual processes could be automated, freeing 48 staff hours weekly.
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>Inventory Optimization:</strong> Current turnover ratio of 6.2 could be improved to 8.5 with demand forecasting.
            </li>
            <li>
              <strong>Process Redesign:</strong> Order fulfillment workflow has 4 redundant steps that could reduce cycle time by 32%.
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    <div style={{
      background: 'var(--background-card, white)',
      borderRadius: '0.75rem',
      boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
      padding: '1.5rem'
    }}>
      <h3 style={{ marginBottom: '1.5rem' }}>Implementation Priority Matrix</h3>
      
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '0.875rem'
      }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--border-light, #E5E7EB)' }}>
            <th style={{ textAlign: 'left', padding: '0.75rem' }}>Recommendation</th>
            <th style={{ textAlign: 'center', padding: '0.75rem' }}>Impact</th>
            <th style={{ textAlign: 'center', padding: '0.75rem' }}>Effort</th>
            <th style={{ textAlign: 'center', padding: '0.75rem' }}>Priority</th>
            <th style={{ textAlign: 'center', padding: '0.75rem' }}>Timeline</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ borderBottom: '1px solid var(--border-light, #E5E7EB)' }}>
            <td style={{ padding: '0.75rem' }}>Implement tiered pricing strategy</td>
            <td style={{ padding: '0.75rem', textAlign: 'center' }}>
              <span style={{ 
                display: 'inline-block',
                width: '80px',
                textAlign: 'center',
                padding: '0.25rem 0.5rem',
                background: 'rgba(16, 185, 129, 0.1)',
                color: 'var(--success, #10B981)',
                borderRadius: '0.25rem',
                fontWeight: 600
              }}>High</span>
            </td>
            <td style={{ padding: '0.75rem', textAlign: 'center' }}>
              <span style={{ 
                display: 'inline-block',
                width: '80px',
                textAlign: 'center',
                padding: '0.25rem 0.5rem',
                background: 'rgba(245, 158, 11, 0.1)',
                color: 'var(--warning, #F59E0B)',
                borderRadius: '0.25rem',
                fontWeight: 600
              }}>Medium</span>
            </td>
            <td style={{ padding: '0.75rem', textAlign: 'center' }}>1</td>
            <td style={{ padding: '0.75rem', textAlign: 'center' }}>30 days</td>
          </tr>
          <tr style={{ borderBottom: '1px solid var(--border-light, #E5E7EB)' }}>
            <td style={{ padding: '0.75rem' }}>Consolidate suppliers</td>
            <td style={{ padding: '0.75rem', textAlign: 'center' }}>
              <span style={{ 
                display: 'inline-block',
                width: '80px',
                textAlign: 'center',
                padding: '0.25rem 0.5rem',
                background: 'rgba(245, 158, 11, 0.1)',
                color: 'var(--warning, #F59E0B)',
                borderRadius: '0.25rem',
                fontWeight: 600
              }}>Medium</span>
            </td>
            <td style={{ padding: '0.75rem', textAlign: 'center' }}>
              <span style={{ 
                display: 'inline-block',
                width: '80px',
                textAlign: 'center',
                padding: '0.25rem 0.5rem',
                background: 'rgba(245, 158, 11, 0.1)',
                color: 'var(--warning, #F59E0B)',
                borderRadius: '0.25rem',
                fontWeight: 600
              }}>Medium</span>
            </td>
            <td style={{ padding: '0.75rem', textAlign: 'center' }}>2</td>
            <td style={{ padding: '0.75rem', textAlign: 'center' }}>60 days</td>
          </tr>
          <tr style={{ borderBottom: '1px solid var(--border-light, #E5E7EB)' }}>
            <td style={{ padding: '0.75rem' }}>Launch complementary product line</td>
            <td style={{ padding: '0.75rem', textAlign: 'center' }}>
              <span style={{ 
                display: 'inline-block',
                width: '80px',
                textAlign: 'center',
                padding: '0.25rem 0.5rem',
                background: 'rgba(16, 185, 129, 0.1)',
                color: 'var(--success, #10B981)',
                borderRadius: '0.25rem',
                fontWeight: 600
              }}>High</span>
            </td>
            <td style={{ padding: '0.75rem', textAlign: 'center' }}>
              <span style={{ 
                display: 'inline-block',
                width: '80px',
                textAlign: 'center',
                padding: '0.25rem 0.5rem',
                background: 'rgba(239, 68, 68, 0.1)',
                color: 'var(--error, #EF4444)',
                borderRadius: '0.25rem',
                fontWeight: 600
              }}>High</span>
            </td>
            <td style={{ padding: '0.75rem', textAlign: 'center' }}>3</td>
            <td style={{ padding: '0.75rem', textAlign: 'center' }}>90 days</td>
          </tr>
          <tr>
            <td style={{ padding: '0.75rem' }}>Implement inventory forecasting</td>
            <td style={{ padding: '0.75rem', textAlign: 'center' }}>
              <span style={{ 
                display: 'inline-block',
                width: '80px',
                textAlign: 'center',
                padding: '0.25rem 0.5rem',
                background: 'rgba(245, 158, 11, 0.1)',
                color: 'var(--warning, #F59E0B)',
                borderRadius: '0.25rem',
                fontWeight: 600
              }}>Medium</span>
            </td>
            <td style={{ padding: '0.75rem', textAlign: 'center' }}>
              <span style={{ 
                display: 'inline-block',
                width: '80px',
                textAlign: 'center',
                padding: '0.25rem 0.5rem',
                background: 'rgba(245, 158, 11, 0.1)',
                color: 'var(--warning, #F59E0B)',
                borderRadius: '0.25rem',
                fontWeight: 600
              }}>Medium</span>
            </td>
            <td style={{ padding: '0.75rem', textAlign: 'center' }}>4</td>
            <td style={{ padding: '0.75rem', textAlign: 'center' }}>45 days</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

// History content component
const HistoryContent = () => (
  <div style={{ padding: '1rem' }}>
    <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-main, #3B82F6)' }}>
      <FontAwesomeIcon icon={faHistory} style={{ marginRight: '0.75rem' }} />
      Analysis History
    </h2>
    
    <div style={{
      background: 'var(--background-card, white)',
      borderRadius: '0.75rem',
      boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
      padding: '1.5rem',
      marginBottom: '1.5rem'
    }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <h3 style={{ margin: 0 }}>Previous Analyses</h3>
          <div style={{
            display: 'flex',
            gap: '0.5rem'
          }}>
            <button style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 0.75rem',
              background: 'transparent',
              border: '1px solid var(--border-main, #D1D5DB)',
              borderRadius: '0.375rem',
              color: 'var(--text-primary, #111827)',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}>
              Filter
            </button>
            <button style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 0.75rem',
              background: 'transparent',
              border: '1px solid var(--border-main, #D1D5DB)',
              borderRadius: '0.375rem',
              color: 'var(--text-primary, #111827)',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}>
              Export All
            </button>
          </div>
        </div>
        
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '0.875rem'
        }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border-light, #E5E7EB)' }}>
              <th style={{ textAlign: 'left', padding: '0.75rem' }}>Date</th>
              <th style={{ textAlign: 'left', padding: '0.75rem' }}>Scenario Name</th>
              <th style={{ textAlign: 'right', padding: '0.75rem' }}>Revenue</th>
              <th style={{ textAlign: 'right', padding: '0.75rem' }}>ROI</th>
              <th style={{ textAlign: 'right', padding: '0.75rem' }}>Payback</th>
              <th style={{ textAlign: 'center', padding: '0.75rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border-light, #E5E7EB)' }}>
              <td style={{ padding: '0.75rem' }}>Apr 15, 2025</td>
              <td style={{ padding: '0.75rem' }}>Base Scenario</td>
              <td style={{ padding: '0.75rem', textAlign: 'right' }}>$32,500</td>
              <td style={{ padding: '0.75rem', textAlign: 'right' }}>32.5%</td>
              <td style={{ padding: '0.75rem', textAlign: 'right' }}>14 months</td>
              <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                <button style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--primary-main, #3B82F6)',
                  cursor: 'pointer',
                  marginRight: '0.5rem'
                }}>
                  View
                </button>
                <button style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--primary-main, #3B82F6)',
                  cursor: 'pointer'
                }}>
                  Compare
                </button>
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-light, #E5E7EB)' }}>
              <td style={{ padding: '0.75rem' }}>Apr 12, 2025</td>
              <td style={{ padding: '0.75rem' }}>Expansion Plan</td>
              <td style={{ padding: '0.75rem', textAlign: 'right' }}>$48,750</td>
              <td style={{ padding: '0.75rem', textAlign: 'right' }}>29.8%</td>
              <td style={{ padding: '0.75rem', textAlign: 'right' }}>16 months</td>
              <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                <button style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--primary-main, #3B82F6)',
                  cursor: 'pointer',
                  marginRight: '0.5rem'
                }}>
                  View
                </button>
                <button style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--primary-main, #3B82F6)',
                  cursor: 'pointer'
                }}>
                  Compare
                </button>
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-light, #E5E7EB)' }}>
              <td style={{ padding: '0.75rem' }}>Apr 8, 2025</td>
              <td style={{ padding: '0.75rem' }}>Cost Optimization</td>
              <td style={{ padding: '0.75rem', textAlign: 'right' }}>$32,500</td>
              <td style={{ padding: '0.75rem', textAlign: 'right' }}>36.2%</td>
              <td style={{ padding: '0.75rem', textAlign: 'right' }}>12 months</td>
              <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                <button style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--primary-main, #3B82F6)',
                  cursor: 'pointer',
                  marginRight: '0.5rem'
                }}>
                  View
                </button>
                <button style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--primary-main, #3B82F6)',
                  cursor: 'pointer'
                }}>
                  Compare
                </button>
              </td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem' }}>Apr 3, 2025</td>
              <td style={{ padding: '0.75rem' }}>Initial Assessment</td>
              <td style={{ padding: '0.75rem', textAlign: 'right' }}>$28,200</td>
              <td style={{ padding: '0.75rem', textAlign: 'right' }}>27.5%</td>
              <td style={{ padding: '0.75rem', textAlign: 'right' }}>18 months</td>
              <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                <button style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--primary-main, #3B82F6)',
                  cursor: 'pointer',
                  marginRight: '0.5rem'
                }}>
                  View
                </button>
                <button style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--primary-main, #3B82F6)',
                  cursor: 'pointer'
                }}>
                  Compare
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <div style={{
      background: 'var(--background-card, white)',
      borderRadius: '0.75rem',
      boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
      padding: '1.5rem'
    }}>
      <h3 style={{ marginBottom: '1.5rem' }}>Performance Comparison</h3>
      
      <div style={{ 
        height: '400px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        color: 'var(--text-secondary, #6B7280)',
        background: 'var(--bg-light, #F8FAFC)',
        border: '1px solid var(--border-light, #E5E7EB)',
        borderRadius: '0.5rem',
        marginBottom: '1.5rem'
      }}>
        Scenario comparison chart will be displayed here
      </div>
      
      <div style={{
        background: 'rgba(59, 130, 246, 0.05)',
        borderLeft: '4px solid var(--primary-main, #3B82F6)',
        padding: '1rem',
        borderRadius: '0 0.5rem 0.5rem 0',
      }}>
        <h4 style={{ margin: '0 0 0.5rem', color: 'var(--primary-dark, #2563EB)' }}>Trend Analysis</h4>
        <p style={{ margin: 0, color: 'var(--text-secondary, #6B7280)' }}>
          Your financial projections have shown consistent improvement over time, with the most significant gains coming from cost optimization strategies (+8.7% ROI improvement). Continue focusing on operational efficiency while exploring growth opportunities for balanced improvement.
        </p>
      </div>
    </div>
  </div>
);

// Settings content component
const SettingsContent = () => (
  <div style={{ padding: '1rem' }}>
    <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary-main, #3B82F6)' }}>
      <FontAwesomeIcon icon={faCog} style={{ marginRight: '0.75rem' }} />
      Calculator Settings
    </h2>
    
    <div style={{
      background: 'var(--background-card, white)',
      borderRadius: '0.75rem',
      boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
      padding: '1.5rem',
      marginBottom: '1.5rem'
    }}>
      <h3 style={{ marginBottom: '1.5rem' }}>Calculation Parameters</h3>
      
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        <div>
          <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Financial Settings</h4>
          
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontSize: '0.875rem',
              fontWeight: 500
            }}>
              Default Currency
            </label>
            <select style={{
              width: '100%',
              padding: '0.625rem 0.75rem',
              border: '1px solid var(--border-main, #D1D5DB)',
              borderRadius: '0.375rem',
              backgroundColor: 'var(--bg-light, #F8FAFC)'
            }}>
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="JPY">JPY (¥)</option>
              <option value="CNY">CNY (¥)</option>
            </select>
          </div>
          
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontSize: '0.875rem',
              fontWeight: 500
            }}>
              Tax Rate (%)
            </label>
            <input 
              type="number" 
              defaultValue="25" 
              min="0" 
              max="100"
              style={{
                width: '100%',
                padding: '0.625rem 0.75rem',
                border: '1px solid var(--border-main, #D1D5DB)',
                borderRadius: '0.375rem',
                backgroundColor: 'var(--bg-light, #F8FAFC)'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontSize: '0.875rem',
              fontWeight: 500
            }}>
              Discount Rate (%)
            </label>
            <input 
              type="number" 
              defaultValue="8" 
              min="0" 
              max="100"
              style={{
                width: '100%',
                padding: '0.625rem 0.75rem',
                border: '1px solid var(--border-main, #D1D5DB)',
                borderRadius: '0.375rem',
                backgroundColor: 'var(--bg-light, #F8FAFC)'
              }}
            />
          </div>
          
          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontSize: '0.875rem',
              fontWeight: 500
            }}>
              Projection Timeframe (Years)
            </label>
            <select style={{
              width: '100%',
              padding: '0.625rem 0.75rem',
              border: '1px solid var(--border-main, #D1D5DB)',
              borderRadius: '0.375rem',
              backgroundColor: 'var(--bg-light, #F8FAFC)'
            }}>
              <option value="1">1 year</option>
              <option value="3">3 years</option>
              <option value="5" selected>5 years</option>
              <option value="10">10 years</option>
            </select>
          </div>
        </div>
        
        <div>
          <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Display Settings</h4>
          
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontSize: '0.875rem',
              fontWeight: 500
            }}>
              Chart Type
            </label>
            <select style={{
              width: '100%',
              padding: '0.625rem 0.75rem',
              border: '1px solid var(--border-main, #D1D5DB)',
              borderRadius: '0.375rem',
              backgroundColor: 'var(--bg-light, #F8FAFC)'
            }}>
              <option value="bar">Bar Chart</option>
              <option value="line" selected>Line Chart</option>
              <option value="area">Area Chart</option>
              <option value="pie">Pie Chart</option>
            </select>
          </div>
          
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontSize: '0.875rem',
              fontWeight: 500
            }}>
              Chart Color Theme
            </label>
            <select style={{
              width: '100%',
              padding: '0.625rem 0.75rem',
              border: '1px solid var(--border-main, #D1D5DB)',
              borderRadius: '0.375rem',
              backgroundColor: 'var(--bg-light, #F8FAFC)'
            }}>
              <option value="default" selected>Default Blues</option>
              <option value="monochrome">Monochrome</option>
              <option value="vibrant">Vibrant</option>
              <option value="pastel">Pastel</option>
            </select>
          </div>
          
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontSize: '0.875rem',
              fontWeight: 500
            }}>
              Data Formatting
            </label>
            <select style={{
              width: '100%',
              padding: '0.625rem 0.75rem',
              border: '1px solid var(--border-main, #D1D5DB)',
              borderRadius: '0.375rem',
              backgroundColor: 'var(--bg-light, #F8FAFC)'
            }}>
              <option value="thousands" selected>Thousands (K)</option>
              <option value="millions">Millions (M)</option>
              <option value="exact">Exact Values</option>
            </select>
          </div>
          
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <input 
              type="checkbox" 
              id="darkMode"
              style={{
                width: '1rem',
                height: '1rem'
              }}
            />
            <label 
              htmlFor="darkMode"
              style={{
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              Use Dark Mode
            </label>
          </div>
        </div>
        
        <div>
          <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>AI Settings</h4>
          
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontSize: '0.875rem',
              fontWeight: 500
            }}>
              Insight Depth
            </label>
            <select style={{
              width: '100%',
              padding: '0.625rem 0.75rem',
              border: '1px solid var(--border-main, #D1D5DB)',
              borderRadius: '0.375rem',
              backgroundColor: 'var(--bg-light, #F8FAFC)'
            }}>
              <option value="basic">Basic</option>
              <option value="standard" selected>Standard</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </div>
          
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontSize: '0.875rem',
              fontWeight: 500
            }}>
              Industry Benchmarks
            </label>
            <select style={{
              width: '100%',
              padding: '0.625rem 0.75rem',
              border: '1px solid var(--border-main, #D1D5DB)',
              borderRadius: '0.375rem',
              backgroundColor: 'var(--bg-light, #F8FAFC)'
            }}>
              <option value="none">None</option>
              <option value="general">General Business</option>
              <option value="retail" selected>Retail</option>
              <option value="hospitality">Hospitality</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="technology">Technology</option>
              <option value="healthcare">Healthcare</option>
            </select>
          </div>
          
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1rem'
          }}>
            <input 
              type="checkbox" 
              id="autoInsights"
              style={{
                width: '1rem',
                height: '1rem'
              }}
              checked
            />
            <label 
              htmlFor="autoInsights"
              style={{
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              Generate insights automatically
            </label>
          </div>
          
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <input 
              type="checkbox" 
              id="simplifiedLanguage"
              style={{
                width: '1rem',
                height: '1rem'
              }}
            />
            <label 
              htmlFor="simplifiedLanguage"
              style={{
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              Use simplified language
            </label>
          </div>
        </div>
      </div>
    </div>
    
    <div style={{
      background: 'var(--background-card, white)',
      borderRadius: '0.75rem',
      boxShadow: 'var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1))',
      padding: '1.5rem'
    }}>
      <div style={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{ margin: 0 }}>Data Management</h3>
        <div style={{ 
          display: 'flex',
          gap: '0.75rem'
        }}>
          <button style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.625rem 1rem',
            background: 'transparent',
            border: '1px solid var(--error, #EF4444)',
            borderRadius: '0.375rem',
            color: 'var(--error, #EF4444)',
            fontSize: '0.875rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}>
            Clear History
          </button>
          <button style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.625rem 1rem',
            background: 'var(--primary-main, #3B82F6)',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}>
            Save Settings
          </button>
        </div>
      </div>
      
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        <div style={{
          background: 'var(--bg-light, #F8FAFC)',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          border: '1px solid var(--border-light, #E5E7EB)'
        }}>
          <h4 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Import / Export</h4>
          
          <div style={{ marginBottom: '1rem' }}>
            <button style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.625rem 1rem',
              background: 'white',
              border: '1px solid var(--border-main, #D1D5DB)',
              borderRadius: '0.375rem',
              color: 'var(--text-primary, #111827)',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              width: '100%',
              justifyContent: 'center',
              marginBottom: '0.75rem'
            }}>
              Import Data (CSV)
            </button>
            
             <button style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.625rem 1rem',
              background: 'white',
              border: '1px solid var(--border-main, #D1D5DB)',
              borderRadius: '0.375rem',
              color: 'var(--text-primary, #111827)',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              width: '100%',
              justifyContent: 'center'
            }}>
              <FontAwesomeIcon icon={faCloudDownloadAlt} />
              Export Data (CSV)
            </button>
          </div>
          
          <div>
            <button style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.625rem 1rem',
              background: 'white',
              border: '1px solid var(--border-main, #D1D5DB)',
              borderRadius: '0.375rem',
              color: 'var(--text-primary, #111827)',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              width: '100%',
              justifyContent: 'center',
              marginBottom: '0.75rem'
            }}>
              <FontAwesomeIcon icon={faFilePdf} />
              Generate PDF Report
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Main EnhancedDashboard component that manages navigation and renders appropriate content
const EnhancedDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const { theme } = useContext(ThemeContext) || { theme: {} };

  // This function renders the appropriate content based on activeSection
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardContent />;
      case 'revenue':
        return <RevenueContent />;
      case 'expenses':
        return <ExpensesContent />;
      case 'projections':
        return <ProjectionsContent />;
      case 'insights':
        return <InsightsContent />;
      case 'history':
        return <HistoryContent />;
      case 'settings':
        return <SettingsContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div style={{ 
      display: 'flex',
      minHeight: 'calc(100vh - 80px)',
      backgroundColor: theme.backgroundColor || 'var(--background, #f8fafc)'
    }}>
      {/* Sidebar */}
      <CalculatorSidebar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      
      {/* Main Content */}
      <div style={{ 
        flex: 1,
        padding: '1.5rem',
        overflowY: 'auto'
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EnhancedDashboard;