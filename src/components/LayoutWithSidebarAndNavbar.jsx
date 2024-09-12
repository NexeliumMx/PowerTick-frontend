import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline } from '@mui/material';
import Navbar from './Navbar'; // Import the Navbar component
import Sidebar from './Sidebar'; // Import the Sidebar component

const LayoutWithSidebarAndNavbar = () => {
  return (
    <Box sx={{ display: 'flex', width: '100vw' }}>
      <CssBaseline />

      {/* Navbar */}
      <Box sx={{ width: '100vw', position: 'fixed', top: 0, zIndex: 1000 }}>
        <Navbar />
      </Box>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          mt: '64px', // Ensures the content is below the navbar
          overflowX: 'hidden', // Prevent horizontal scroll
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default LayoutWithSidebarAndNavbar;