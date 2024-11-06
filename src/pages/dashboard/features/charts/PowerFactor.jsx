// src/pages/dashboard/features/charts/PowerFactor.jsx

import React from 'react';
import { Card, CardHeader, CardContent, Box, Typography } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useTheme } from '@mui/material/styles';
import { useData } from '../../../../context/DataProvider';

const PowerFactor = () => {
  const { realTimeData, isFetching, error } = useData(); // Access data from context
  const theme = useTheme();

  // Check if realTimeData and power_factor exist and convert it from 0-1000 scale to 0-1
  const powerFactorValue = realTimeData && realTimeData.power_factor 
    ? realTimeData.power_factor / 1000 
    : null; // Default to null if no data

  const data = [
    { name: 'Power Factor', value: powerFactorValue || 0 },
    { name: 'Remaining', value: 1 - (powerFactorValue || 0) },
  ];

  const COLORS = [theme.palette.secondary.main, theme.palette.grey[400]];

  return (
    <Card sx={{ flexGrow: 1, height: '100%', width: '100%' }}>
      <CardHeader title="Power Factor" />
      
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Loading and Error states */}
        {isFetching && <Typography>Loading...</Typography>}
        {error && <Typography color="error">Error loading data</Typography>}

        {/* Display the pie chart and power factor only if data is available */}
        {!isFetching && !error && powerFactorValue !== null ? (
          <>
            <Box sx={{ width: '100%', height: 250 }}>
              <ResponsiveContainer width="100%" height="100%"> 
                <PieChart>
                  <Pie
                    data={data}
                    startAngle={180} // Start from bottom center
                    endAngle={0} // End at top center
                    innerRadius="60%"
                    outerRadius="80%"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Box>
            <Box sx={{ textAlign: 'center', fontSize: 24, marginTop: -15 }}>
              {`${powerFactorValue.toFixed(2)} / 1`} {/* Display scaled value */}
            </Box>
          </>
        ) : (
          !isFetching && !error && (
            <Box sx={{ textAlign: 'center', fontSize: 18 }}>
              No data available
            </Box>
          )
        )}
      </CardContent>
    </Card>
  );
};

export default PowerFactor;