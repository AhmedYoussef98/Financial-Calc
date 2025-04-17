import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Input = ({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  helperText,
  startIcon,
  endIcon,
  fullWidth = false,
  disabled = false,
  readOnly = false,
  required = false,
  variant = 'outlined',
  size = 'medium',
  maxLength,
  min,
  max,
  step,
  pattern,
  autoComplete,
  autoFocus = false,
  name,
  onFocus,
  onBlur,
  style,
  className,
  ...props
}) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const handleFocus = (e) => {
    setFocused(true);
    if (onFocus) onFocus(e);
  };
  
  const handleBlur = (e) => {
    setFocused(false);
    if (onBlur) onBlur(e);
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  // Determine input type for password fields
  const inputType = type === 'password' && showPassword ? 'text' : type;
  
  // Size-based styles
  const sizeStyles = {
    small: {
      padding: '0.375rem 0.75rem',
      fontSize: '0.875rem',
      height: '32px'
    },
    medium: {
      padding: '0.625rem 0.875rem',
      fontSize: '1rem',
      height: '40px'
    },
    large: {
      padding: '0.75rem 1rem',
      fontSize: '1.125rem',
      height: '48px'
    }
  };
  
  // Variant-based styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'outlined':
        return {
          border: focused ? '2px solid var(--primary-main, #3B82F6)' : 
                  error ? '1px solid var(--error, #EF4444)' : 
                  '1px solid var(--border-main, #D1D5DB)',
          backgroundColor: 'transparent',
          borderRadius: '0.375rem'
        };
      case 'filled':
        return {
          border: 'none',
          backgroundColor: focused ? 'rgba(255, 255, 255, 0.09)' : 'rgba(0, 0, 0, 0.06)',
          borderRadius: '0.375rem'
        };
      case 'standard':
        return {
          border: 'none',
          borderBottom: focused ? '2px solid var(--primary-main, #3B82F6)' : 
                      error ? '1px solid var(--error, #EF4444)' : 
                      '1px solid var(--border-main, #D1D5DB)',
          backgroundColor: 'transparent',
          borderRadius: '0'
        };
      default:
        return {};
    }
  };
  
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: fullWidth ? '100%' : 'auto',
    marginBottom: '1rem',
    ...style
  };
  
  const labelStyle = {
    marginBottom: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: 500,
    color: error ? 'var(--error, #EF4444)' : 'var(--text-primary, #374151)'
  };
  
  const inputContainerStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  };
  
  const inputStyle = {
    width: '100%',
    ...sizeStyles[size],
    ...getVariantStyles(),
    color: disabled ? 'var(--text-disabled, #9CA3AF)' : 'var(--text-primary, #374151)',
    outline: 'none',
    transition: 'all 0.2s ease',
    paddingLeft: startIcon ? '2.5rem' : sizeStyles[size].padding,
    paddingRight: (endIcon || type === 'password') ? '2.5rem' : sizeStyles[size].padding,
    cursor: disabled ? 'not-allowed' : 'text',
    opacity: disabled ? 0.7 : 1
  };
  
  const iconStyle = {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: error ? 'var(--error, #EF4444)' : 
           focused ? 'var(--primary-main, #3B82F6)' : 
           'var(--text-secondary, #6B7280)',
    pointerEvents: 'none'
  };
  
  const startIconStyle = {
    ...iconStyle,
    left: '0.75rem'
  };
  
  const endIconStyle = {
    ...iconStyle,
    right: '0.75rem',
    pointerEvents: type === 'password' ? 'auto' : 'none',
    cursor: type === 'password' ? 'pointer' : 'default'
  };
  
  const helperTextStyle = {
    marginTop: '0.25rem',
    fontSize: '0.75rem',
    color: error ? 'var(--error, #EF4444)' : 'var(--text-secondary, #6B7280)'
  };
  
  return (
    <div style={containerStyle} className={`input-container ${className || ''}`}>
      {label && (
        <label 
          htmlFor={id} 
          style={labelStyle}
          className="input-label"
        >
          {label}
          {required && <span style={{ color: 'var(--error, #EF4444)', marginLeft: '0.25rem' }}>*</span>}
        </label>
      )}
      
      <div style={inputContainerStyle} className="input-wrapper">
        {startIcon && (
          <div style={startIconStyle} className="input-start-icon">
            {startIcon}
          </div>
        )}
        
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          maxLength={maxLength}
          min={min}
          max={max}
          step={step}
          pattern={pattern}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          name={name}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={inputStyle}
          className="input-field"
          {...props}
        />
        
        {type === 'password' && (
          <div 
            style={endIconStyle} 
            onClick={togglePasswordVisibility}
            className="input-password-toggle"
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </div>
        )}
        
        {endIcon && type !== 'password' && (
          <div style={endIconStyle} className="input-end-icon">
            {endIcon}
          </div>
        )}
      </div>
      
      {(helperText || error) && (
        <div style={helperTextStyle} className="input-helper-text">
          {helperText || error}
        </div>
      )}
    </div>
  );
};

export default Input;
