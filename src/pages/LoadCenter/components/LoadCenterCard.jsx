import React from 'react';
import { Card, CardContent, CardHeader, Typography, Box } from '@mui/material';
import { Gauge } from '@mui/x-charts/Gauge'; // Ensure correct import

const LoadCenterCard = () => {

  return (
    <Card sx={{ flexGrow: 1, height: '100%', width: '100%' }}>
      {/* Card Header for the title */}
      <CardHeader
        title="Centro de Carga 1"
      />

      {/* Card Content to wrap the Gauges */}
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        {/* Consumption Gauge */}
        <Box sx={{ textAlign: 'center', width: '50%' }}>
        <Gauge width={100} height={100} value={60} />
        </Box>

        {/* Power Factor Gauge */}
        <Box sx={{ textAlign: 'center', width: '50%'}}>
        <Gauge width={100} height={100} value={60} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default LoadCenterCard;