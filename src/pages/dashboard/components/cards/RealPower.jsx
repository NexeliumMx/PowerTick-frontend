import { BarChart } from '@mui/x-charts/BarChart';
import { Paper, Typography, Box } from '@mui/material';
import chartColors from '../../../../theme/chartColors';
const RealPower = ({ data }) => {
  const hasValidData =
    data &&
    typeof data.watts_l1 === 'number' &&
    typeof data.watts_l2 === 'number' &&
    typeof data.watts_l3 === 'number';

  console.log('Current demand data:', data);

  if (!hasValidData) {
    return (
      <Paper elevation={3} sx={{ p: 2, height: 300 }}>
        <Typography 
  variant="h2" 
  sx={{ textAlign: 'left', paddingLeft: 10, alignSelf: 'flex-start', paddingTop: '10px' }}
>
          Real Power
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Data not available.
        </Typography>
      </Paper>
    );
  }

  const { watts_l1, watts_l2, watts_l3, watts, timestamp_utc } = data;

  return (
    <Paper elevation={3} sx={{ p: 3, minHeight: 500, display: 'flex', flexDirection: 'column' }}>
      <Typography 
  variant="h3" 
  sx={{ textAlign: 'left', paddingLeft: 10, alignSelf: 'flex-start', paddingTop: '10px' }}
>
        Real Power
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <BarChart
          key={timestamp_utc}
          borderRadius={15}
          grid={{ horizontal: true }}
          margin={{ left: 70, right: 20, top: 50, bottom: 20 }}
          height={350}
          xAxis={[
            {
              data: ['L1', 'L2', 'L3', 'Total'],
              scaleType: 'band',
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
              data: [watts_l1, null, null, watts_l1],
              label: 'L1',
              stack: 'total',
              color: chartColors.phase1,
              valueFormatter: (value) => `${value} W`
            },
            {
              data: [null, watts_l2, null, watts_l2],
              label: 'L2',
              stack: 'total',
              color: chartColors.phase2,
              valueFormatter: (value) => `${value} W`
            },
            {
              data: [null, null, watts_l3, watts_l3],
              label: 'L3',
              stack: 'total',
              color: chartColors.phase3,
              valueFormatter: (value) => `${value} W`
            },
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