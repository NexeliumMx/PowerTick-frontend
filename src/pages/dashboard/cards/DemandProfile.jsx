import React from 'react';
import { Card, CardHeader, CardMedia, CardContent, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
import { useTheme } from '@mui/material/styles';

const demandProfileData = [
  { x: 'January', y: 240 },
  { x: 'February', y: 720 },
  { x: 'March', y: 480 },
  { x: 'April', y: 360 },
  { x: 'May', y: 300 },
  { x: 'June', y: 450 },
  { x: 'July', y: 260 },
  { x: 'August', y: 750 },
  { x: 'September', y: 320 },
  { x: 'October', y: 600 },
  { x: 'November', y: 400 },
  { x: 'December', y: 550 },
];

const DemandProfile = () => {
  const theme = useTheme();
  
  const uData = demandProfileData.map((item) => item.y); // Extract y-values
  const xLabels = demandProfileData.map((item) => item.x); // Extract x-axis labels

  return (
    <Card sx={{ flexGrow: 1, height: '100%' , width: '100%'}}> {/* Ensure full size of its parent container */}
      {/* CardHeader for the title */}
      <CardHeader
        title="Demand Profile"
        titleTypographyProps={{ variant: 'h6' }}
      />
      
      {/* CardMedia for the Line Chart */}
      <CardMedia>
        <LineChart
        
          width={500}
          height={300}
          series={[
            {
              data: uData, // Feed the y-values
              label: 'kW',
              area: true,
              showMark: false,
              curve: 'linear',
            },
          ]}
          xAxis={[
            {
              scaleType: 'point',
              data: xLabels, // Feed the x-axis labels
            },
          ]}
        />
      </CardMedia>

      {/* Optional CardContent for additional information */}
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          Monthly demand data for the year.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DemandProfile;