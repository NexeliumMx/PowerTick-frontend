import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const PowerFactor = () => {
  return (
    <Card sx={{ flexGrow: 1, height: '100%' , width: '100%'}}> {/* Ensure full size of its parent container */}
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Power Factor
        </Typography>
        <Typography variant="h4" color="primary">
          0.75
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PowerFactor;