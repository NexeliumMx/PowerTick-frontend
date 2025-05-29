import { BarChart } from '@mui/x-charts/BarChart';
import { Paper, Typography, Box } from '@mui/material';
import chartColors from '../../../../theme/chartColors';
const ReactivePower = ({ data }) => {
  const hasValidData =
    data &&
    typeof data.var_l1 === 'number' &&
    typeof data.var_l2 === 'number' &&
    typeof data.var_l3 === 'number' &&
    typeof data['var'] === 'number';

  if (!hasValidData) {
    return (
      <Paper elevation={3} sx={{ p: 2, height: 300 }}>
        <Typography 
  variant="h2" 
  sx={{ textAlign: 'left', paddingLeft: 10, alignSelf: 'flex-start', paddingTop: '10px' }}
>
          Reactive Power
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Data not available.
        </Typography>
      </Paper>
    );
  }

  const { var_l1, var_l2, var_l3 } = data;
  const totalVar = data['var'];

  return (
    <Paper elevation={3} sx={{ p: 3, minHeight: 500, display: 'flex', flexDirection: 'column' }}>
      <Typography 
  variant="h3" 
  sx={{ textAlign: 'left', paddingLeft: 10, alignSelf: 'flex-start', paddingTop: '10px' }}
>
        Reactive Power
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <BarChart
          borderRadius={15}
          grid={{ horizontal: true }}
          margin={{ left: 70, right: 20, top: 50, bottom: 20 }}
          height={350}
          xAxis={[{
            data: ['L1', 'L2', 'L3', 'Total'],
            scaleType: 'band',
            categoryGapRatio: 0.2,
            barGapRatio: -1,
          }]}
          yAxis={[{
            label: 'Reactive Power (VAR)',
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
              color: chartColors.phase1,
              valueFormatter: (value) => `${value} VAR`
            },
            {
              data: [null, var_l2, null, null],
              label: 'L2',
              color: chartColors.phase2,
              valueFormatter: (value) => `${value} VAR`
            },
            {
              data: [null, null, var_l3, null],
              label: 'L3',
              color: chartColors.phase3,
              valueFormatter: (value) => `${value} VAR`
            },
            {
              data: [null, null, null, totalVar],
              label: 'Total',
              color: chartColors.phaseTotal,
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

export default ReactivePower;