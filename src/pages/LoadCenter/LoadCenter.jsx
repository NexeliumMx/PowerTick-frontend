import React, { useState } from 'react'; 
import { Container, Grid2 } from '@mui/material';  // Cambié Grid a Grid2 y Box a Container
import GaugeContainer from '../LoadCenter/GaugeContainer'; // Importa el componente GaugeContainer

export default function LoadCenter() {
  const [darkMode, setDarkMode] = useState(true); // Estado para el tema

  return (
    <Container sx={{ display: 'flex', width: '100%' }}> {/* Se usa Container en lugar de Box */}
      <Box 
        sx={{
          flexGrow: 1, 
          padding: '2rem', 
          backgroundColor: darkMode ? '#0d1b2a' : '#f5f5f5',
          minHeight: '100vh', // Asegura que el contenido ocupe toda la altura de la pantalla
          overflowY: 'auto',  // Habilita el scroll vertical
          width: '100%', // Asegura que el contenedor tenga el ancho completo
        }}
      >
        {/* Sección de tarjetas, utilizando Grid2 de MUI */}
        <Grid2 container spacing={3} className="gauge-section">
          <Grid2 item xs={12} sm={12} md={6}>
            <GaugeContainer title="Centro de carga 1" darkMode={darkMode}>
              <p>Gráfica del consumo y factor de potencia irá aquí</p>
            </GaugeContainer>
          </Grid2>
          <Grid2 item xs={12} sm={12} md={6}>
            <GaugeContainer title="Centro de carga 2" darkMode={darkMode}>
              <p>Gráfica del consumo y factor de potencia irá aquí</p>
            </GaugeContainer>
          </Grid2>
          <Grid2 item xs={12} sm={12} md={6}>
            <GaugeContainer title="Centro de carga 3" darkMode={darkMode}>
              <p>Gráfica del consumo y factor de potencia irá aquí</p>
            </GaugeContainer>
          </Grid2>
          <Grid2 item xs={12} sm={12} md={6}>
            <GaugeContainer title="Centro de carga 4" darkMode={darkMode}>
              <p>Gráfica del consumo y factor de potencia irá aquí</p>
            </GaugeContainer>
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
}
