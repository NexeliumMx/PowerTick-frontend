import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  CardActionArea,
  Box,
} from '@mui/material';

const AccumulatedConsumption = () => {
  const [accumulatedPeriod, setAccumulatedPeriod] = useState('daily');

  const handleAccumulatedPeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setAccumulatedPeriod(newPeriod);
    }
  };

  return (
    <Card sx={{ flexGrow: 1, height: '100%', width: '100%' }}>
      <CardHeader title="Accumulated Consumption" />

      <CardContent>
        <Typography variant="h4" color="primary">
          70,000 kWh
        </Typography>
      </CardContent>

      {/* Change CardActionArea to render as a 'div' to prevent button nesting */}
      <CardActionArea component="div">
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
          <ToggleButtonGroup
            value={accumulatedPeriod}
            exclusive
            onChange={handleAccumulatedPeriodChange}
            aria-label="Accumulated Consumption Time Period"
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

export default AccumulatedConsumption;