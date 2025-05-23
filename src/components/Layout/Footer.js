import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ 
      backgroundColor: 'var(--bg-dark)', 
      color: 'white',
      padding: '4rem 0 1.5rem'
    }}>
      <div className="container">
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          <div>
            <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>
              Wise<span style={{ color: 'var(--accent)' }}>Calculator</span>
            </h3>
            <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem' }}>
              Financial clarity through intelligent calculations. Make smarter business decisions with our premium calculator tools.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="https://twitter.com" style={{ color: 'var(--text-light)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </a>
              <a href="https://linkedin.com" style={{ color: 'var(--text-light)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="https://facebook.com" style={{ color: 'var(--text-light)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 style={{ color: 'white', marginBottom: '1.5rem' }}>Company</h4>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ marginBottom: '0.75rem' }}>
                <Link to="/about" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>About Us</Link>
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <Link to="/cases" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>Use Cases</Link>
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <Link to="/pricing" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>Pricing</Link>
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <Link to="/careers" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>Careers</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ color: 'white', marginBottom: '1.5rem' }}>Resources</h4>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ marginBottom: '0.75rem' }}>
                <Link to="/blog" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>Blog</Link>
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <Link to="/guides" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>Guides</Link>
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <Link to="/webinars" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>Webinars</Link>
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <Link to="/help" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>Help Center</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ color: 'white', marginBottom: '1.5rem' }}>Contact</h4>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ marginBottom: '0.75rem', color: 'var(--text-light)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>+1 (555) 123-4567</span>
                </div>
              </li>
              <li style={{ marginBottom: '0.75rem', color: 'var(--text-light)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                  <span>info@wisecalculator.com</span>
                </div>
              </li>
              <li style={{ marginBottom: '0.75rem', color: 'var(--text-light)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>123 Finance St, San Francisco, CA 94158</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p style={{ color: 'var(--text-light)', margin: 0 }}>
            © {new Date().getFullYear()} WiseCalculator. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="/privacy" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link to="/terms" style={{ color: 'var(--text-light)', textDecoration: 'none' }}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
