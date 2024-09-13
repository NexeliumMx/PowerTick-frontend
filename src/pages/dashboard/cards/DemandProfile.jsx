import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, ToggleButton, ToggleButtonGroup, CardActionArea } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { useTheme } from '@mui/material/styles';

const demandProfileData = [
  { x: 'Jan', y: 240 },
  { x: 'Feb', y: 720 },
  { x: 'Mar', y: 480 },
  { x: 'Apr', y: 360 },
  { x: 'May', y: 300 },
  { x: 'Jun', y: 450 },
  { x: 'Jul', y: 260 },
  { x: 'Aug', y: 750 },
  { x: 'Sept', y: 320 },
  { x: 'Oct', y: 600 },
  { x: 'Nov', y: 400 },
  { x: 'Dec', y: 550 },
];

const DemandProfile = () => {
  const theme = useTheme();
  const [demandPeriod, setDemandPeriod] = useState('yearly');

  const handleDemandPeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setDemandPeriod(newPeriod);
    }
  };

  const uData = demandProfileData.map((item) => item.y); // Extract y-values
  const xLabels = demandProfileData.map((item) => item.x); // Extract x-axis labels

  return (
    <Card sx={{ height: '100%', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" gutterBottom>
          Demand Profile
        </Typography>
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          <LineChart
            sx={{ width: '100%', height: '100%' }} // Use full width and height of the parent container
            series={[
              {
                data: uData,
                label: 'kW',
                area: true,
                showMark: false,
                curve: 'linear',
              },
            ]}
            xAxis={[
              {
                scaleType: 'point',
                data: xLabels,
              },
            ]}
          />
        </Box>
      </CardContent>
      {/* Wrap ToggleButtonGroup with CardActionArea */}
      <CardActionArea>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
          <ToggleButtonGroup
            value={demandPeriod}
            exclusive
            onChange={handleDemandPeriodChange}
            aria-label="Demand Profile Period"
          >
            <ToggleButton value="yearly" aria-label="Yearly">
              Yearly
            </ToggleButton>
            <ToggleButton value="monthly" aria-label="Monthly">
              Monthly
            </ToggleButton>
            <ToggleButton value="daily" aria-label="Daily">
              Daily
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default DemandProfile;