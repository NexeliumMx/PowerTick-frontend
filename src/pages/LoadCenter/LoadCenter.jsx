import React, { useState } from 'react'; 
import { Container, Grid2, Box } from '@mui/material';  
import GaugeContainer from '../LoadCenter/GaugeContainer.jsx'; 
import PieChartWithNeedle from '../../charts/PieChartWithNeedle.jsx';

export default function LoadCenter() {
  const [darkMode, setDarkMode] = useState(true); 

  // Datos de ejemplo para la gráfica
  const pieData = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];

  return (
    <Container
      sx={{
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        width: '100%',
        minHeight: '100vh', 
        backgroundColor: darkMode ? '#0d1b2a' : '#f5f5f5',
        padding: '2rem',
      }}
    >
      <Box sx={{ width: '100%' }}>
        <Grid2 
          container 
          spacing={3} 
          justifyContent="center" 
          sx={{ width: '100%' }}
        >
          <Grid2 item xs={12} sm={12} md={5} lg={5} xl={4}>
            <GaugeContainer title="Centro de carga 1" darkMode={darkMode}>
              {/* Reemplazamos el texto por la gráfica */}
              <PieChartWithNeedle data={pieData} />
            </GaugeContainer>
          </Grid2>
          <Grid2 item xs={12} sm={12} md={5} lg={5} xl={4}>
            <GaugeContainer title="Centro de carga 2" darkMode={darkMode}>
              <PieChartWithNeedle data={pieData} />
            </GaugeContainer>
          </Grid2>
          <Grid2 item xs={12} sm={12} md={5} lg={5} xl={4}>
            <GaugeContainer title="Centro de carga 3" darkMode={darkMode}>
              <PieChartWithNeedle data={pieData} />
            </GaugeContainer>
          </Grid2>
          <Grid2 item xs={12} sm={12} md={5} lg={5} xl={4}>
            <GaugeContainer title="Centro de carga 4" darkMode={darkMode}>
              <PieChartWithNeedle data={pieData} />
            </GaugeContainer>
          </Grid2>
        </Grid2>
      </Box>
    </Container>
  );
}
