import React from 'react';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';

const Timestamp = () => {
  return (
    <Card sx={{ flexGrow: 1, height: '100%' , width: '100%'}}> {/* Ensure full size of its parent container */}
      <CardHeader
        title="Timestamp"
      />
      
      <CardContent>
        <Typography variant="h4" color="primary">
          03 de Agosto de 2024 17:23
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Timestamp;