import { BarChart } from '@mui/x-charts/BarChart';
import { Paper, Typography, Box } from '@mui/material';
import chartColors from '../../../../theme/chartColors';
const RealPower = ({ data }) => {
  // Debug: log the incoming data and its type
  console.log('RealPower received data:', data, 'Type:', typeof data, Array.isArray(data) ? 'Array' : 'Not array');

  // Defensive: if data is an array, use the first element
  const safeData = Array.isArray(data) ? data[0] : data;

  const hasValidData =
    safeData &&
    typeof safeData.watts_l1 === 'number' &&
    typeof safeData.watts_l2 === 'number' &&
    typeof safeData.watts_l3 === 'number';

  console.log('Current demand data:', data);

  if (!hasValidData) {
    return (
      <Paper elevation={3} sx={{ px: 2, height: 450 }}>
        <Typography 
        variant="h3" 
        sx={{ fontWeight:600, textAlign: 'left', paddingLeft: 1, alignSelf: 'flex-start', paddingTop:2 }}
      >
          Real Power
        </Typography>
        <Typography variant="body2" color="text.secondary" pt={20}>
          Data not available.<br/>
          <pre style={{ fontSize: 10, textAlign: 'left', whiteSpace: 'pre-wrap' }}>{JSON.stringify(data, null, 2)}</pre>
        </Typography>
      </Paper>
    );
  }

  const { watts_l1, watts_l2, watts_l3, watts, timestamp } = safeData;

  return (
    <Paper elevation={3} sx={{ px: 3, minHeight: 450, display: 'flex', flexDirection: 'column' }}>
      <Typography 
  variant="h3" 
  sx={{fontWeight:600 , textAlign: 'left', paddingLeft: 1, alignSelf: 'flex-start', paddingTop: 2 }}
>
        Real Power
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <BarChart
          key={timestamp}
          borderRadius={10}
          grid={{ horizontal: true }}
          margin={{ left: 70, right: 20, top: 50, bottom: 40 }}
          height={350}
          xAxis={[
            {
              data: ['L1', 'L2', 'L3', 'Total'],
              scaleType: 'band',
              label: 'Phases',
              labelStyle: { textAnchor: 'middle'},
              categoryGapRatio: 0.2,
              barGapRatio: -1,
            },
          ]}
          yAxis={[
            {
              label: 'Power (W)',
              labelStyle: {
                transform: 'translateX(-20px)',
                writingMode: 'sideways-lr',
                textAnchor: 'middle',
              },
            },
          ]}
          series={[
            {
              data: [watts_l1, null, null, null],
              label: 'L1',
              color: chartColors.phase1,
              valueFormatter: (value) => `${value} W`
            },
            {
              data: [null, watts_l2, null, null],
              label: 'L2',
              color: chartColors.phase2,
              valueFormatter: (value) => `${value} W`
            },
            {
              data: [null, null, watts_l3, null],
              label: 'L3',
              color: chartColors.phase3,
              valueFormatter: (value) => `${value} W`
            },
            {
              data: [null, null, null, watts],
              label: 'Total',
              color: chartColors.phaseTotal,
              valueFormatter: (value) => `${value} W`
            }
          ]}
          tooltip={{
            trigger: 'item',
            render: (params) => {
              if (params[0]?.dataIndex === 3) {
                return (
                  <Box sx={{ p: 2 }}>
                    <Typography variant="body2">
                      <strong>Total:</strong> {watts} W
                    </Typography>
                    <Typography variant="caption">L1: {watts_l1} W</Typography><br />
                    <Typography variant="caption">L2: {watts_l2} W</Typography><br />
                    <Typography variant="caption">L3: {watts_l3} W</Typography>
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

export default RealPower;