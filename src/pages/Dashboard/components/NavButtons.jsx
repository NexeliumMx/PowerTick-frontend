import { Button, ButtonGroup, useTheme } from '@mui/material';
import { IconHeartbeat, IconGauge, IconSettings } from '@tabler/icons-react';

const NavButtons = ({ setActivePage }) => {
  const theme = useTheme();

  return (
    <ButtonGroup variant="contained" sx={{ borderRadius: '20px', backgroundColor: theme.palette.background.paper }}>
      <Button
        startIcon={<IconHeartbeat />}
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderRadius: '20px 0 0 20px',
          textTransform: 'none',
        }}
        onClick={() => setActivePage('Consumption')}
      >
        Consumption
      </Button>
      <Button
        startIcon={<IconGauge />}
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          textTransform: 'none',
        }}
        onClick={() => setActivePage('Measurements')}
      >
        Measurements
      </Button>
      <Button
        startIcon={<IconSettings />}
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderRadius: '0 20px 20px 0',
          textTransform: 'none',
        }}
        onClick={() => setActivePage('Configuration')}
      >
        Settings
      </Button>
    </ButtonGroup>
  );
};

export default NavButtons;