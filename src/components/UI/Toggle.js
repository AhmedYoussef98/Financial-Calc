import React from 'react';

const Toggle = ({
  checked = false,
  onChange,
  label,
  labelPlacement = 'end',
  disabled = false,
  color = 'primary',
  size = 'medium',
  name,
  value,
  required = false,
  id,
  style,
  className,
  ...props
}) => {
  const handleChange = (e) => {
    if (!disabled && onChange) {
      onChange({ target: { name, checked: e.target.checked, value } });
    }
  };
  
  const getColor = () => {
    switch (color) {
      case 'primary': return 'var(--primary-main, #3B82F6)';
      case 'secondary': return 'var(--secondary-main, #10B981)';
      case 'error': return 'var(--error, #EF4444)';
      case 'warning': return 'var(--warning, #F59E0B)';
      case 'info': return 'var(--info, #3B82F6)';
      case 'success': return 'var(--success, #10B981)';
      default: return color; // Allow custom color
    }
  };
  
  // Size-based styles
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          width: '32px',
          height: '16px',
          borderRadius: '8px',
          thumbSize: '12px',
          thumbOffset: checked ? '16px' : '2px'
        };
      case 'medium':
        return {
          width: '44px',
          height: '22px',
          borderRadius: '11px',
          thumbSize: '18px',
          thumbOffset: checked ? '22px' : '2px'
        };
      case 'large':
        return {
          width: '56px',
          height: '28px',
          borderRadius: '14px',
          thumbSize: '24px',
          thumbOffset: checked ? '28px' : '2px'
        };
      default:
        return {
          width: '44px',
          height: '22px',
          borderRadius: '11px',
          thumbSize: '18px',
          thumbOffset: checked ? '22px' : '2px'
        };
    }
  };
  
  const sizeStyles = getSizeStyles();
  
  const containerStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    flexDirection: labelPlacement === 'start' ? 'row-reverse' : 
                  labelPlacement === 'top' ? 'column-reverse' : 
                  labelPlacement === 'bottom' ? 'column' : 'row',
    gap: labelPlacement === 'top' || labelPlacement === 'bottom' ? '0.5rem' : '0.75rem',
    ...style
  };
  
  const toggleStyle = {
    position: 'relative',
    width: sizeStyles.width,
    height: sizeStyles.height,
    backgroundColor: checked ? getColor() : 'var(--border-main, #D1D5DB)',
    borderRadius: sizeStyles.borderRadius,
    transition: 'background-color 0.3s ease'
  };
  
  const thumbStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    left: sizeStyles.thumbOffset,
    width: sizeStyles.thumbSize,
    height: sizeStyles.thumbSize,
    backgroundColor: 'white',
    borderRadius: '50%',
    transition: 'left 0.3s ease, box-shadow 0.3s ease',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
  };
  
  const labelStyle = {
    fontSize: size === 'small' ? '0.875rem' : 
             size === 'large' ? '1.125rem' : '1rem',
    color: 'var(--text-primary, #374151)',
    userSelect: 'none'
  };
  
  return (
    <div 
      style={containerStyle} 
      className={`toggle-container ${className || ''}`}
      onClick={handleChange}
    >
      <div 
        style={toggleStyle}
        className={`toggle-track ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''}`}
      >
        <div 
          style={thumbStyle}
          className="toggle-thumb"
        />
        
        <input 
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          name={name}
          value={value}
          required={required}
          id={id}
          style={{ 
            opacity: 0,
            position: 'absolute',
            width: '100%',
            height: '100%',
            cursor: disabled ? 'not-allowed' : 'pointer'
          }}
          {...props}
        />
      </div>
      
      {label && (
        <label 
          htmlFor={id}
          style={labelStyle}
          className="toggle-label"
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Toggle;
