import React, { useState } from 'react';
import { Card, CardContent, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';

const AccumulatedConsumption = () => {
  const [accumulatedPeriod, setAccumulatedPeriod] = useState('daily'); // Track the selected time period for Accumulated Consumption

  const handleAccumulatedPeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setAccumulatedPeriod(newPeriod); // Update Accumulated Consumption period
    }
  };

  return (
    <Card sx={{ flexGrow: 1, height: '100%' , width: '100%'}}> {/* Ensure full size of its parent container */}
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Accumulated Consumption
        </Typography>
        <Typography variant="h4" color="primary">
          70,000 kWh
        </Typography>

        {/* Action Buttons for Accumulated Consumption */}
        <ToggleButtonGroup
          value={accumulatedPeriod}
          exclusive
          onChange={handleAccumulatedPeriodChange}
          aria-label="Accumulated Consumption Time Period"
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

export default AccumulatedConsumption;