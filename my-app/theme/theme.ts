export const theme = {
  colors: {
    // Background colors
    background: {
      primary: 'bg-black',
      secondary: 'bg-gray-950',
      tertiary: 'bg-gray-900',
      hover: 'hover:bg-gray-900',
      card: 'bg-black',
    },
    
    // Border colors
    border: {
      primary: 'border-gray-900',
      secondary: 'border-gray-800',
      hover: 'hover:border-gray-800',
      light: 'border-gray-100',
    },
    
    // Text colors
    text: {
      primary: 'text-white',
      secondary: 'text-gray-300',
      tertiary: 'text-gray-400',
      muted: 'text-gray-500',
      link: 'text-blue-400',
    },
    
    // Status colors
    status: {
      success: {
        bg: 'bg-green-900/20',
        text: 'text-green-400',
        border: 'border-green-900',
      },
      error: {
        bg: 'bg-red-900/20',
        text: 'text-red-400',
        border: 'border-red-900',
      },
      warning: {
        bg: 'bg-yellow-900/20',
        text: 'text-yellow-400',
        border: 'border-yellow-900',
      },
      info: {
        bg: 'bg-blue-900/20',
        text: 'text-blue-400',
        border: 'border-blue-900',
      },
      inactive: {
        bg: 'bg-gray-900/20',
        text: 'text-gray-500',
        border: 'border-gray-900',
      },
    },
    
    // Action colors
    action: {
      primary: {
        bg: 'bg-blue-600',
        hover: 'hover:bg-blue-700',
        text: 'text-white',
      },
      secondary: {
        bg: 'bg-gray-800',
        hover: 'hover:bg-gray-700',
        text: 'text-gray-300',
      },
      danger: {
        bg: 'bg-red-600',
        hover: 'hover:bg-red-700',
        text: 'text-white',
      },
    },
    
    // Gradient colors for agent types
    gradients: {
      email: 'from-blue-500 to-blue-600',
      notifier: 'from-green-500 to-green-600',
      proposal: 'from-purple-500 to-purple-600',
      scraper: 'from-orange-500 to-orange-600',
      default: 'from-gray-700 to-gray-800',
    },
  },
  
  // Spacing
  spacing: {
    xs: 'p-2',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12',
  },
  
  // Border radius
  rounded: {
    sm: 'rounded',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  },
  
  // Typography
  typography: {
    h1: 'text-3xl font-bold',
    h2: 'text-2xl font-bold',
    h3: 'text-xl font-semibold',
    h4: 'text-lg font-semibold',
    body: 'text-sm',
    small: 'text-xs',
  },
  
  // Shadows
  shadow: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    none: 'shadow-none',
  },
  
  // Transitions
  transition: {
    fast: 'transition-all duration-150',
    normal: 'transition-all duration-300',
    slow: 'transition-all duration-500',
  },
};

// Helper functions
export const getStatusColor = (status: 'success' | 'error' | 'warning' | 'info' | 'inactive') => {
  return theme.colors.status[status];
};

export const getAgentGradient = (type: string) => {
  switch (type.toLowerCase()) {
    case 'email':
    case 'invoice_automation':
      return theme.colors.gradients.email;
    case 'notifier':
      return theme.colors.gradients.notifier;
    case 'proposal_generator':
      return theme.colors.gradients.proposal;
    case 'scraper':
      return theme.colors.gradients.scraper;
    default:
      return theme.colors.gradients.default;
  }
};

export const getButtonClasses = (variant: 'primary' | 'secondary' | 'danger' = 'primary') => {
  const base = `px-4 py-2 rounded-md font-medium ${theme.transition.normal}`;
  const colors = theme.colors.action[variant];
  return `${base} ${colors.bg} ${colors.hover} ${colors.text}`;
};

export const getCardClasses = () => {
  return `${theme.colors.background.card} ${theme.colors.border.primary} border ${theme.rounded.lg} ${theme.transition.normal} ${theme.colors.border.hover}`;
};

