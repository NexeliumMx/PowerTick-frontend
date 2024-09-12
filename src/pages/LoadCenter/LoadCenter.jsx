import React, { useState } from 'react'; 
import { Container, Grid, Box } from '@mui/material';  
import GaugeContainer from '../LoadCenter/GaugeContainer.jsx'; 

export default function LoadCenter() {
  const [darkMode, setDarkMode] = useState(true); 

  return (
    <Container
      sx={{
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        width: '100%',
        maxWidth: '100%',  // Asegura que el contenedor ocupe el 100% del ancho de la pantalla
        minHeight: '100vh', 
        backgroundColor: darkMode ? '#0d1b2a' : '#f5f5f5',
        padding: '2rem',
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Grid 
          container 
          spacing={3} 
          justifyContent="center" 
          sx={{ width: '100%' }}
        >
          {/* Ajustamos el tamaño de las columnas */}
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <GaugeContainer title="Centro de carga 1" darkMode={darkMode}>
              <p>Gráfica del consumo y factor de potencia irá aquí</p>
            </GaugeContainer>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <GaugeContainer title="Centro de carga 2" darkMode={darkMode}>
              <p>Gráfica del consumo y factor de potencia irá aquí</p>
            </GaugeContainer>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <GaugeContainer title="Centro de carga 3" darkMode={darkMode}>
              <p>Gráfica del consumo y factor de potencia irá aquí</p>
            </GaugeContainer>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <GaugeContainer title="Centro de carga 4" darkMode={darkMode}>
              <p>Gráfica del consumo y factor de potencia irá aquí</p>
            </GaugeContainer>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
