import React from 'react';
import { Card, CardHeader, CardContent, Typography, Box, useTheme } from '@mui/material';

const Timestamp = () => {
  const theme = useTheme();

  return (
    <Card sx={{ flexGrow: 1, height: '100%', width: '100%' }}> {/* Ensure full size of its parent container */}
      <CardHeader title="Timestamp" />

      <CardContent>
        {/* Box with border radius and padding */}
        <Box
          sx={{
            textAlign: 'center',
            mt: 2,
            mb: 2,
            backgroundColor: theme.palette.primary.main, // Primary background color
            padding: 2,
            borderRadius: 10, // Border radius for rounded corners
          }}
        >
          <Typography variant="h4">
            03 de Agosto de 2024 17:23
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Timestamp;