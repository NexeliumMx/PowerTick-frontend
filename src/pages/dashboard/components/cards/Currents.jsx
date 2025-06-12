import { BarChart } from '@mui/x-charts/BarChart';
import { Paper, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import chartColors from '../../../../theme/chartColors';
const Currents = ({ data, title }) => {
  const { t } = useTranslation();
  const hasValidData =
    data &&
    typeof data.current_l1 === 'number' &&
    typeof data.current_l2 === 'number' &&
    typeof data.current_l3 === 'number';
  console.log('Current meter data:', data);
  if (!hasValidData) {
    return (
      <Paper elevation={3} sx={{ px: 2, height: 450 }}>
        <Typography variant="h3" sx={{ fontWeight:600, textAlign: 'left', paddingLeft: 1, alignSelf: 'flex-start', paddingTop: 2 }}>
          {title || t('measurements.currents')}
        </Typography>
        <Typography variant="body2" color="text.secondary" pt={20}>
          {t('dashboard.dataNotAvailable')}
        </Typography>
      </Paper>
    );
  }

  const { current_l1, current_l2, current_l3, timestamp } = data;
  const total = current_l1 + current_l2 + current_l3;

  return (
    <Paper elevation={3} sx={{ px: 3, minHeight: 450, display: 'flex', flexDirection: 'column' }}>
      <Typography 
        variant="h3" 
        sx={{ fontWeight:600 ,textAlign: 'left', paddingLeft: 1, alignSelf: 'flex-start', paddingTop: 2 }}
      >
        {title || t('measurements.currents')}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <BarChart
        slotProps={{
          legend: { hidden: true }
        }}
        borderRadius={10}
        grid={{horizontal:true}}
         margin={{ left: 70, right: 20, top: 50, bottom: 40 }}
          xAxis={[
            {
              data: ['Phase 1', 'Phase 2', 'Phase 3', 'Total'],
              scaleType: 'band',
              label: 'Phases',
              labelStyle: { textAnchor: 'middle'}, 
              categoryGapRatio: 0.2, 
              barGapRatio: -1,

            },
          ]}
          yAxis={[
            {
              label: 'Current (A)',
              labelStyle: { transform: 'translateX(-20px)', writingMode: 'sideways-lr', textAnchor: 'middle'} // Axis separation
            },
          ]}
          height={350}
          series={[
            {
              data: [current_l1, null, null, null],
              label: 'Phase 1',
              valueFormatter: (value) => `${value} A`
            },
            {
              data: [null, current_l2, null, null],
              label: 'Phase 2',
              valueFormatter: (value) => `${value} A`
            },
            {
              data: [null, null, current_l3, null],
              label: 'Phase 3',
              valueFormatter: (value) => `${value} A`
            },
            {data: [null, null, null, total],
              label: 'Total',
              valueFormatter: (value) => `${value} A`
            },
          ]}
          colors={[chartColors.phase1, chartColors.phase2, chartColors.phase3, chartColors.phaseTotal]}
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
              return null; // Use default tooltip for other bars
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default Currents;