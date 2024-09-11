import React, { useMemo, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Home from './pages/Home/Home.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Downloads from './pages/DownloadsPage/Downloads.jsx';
import LoadCenter from './pages/LoadCenter/LoadCenter.jsx';
import Locations from './pages/Locations/Locations.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import TestPage from './pages/TestPage/TestPage.jsx';
import Users from './pages/Users/Users.jsx';
import ColorModeSelect from './themes/ColorModeSelect.jsx'; // Import the ColorModeSelect component
import theme from './themes/AppTheme.js'; // Import your custom theme

const App = () => {
  // State to manage light/dark mode
  const [mode, setMode] = useState('light');

  // Function to toggle light/dark mode
  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    },
  }), []);

  // Create a theme instance based on the current mode
  const currentTheme = useMemo(() =>
    createTheme({
      palette: {
        mode,
      },
      typography: theme.typography, // Use your custom theme's typography if defined
      components: theme.components, // Use your custom theme's component styles
    }), [mode]
  );

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      {/* Add the ColorModeSelect component to toggle themes */}
      <div style={{ padding: '10px', display: 'flex', justifyContent: 'flex-end' }}>
        <ColorModeSelect toggleColorMode={colorMode.toggleColorMode} />
      </div>

      {/* Define your routes here */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/load-center" element={<LoadCenter />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/testpage" element={<TestPage />} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;