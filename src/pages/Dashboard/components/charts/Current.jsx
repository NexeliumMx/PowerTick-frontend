import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent, Box, useTheme } from '@mui/material';

// Example data based on the chart you showed
const data = [
  { name: 'Total', current: 18.0 },
  { name: 'Phase A', current: 17.7 },
  { name: 'Phase B', current: 18.2 },
  { name: 'Phase C', current: 18.0 },
  { name: 'Phase Shift', current: 0.5 }
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
        <p>{`A: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const Current = () => {
  const theme = useTheme();

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader title="Real Time Current" />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ width: '100%', height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip theme={theme} />} />
              <Legend />
              <Bar dataKey="current" fill={theme.palette.primary.main} barSize={50} name="Current [A]" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Current;