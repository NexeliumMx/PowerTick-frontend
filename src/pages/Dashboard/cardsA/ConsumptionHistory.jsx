import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardActionArea, ToggleButton, ToggleButtonGroup, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'; // Importamos BarChart y otros componentes de Recharts
import { useTheme } from '@mui/material/styles';

// Datos de consumo de ejemplo básico para verificar
const consumptionData = [
  { month: 'Jan', kWh: 50000 },
  { month: 'Feb', kWh: 60000 },
  { month: 'Mar', kWh: 55000 },
  { month: 'Apr', kWh: 40000 },
  { month: 'May', kWh: 45000 },
  { month: 'Jun', kWh: 47000 },
  { month: 'Jul', kWh: 43000 },
  { month: 'Aug', kWh: 52000 },
  { month: 'Sept', kWh: 61000 },
  { month: 'Oct', kWh: 64000 },
  { month: 'Nov', kWh: 58000 },
  { month: 'Dec', kWh: 67000 },
];

const ConsumptionHistory = () => {
  const theme = useTheme();
  const [consumptionPeriod, setConsumptionPeriod] = useState('yearly');

  const handleConsumptionPeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setConsumptionPeriod(newPeriod);
    }
  };

  return (
    <Card sx={{ height: '100%', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
      <CardHeader title="Consumption History" />

      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ width: '100%', height: '400px' }}> {/* Altura fija temporal para depurar */}
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={consumptionData} // Datos de la gráfica
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke={theme.palette.text.primary} /> {/* Eje X con los meses */}
              <YAxis stroke={theme.palette.text.primary} /> {/* Eje Y con los valores numéricos */}
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
