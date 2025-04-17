import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const StyledCard = styled(motion.div)`
  background-color: var(--background-card);
  color: var(--text-primary);
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: ${props => 
    props.elevation === 0 ? 'none' :
    props.elevation === 1 ? 'var(--shadow-sm)' :
    props.elevation === 2 ? 'var(--shadow-md)' :
    props.elevation === 3 ? 'var(--shadow-lg)' :
    'var(--shadow-md)'
  };
  transition: all 0.3s ease;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  border: ${props => props.outlined ? '1px solid var(--border-light)' : 'none'};
  
  ${props => props.interactive && `
    cursor: pointer;
    &:hover {
      transform: translateY(-4px);
      box-shadow: var(--shadow-lg);
    }
  `}
`;

const CardHeader = styled.div`
  padding: 1.25rem 1.5rem;
  border-bottom: ${props => props.divider ? '1px solid var(--border-light)' : 'none'};
  background-color: ${props => props.highlight ? 'var(--primary-main)' : 'inherit'};
  color: ${props => props.highlight ? 'var(--primary-contrast)' : 'inherit'};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
`;

const CardSubtitle = styled.p`
  margin: 0.5rem 0 0;
  font-size: 0.875rem;
  color: ${props => props.highlight ? 'rgba(255, 255, 255, 0.8)' : 'var(--text-secondary)'};
`;

const CardContent = styled.div`
  padding: 1.5rem;
`;

const CardActions = styled.div`
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: ${props => props.justifyContent || 'flex-end'};
  gap: 1rem;
  border-top: ${props => props.divider ? '1px solid var(--border-light)' : 'none'};
`;

const Card = ({
  children,
  elevation = 2,
  outlined = false,
  fullWidth = false,
  interactive = false,
  animate = true,
  ...props
}) => {
  const cardProps = animate ? {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
    viewport: { once: true }
  } : {};

  return (
    <StyledCard
      elevation={elevation}
      outlined={outlined}
      fullWidth={fullWidth}
      interactive={interactive}
      {...cardProps}
      {...props}
    >
      {children}
    </StyledCard>
  );
};

Card.Header = ({ children, title, subtitle, action, divider = false, highlight = false }) => (
  <CardHeader divider={divider} highlight={highlight}>
    <div>
      {title && <CardTitle>{title}</CardTitle>}
      {subtitle && <CardSubtitle highlight={highlight}>{subtitle}</CardSubtitle>}
      {children}
    </div>
    {action && <div>{action}</div>}
  </CardHeader>
);

Card.Content = ({ children }) => <CardContent>{children}</CardContent>;

Card.Actions = ({ children, divider = true, justifyContent }) => (
  <CardActions divider={divider} justifyContent={justifyContent}>
    {children}
  </CardActions>
);

export default Card;