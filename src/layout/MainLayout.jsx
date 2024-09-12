import React from 'react';
import { Box, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const MainLayout = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: 'flex', width: '100vw', height: '100vh', backgroundColor: theme.palette.background.default }}>
      {/* Sidebar */}
      <Sidebar drawerOpen={drawerOpen} handleDrawerToggle={handleDrawerToggle} />

      {/* Main content area */}
      <Box sx={{ flexGrow: 1 }}>
        <Header handleDrawerToggle={handleDrawerToggle} />
        <Box sx={{ padding: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;