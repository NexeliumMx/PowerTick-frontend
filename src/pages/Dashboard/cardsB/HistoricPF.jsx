import React from 'react';
import { Card, CardHeader, CardContent, Box, useTheme } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data for Power Factor, replace this with actual data
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

const HistoricPF = () => {
  // Access the MUI theme
  const theme = useTheme();

  return (
    <Card sx={{ height: '100%', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
      <CardHeader title="Power Factor History" />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ width: '100%', height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0.9, 1.0]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pf" stroke={theme.palette.primary.main} dot={true} name="Power Factor" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default HistoricPF;