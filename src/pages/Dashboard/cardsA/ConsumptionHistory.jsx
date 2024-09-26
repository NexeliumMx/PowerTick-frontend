import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardActionArea, ToggleButton, ToggleButtonGroup, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'; // Importamos BarChart y otros componentes de Recharts
import { useTheme } from '@mui/material/styles';

// Datos de consumo de ejemplo básico para verificar
const consumptionData = [
  { month: 'Jan', kWh: 50 },
  { month: 'Feb', kWh: 60 },
  { month: 'Mar', kWh: 55 },
  { month: 'Apr', kWh: 40 },
  { month: 'May', kWh: 45 },
  { month: 'Jun', kWh: 47 },
  { month: 'Jul', kWh: 43 },
  { month: 'Aug', kWh: 52},
  { month: 'Sept', kWh: 61 },
  { month: 'Oct', kWh: 64 },
  { month: 'Nov', kWh: 58 },
  { month: 'Dec', kWh: 67 },
];

const ConsumptionHistory = () => {
  const theme = useTheme(); // Accede al tema actual (oscuro o claro)
  const [consumptionPeriod, setConsumptionPeriod] = useState('yearly');

  const handleConsumptionPeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setConsumptionPeriod(newPeriod);
    }
  };

  return (
    <Card sx={{ height: '100%',  display: 'flex', flexDirection: 'column' }}>
      <CardHeader title="Consumption History" />

      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ width: '100%', height: '500px' }}> {/* Altura fija temporal para depurar */}
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={consumptionData} // Datos de la gráfica
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              layout="vertical" // Establecemos el layout como vertical para barras horizontales
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                stroke={theme.palette.text.primary}
                label={{
                  value: 'kWh',
                  position: 'insideBottomRight',
                  offset: 10,
                  fill: theme.palette.text.primary, // Aplica el color según el modo claro/oscuro
                  dy: 15,
                  dx: 15,
                }}
              />
              <YAxis
               dataKey="month" 
               type="category" 
               stroke={theme.palette.text.primary} 
               label={{
                value: 'Month',
                position: 'insideTopRight',
                offset: 0,
                fill: theme.palette.text.primary, // Aplica el color según el modo claro/oscuro
                dy: -10,
                dx: -10,
              }}
              /> 
              <Tooltip 
                contentStyle={{
                  backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#fff',
                  color: theme.palette.mode === 'dark' ? '#fff' : '#000',
                  border: '1px solid',
                  borderColor: theme.palette.divider
                }}
                labelStyle={{ color: theme.palette.text.primary }}
                formatter={(value) => `${value} kWh`}
              />
              <Bar dataKey="kWh" fill={theme.palette.primary.main} barSize={20} /> {/* Barras con datos de kWh */}
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>

      <CardActionArea>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
          <ToggleButtonGroup
            value={consumptionPeriod}
            exclusive
            onChange={handleConsumptionPeriodChange}
            aria-label="Consumption History Period"
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

export default ConsumptionHistory;
