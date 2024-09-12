import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const MainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // Track whether the sidebar is collapsed

  const handleDrawerToggle = () => {
    setIsCollapsed(!isCollapsed); // Toggle the collapsed state
  };

  return (
    <Box sx={{ display: 'flex', width: '100vw', height: '100vh', flexDirection: 'column' }}>
      {/* Header */}
      <Box sx={{ width: '100%', position: 'fixed', top: 0, zIndex: 1200 }}>
        <Header handleDrawerToggle={handleDrawerToggle} />
      </Box>

      <Box sx={{ display: 'flex', flexGrow: 1, marginTop: '64px' }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: isCollapsed ? 80 : 240, // Adjust width of the sidebar based on collapse state
            transition: 'width 0.3s', // Smooth transition for collapse/expand
            backgroundColor: '#1E2940',
            height: '100%',
          }}
        >
          <Sidebar isCollapsed={isCollapsed} />
        </Box>

        {/* Main content area (automatically resizes using flex-grow) */}
        <Box 
          sx={{ 
            flexGrow: 1, // This will make the content area take the remaining space
            padding: '16px',
            transition: 'flex-grow 0.3s', // Optional smooth transition
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;