// src/components/UI/LoadingScreen.js
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import gsap from 'gsap';

const FullScreenContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-main) 100%);
  z-index: 9999;
  color: white;
`;

const LogoContainer = styled.div`
  position: relative;
  margin-bottom: 2rem;
`;

const Logo = styled.div`
  font-size: 3rem;
  font-weight: 800;
  letter-spacing: -0.05em;
  position: relative;
  
  span {
    color: var(--accent-main);
  }
`;

const FloatingNumbers = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const FloatingNumber = styled.div`
  position: absolute;
  font-size: ${props => props.size};
  opacity: ${props => props.opacity};
  color: rgba(255, 255, 255, 0.15);
  transform-origin: center;
  animation: float ${props => props.duration}s linear infinite;
  animation-delay: ${props => props.delay}s;
  
  @keyframes float {
    0% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(10deg); }
    100% { transform: translateY(0) rotate(0deg); }
  }
`;

const LoadingBar = styled.div`
  width: 200px;
  height: 4px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 1rem;
  
  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    background-color: var(--accent-main);
    border-radius: 2px;
    animation: loading 1.5s ease-in-out infinite;
    
    @keyframes loading {
      0% { transform: translateX(-100%); }
      50% { transform: translateX(0); }
      100% { transform: translateX(100%); }
    }
  }
`;

const LoadingText = styled.div`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
`;

const LoadingScreen = ({ loading, setLoading }) => {
  useEffect(() => {
    // Animate logo with GSAP
    const timeline = gsap.timeline();
    
    timeline.fromTo('.logo-text', 
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );
    
    // Automatically hide the loading screen after a delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [setLoading]);
  
  // Generate random floating numbers for background
  const floatingNumbers = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    value: Math.floor(Math.random() * 10),
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    size: `${Math.random() * 2 + 1.5}rem`,
    opacity: Math.random() * 0.2 + 0.1,
    duration: Math.random() * 10 + 10,
    delay: Math.random() * 2
  }));
  
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FullScreenContainer>
            <LogoContainer>
              <FloatingNumbers>
                {floatingNumbers.map(num => (
                  <FloatingNumber
                    key={num.id}
                    style={{ left: num.x, top: num.y }}
                    size={num.size}
                    opacity={num.opacity}
                    duration={num.duration}
                    delay={num.delay}
                  >
                    {num.value}
                  </FloatingNumber>
                ))}
              </FloatingNumbers>
              
              <Logo className="logo-text">
                Wise<span>Calculator</span>
              </Logo>
            </LogoContainer>
            
            <LoadingBar />
            <LoadingText>Initializing Financial Engine...</LoadingText>
          </FullScreenContainer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;