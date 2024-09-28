import { useState } from 'react';
import { Card, CardHeader, CardContent, CardActions, ToggleButton, ToggleButtonGroup, Box, useTheme } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: '-60 min', kWh: 6, kVARh: 1 },
  { name: '-55 min', kWh: 7, kVARh: 2 },
  { name: '-50 min', kWh: 6.5, kVARh: 2.5 },
  { name: '-45 min', kWh: 6, kVARh: 2 },
  { name: '-40 min', kWh: 5.5, kVARh: 2.2 },
  { name: '-35 min', kWh: 6.5, kVARh: 1.8 },
  { name: '-30 min', kWh: 6, kVARh: 1 },
  { name: '-25 min', kWh: 5, kVARh: 3 },
  { name: '-20 min', kWh: 6.5, kVARh: 3 },
  { name: '-15 min', kWh: 6.8, kVARh: 2 },
  { name: '-10 min', kWh: 5.5, kVARh: 2.5 },
  { name: '-5 min', kWh: 6, kVARh: 2.3 },
  { name: '0 min', kWh: 7, kVARh: 3 },
];

const CustomTooltip = ({ active, payload, label, theme }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#fff',
          color: theme.palette.mode === 'dark' ? '#fff' : '#000',
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid',
          borderColor: theme.palette.divider,
        }}
      >
        <p>{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ color: entry.color }}>
            {entry.dataKey === 'kWh' ? `kWh: ${entry.value}` : `kVARh: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const HistoricConsumption = () => {
  const theme = useTheme();
  const [timeRange, setTimeRange] = useState('lastHour');

  const handleTimeRangeChange = (event, newTimeRange) => {
    if (newTimeRange !== null) {
      setTimeRange(newTimeRange);
      // Add your logic here to update the chart data based on the selected time range
    }
  };

  return (
    <Card sx={{ height: '100%', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
      <CardHeader title="Consumption History" />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ width: '100%', height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip theme={theme} />} />
              <Legend />
              <Bar dataKey="kWh" fill={theme.palette.primary.main} name="Total Real Energy Imported [kWh]" />
              <Bar dataKey="kVARh" fill={theme.palette.secondary.main} name="Total Reactive Energy Imported (Q1) [kVARh]" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
          <ToggleButtonGroup
            value={timeRange}
            exclusive
            onChange={handleTimeRangeChange}
            aria-label="Time Range"
          >
            <ToggleButton value="lastHour" aria-label="Last Hour">
              Last Hour
            </ToggleButton>
            {/*
            <ToggleButton value="last24Hours" aria-label="Last 24 Hours">
              Last 24 Hours
            </ToggleButton>
            <ToggleButton value="last30Days" aria-label="Last 30 Days">
              Last 30 Days
            </ToggleButton>
            */}
          </ToggleButtonGroup>
        </Box>
      </CardActions>
    </Card>
  );
};

export default HistoricConsumption;