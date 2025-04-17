import { BarChart } from '@mui/x-charts/BarChart';
import { Paper, Typography, Box } from '@mui/material';

const ReactivePowerBarChart = ({ data }) => {
  const hasValidData =
    data &&
    typeof data.var_l1 === 'number' &&
    typeof data.var_l2 === 'number' &&
    typeof data.var_l3 === 'number' &&
    typeof data['var'] === 'number';

  if (!hasValidData) {
    return (
      <Paper elevation={3} sx={{ p: 2, height: 300 }}>
        <Typography variant="subtitle1" gutterBottom>
          Potencia Reactiva por Línea
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Datos no disponibles.
        </Typography>
      </Paper>
    );
  }

  const { var_l1, var_l2, var_l3 } = data;
  const totalVar = data['var'];

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="subtitle1" gutterBottom align="center">
        Potencia Reactiva por Línea
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <BarChart
          borderRadius={15}

          grid={{ horizontal: true }}
          margin={{ left: 70, right: 20, top: 20, bottom: 20 }}
          height={450}
          xAxis={[{
            data: ['L1', 'L2', 'L3', 'Total'],
            scaleType: 'band',
            categoryGapRatio: 0.2,
            barGapRatio: -1,
          }]}
          yAxis={[{
            label: 'Potencia Reactiva (VAR)',
            labelStyle: {
              transform: 'translateX(-20px)',
              writingMode: 'sideways-lr',
              textAnchor: 'middle',
            },
          }]}
          series={[
            {
              data: [var_l1, null, null, null],
              label: 'L1',
              color: '#8884d8',
              valueFormatter: (value) => `${value} VAR`
            },
            {
              data: [null, var_l2, null, null],
              label: 'L2',
              color: '#82ca9d',
              valueFormatter: (value) => `${value} VAR`
            },
            {
              data: [null, null, var_l3, null],
              label: 'L3',
              color: '#ffc658',
              valueFormatter: (value) => `${value}  VAR`
            },
            {
              data: [null, null, null, totalVar],
              label: 'Total',
              color: '#ccc',
              valueFormatter: (value) => `${value} VAR`
            }
          ]}
          tooltip={{
            trigger: 'item',
            render: (params) => {
              const item = params[0];
              if (item) {
                return (
                  <Box sx={{ p: 1 }}>
                    <Typography variant="body2">
                      <strong>{item.category}:</strong> {item.value} VAR
                    </Typography>
                  </Box>
                );
              }
              return null;
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default ReactivePowerBarChart;