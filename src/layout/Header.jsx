import React from 'react';
import { Box, Avatar, InputBase, IconButton, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IconSearch, IconBell, IconSettings, IconMenu2 } from '@tabler/icons-react';

const Header = ({ handleDrawerToggle }) => {
  const theme = useTheme(); // Access the theme
  const navigate = useNavigate();

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '16px 24px',
        backgroundColor: theme.palette.background.paper, // Use theme background color
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)' 
      }}
    >
      {/* Logo */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton onClick={handleDrawerToggle} sx={{ marginRight: 2 }}>
          <IconMenu2 />
        </IconButton>
        <Avatar 
          src="path/to/logo.png" 
          alt="Logo" 
          sx={{ width: 40, height: 40, cursor: 'pointer' }} 
          onClick={() => navigate('/')}
        />
      </Box>

      {/* Search Bar */}
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          backgroundColor: theme.palette.background.default, // Use theme background
          borderRadius: '8px', 
          padding: '0 8px', 
          width: '300px' 
        }}
      >
        <IconSearch style={{ marginRight: '8px' }} />
        <InputBase
          placeholder="Search..."
          sx={{ flexGrow: 1, color: theme.palette.text.primary }} // Use theme text color
        />
      </Box>

      {/* Icons */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <IconButton>
          <IconBell />
        </IconButton>
        <IconButton>
          <IconSettings />
        </IconButton>
        <Avatar
          src="path/to/profile.jpg"
          alt="Profile"
          sx={{ width: 40, height: 40, cursor: 'pointer' }}
          onClick={() => navigate('/profile')}
        />
      </Box>
    </Box>
  );
};

export default Header;