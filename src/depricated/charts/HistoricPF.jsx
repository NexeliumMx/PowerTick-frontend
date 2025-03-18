import { useState } from 'react';
import { Card, CardHeader, CardContent, CardActions, ToggleButton, ToggleButtonGroup, Box, useTheme } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: '-60 min', pf: 0.91 },
  { name: '-55 min', pf: 0.92 },
  { name: '-50 min', pf: 0.94 },
  { name: '-45 min', pf: 0.96 },
  { name: '-40 min', pf: 0.93 },
  { name: '-35 min', pf: 0.92 },
  { name: '-30 min', pf: 0.91 },
  { name: '-25 min', pf: 0.93 },
  { name: '-20 min', pf: 0.95 },
  { name: '-15 min', pf: 0.97 },
  { name: '-10 min', pf: 0.99 },
  { name: '-5 min', pf: 0.98 },
  { name: '0 min', pf: 1.00 },
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
        <p>{`PF: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const HistoricPF = () => {
  const theme = useTheme();
  const [timeRange, setTimeRange] = useState('lastHour');

  const handleTimeRangeChange = (event, newRange) => {
    if (newRange !== null) {
      setTimeRange(newRange);
    }
  };

  return (
    <Card sx={{ height: '100%', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
      <CardHeader title="Power Factor History" />
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
              <YAxis domain={[0.9, 1.0]} stroke={theme.palette.neutral.light} />
              <Tooltip content={<CustomTooltip theme={theme} />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="pf"
                stroke={theme.palette.secondary.main}
                fill="url(#colorGradient)" // Utilizamos el gradiente para el relleno
                strokeWidth={2}
                name="Total Power Factor"
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
            aria-label="Power Factor Time Range"
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

export default HistoricPF;
