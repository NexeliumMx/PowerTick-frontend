import { BarChart } from '@mui/x-charts/BarChart';
import { Card, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import chartColors from '../../../../theme/chartColors';
import { useTheme } from '@mui/material/styles';

const ReactivePower = ({ data, title }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const hasValidData =
    data &&
    typeof data.var_l1 === 'number' &&
    typeof data.var_l2 === 'number' &&
    typeof data.var_l3 === 'number' &&
    typeof data['var'] === 'number';

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
          {title || t('measurements.reactivePower')}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" pt={20}>
          {t('dashboard.dataNotAvailable')}
        </Typography>
      </Card>
    );
  }

  const { var_l1, var_l2, var_l3 } = data;
  const totalVar = data['var'];

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
          data: [t('measurements.l1'), t('measurements.l2'), t('measurements.l3'), t('measurements.total')],            scaleType: 'band',
            categoryGapRatio: 0.2,
            barGapRatio: -1,
            label: t('measurements.phases'),
            labelStyle: { textAnchor: 'middle' }
          }]}
          yAxis={[{
            label: t('measurements.reactivePowerAxis'),
            labelStyle: {
              transform: 'translateX(-20px)',
              writingMode: 'sideways-lr',
              textAnchor: 'middle',
            },
          }]}
          series={[
            {
              data: [var_l1/10000, null, null, null],
              label: t('measurements.l1'),
              color: chartColors.phase1,
              valueFormatter: (value) => `${value} kVAr`
            },
            {
              data: [null, var_l2/10000, null, null],
              label: t('measurements.l2'),
              color: chartColors.phase2,
              valueFormatter: (value) => `${value} kVAr`
            },
            {
              data: [null, null, var_l3/10000, null],
              label: t('measurements.l3'),
              color: chartColors.phase3,
              valueFormatter: (value) => `${value} kVAr`
            },
            {
              data: [null, null, null, totalVar/10000],
              label: t('measurements.total'),
              color: chartColors.phaseTotal,
              valueFormatter: (value) => `${value} kVAr`
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
    </Card>
  );
};

export default ReactivePower;