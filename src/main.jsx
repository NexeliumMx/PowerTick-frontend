import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

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
    // Light theme colors will be the default MUI theme colors
  },
  colorSchemes: {
    dark: {
      palette: themeOptions.palette,
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);