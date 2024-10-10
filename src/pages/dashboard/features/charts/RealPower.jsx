import { useState } from 'react';
import { Card, CardHeader, CardContent, CardActions, ToggleButton, ToggleButtonGroup, Box, useTheme } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: '-60 min', kW: 5 },
  { name: '-55 min', kW: 5.5 },
  { name: '-50 min', kW: 5.7 },
  { name: '-45 min', kW: 5.3 },
  { name: '-40 min', kW: 4.9 },
  { name: '-35 min', kW: 5.1 },
  { name: '-30 min', kW: 5.6 },
  { name: '-25 min', kW: 5.9 },
  { name: '-20 min', kW: 6 },
  { name: '-15 min', kW: 5.7 },
  { name: '-10 min', kW: 5.4 },
  { name: '-5 min', kW: 5.9 },
  { name: '0 min', kW: 6.2 },
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
            {`kW: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const RealPower = () => {
  const theme = useTheme();
  const [timeRange, setTimeRange] = useState('lastHour');

  const handleTimeRangeChange = (event, newTimeRange) => {
    if (newTimeRange !== null) {
      setTimeRange(newTimeRange);
    }
  };

  return (
    <Card sx={{ height: '100%', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
      <CardHeader title="Real Power Demand History" />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ width: '100%', height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={theme.palette.secondary.main} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={theme.palette.secondary.light} stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.neutral.light} />
              <XAxis dataKey="name" stroke={theme.palette.neutral.light} />
              <YAxis stroke={theme.palette.neutral.light} />
              <Tooltip content={<CustomTooltip theme={theme} />} />
              <Legend />
              <Area
                name="Total Real Power [kW]"
                type="monotone"
                dataKey="kW"
                stroke={theme.palette.secondary.main}
                fill="url(#colorGradient)" // Utilizamos el gradiente para el área
                strokeWidth={2}
                dot={true}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
          <ToggleButtonGroup
            value={timeRange}
            exclusive
            onChange={handleTimeRangeChange}
            aria-label="Power Time Range"
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

export default RealPower;
