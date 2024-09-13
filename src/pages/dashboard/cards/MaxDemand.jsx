import React, { useState } from 'react';
import { Card, CardContent, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';

const MaxDemand = () => {
  const [maxDemandPeriod, setMaxDemandPeriod] = useState('daily'); // Track the selected time period for Max Demand

  const handleMaxDemandPeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setMaxDemandPeriod(newPeriod); // Update Max Demand period
    }
  };

  return (
    <Card sx={{ flexGrow: 1, height: '100%' , width: '100%'}}> {/* Ensure full size of its parent container */}
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Max Demand
        </Typography>
        <Typography variant="h4" color="primary">
          10,000 kW
        </Typography>

        {/* Action Buttons for Max Demand */}
        <ToggleButtonGroup
          value={maxDemandPeriod}
          exclusive
          onChange={handleMaxDemandPeriodChange}
          aria-label="Max Demand Time Period"
          sx={{ mt: 2 }} // Add some margin top for spacing
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
      </CardContent>
    </Card>
  );
};

export default MaxDemand;