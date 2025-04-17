import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000,
    padding: isScrolled ? '0.75rem 0' : '1.25rem 0',
    backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
    backdropFilter: isScrolled ? 'blur(10px)' : 'none',
    boxShadow: isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
    transition: 'all 0.3s ease'
  };

  const logoStyle = {
    color: isScrolled || location.pathname !== '/' ? 'var(--text-dark)' : 'white',
    transition: 'color 0.3s ease'
  };

  const navLinkStyle = {
    color: isScrolled || location.pathname !== '/' ? 'var(--text-dark)' : 'white',
    opacity: 0.9,
    fontWeight: 500,
    transition: 'all 0.3s ease',
    padding: '0.5rem 0.75rem',
    borderRadius: '0.375rem'
  };

  const activeStyle = {
    color: 'var(--primary-light)',
    fontWeight: 600
  };

  const mobileMenuStyle = {
    display: menuOpen ? 'flex' : 'none',
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'column',
    padding: '1rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
  };

  return (
    <header style={headerStyle}>
      <div className="container flex items-center justify-between">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <motion.div 
            className="logo" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={logoStyle}
          >
            <h1 style={{ fontSize: '1.5rem', margin: 0 }}>
              Wise<span style={{ color: 'var(--accent)' }}>Calculator</span>
            </h1>
          </motion.div>
        </Link>

        <div className="flex items-center">
          <nav className="hidden md:flex">
            <ul className="flex gap-8" style={{ listStyle: 'none' }}>
              <li>
                <Link 
                  to="/" 
                  style={{ 
                    ...navLinkStyle,
                    ...(location.pathname === '/' ? activeStyle : {})
                  }}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/cases" 
                  style={{ 
                    ...navLinkStyle,
                    ...(location.pathname === '/cases' ? activeStyle : {})
                  }}
                >
                  Use Cases
                </Link>
              </li>
              <li>
                <Link 
                  to="/pricing" 
                  style={{ 
                    ...navLinkStyle,
                    ...(location.pathname === '/pricing' ? activeStyle : {})
                  }}
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  style={{ 
                    ...navLinkStyle,
                    ...(location.pathname === '/contact' ? activeStyle : {})
                  }}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          <Link to="/calculator">
            <button className="btn btn-accent ml-4">Try Demo</button>
          </Link>

          <button 
            className="md:hidden ml-4"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </button>
        </div>

        <div className="mobile-menu md:hidden" style={mobileMenuStyle}>
          <ul style={{ listStyle: 'none' }}>
            <li style={{ margin: '0.75rem 0' }}>
              <Link 
                to="/" 
                style={{ color: 'var(--text-dark)' }}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li style={{ margin: '0.75rem 0' }}>
              <Link 
                to="/cases" 
                style={{ color: 'var(--text-dark)' }}
                onClick={() => setMenuOpen(false)}
              >
                Use Cases
              </Link>
            </li>
            <li style={{ margin: '0.75rem 0' }}>
              <Link 
                to="/pricing" 
                style={{ color: 'var(--text-dark)' }}
                onClick={() => setMenuOpen(false)}
              >
                Pricing
              </Link>
            </li>
            <li style={{ margin: '0.75rem 0' }}>
              <Link 
                to="/contact" 
                style={{ color: 'var(--text-dark)' }}
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;