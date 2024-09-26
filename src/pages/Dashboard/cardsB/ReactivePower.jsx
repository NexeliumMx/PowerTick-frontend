import React from 'react';
import { Card, CardHeader, CardContent, Box, useTheme } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data for Reactive Power, you can replace this with actual data
const data = [
  { name: '-60 min', average: 4, phaseA: 3, phaseB: 5, phaseC: 6 },
  { name: '-55 min', average: 4.5, phaseA: 4, phaseB: 5.5, phaseC: 5.5 },
  { name: '-50 min', average: 5, phaseA: 4.2, phaseB: 6, phaseC: 5.8 },
  { name: '-45 min', average: 4.2, phaseA: 3.9, phaseB: 5, phaseC: 6.5 },
  { name: '-40 min', average: 3.5, phaseA: 3.2, phaseB: 4.5, phaseC: 5.5 },
  { name: '-35 min', average: 4, phaseA: 4, phaseB: 4.8, phaseC: 6.3 },
  { name: '-30 min', average: 4.8, phaseA: 4.7, phaseB: 5.6, phaseC: 6.5 },
  { name: '-25 min', average: 5.5, phaseA: 5, phaseB: 5.7, phaseC: 6.7 },
  { name: '-20 min', average: 5.7, phaseA: 5.4, phaseB: 6, phaseC: 7 },
  { name: '-15 min', average: 5.3, phaseA: 4.9, phaseB: 5.9, phaseC: 6.2 },
  { name: '-10 min', average: 4.9, phaseA: 4.7, phaseB: 5.2, phaseC: 5.8 },
  { name: '-5 min', average: 5.5, phaseA: 5.2, phaseB: 6.2, phaseC: 7 },
  { name: '0 min', average: 6, phaseA: 5.8, phaseB: 6.5, phaseC: 7.2 },
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
            {`${entry.name} : ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const ReactivePower = () => {
  // Access the MUI theme
  const theme = useTheme();

  return (
    <Card sx={{ height: '100%', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
      <CardHeader title="Reactive Power" />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ width: '100%', height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={<CustomTooltip theme={theme} />} /> {/* Custom Tooltip */}
              <Legend />
              <Line type="monotone" dataKey="average" stroke={theme.palette.primary.main} dot={true} name="Average" />
              <Line type="monotone" dataKey="phaseA" stroke={theme.palette.secondary.main} dot={true} name="Phase A" />
              <Line type="monotone" dataKey="phaseB" stroke={theme.palette.warning.main} dot={true} name="Phase B" />
              <Line type="monotone" dataKey="phaseC" stroke={theme.palette.error.main} dot={true} name="Phase C" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ReactivePower;
