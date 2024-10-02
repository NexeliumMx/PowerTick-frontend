import { Card, CardHeader, CardContent, Box } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useTheme } from '@mui/material/styles'; // Importar useTheme para acceder al tema

const PowerFactor = () => {
  const powerFactorValue = 0.75;

  // Acceder a los colores del tema
  const theme = useTheme();

  const data = [
    { name: 'Power Factor', value: powerFactorValue },
    { name: 'Remaining', value: 1 - powerFactorValue },
  ];

  // Utilizar colores de la paleta del tema
  const COLORS = [theme.palette.secondary.main, theme.palette.grey[400]]; // Colores de la parte activa e inactiva

  return (
    <Card sx={{ flexGrow: 1, height: '100%', width: '100%' }}> {/* Full size container */}
      <CardHeader title="Power Factor" />
      
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}> {/* Center content */}
        {/* Responsive container for the chart */}
        <Box sx={{ width: '100%', height: 250 }}> {/* Aumenta la altura para hacer el gráfico más grande */}
          <ResponsiveContainer width="100%" height="100%"> 
            <PieChart>
              <Pie
                data={data}
                startAngle={180} // Start from bottom center
                endAngle={0} // End at top center
                innerRadius="60%" // Aumenta el innerRadius para hacerlo más grande
                outerRadius="80%" // Aumenta el outerRadius para hacerlo más grande
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Box>
        {/* Centered text below the gauge */}
        <Box sx={{ textAlign: 'center', fontSize: 24, marginTop: -15 }}> {/* Adjust marginTop using MUI spacing */}
          {`${powerFactorValue.toFixed(2)} / 1`}
        </Box>
      </CardContent>
    </Card>
  );
};

export default PowerFactor;
