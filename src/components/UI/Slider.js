import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SliderContainer = styled.div`
  width: 100%;
  margin: 20px 0;
`;

const SliderLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-weight: 500;
`;

const SliderTitle = styled.span`
  color: var(--text-primary);
`;

const SliderValue = styled.span`
  color: var(--primary-main);
  font-weight: 600;
  background-color: rgba(var(--primary-main-rgb), 0.08);
  padding: 4px 8px;
  border-radius: 4px;
`;

const SliderTrack = styled.div`
  height: 6px;
  width: 100%;
  background-color: var(--border-light);
  border-radius: 999px;
  position: relative;
  cursor: pointer;
`;

const SliderFill = styled(motion.div)`
  height: 100%;
  background-color: var(--primary-main);
  border-radius: 999px;
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
`;

const SliderThumb = styled(motion.div)`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: white;
  border: 2px solid var(--primary-main);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: grab;
  z-index: 2;
  
  &:hover {
    box-shadow: 0 0 0 8px rgba(var(--primary-main-rgb), 0.15);
  }
  
  &:active {
    cursor: grabbing;
    box-shadow: 0 0 0 12px rgba(var(--primary-main-rgb), 0.2);
  }
`;

const SliderMarks = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`;

const SliderMark = styled.div`
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -14px;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 6px;
    background-color: var(--border-main);
  }
  
  span {
    font-size: 0.75rem;
    color: var(--text-secondary);
  }
`;

const Slider = ({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  label,
  formatter = value => value,
  showMarks = false,
  markCount = 5,
  markValues = null,
  ...props
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef(null);
  
  const handleTrackClick = (e) => {
    if (!trackRef.current) return;
    
    const trackRect = trackRef.current.getBoundingClientRect();
    const clickX = e.clientX - trackRect.left;
    const percentageX = clickX / trackRect.width;
    let newValue = min + (max - min) * percentageX;
    
    // Snap to step
    newValue = Math.round(newValue / step) * step;
    
    // Ensure within range
    newValue = Math.max(min, Math.min(max, newValue));
    
    onChange(newValue);
  };
  
  const handleMouseDown = () => {
    setIsDragging(true);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleMouseMove = (e) => {
    if (!isDragging || !trackRef.current) return;
    handleTrackClick(e);
  };
  
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);
  
  // Calculate slider position
  const percentage = ((value - min) / (max - min)) * 100;
  
  // Generate marks if needed
  const marks = markValues || 
    (showMarks ? Array.from({ length: markCount }).map((_, i) => {
      const markValue = min + (max - min) * (i / (markCount - 1));
      return Math.round(markValue);
    }) : []);
  
  return (
    <SliderContainer {...props}>
      {label && (
        <SliderLabel>
          <SliderTitle>{label}</SliderTitle>
          <SliderValue>{formatter(value)}</SliderValue>
        </SliderLabel>
      )}
      
      <SliderTrack
        ref={trackRef}
        onClick={handleTrackClick}
      >
        <SliderFill 
          initial={false}
          animate={{ width: `${percentage}%` }}
          transition={{ type: 'spring', bounce: 0.2 }}
        />
        <SliderThumb 
          style={{ left: `${percentage}%` }}
          onMouseDown={handleMouseDown}
          whileTap={{ scale: 1.2 }}
        />
      </SliderTrack>
      
      {showMarks && (
        <SliderMarks>
          {marks.map((mark, index) => (
            <SliderMark key={index}>
              <span>{formatter(mark)}</span>
            </SliderMark>
          ))}
        </SliderMarks>
      )}
    </SliderContainer>
  );
};

export default Slider;