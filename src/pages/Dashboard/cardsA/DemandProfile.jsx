import React, { useState } from 'react';
import { Box, Card, CardHeader, CardContent, CardActionArea, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'; // Importamos de Recharts
import { useTheme } from '@mui/material/styles';

// Datos de ejemplo para la gráfica
const demandProfileData = [
  { month: 'Jan', kW: 240 },
  { month: 'Feb', kW: 720 },
  { month: 'Mar', kW: 480 },
  { month: 'Apr', kW: 360 },
  { month: 'May', kW: 300 },
  { month: 'Jun', kW: 450 },
  { month: 'Jul', kW: 260 },
  { month: 'Aug', kW: 750 },
  { month: 'Sept', kW: 320 },
  { month: 'Oct', kW: 600 },
  { month: 'Nov', kW: 400 },
  { month: 'Dec', kW: 550 },
];

const DemandProfile = () => {
  const theme = useTheme();
  const [demandPeriod, setDemandPeriod] = useState('yearly');

  const handleDemandPeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setDemandPeriod(newPeriod);
    }
  };

  return (
    <Card sx={{ height: '100%', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
      <CardHeader
        title="Demand Profile"
      />

      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          <ResponsiveContainer width="100%" height="100%"> {/* Hace que la gráfica sea responsiva */}
            <LineChart
              data={demandProfileData} // Pasamos los datos
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke={theme.palette.text.primary} /> {/* Etiquetas del eje X */}
              <YAxis stroke={theme.palette.text.primary} /> {/* Eje Y */}
              <Tooltip 
                contentStyle={{
                  backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#fff',
                  color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                  border: '1px solid',
                  borderColor: theme.palette.divider
                }}
                labelStyle={{ color: theme.palette.text.primary }}
              />
              <Line type="monotone" dataKey="kW" stroke={theme.palette.primary.main} strokeWidth={2} activeDot={{ r: 8 }} /> {/* Configuración de la línea */}
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>

      <CardActionArea>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
          <ToggleButtonGroup
            value={demandPeriod}
            exclusive
            onChange={handleDemandPeriodChange}
            aria-label="Demand Profile Period"
          >
            <ToggleButton value="yearly" aria-label="Yearly">
              Yearly
            </ToggleButton>
            <ToggleButton value="monthly" aria-label="Monthly">
              Monthly
            </ToggleButton>
            <ToggleButton value="daily" aria-label="Daily">
              Daily
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default DemandProfile;
