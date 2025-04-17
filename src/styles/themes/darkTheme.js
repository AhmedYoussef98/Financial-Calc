export const darkTheme = {
    name: 'dark',
    colors: {
      primary: {
        main: '#3B82F6',
        light: '#60A5FA',
        dark: '#2563EB',
        contrast: '#FFFFFF',
      },
      secondary: {
        main: '#10B981', 
        light: '#34D399',
        dark: '#059669',
        contrast: '#FFFFFF',
      },
      accent: {
        main: '#F59E0B',
        light: '#FBBF24',
        dark: '#D97706',
        contrast: '#000000',
      },
      success: '#059669',
      warning: '#D97706',
      error: '#DC2626',
      info: '#3B82F6',
      background: {
        default: '#111827',
        paper: '#1F2937',
        card: '#1F2937',
        elevated: '#374151',
      },
      text: {
        primary: '#F9FAFB',
        secondary: '#D1D5DB',
        disabled: '#6B7280',
        hint: '#9CA3AF',
      },
      border: {
        light: '#374151',
        main: '#4B5563',
        dark: '#6B7280',
      },
      chart: [
        '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', 
        '#60A5FA', '#34D399', '#FBBF24', '#A78BFA',
        '#93C5FD', '#6EE7B7', '#FCD34D', '#C4B5FD'
      ],
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.25)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.26)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.25)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.24)',
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