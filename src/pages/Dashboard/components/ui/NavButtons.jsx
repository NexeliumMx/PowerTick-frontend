import { useState } from 'react';
import { Button, useTheme, Box } from '@mui/material';
import { Activity, Gauge, Settings } from 'lucide-react'; 

const NavButtons = ({ setActivePage }) => {
  const theme = useTheme();
  const [activeButton, setActiveButton] = useState('Overview'); // Updated to 'Overview'

  const buttons = [
    { id: 'Overview', label: 'Overview', icon: <Activity /> }, // Updated 'Consumption' to 'Overview'
    { id: 'Measurements', label: 'Measurements', icon: <Gauge /> },
    { id: 'Configuration', label: 'Configuration', icon: <Settings /> },
  ];

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
    setActivePage(buttonId);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.paper,
        padding: '0.5rem',
        borderRadius: '30px',
      }}
    >
      {buttons.map((button) => (
        <Button
          key={button.id}
          startIcon={button.icon}
          onClick={() => handleButtonClick(button.id)}
          sx={{
            borderRadius: '30px',
            padding: '0.3rem 1rem',
            textTransform: 'none',
            backgroundColor: activeButton === button.id ? theme.palette.primary.main : theme.palette.background.paper,
            color: activeButton === button.id ? theme.palette.common.white : theme.palette.text.primary,
            '&:hover': {
              backgroundColor: activeButton === button.id ? theme.palette.primary.dark : theme.palette.action.hover,
            },
            marginRight: '0.5rem',
            '&:last-child': {
              marginRight: 0,
            },
          }}
        >
          {button.label}
        </Button>
      ))}
    </Box>
  );
};

export default NavButtons;