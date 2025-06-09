import { BarChart } from '@mui/x-charts/BarChart';
import { Paper, Typography, Box } from '@mui/material';
import chartColors from '../../../../theme/chartColors';

const Power = ({ data }) => {
  // Use 0 if value is null or undefined
  const watts = data?.watts ?? 0;
  const watts_l1 = data?.watts_l1 ?? 0;
  const watts_l2 = data?.watts_l2 ?? 0;
  const watts_l3 = data?.watts_l3 ?? 0;
  const va = data?.va ?? 0;
  const va_l1 = data?.va_l1 ?? 0;
  const va_l2 = data?.va_l2 ?? 0;
  const va_l3 = data?.va_l3 ?? 0;
  const var_ = data?.var ?? 0;
  const var_l1 = data?.var_l1 ?? 0;
  const var_l2 = data?.var_l2 ?? 0;
  const var_l3 = data?.var_l3 ?? 0;
  const hasValidData =
    typeof watts === 'number' &&
    typeof watts_l1 === 'number' &&
    typeof watts_l2 === 'number' &&
    typeof watts_l3 === 'number';

  if (!hasValidData) {
    return (
      <Paper elevation={3} sx={{ px: 2, height: 450 }}>
        <Typography variant="h3" sx={{ fontWeight:600, textAlign: 'left', paddingLeft: 1, alignSelf: 'flex-start', paddingTop: 2 }}>
          Power
        </Typography>
        <Typography variant="body2" color="text.secondary" pt={20}>
          Data not available.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ px: 3, minHeight: 450, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h3" sx={{ fontWeight:600, textAlign: 'left', paddingLeft: 1, alignSelf: 'flex-start', paddingTop: 2 }}>
        Power
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <BarChart
          borderRadius={10}
          grid={{ horizontal: true }}
          height={350}
          margin={{ left: 70, right: 20, top: 50, bottom: 40 }}
          xAxis={[{
            data: ['L1', 'L2', 'L3', 'Total'],
            scaleType: 'band',
            label: 'Phases',
            labelStyle: { textAnchor: 'middle'}
          }]}
          yAxis={[{
            label: 'Power',
            labelStyle: {
              transform: 'translateX(-20px)',
              writingMode: 'sideways-lr',
              textAnchor: 'middle',
            },
          }]}
          series={[
            {
              data: [watts_l1, watts_l2, watts_l3, watts],
              label: 'Watts (W)',
              color: chartColors.phase1,
              valueFormatter: (value) => `${value} W`
            },
            {
              data: [va_l1, va_l2, va_l3, va],
              label: 'Apparent Power (VA)',
              color: chartColors.phase2,
              valueFormatter: (value) => `${value} VA`
            },
            {
              data: [var_l1, var_l2, var_l3, var_],
              label: 'Reactive Power (var)',
              color: chartColors.phase3,
              valueFormatter: (value) => `${value} var`
            },
          ]}
          tooltip={{
            trigger: 'item',
            render: (params) => {
              const item = params[0];
              if (item) {
                let unit = 'W';
                if (item.seriesLabel.includes('Apparent')) unit = 'VA';
                if (item.seriesLabel.includes('Reactive')) unit = 'var';
                return (
                  <Box sx={{ p: 1 }}>
                    <Typography variant="body2">
                      <strong>{item.seriesLabel} {['L1','L2','L3','Total'][item.dataIndex]}:</strong> {item.value} {unit}
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

export default Power;
