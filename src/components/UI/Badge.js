import React from 'react';

const Badge = ({ 
  children, 
  count, 
  max = 99, 
  color = 'primary', 
  variant = 'standard',
  showZero = false,
  dot = false,
  overlap = false,
  anchorOrigin = { vertical: 'top', horizontal: 'right' },
  ...props 
}) => {
  const displayCount = count > max ? `${max}+` : count;
  
  const shouldRender = dot || (showZero && count === 0) || count > 0;

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
  
  const badgeStyle = {
    position: 'relative',
    display: 'inline-flex',
    ...props.style
  };
  
  const badgeContentStyle = {
    position: 'absolute',
    top: anchorOrigin.vertical === 'top' ? 0 : 'auto',
    bottom: anchorOrigin.vertical === 'bottom' ? 0 : 'auto',
    right: anchorOrigin.horizontal === 'right' ? 0 : 'auto',
    left: anchorOrigin.horizontal === 'left' ? 0 : 'auto',
    transform: `translate(${anchorOrigin.horizontal === 'right' ? '50%' : '-50%'}, ${anchorOrigin.vertical === 'top' ? '-50%' : '50%'})`,
    backgroundColor: variant === 'standard' ? getColor() : 'transparent',
    color: variant === 'standard' ? 'white' : getColor(),
    border: variant === 'outlined' ? `2px solid ${getColor()}` : 'none',
    borderRadius: dot ? '50%' : '10px',
    padding: dot ? '0' : '0 6px',
    height: dot ? '8px' : '20px',
    minWidth: dot ? '8px' : '20px',
    fontSize: '12px',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    boxSizing: 'border-box',
    ...(overlap ? { top: anchorOrigin.vertical === 'top' ? '-8px' : 'auto', right: anchorOrigin.horizontal === 'right' ? '-8px' : 'auto' } : {})
  };
  
  return (
    <div className="badge" style={badgeStyle}>
      {children}
      {shouldRender && (
        <div className="badge-content" style={badgeContentStyle}>
          {!dot && displayCount}
        </div>
      )}
    </div>
  );
};

export default Badge;
