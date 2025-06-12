import { BarChart } from '@mui/x-charts/BarChart';
import { Paper, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import chartColors from '../../../../theme/chartColors';

const Power = ({ data, title }) => {
  const { t } = useTranslation();

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
          {title || t('measurements.realPower')}
        </Typography>
        <Typography variant="body2" color="text.secondary" pt={20}>
          {t('dashboard.dataNotAvailable')}
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ px: 3, minHeight: 450, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h3" sx={{ fontWeight:600, textAlign: 'left', paddingLeft: 1, alignSelf: 'flex-start', paddingTop: 2 }}>
        {title || t('measurements.realPower')}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: -5 }}>
        <BarChart
        slotProps={{
            legend: {
              direction: 'row',
              position: {vertical: 'top', horizontal: 'center'},
              itemGap: 140, 
              shrink: true,
              markShape: 'rect',
              
            }
          }}
          borderRadius={10}
          grid={{ horizontal: true }}
          height={430}
          margin={{ left: 70, right: 20, top: 130, bottom: 40 }}
          xAxis={[{
            data: ['L1', 'L2', 'L3', t('measurements.total')],
            scaleType: 'band',
            label: t('measurements.phases'),
            labelStyle: { textAnchor: 'middle'}
          }]}
          yAxis={[{
            label: t('measurements.power'),
            labelStyle: {
              transform: 'translateX(-20px)',
              writingMode: 'sideways-lr',
              textAnchor: 'middle',
            },
          }]}
          series={[
            {
              data: [watts_l1, watts_l2, watts_l3, watts],
              label: t('measurements.watts'),
              color: chartColors.phase1,
              valueFormatter: (value) => `${value} W`
            },
            {
              data: [va_l1, va_l2, va_l3, va],
              label: t('measurements.apparentPower'),
              color: chartColors.phase2,
              valueFormatter: (value) => `${value} VA`
            },
            {
              data: [var_l1, var_l2, var_l3, var_],
              label: t('measurements.reactivePower'),
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
                      <strong>{item.seriesLabel} {['L1','L2','L3',t('measurements.total')][item.dataIndex]}:</strong> {item.value} {unit}
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
