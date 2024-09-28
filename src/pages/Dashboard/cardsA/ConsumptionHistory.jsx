import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardActions, ToggleButton, ToggleButtonGroup, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '@mui/material/styles';

// Updated consumption data, removing kVARh and keeping only kWh
const consumptionData = [
  { name: 'Jan', kWh: 50 },
  { name: 'Feb', kWh: 60 },
  { name: 'Mar', kWh: 55 },
  { name: 'Apr', kWh: 40 },
  { name: 'May', kWh: 45 },
  { name: 'Jun', kWh: 47 },
  { name: 'Jul', kWh: 43 },
  { name: 'Aug', kWh: 52 },
  { name: 'Sept', kWh: 61 },
  { name: 'Oct', kWh: 64 },
  { name: 'Nov', kWh: 58 },
  { name: 'Dec', kWh: 67 },
];

const ConsumptionHistory = () => {
  const theme = useTheme(); // Access the current theme (light or dark)
  const [consumptionPeriod, setConsumptionPeriod] = useState('yearly');

  const handleConsumptionPeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setConsumptionPeriod(newPeriod);
    }
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader title="Consumption History" />

      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ width: '100%', height: '500px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={consumptionData} // Data without kVARh, only kWh
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              layout="vertical" // Vertical layout for horizontal bars
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                stroke={theme.palette.text.primary}
                label={{
                  value: 'kWh',
                  position: 'insideBottomRight',
                  offset: 10,
                  fill: theme.palette.text.primary,
                  dy: 15,
                  dx: 15,
                }}
              />
              <YAxis
                dataKey="name"
                type="category"
                stroke={theme.palette.text.primary}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#fff',
                  color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                  border: '1px solid',
                  borderColor: theme.palette.divider,
                }}
                labelStyle={{ color: theme.palette.text.primary }}
                formatter={(value) => `${value} kWh`}
              />
              <Legend /> {/* Ensure the legend is visible */}
              <Bar dataKey="kWh" fill={theme.palette.primary.main} barSize={20} name="kWh" /> {/* Only kWh data */}
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>

      {/* Replacing CardActionArea with CardActions and centering it */}
      <CardActions sx={{ justifyContent: 'center', mt: 2, mb: 2 }}>
        <ToggleButtonGroup
          value={consumptionPeriod}
          exclusive
          onChange={handleConsumptionPeriodChange}
          aria-label="Consumption History Period"
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
      </CardActions>
    </Card>
  );
};

export default ConsumptionHistory;