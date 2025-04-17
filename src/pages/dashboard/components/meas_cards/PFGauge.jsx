import { Paper, Typography, Box } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

const getColorByFP = (value) => {
  if (value >= 0.95) return '#4caf50';     // Verde
  if (value >= 0.90) return '#ffb300';     // Amarillo
  return '#f44336';                        // Rojo
};

const PowerFactorGauges = ({ data }) => {
  const hasValidData =
    data &&
    typeof data.pf_l1 === 'number' &&
    typeof data.pf_l2 === 'number' &&
    typeof data.pf_l3 === 'number' &&
    typeof data.power_factor === 'number';

  if (!hasValidData) {
    return (
      <Paper elevation={3} sx={{ p: 2, height: 300 }}>
        <Typography variant="subtitle1" align="center">
          Factor de Potencia
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Datos no disponibles.
        </Typography>
      </Paper>
    );
  }

  const gauges = [
    { label: 'L1', value: data.pf_l1 / 1000 },
    { label: 'L2', value: data.pf_l2 / 1000 },
    { label: 'L3', value: data.pf_l3 / 1000 },
    { label: 'Prom.', value: data.power_factor / 1000 },
  ];

  return (
    <Paper elevation={3} sx={{ p: 1 }}>
      <Typography variant="subtitle1" align="center" gutterBottom>
        Factor de Potencia (0 a 1)
      </Typography>
      <Grid2 container spacing={2} justifyContent="center">
        {gauges.map(({ label, value }) => {
          const color = getColorByFP(value);
          return (
            <Grid2 key={label} xs={6} md={3}>
              <Box sx={{ width: 180, height: 450, mx: 'auto' }}>
                <Gauge
                  value={value}
                  valueMin={0}
                  valueMax={1}
                  startAngle={-110}
                  endAngle={110}
                  sx={{
                    [`& .${gaugeClasses.valueText}`]: {
                      fontSize: 20,
                    },
                    [`& .${gaugeClasses.valueArc}`]: {
                      fill: color,
                    },
                  }}
                  text={({ value }) => value.toFixed(2)}
                />
              </Box>
              <Typography align="center" sx={{ mt: 1 }}>
                {label}
              </Typography>
            </Grid2>
          );
        })}
      </Grid2>
    </Paper>
  );
};

export default PowerFactorGauges;
