export const colors = {
  primary: '#007AFF',
  primaryDark: '#0056CC',
  secondary: '#FF6B6B',
  success: '#2ECC71',
  warning: '#F39C12',
  error: '#E74C3C',
  info: '#3498DB',
  
  // Text colors
  textPrimary: '#2C3E50',
  textSecondary: '#7F8C8D',
  textLight: '#BDC3C7',
  textWhite: '#FFFFFF',
  
  // Background colors
  background: '#F8F9FA',
  backgroundWhite: '#FFFFFF',
  backgroundGray: '#E8E8E8',
  
  // Border colors
  border: '#E0E0E0',
  borderLight: '#F0F0F0',
  
  // Gradients
  gradients: {
    primary: ['#007AFF', '#0056CC'],
    secondary: ['#FF6B6B', '#FF8E53'],
    success: ['#2ECC71', '#27AE60'],
    sunset: ['#FF6B6B', '#FF8E53'],
    ocean: ['#4ECDC4', '#44A08D'],
    sky: ['#45B7D1', '#96C93D'],
    purple: ['#F093FB', '#F5576C'],
    cyan: ['#4FACFE', '#00F2FE'],
    dark: ['#667eea', '#764ba2'],
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 28,
    display: 32,
  },
  weights: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
};

export const borderRadius = {
  sm: 6,
  md: 12,
  lg: 16,
  xl: 20,
  round: 50,
};

export const shadows = {
  sm: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  md: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  lg: {
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
};

export const layout = {
  headerHeight: 60,
  tabBarHeight: 80,
  containerPadding: 20,
};

// Common style mixins
export const mixins = {
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: shadows.md,
  fullWidth: {
    width: '100%',
  },
  flex1: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  spaceAround: {
    justifyContent: 'space-around',
  },
  alignCenter: {
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
};
