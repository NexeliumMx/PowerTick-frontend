import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        backgroundColor: 'background.default',
        padding: 3,
      }}
    >
      <Typography variant="h1" color="error" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Oops! The page you are looking for doesn’t exist.
      </Typography>
      <Typography variant="body1" gutterBottom>
        It might have been removed or the URL might be incorrect.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 3 }}
        onClick={() => navigate('/')}
      >
        Back to Home
      </Button>
    </Box>
  );
}