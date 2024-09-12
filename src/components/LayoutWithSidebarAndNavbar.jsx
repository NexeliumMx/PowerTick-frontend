import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Navbar from './Navbar'; // Import the Navbar component

const LayoutWithSidebarAndNavbar = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100vw' }}>
      <CssBaseline />

      {/* Full-width Navbar */}
      <Box sx={{ width: '100vw', position: 'fixed', zIndex: 1000 }}>
        <Navbar />
      </Box>

      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: '64px', width: '100vw' }}>
        {/* Page content will be rendered here */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default LayoutWithSidebarAndNavbar;