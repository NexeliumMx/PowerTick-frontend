// theme.js
import { createTheme } from '@mui/material';

// Dark mode theme options
const themeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#69B2A6',
    },
    secondary: {
      main: '#F2A007',
    },
    background: {
      default: '#111A2B',
      paper: '#1E2940',
    },
  },
};

// Create a theme with both light and dark modes
const theme = createTheme({
  palette: {
    mode: 'light', // Default light mode
    primary: {
      main: '#69B2A6',
    },
    secondary: {
      main: '#F2A007',
    },
    background: {
      default: '#eef2f6',
      paper: '#ffffff',
    },
  },
  colorSchemes: {
    dark: {
      palette: themeOptions.palette,
    },
  },
});

export default theme;