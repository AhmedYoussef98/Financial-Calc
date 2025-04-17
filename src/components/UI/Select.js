import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCheck } from '@fortawesome/free-solid-svg-icons';

const Select = ({
  id,
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  error,
  helperText,
  fullWidth = false,
  disabled = false,
  required = false,
  multiple = false,
  variant = 'outlined',
  size = 'medium',
  name,
  onFocus,
  onBlur,
  style,
  className,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const selectRef = useRef(null);
  
  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
      setFocused(false);
    }
  };
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setFocused(!isOpen);
      
      if (onFocus && !isOpen) onFocus();
      if (onBlur && isOpen) onBlur();
    }
  };
  
  const handleOptionClick = (optionValue) => {
    if (multiple) {
      const newValue = Array.isArray(value) ? [...value] : [];
      const index = newValue.indexOf(optionValue);
      
      if (index === -1) {
        newValue.push(optionValue);
      } else {
        newValue.splice(index, 1);
      }
      
      onChange({ target: { name, value: newValue } });
    } else {
      onChange({ target: { name, value: optionValue } });
      setIsOpen(false);
    }
  };
  
  const isSelected = (optionValue) => {
    if (multiple) {
      return Array.isArray(value) && value.includes(optionValue);
    }
    return value === optionValue;
  };
  
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
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: fullWidth ? '100%' : '200px',
    marginBottom: '1rem',
    ...style
  };
  
  const labelStyle = {
    marginBottom: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: 500,
    color: error ? 'var(--error, #EF4444)' : 'var(--text-primary, #374151)'
  };
  
  const selectStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    cursor: disabled ? 'not-allowed' : 'pointer',
    ...sizeStyles[size],
    ...getVariantStyles(),
    color: disabled ? 'var(--text-disabled, #9CA3AF)' : 
          !value || (Array.isArray(value) && value.length === 0) ? 'var(--text-secondary, #6B7280)' : 
          'var(--text-primary, #374151)',
    opacity: disabled ? 0.7 : 1,
    userSelect: 'none'
  };
  
  const dropdownStyle = {
    position: 'absolute',
    top: 'calc(100% + 5px)',
    left: 0,
    width: '100%',
    maxHeight: '215px',
    overflowY: 'auto',
    backgroundColor: 'var(--background-paper, white)',
    borderRadius: '0.375rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    zIndex: 10,
    display: isOpen ? 'block' : 'none'
  };
  
  const optionStyle = {
    padding: '0.75rem 1rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'background-color 0.2s ease'
  };
  
  const selectedOptionStyle = {
    backgroundColor: 'rgba(var(--primary-main-rgb, 59, 130, 246), 0.08)',
    color: 'var(--primary-main, #3B82F6)'
  };
  
  const hoverOptionStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.04)'
  };
  
  const helperTextStyle = {
    marginTop: '0.25rem',
    fontSize: '0.75rem',
    color: error ? 'var(--error, #EF4444)' : 'var(--text-secondary, #6B7280)'
  };
  
  // Get display value
  const getDisplayValue = () => {
    if (multiple) {
      if (!Array.isArray(value) || value.length === 0) {
        return placeholder;
      }
      
      if (value.length === 1) {
        const option = options.find(opt => opt.value === value[0]);
        return option ? option.label : value[0];
      }
      
      return `${value.length} items selected`;
    } else {
      if (!value) {
        return placeholder;
      }
      
      const option = options.find(opt => opt.value === value);
      return option ? option.label : value;
    }
  };
  
  return (
    <div 
      style={containerStyle} 
      className={`select-container ${className || ''}`}
      ref={selectRef}
    >
      {label && (
        <label 
          htmlFor={id} 
          style={labelStyle}
          className="select-label"
        >
          {label}
          {required && <span style={{ color: 'var(--error, #EF4444)', marginLeft: '0.25rem' }}>*</span>}
        </label>
      )}
      
      <div 
        style={selectStyle}
        onClick={toggleDropdown}
        className={`select-control ${focused ? 'focused' : ''} ${error ? 'error' : ''}`}
      >
        <span>{getDisplayValue()}</span>
        <FontAwesomeIcon 
          icon={faChevronDown} 
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform 0.2s ease',
            color: 'var(--text-secondary, #6B7280)'
          }}
        />
      </div>
      
      <div style={dropdownStyle} className="select-dropdown">
        {options.map((option) => (
          <div 
            key={option.value}
            onClick={() => handleOptionClick(option.value)}
            style={{
              ...optionStyle,
              ...(isSelected(option.value) ? selectedOptionStyle : {})
            }}
            className={`select-option ${isSelected(option.value) ? 'selected' : ''}`}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.04)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = isSelected(option.value) ? 
                selectedOptionStyle.backgroundColor : '';
            }}
          >
            <span>{option.label}</span>
            {isSelected(option.value) && (
              <FontAwesomeIcon 
                icon={faCheck} 
                style={{ color: 'var(--primary-main, #3B82F6)' }}
              />
            )}
          </div>
        ))}
        
        {options.length === 0 && (
          <div style={{ ...optionStyle, color: 'var(--text-secondary, #6B7280)' }}>
            No options available
          </div>
        )}
      </div>
      
      {(helperText || error) && (
        <div style={helperTextStyle} className="select-helper-text">
          {helperText || error}
        </div>
      )}
    </div>
  );
};

export default Select;
