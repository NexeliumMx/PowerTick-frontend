import React, { useState } from 'react';
import { Card, CardHeader, CardContent, Typography, ToggleButton, ToggleButtonGroup, CardActionArea, Box } from '@mui/material';

const MaxDemand = () => {
  const [maxDemandPeriod, setMaxDemandPeriod] = useState('daily'); // Track the selected time period for Max Demand

  const handleMaxDemandPeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setMaxDemandPeriod(newPeriod); // Update Max Demand period
    }
  };

  return (
    <Card sx={{ flexGrow: 1, height: '100%', width: '100%' }}> {/* Ensure full size of its parent container */}
      <CardHeader
        title="Max Demand"
      />
      
      <CardContent>
        <Typography variant="h4" color="primary">
          10,000 kW
        </Typography>
      </CardContent>
      
      {/* Wrap the ToggleButtonGroup in CardActionArea */}
      <CardActionArea>
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
            <ToggleButton value="monthly" aria-label="Monthly">
              Monthly
            </ToggleButton>
            <ToggleButton value="yearly" aria-label="Yearly">
              Yearly
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default MaxDemand;