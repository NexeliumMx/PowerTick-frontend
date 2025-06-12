import { BarChart } from '@mui/x-charts/BarChart';
import { Paper, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import chartColors from '../../../../theme/chartColors';
const ReactivePower = ({ data, title }) => {
  const { t } = useTranslation();
  const hasValidData =
    data &&
    typeof data.var_l1 === 'number' &&
    typeof data.var_l2 === 'number' &&
    typeof data.var_l3 === 'number' &&
    typeof data['var'] === 'number';

  if (!hasValidData) {
    return (
      <Paper elevation={3} sx={{ px: 2, height: 450 }}>
        <Typography 
  variant="h3" 
  sx={{ fontWeight:600, textAlign: 'left', paddingLeft: 1, alignSelf: 'flex-start', paddingTop: 2}}
>
          {title || t('measurements.reactivePower')}
        </Typography>
        <Typography variant="body2" color="text.secondary" pt={20}>
          {t('dashboard.dataNotAvailable')}
        </Typography>
      </Paper>
    );
  }

  const { var_l1, var_l2, var_l3 } = data;
  const totalVar = data['var'];

  return (
    <Paper elevation={3} sx={{ px: 3, minHeight: 450, display: 'flex', flexDirection: 'column' }}>
      <Typography 
  variant="h3" 
  sx={{ fontWeight:600 ,textAlign: 'left', paddingLeft: 1, alignSelf: 'flex-start', paddingTop: 2}}
>
        {title || t('measurements.reactivePower')}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <BarChart
          slotProps={{
            legend: { hidden: true }
          }}
          borderRadius={10}
          grid={{ horizontal: true }}
          margin={{ left: 70, right: 20, top: 50, bottom: 40 }}
          height={350}
          xAxis={[{
            data: ['L1', 'L2', 'L3', 'Total'],
            scaleType: 'band',
            categoryGapRatio: 0.2,
            barGapRatio: -1,
            label: 'Phases',
            labelStyle: { textAnchor: 'middle' }
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