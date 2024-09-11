import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import App from './App.jsx';
import './styles/global.scss';
import theme from './themes/AppTheme.js'; // Import the custom theme

// Find the root element
const rootElement = document.getElementById('root');

// Create the root container using createRoot
const root = createRoot(rootElement);

// Render your application within the root and theme provider
root.render(
  <ThemeProvider theme={theme}>
    <Router>
      <App />
    </Router>
  </ThemeProvider>
);