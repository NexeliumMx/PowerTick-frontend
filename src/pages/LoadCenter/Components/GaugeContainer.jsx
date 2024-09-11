import React from 'react';
import { Box, Typography } from '@mui/material';

const GaugeContainer = ({ title, darkMode, children }) => {
  return (
    <Box
      sx={{
        backgroundColor: darkMode ? '#1b2a41' : '#ffffff',
        borderRadius: '1rem',
        boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
        padding: 0, // Sin padding para que el contenido sea más controlable
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch', // Asegura que los elementos hijos ocupen todo el ancho
        transition: 'background-color 0.3s ease',
        width: '100%', // Asegura que el Box también ocupe todo el ancho disponible
      }}
    >
      {/* Título del centro de carga */}
      <Typography
        variant="h6"
        sx={{
          backgroundColor: darkMode ? '#3b4a67' : '#e0e0e0',
          color: darkMode ? '#ffffff' : '#000000',
          padding: '1rem',
          width: 'auto',  // Asegura que ocupe todo el ancho del contenedor
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
