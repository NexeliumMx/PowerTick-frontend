import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Paper, Typography } from '@mui/material';

const CurrentLineChart = ({ data }) => {
  if (!data) return null;

  // Preparamos un único objeto para mostrar las 3 corrientes
  const chartData = [
    {
      name: 'Corrientes (A)',
      L1: data.current_l1,
      L2: data.current_l2,
      L3: data.current_l3,
    }
  ];

  return (
    <Paper elevation={3} sx={{ p: 2, height: 300 }}>
      <Typography variant="subtitle1" gutterBottom>
        Corriente por línea
      </Typography>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="L1" stroke="#8884d8" name="L1" />
          <Line type="monotone" dataKey="L2" stroke="#82ca9d" name="L2" />
          <Line type="monotone" dataKey="L3" stroke="#ffc658" name="L3" />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default CurrentLineChart;
