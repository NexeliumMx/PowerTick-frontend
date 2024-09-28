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

const MaxDemand = () => {
  const [maxDemandPeriod, setMaxDemandPeriod] = useState('daily');
  
  // Access the MUI theme
  const theme = useTheme();

  const handleMaxDemandPeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setMaxDemandPeriod(newPeriod);
    }
  };

  return (
    <Card sx={{ flexGrow: 1, height: '100%', width: '100%' }}>
      <CardHeader title="Max Demand" />

      <CardContent>
        {/* First Box for kW */}
        <Box 
          sx={{ 
            textAlign: 'center', 
            mt: 2, 
            mb: 2, 
            backgroundColor: theme.palette.primary.main, // Primary background color
            padding: 2, 
            borderRadius: 10,
          }}
        >
          <Typography variant="h4">
            10,000 kW
          </Typography>
        </Box>

        {/* Second Box for kVAR */}
        <Box 
          sx={{ 
            textAlign: 'center', 
            mt: 2, 
            mb: 2, 
            backgroundColor: theme.palette.primary.main, // Primary background color
            padding: 2, 
            borderRadius: 10,
          }}
        >
          <Typography variant="h4">
            10,000 kVAR
          </Typography>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
          <ToggleButtonGroup
            value={maxDemandPeriod}
            exclusive
            onChange={handleMaxDemandPeriodChange}
            aria-label="Max Demand Time Period"
          >
            <ToggleButton value="daily" aria-label="Daily">
              Daily
            </ToggleButton>
            {/*
            <ToggleButton value="monthly" aria-label="Monthly">
              Monthly
            </ToggleButton>
            <ToggleButton value="yearly" aria-label="Yearly">
              Yearly
            </ToggleButton>
            */}
          </ToggleButtonGroup>
        </Box>
      </CardActions>
    </Card>
  );
};

export default MaxDemand;