import { useState } from 'react';
import { Card, CardHeader, CardContent, CardActions, ToggleButton, ToggleButtonGroup, Box, useTheme } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: '-60 min', kVAR: 4 },
  { name: '-55 min', kVAR: 4.5 },
  { name: '-50 min', kVAR: 5 },
  { name: '-45 min', kVAR: 4.2 },
  { name: '-40 min', kVAR: 3.5 },
  { name: '-35 min', kVAR: 4 },
  { name: '-30 min', kVAR: 4.8 },
  { name: '-25 min', kVAR: 5.5 },
  { name: '-20 min', kVAR: 5.7 },
  { name: '-15 min', kVAR: 5.3 },
  { name: '-10 min', kVAR: 4.9 },
  { name: '-5 min', kVAR: 5.5 },
  { name: '0 min', kVAR: 6 },
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
            {`kVAR: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const ReactivePower = () => {
  const theme = useTheme();
  const [timeRange, setTimeRange] = useState('lastHour');

  const handleTimeRangeChange = (event, newTimeRange) => {
    if (newTimeRange) {
      setTimeRange(newTimeRange);
    }
  };

  return (
    <Card sx={{ height: '100%', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
      <CardHeader title="Reactive Power Demand History" />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ width: '100%', height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip theme={theme} />} />
              <Legend />
              <Line type="monotone" dataKey="kVAR" stroke={theme.palette.primary.main} dot={true} name="Total Reactive Power [kVAR]" />
            </LineChart>
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
            */}
          </ToggleButtonGroup>
        </Box>
      </CardActions>
    </Card>
  );
};

export default ReactivePower;