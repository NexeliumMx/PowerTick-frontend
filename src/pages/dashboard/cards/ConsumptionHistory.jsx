import React, { useState } from 'react';
import { Card, CardContent, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { BarChart } from '@mui/x-charts'; // MUI X Charts BarChart

const consumptionData = [
  { x: 'Jan', y: 50000 },
  { x: 'Febr', y: 60000 },
  { x: 'Mar', y: 55000 },
  { x: 'Apr', y: 40000 },
  { x: 'May', y: 45000 },
  { x: 'Jun', y: 47000 },
  { x: 'Jul', y: 43000 },
  { x: 'Aug', y: 52000 },
  { x: 'Sept', y: 61000 },
  { x: 'Oct', y: 64000 },
  { x: 'Nov', y: 58000 },
  { x: 'Dec', y: 67000 },
];

const chartSettings = {
  width: 850,
  height: 400,
  xAxis: [{ label: 'Consumption (kWh)' }],
};

const valueFormatter = (value) => `${value} kWh`;

const ConsumptionHistory = () => {
  const [consumptionPeriod, setConsumptionPeriod] = useState('yearly');

  const handleConsumptionPeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setConsumptionPeriod(newPeriod);
    }
  };

  return (
    <Card sx={{ height: '100%', minHeight: '300px' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Consumption History
        </Typography>
        <BarChart
          series={[{ dataKey: 'y', label: 'kWh', valueFormatter }]}
          yAxis={[{ scaleType: 'band', dataKey: 'x' }]}
          layout="horizontal"
          dataset={consumptionData}
          {...chartSettings}
        />
        {/* Move the toggle button group below the graph */}
        <ToggleButtonGroup
          value={consumptionPeriod}
          exclusive
          onChange={handleConsumptionPeriodChange}
          aria-label="Consumption History Period"
          sx={{ mt: 2 }}
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
      </CardContent>
    </Card>
  );
};

export default ConsumptionHistory;