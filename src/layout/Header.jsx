import React from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import { IconSearch, IconBell, IconSettings, IconMenu2, IconSun, IconMoon, IconDeviceDesktop } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useColorScheme } from '@mui/material/styles';

const Header = ({ handleDrawerToggle }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { mode, setMode } = useColorScheme(); // Get the current mode and function to change mode

  // Cycle between "light", "dark", and "system" modes
  const toggleColorMode = () => {
    if (mode === 'light') {
      setMode('dark');
    } else if (mode === 'dark') {
      setMode('system');
    } else {
      setMode('light');
    }
  };

  // Choose the appropriate icon based on the current mode
  const getContrastIcon = () => {
    if (mode === 'light') {
      return <IconSun />;
    } else if (mode === 'dark') {
      return <IconMoon />;
    } else {
      return <IconDeviceDesktop />;
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '16px 24px',
        backgroundColor: theme.palette.background.paper, 
        width: '100%' 
      }}
    >
      {/* Left Section: Logo and Menu Toggle */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* Logo */}
        <img 
          src="src/assets/logoipsum-288.svg" 
          alt="Logo" 
          style={{ width: '150px', height: '40px', cursor: 'pointer' }}
          onClick={() => navigate('/')} 
        />
        
        {/* Menu Toggle Button */}
        <IconButton onClick={handleDrawerToggle}>
          <IconMenu2 />
        </IconButton>
      </Box>

      {/* Center: Search Bar */}
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          backgroundColor: theme.palette.background.default, 
          borderRadius: '8px', 
          padding: '0.5rem', 
          width: '300px' 
        }}
      >
        <IconSearch style={{ marginRight: '8px' }} />
        <input
          placeholder="Search..."
          style={{ 
            border: 'none', 
            background: 'transparent', 
            color: theme.palette.text.primary, 
            width: '100%', 
            outline: 'none' 
          }}
        />
      </Box>

      {/* Right Section: Contrast Toggle, Notifications and Settings */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {/* Contrast Toggle Icon */}
        <IconButton onClick={toggleColorMode}>
          {getContrastIcon()}
        </IconButton>

        {/* Notifications and Settings */}
        <IconButton>
          <IconBell />
        </IconButton>
        <IconButton>
          <IconSettings />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;