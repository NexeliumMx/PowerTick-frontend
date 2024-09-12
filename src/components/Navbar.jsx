import React from 'react';
import { AppBar, Toolbar, IconButton, InputBase, Avatar, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import WifiIcon from '@mui/icons-material/Wifi';
import TranslateIcon from '@mui/icons-material/Translate';

const Navbar = () => {
  return (
    <AppBar position="static" color="inherit" sx={{ boxShadow: 'none', borderBottom: '1px solid #f0f0f0' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Left side - Logo and Menu button */}
        <Box display="flex" alignItems="center">
          <IconButton edge="start" color="primary" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Box component="img" src="/path-to-logo.png" alt="Logo" sx={{ width: 40, height: 40 }} />
        </Box>

        {/* Center - Search bar */}
        <Box display="flex" alignItems="center" sx={{ backgroundColor: '#f0f0f0', px: 2, borderRadius: 2, width: '40%' }}>
          <SearchIcon sx={{ color: '#9e9e9e' }} />
          <InputBase
            placeholder="Search"
            inputProps={{ 'aria-label': 'search' }}
            sx={{ ml: 1, flex: 1 }}
          />
          <IconButton color="primary">
            <TuneIcon />
          </IconButton>
        </Box>

        {/* Right side - Icons */}
        <Box display="flex" alignItems="center">
          <IconButton color="primary">
            <WifiIcon />
          </IconButton>
          <IconButton color="primary">
            <TranslateIcon />
          </IconButton>
          <IconButton color="primary">
            <NotificationsIcon />
          </IconButton>
          <IconButton color="primary">
            <FullscreenIcon />
          </IconButton>
          <IconButton color="primary">
            <SettingsIcon />
          </IconButton>
          <Avatar alt="Profile" src="/path-to-avatar.jpg" sx={{ width: 40, height: 40 }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;