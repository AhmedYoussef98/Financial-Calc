import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const StyledButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.size === 'small' ? '0.375rem 0.75rem' : 
    props.size === 'large' ? '0.75rem 1.5rem' : '0.5rem 1rem'};
  font-size: ${props => props.size === 'small' ? '0.875rem' : 
    props.size === 'large' ? '1.125rem' : '1rem'};
  font-weight: 600;
  border-radius: ${props => props.rounded ? '9999px' : '0.375rem'};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: relative;
  overflow: hidden;
  gap: 0.5rem;
  
  /* Colors based on variant */
  background-color: ${props => {
    if (props.variant === 'outlined' || props.variant === 'text') return 'transparent';
    if (props.variant === 'secondary') return 'var(--secondary-main)';
    if (props.variant === 'accent') return 'var(--accent-main)';
    if (props.variant === 'success') return 'var(--success)';
    if (props.variant === 'error') return 'var(--error)';
    if (props.variant === 'warning') return 'var(--warning)';
    return 'var(--primary-main)';
  }};
  
  color: ${props => {
    if (props.variant === 'outlined') {
      if (props.color === 'secondary') return 'var(--secondary-main)';
      if (props.color === 'accent') return 'var(--accent-main)';
      return 'var(--primary-main)';
    }
    if (props.variant === 'text') {
      if (props.color === 'secondary') return 'var(--secondary-main)';
      if (props.color === 'accent') return 'var(--accent-main)';
      return 'var(--primary-main)';
    }
    if (props.variant === 'accent') return 'var(--accent-contrast)';
    return 'white';
  }};
  
  border: ${props => props.variant === 'outlined' ? 
    props.color === 'secondary' ? '2px solid var(--secondary-main)' :
    props.color === 'accent' ? '2px solid var(--accent-main)' :
    '2px solid var(--primary-main)' : 'none'};
  
  box-shadow: ${props => props.variant !== 'text' && props.variant !== 'outlined' ? 
    'var(--shadow-sm)' : 'none'};
  
  &:hover {
    background-color: ${props => {
      if (props.variant === 'outlined') {
        if (props.color === 'secondary') return 'rgba(var(--secondary-main-rgb), 0.05)';
        if (props.color === 'accent') return 'rgba(var(--accent-main-rgb), 0.05)';
        return 'rgba(var(--primary-main-rgb), 0.05)';
      }
      if (props.variant === 'text') {
        if (props.color === 'secondary') return 'rgba(var(--secondary-main-rgb), 0.05)';
        if (props.color === 'accent') return 'rgba(var(--accent-main-rgb), 0.05)';
        return 'rgba(var(--primary-main-rgb), 0.05)';
      }
      if (props.variant === 'primary') return 'var(--primary-dark)';
      if (props.variant === 'secondary') return 'var(--secondary-dark)';
      if (props.variant === 'accent') return 'var(--accent-dark)';
      if (props.variant === 'success') return 'var(--success-dark, var(--success))';
      if (props.variant === 'error') return 'var(--error-dark, var(--error))';
      if (props.variant === 'warning') return 'var(--warning-dark, var(--warning))';
      return 'var(--primary-dark)';
    }};
    transform: translateY(-2px);
    box-shadow: ${props => props.variant !== 'text' && props.variant !== 'outlined' ? 
      'var(--shadow-md)' : 'none'};
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  
  /* Ripple effect */
  .ripple {
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 600ms linear;
    background-color: rgba(255, 255, 255, 0.3);
  }
  
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
`;

const LoadingSpinner = styled.div`
  width: 1em;
  height: 1em;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Button = ({
  children,
  variant = 'primary',
  color,
  size = 'medium',
  rounded = false,
  startIcon,
  endIcon,
  fullWidth = false,
  loading = false,
  disabled = false,
  onClick,
  ...props
}) => {
  const createRipple = (e) => {
    if (disabled || loading || variant === 'text') return;
    
    const button = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple');
    
    // Remove existing ripple
    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
      ripple.remove();
    }
    
    button.appendChild(circle);
  };
  
  const handleClick = (e) => {
    createRipple(e);
    onClick && onClick(e);
  };
  
  return (
    <StyledButton
      variant={variant}
      color={color}
      size={size}
      rounded={rounded}
      onClick={handleClick}
      disabled={disabled || loading}
      style={{ width: fullWidth ? '100%' : 'auto' }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {!loading && startIcon && <IconWrapper>{startIcon}</IconWrapper>}
      {!loading && children}
      {!loading && endIcon && <IconWrapper>{endIcon}</IconWrapper>}
    </StyledButton>
  );
};

export default Button;