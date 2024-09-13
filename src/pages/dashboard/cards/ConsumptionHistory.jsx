import React from 'react';
import { Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts'; // MUI X Charts BarChart

const consumptionData = [
  { x: 'January', y: 50000 },
  { x: 'February', y: 60000 },
  { x: 'March', y: 55000 },
  { x: 'April', y: 40000 },
  { x: 'May', y: 45000 },
  { x: 'June', y: 47000 },
  { x: 'July', y: 43000 },
  { x: 'August', y: 52000 },
  { x: 'September', y: 61000 },
  { x: 'October', y: 64000 },
  { x: 'November', y: 58000 },
  { x: 'December', y: 67000 },
];

const chartSettings = {
  width: 500,
  height: 400,
  xAxis: [{ label: 'Consumption (kWh)' }],
};

const valueFormatter = (value) => `${value} kWh`;

const ConsumptionHistory = () => {
  return (
    <Card sx={{ flexGrow: 1, height: '100%' , width: '100%'}}> {/* Ensure full size of its parent container */}
      {/* Card Header for the title */}
      <CardHeader
        title="Consumption History"
        titleTypographyProps={{ variant: 'h6' }}
      />

      {/* Card Media for the Bar Chart */}
      <CardMedia>
        <BarChart
          series={[{ dataKey: 'y', label: 'kWh', valueFormatter }]}
          yAxis={[{ scaleType: 'band', dataKey: 'x' }]}
          layout="horizontal"
          dataset={consumptionData}
          {...chartSettings}
        />
      </CardMedia>

      {/* Card Content (optional, could be used for additional info if needed) */}
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          Monthly consumption data for the year.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ConsumptionHistory;