import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent, Box, useTheme } from '@mui/material';

// Datos de ejemplo basados en la gráfica que mostraste
const data = [
  { name: 'Promedio', corriente: 18.0 },
  { name: 'Fase A', corriente: 17.7 },
  { name: 'Fase B', corriente: 18.2 },
  { name: 'Fase C', corriente: 18.0 },
  { name: 'Desfase', corriente: 0.5 }
];

const CustomTooltip = ({ active, payload, label, theme }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#fff', // Fondo dinámico
          color: theme.palette.mode === 'dark' ? '#fff' : '#000', // Color del texto dinámico
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid',
          borderColor: theme.palette.mode === 'dark' ? '#555' : '#ccc',
        }}
      >
        <p>{label}</p>
        <p>{`corriente : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const CurrentCard = () => {
  // Obtener el tema actual (claro u oscuro)
  const theme = useTheme();
  
  // Cambiar los colores en función del modo (oscuro o claro)
  const axisColor = theme.palette.mode === 'dark' ? '#fff' : '#000'; // Color de los ejes
  const gridColor = theme.palette.mode === 'dark' ? '#444' : '#ccc'; // Color del grid

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader title="Corriente" subheader="Corrientes registradas actual" />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ width: '100%', height: 300 }}> {/* Se ajusta al 100% del contenedor */}
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid stroke={gridColor} strokeDasharray="3 3" /> {/* Color del grid */}
              <XAxis dataKey="name" stroke={axisColor} /> {/* Color de los ejes */}
              <YAxis stroke={axisColor} /> {/* Color de los ejes */}
              <Tooltip content={<CustomTooltip theme={theme} />} /> {/* Tooltip personalizado */}
              <Legend />
              <Bar dataKey="corriente" fill={theme.palette.primary.main} barSize={50} /> {/* Color dinámico basado en el tema */}
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CurrentCard;
