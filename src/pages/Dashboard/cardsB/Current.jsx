import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent, Box, useTheme } from '@mui/material';

// Example data based on the chart you showed
const data = [
  { name: 'Average', current: 18.0 },
  { name: 'Phase A', current: 17.7 },
  { name: 'Phase B', current: 18.2 },
  { name: 'Phase C', current: 18.0 },
  { name: 'Phase Shift', current: 0.5 }
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid',
        }}
      >
        <p>{label}</p>
        <p>{`Current: ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const Current = () => {
  // Access MUI theme
  const theme = useTheme();

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader title="Current" subheader="Recorded currents" />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ width: '100%', height: 300 }}> {/* Adjusts to 100% of the container */}
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" /> {/* Default grid */}
              <XAxis dataKey="name" /> {/* Default axis */}
              <YAxis /> {/* Default axis */}
              <Tooltip content={<CustomTooltip />} /> {/* Custom tooltip */}
              <Legend />
              {/* Use theme's primary color for the bars */}
              <Bar dataKey="current" fill={theme.palette.primary.main} barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Current;