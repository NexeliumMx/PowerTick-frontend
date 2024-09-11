import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import Navbar from '../../components/Navbar/Navbar.jsx';
import GaugeContainer from '../LoadCenter/Components/GaugeContainer.jsx'; // Importa el componente GaugeContainer


export default function LoadCenter() {
  const [darkMode, setDarkMode] = useState(true); // Estado para el tema

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Sidebar />
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
        <Navbar title="Ubicaciones" />

        {/* Sección de tarjetas, utilizando Grid de MUI */}
        <Grid container spacing={3} className="gauge-section">
          <Grid item xs={12} sm={12} md={6}>
            <GaugeContainer title="Centro de carga 1" darkMode={darkMode}>
              <p>Gráfica del consumo y factor de potencia irá aquí</p>
            </GaugeContainer>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <GaugeContainer title="Centro de carga 2" darkMode={darkMode}>
              <p>Gráfica del consumo y factor de potencia irá aquí</p>
            </GaugeContainer>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <GaugeContainer title="Centro de carga 3" darkMode={darkMode}>
              <p>Gráfica del consumo y factor de potencia irá aquí</p>
            </GaugeContainer>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <GaugeContainer title="Centro de carga 4" darkMode={darkMode}>
              <p>Gráfica del consumo y factor de potencia irá aquí</p>
            </GaugeContainer>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
