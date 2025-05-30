import { BarChart } from '@mui/x-charts/BarChart';
import { Paper, Typography, Box } from '@mui/material';
import chartColors from '../../../../theme/chartColors';

const VoltageLN = ({ data }) => {
  const hasValidData =
    data &&
    typeof data.voltage_l1 === 'number' &&
    typeof data.voltage_l2 === 'number' &&
    typeof data.voltage_l3 === 'number' &&
    typeof data.voltage_ln === 'number';

  if (!hasValidData) {
    return (
      <Paper elevation={3} sx={{ px: 2, height: 450 }}>
<Typography 
  variant="h3" 
  sx={{ fontWeight:600 ,textAlign: 'left', paddingLeft: 1, alignSelf: 'flex-start', paddingTop: 2 }}
>
          Line-to-Neutral Voltage
        </Typography>
        <Typography variant="body2" color="text.secondary" pt={20}>
          Data not available.
        </Typography>
      </Paper>
    );
  }

  const { voltage_l1, voltage_l2, voltage_l3, voltage_ln } = data;

  return (
    <Paper elevation={3} sx={{ px: 3, minHeight: 450, display: 'flex', flexDirection: 'column' }}>
      <Typography 
  variant="h3" 
  sx={{ fontWeight:600 ,textAlign: 'left', paddingLeft: 1, alignSelf: 'flex-start', paddingTop: 2 }}
>
        Line-to-Neutral Voltage
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <BarChart
          animation={{
            duration: 1000, // in milliseconds
            easing: 'ease-out', // options: 'linear', 'ease-in', 'ease-out', 'ease-in-out'
          }}
          borderRadius={10}
          grid={{ horizontal: true }}
          height={350}
          margin={{ left: 70, right: 20, top: 50, bottom: 40 }}
          xAxis={[
            {
              data: ['L1', 'L2', 'L3', 'Average'],
              scaleType: 'band',
              categoryGapRatio: 0.2,
              barGapRatio: -1,
              label: 'Phases',
              labelStyle: { textAnchor: 'middle'}
              
            },
          ]}
          yAxis={[
            {
              label: 'Voltage (V)',
              labelStyle: {
                transform: 'translateX(-20px)',
                writingMode: 'sideways-lr',
                textAnchor: 'middle',
              },
            },
          ]}
          series={[
            {
              data: [voltage_l1, 0, 0, 0],
              label: 'L1',
              color: chartColors.phase1,
              valueFormatter: (value) => `${value} V`
            },
            {
              data: [0, voltage_l2, 0, 0],
              label: 'L2',
              color: chartColors.phase2,
              valueFormatter: (value) => `${value} V`
            },
            {
              data: [0, 0, voltage_l3, 0],
              label: 'L3',
              color: chartColors.phase3,
              valueFormatter: (value) => `${value} V`
            },
            {
              data: [0, 0, 0, voltage_ln],
              label: 'Average',
              color: chartColors.phaseTotal,
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
                      <strong>{item.seriesLabel}:</strong> {item.value}
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

export default VoltageLN;