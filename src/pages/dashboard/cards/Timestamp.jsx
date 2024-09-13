import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Timestamp = () => {
  return (
    <Card sx={{ flexGrow: 1, height: '100%' , width: '100%'}}> {/* Ensure full size of its parent container */}
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Timestamp
        </Typography>
        <Typography variant="h4" color="primary">
          03 de Agosto de 2024 17:23
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Timestamp;