import React, { createContext, useState, useEffect } from 'react';
import { lightTheme } from './lightTheme';
import { darkTheme } from './darkTheme';

export const ThemeContext = createContext({
  theme: lightTheme,
  toggleTheme: () => {},
  isDark: false
});

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);
  
  // Check user preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      applyTheme(darkTheme);
    } else {
      applyTheme(lightTheme);
    }
  }, []);
  
  const applyTheme = (theme) => {
    const root = document.documentElement;
    
    // Apply CSS variables
    Object.entries(theme.colors).forEach(([key, value]) => {
      if (typeof value === 'object') {
        Object.entries(value).forEach(([subKey, subValue]) => {
          root.style.setProperty(`--${key}-${subKey}`, subValue);
        });
      } else {
        root.style.setProperty(`--${key}`, value);
      }
    });
    
    // Set theme-specific body properties
    document.body.style.backgroundColor = theme.colors.background.default;
    document.body.style.color = theme.colors.text.primary;
    document.body.classList.toggle('dark-theme', theme.name === 'dark');
  };
  
  const toggleTheme = () => {
    const newTheme = isDark ? lightTheme : darkTheme;
    setIsDark(!isDark);
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme.name);
  };
  
  return (
    <ThemeContext.Provider value={{ 
      theme: isDark ? darkTheme : lightTheme, 
      toggleTheme, 
      isDark 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};