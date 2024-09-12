import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import ToggleColorMode from "../components/ToggleColorMode";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'background.default',
        padding: 3,
      }}
    >
      <Typography variant="h2" gutterBottom>
        Welcome to PowerTIC
      </Typography>
      <Typography variant="h6" gutterBottom>
        Explore Material UI components and navigation in this sample app.
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, marginTop: 3 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/mui-components-test')}
        >
          Go to MUI Components Test
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate('/not-found')}
        >
          Go to NotFound Page
        </Button>
      </Box>

      <ToggleColorMode />
    </Box>
  );
}