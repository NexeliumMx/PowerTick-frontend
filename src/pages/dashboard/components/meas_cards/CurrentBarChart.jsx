import { BarChart } from '@mui/x-charts/BarChart';
import { Paper, Typography, Box } from '@mui/material';

const CurrentBarChart = ({ data }) => {
  const hasValidData =
    data &&
    typeof data.current_l1 === 'number' &&
    typeof data.current_l2 === 'number' &&
    typeof data.current_l3 === 'number';
// 🔍 Aquí puedes ver si el componente recibe nuevos datos
  console.log('Datos actuales del medidor:', data);
  if (!hasValidData) {
    return (
      <Paper elevation={3} sx={{ p: 2, height: 300 }}>
        <Typography variant="subtitle1" gutterBottom>
          Corriente por línea
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Datos no disponibles.
        </Typography>
      </Paper>
    );
  }

  const { current_l1, current_l2, current_l3 , timestamp_utc  } = data;
  const total = current_l1 + current_l2 + current_l3;

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="subtitle1" gutterBottom align="center">
        Corriente por línea
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <BarChart
        borderRadius={15}
        grid={{horizontal:true}}
         margin={{ left: 70, right: 20, top: 20, bottom: 20 }}
          xAxis={[
            {
              data: ['L1', 'L2', 'L3', 'Total'],
              scaleType: 'band',
            },
          ]}
          yAxis={[
            {
              label: 'Corriente (A)',
              labelStyle: { transform: 'translateX(-20px)', writingMode: 'sideways-lr', textAnchor: 'middle'} // Separación del eje
            },
          ]}
          height={450}
          series={[
            {
              data: [current_l1, null, null, current_l1],
              label: 'L1',
              stack: 'total',
              valueFormatter: (value) => `${value} A`
            },
            {
              data: [null, current_l2, null, current_l2],
              label: 'L2',
              stack: 'total',
              valueFormatter: (value) => `${value} A`
            },
            {
              data: [null, null, current_l3, current_l3],
              label: 'L3',
              stack: 'total',
              valueFormatter: (value) => `${value} A`
            },
          ]}
          colors={['#8884d8', '#82ca9d', '#ffc658']}
          tooltip={{
            trigger: 'item',
            render: (params) => {
              if (params[0]?.dataIndex === 3) {
                return (
                  <Box sx={{ p: 2 }}>
                    <Typography variant="body2">
                      <strong>Total:</strong> {total.toFixed(0)} A
                    </Typography>
                    <Typography variant="caption">L1: {current_l1} A</Typography><br />
                    <Typography variant="caption">L2: {current_l2} A</Typography><br />
                    <Typography variant="caption">L3: {current_l3} A</Typography>
                  </Box>
                );
              }
              return null; // Usar el tooltip por defecto para otras barras
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default CurrentBarChart;
