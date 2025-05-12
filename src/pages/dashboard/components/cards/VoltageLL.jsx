import { BarChart } from '@mui/x-charts/BarChart';
import { Paper, Typography, Box } from '@mui/material';

const VoltageLL = ({ data }) => {
  const hasValidData =
    data &&
    typeof data['voltage_l1-l2'] === 'number' &&
    typeof data['voltage_l2-l3'] === 'number' &&
    typeof data['voltage_l3-l1'] === 'number' &&
    typeof data.voltage_ll === 'number';

  if (!hasValidData) {
    return (
      <Paper elevation={3} sx={{ p: 2, height: 300 }}>
        <Typography variant="subtitle1" gutterBottom>
          Line-to-line voltage per phase
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Data not available.
        </Typography>
      </Paper>
    );
  }

  const { ['voltage_l1-l2']: v12, ['voltage_l2-l3']: v23, ['voltage_l3-l1']: v31, voltage_ll } = data;

  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Typography variant="subtitle1" gutterBottom align="center">
        Line-to-Line Voltage
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <BarChart
          borderRadius={15}
          grid={{ horizontal: true }}
          height={450}
          margin={{ left: 70, right: 20, top: 20, bottom: 20 }}
          xAxis={[{
            data: ['L1-L2', 'L2-L3', 'L3-L1', 'Average'],
            scaleType: 'band',
            categoryGapRatio: 0.2,
            barGapRatio: -1,
          }]}
          yAxis={[{
            label: 'Voltage (V)',
            labelStyle: {
              transform: 'translateX(-20px)',
              writingMode: 'sideways-lr',
              textAnchor: 'middle',
            },
          }]}
          series={[
            {
              data: [v12, 0, 0, 0],
              label: 'L1-L2',
              color: '#8884d8',
              valueFormatter: (value) => `${value} V`
            },
            {
              data: [0, v23, 0, 0],
              label: 'L2-L3',
              color: '#82ca9d',
                valueFormatter: (value) => `${value} V`
            },
            {
              data: [0, 0, v31, 0],
              label: 'L3-L1',
              color: '#ffc658',
                            valueFormatter: (value) => `${value} V`
            },
            {
              data: [0, 0, 0, voltage_ll],
              label: 'Average',
              color: '#ccc',
                            valueFormatter: (value) => `${value} V`
            },
          ]}
        
          tooltip={{
            trigger: 'item',
            render: (params) => {
              const item = params[0];
              if (item) {
                return (
                  <Box sx={{ p: 1 }}>
                    <Typography variant="body2">
                      <strong>{item.seriesLabel}:</strong> {item.value} V
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

export default VoltageLL;