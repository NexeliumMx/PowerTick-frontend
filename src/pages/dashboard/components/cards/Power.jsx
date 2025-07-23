import { BarChart } from '@mui/x-charts/BarChart';
import { Card, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import chartColors from '../../../../theme/chartColors';
import { useTheme } from '@mui/material/styles';

const Power = ({ data, title }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  // Use 0 if value is null or undefined
  const watts = data?.watts;
  const watts_l1 = data?.watts_l1;
  const watts_l2 = data?.watts_l2;
  const watts_l3 = data?.watts_l3;
  const va = data?.va;
  const va_l1 = data?.va_l1;
  const va_l2 = data?.va_l2;
  const va_l3 = data?.va_l3;
  const var_ = data?.var;
  const var_l1 = data?.var_l1;
  const var_l2 = data?.var_l2;
  const var_l3 = data?.var_l3;

  const hasValidData =
    typeof watts === 'number' &&
    typeof watts_l1 === 'number' &&
    typeof watts_l2 === 'number' &&
    typeof watts_l3 === 'number';

  if (!hasValidData) {
    return (
      <Card
        sx={{
          px: 2,
          minHeight: 450,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: theme.palette.background.card, // Matches the Card theme
          boxShadow: theme.shadows[3], // Adds elevation
        }}
      >
        <Typography 
          variant="h3" 
          sx={{ fontWeight: 600, textAlign: 'left', paddingLeft: 1, alignSelf: 'flex-start', paddingTop: 2 }}
        >
          {title || t('measurements.realPower')}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" pt={20}>
          {t('dashboard.dataNotAvailable')}
        </Typography>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        px: 3,
        minHeight: 450,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.card, // Matches the Card theme
        boxShadow: theme.shadows[3], // Adds elevation
      }}
    >
      <Typography 
        variant="h3" 
        sx={{ fontWeight: 600, textAlign: 'left', paddingLeft: 1, alignSelf: 'flex-start', paddingTop: 2 }}
      >
        {title || t('measurements.realPower')}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: -5 }}>
        <BarChart
          slotProps={{
            legend: {
              direction: 'row',
              position: { vertical: 'top', horizontal: 'center' },
              itemGap: 140, 
              shrink: true,
              markShape: 'rect',
            },
          }}
          borderRadius={10}
          grid={{ horizontal: true }}
          height={430}
          margin={{ left: 70, right: 20, top: 130, bottom: 40 }}
          xAxis={[{
            data: [t('measurements.l1'), t('measurements.l2'), t('measurements.l3'), t('measurements.total')],
            scaleType: 'band',
            label: t('measurements.phases'),
            labelStyle: { textAnchor: 'middle' },
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
              data: [watts_l1/10, watts_l2/10, watts_l3/10, watts/10],
              label: t('measurements.watts'),
              color: chartColors.phase1,
              valueFormatter: (value) => `${value} kW`,
            },
            {
              data: [va_l1/10000, va_l2/10000, va_l3/10000, va/10000],
              label: t('measurements.apparentPower'),
              color: chartColors.phase2,
              valueFormatter: (value) => `${value} kVA`,
            },
            {
              data: [var_l1/10000, var_l2/10000, var_l3/10000, var_/10000],
              label: t('measurements.reactivePowerLabel'),
              color: chartColors.phase3,
              valueFormatter: (value) => `${value} kvar`,
            },
          ]}
          tooltip={{
            trigger: 'item',
            render: (params) => {
              const item = params[0];
              if (item) {
                let unit = 'kW';
                if (item.seriesLabel.includes('Apparent')) unit = 'kVA';
                if (item.seriesLabel.includes('Reactive')) unit = 'kvar';
                return (
                  <Box sx={{ p: 1 }}>
                    <Typography variant="body2">
                      <strong>{item.seriesLabel} {['L1', 'L2', 'L3', t('measurements.total')][item.dataIndex]}:</strong> {item.value} {unit}
                    </Typography>
                  </Box>
                );
              }
              return null;
            },
          }}
        />
      </Box>
    </Card>
  );
};

export default Power;
