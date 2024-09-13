import React from 'react';
import { Box, Typography, useTheme } from '@mui/material';

const GaugeContainer = ({ title, children }) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderRadius: '1rem',
        boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
        padding: 0, // Sin padding para que el contenido sea más controlable
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch', // Asegura que los elementos hijos ocupen todo el ancho
        width: '100%', // Asegura que el Box también ocupe todo el ancho disponible
        height: '100%', // Esto ayuda a que la tarjeta crezca según el contenido
      }}
    >
      {/* Título del centro de carga */}
      <Typography
        variant="h6"
        sx={{
          padding: '1rem',
          width: '100%',  // Asegura que ocupe todo el ancho del contenedor
          textAlign: 'center',
          borderTopLeftRadius: '1rem', // Redondeo en el borde superior izquierdo
          borderTopRightRadius: '1rem', // Redondeo en el borde superior derecho
        }}
      >
        {title}
      </Typography>

      {/* Contenido dinámico */}
      <Box sx={{ width: '100%', padding: '1rem', textAlign: 'center' }}>
        {children}
      </Box>
    </Box>
  );
};

export default GaugeContainer;
