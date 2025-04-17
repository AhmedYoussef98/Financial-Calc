export const lightTheme = {
    name: 'light',
    colors: {
      // Primary palette - trustworthy blue tones
      primary: {
        main: '#0E4DA4',
        light: '#2E6BD6',
        dark: '#0A3272',
        contrast: '#FFFFFF',
      },
      // Secondary palette - success/growth green
      secondary: {
        main: '#137D4D',
        light: '#1AA967',
        dark: '#0E5C39',
        contrast: '#FFFFFF',
      },
      // Accent - financial gold
      accent: {
        main: '#D4AF37',
        light: '#F5CE5E',
        dark: '#A38829',
        contrast: '#000000',
      },
      // Feedback colors
      success: '#10B981',
      warning: '#FBBF24',
      error: '#EF4444',
      info: '#3B82F6',
      // Background shades
      background: {
        default: '#F9FAFB',
        paper: '#FFFFFF',
        card: '#FFFFFF',
        elevated: '#FFFFFF',
      },
      // Text colors
      text: {
        primary: '#111827',
        secondary: '#4B5563',
        disabled: '#9CA3AF',
        hint: '#6B7280',
      },
      // Border colors
      border: {
        light: '#E5E7EB',
        main: '#D1D5DB',
        dark: '#9CA3AF',
      },
      // Chart colors - optimized for financial data
      chart: [
        '#0E4DA4', '#137D4D', '#D4AF37', '#9333EA', 
        '#2E6BD6', '#1AA967', '#F5CE5E', '#A855F7',
        '#A3C2FF', '#86EFAC', '#FDE68A', '#C4B5FD'
      ],
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },
    typography: {
      fontFamily: '"Inter", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      fontWeights: {
        light: 300,
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
    },
    spacing: (factor) => `${0.25 * factor}rem`,
    borderRadius: {
      sm: '0.25rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
      full: '9999px',
    },
  };