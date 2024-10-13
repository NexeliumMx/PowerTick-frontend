import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  CardActions,
  Box,
  useTheme,
} from '@mui/material';

const AccumulatedConsumption = () => {
  // Set the default state to 'monthly'
  const [accumulatedPeriod, setAccumulatedPeriod] = useState('monthly');

  // Access the MUI theme
  const theme = useTheme();

  const handleAccumulatedPeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setAccumulatedPeriod(newPeriod);
    }
  };

  return (
    <Card sx={{ flexGrow: 1, height: '100%', width: '100%' }}>
      <CardHeader title="Accumulated Consumption" />

      <CardContent>
        {/* First Box for kWh */}
        <Box 
          sx={{ 
            textAlign: 'center', 
            mt: 2, 
            mb: 2, 
            backgroundColor: theme.palette.secondary.main, // Primary background color
            padding: 2, 
            borderRadius: 10,
          }}
        >
          <Typography variant="h4">
            70,000 kWh
          </Typography>
        </Box>

        {/* Second Box for kVArh */}
        <Box 
          sx={{ 
            textAlign: 'center', 
            mt: 2, 
            mb: 2, 
            backgroundColor: theme.palette.secondary.main, // Primary background color
            padding: 2, 
            borderRadius: 10,
          }}
        >
          <Typography variant="h4">
            70,000 kVArh
          </Typography>
        </Box>
      </CardContent>

      {/* Centering the buttons inside CardActions */}
      <CardActions sx={{ justifyContent: 'center', mt: 2, mb: 2 }}>
        <ToggleButtonGroup
          value={accumulatedPeriod} // The default value will be 'monthly'
          exclusive
          onChange={handleAccumulatedPeriodChange}
          aria-label="Accumulated Consumption Time Period"
        >
          {/*
          <ToggleButton value="daily" aria-label="Daily">
            Daily
          </ToggleButton>
          */}
          <ToggleButton value="monthly" aria-label="Monthly">
            Monthly
          </ToggleButton>
          {/*
          <ToggleButton value="yearly" aria-label="Yearly">
            Yearly
          </ToggleButton>
          */}
        </ToggleButtonGroup>
      </CardActions>
    </Card>
  );
};

export default AccumulatedConsumption;