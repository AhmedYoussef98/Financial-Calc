import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome, faChartLine, faMoneyBillWave, faChartBar, 
  faBrain, faHistory, faCog, faExclamationTriangle,
  faQuestionCircle, faBook, faUserCog, faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

const CalculatorSidebar = ({ activeSection, setActiveSection }) => {
  const [collapsed, setCollapsed] = useState(false);
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: faHome },
    { id: 'revenue', label: 'Revenue', icon: faMoneyBillWave },
    { id: 'expenses', label: 'Expenses', icon: faChartBar },
    { id: 'projections', label: 'Projections', icon: faChartLine },
    { id: 'insights', label: 'AI Insights', icon: faBrain },
    { id: 'history', label: 'History', icon: faHistory },
    { id: 'settings', label: 'Settings', icon: faCog },
  ];
  
  return (
    <div className="calculator-sidebar" style={{
      width: collapsed ? '80px' : '250px',
      height: '100%',
      backgroundColor: 'var(--background-paper, white)',
      borderRight: '1px solid var(--border-light, #e0e0e0)',
      transition: 'width 0.3s ease',
      overflow: 'hidden'
    }}>
      <div style={{
        padding: '1.5rem',
        borderBottom: '1px solid var(--border-light, #e0e0e0)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'space-between'
      }}>
        {!collapsed && (
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>
            FinCalculator
          </h2>
        )}
        
        <button 
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-secondary, #666)',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '0.25rem'
          }}
        >
          <FontAwesomeIcon 
            icon={collapsed ? faChartLine : faCog} 
            size={collapsed ? 'lg' : 'sm'} 
          />
        </button>
      </div>
      
      <nav style={{ padding: '1rem 0' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {menuItems.map(item => (
            <li key={item.id} style={{ marginBottom: '0.5rem' }}>
              <button 
                onClick={() => setActiveSection(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  textAlign: 'left',
                  padding: collapsed ? '0.75rem 0' : '0.75rem 1.5rem',
                  backgroundColor: activeSection === item.id ? 
                    'rgba(var(--primary-main-rgb, 59, 130, 246), 0.08)' : 'transparent',
                  color: activeSection === item.id ? 
                    'var(--primary-main, #3b82f6)' : 'var(--text-primary, #333)',
                  border: 'none',
                  borderRadius: '0',
                  borderLeft: activeSection === item.id ? 
                    '3px solid var(--primary-main, #3b82f6)' : '3px solid transparent',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  fontSize: '0.9375rem'
                }}
              >
                <FontAwesomeIcon 
                  icon={item.icon}
                  style={{ 
                    marginRight: collapsed ? '0' : '0.75rem',
                    fontSize: collapsed ? '1.25rem' : '1rem'
                  }}
                />
                {!collapsed && <span>{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      {!collapsed && (
        <div style={{
          padding: '1rem 1.5rem',
          marginTop: 'auto',
          borderTop: '1px solid var(--border-light, #e0e0e0)'
        }}>
          <div style={{
            padding: '1rem',
            backgroundColor: 'rgba(var(--warning-rgb, 245, 158, 11), 0.1)',
            borderRadius: '0.5rem',
            marginBottom: '1rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '0.5rem',
              color: 'var(--warning, #f59e0b)',
              fontWeight: 600
            }}>
              <FontAwesomeIcon icon={faExclamationTriangle} style={{ marginRight: '0.5rem' }} />
              Trial Version
            </div>
            <p style={{
              margin: 0,
              fontSize: '0.875rem',
              color: 'var(--text-secondary, #666)'
            }}>
              You have 14 days left in your trial. Upgrade now to continue.
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '0.25rem',
              border: '1px solid var(--border-light, #e0e0e0)',
              backgroundColor: 'transparent',
              color: 'var(--text-secondary, #666)',
              cursor: 'pointer'
            }}>
              <FontAwesomeIcon icon={faQuestionCircle} />
            </button>
            
            <button style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '0.25rem',
              border: '1px solid var(--border-light, #e0e0e0)',
              backgroundColor: 'transparent',
              color: 'var(--text-secondary, #666)',
              cursor: 'pointer'
            }}>
              <FontAwesomeIcon icon={faBook} />
            </button>
            
            <button style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '0.25rem',
              border: '1px solid var(--border-light, #e0e0e0)',
              backgroundColor: 'transparent',
              color: 'var(--text-secondary, #666)',
              cursor: 'pointer'
            }}>
              <FontAwesomeIcon icon={faUserCog} />
            </button>
            
            <button style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '0.25rem',
              border: '1px solid var(--border-light, #e0e0e0)',
              backgroundColor: 'transparent',
              color: 'var(--text-secondary, #666)',
              cursor: 'pointer',
              marginLeft: 'auto'
            }}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculatorSidebar;
