import { BarChart } from '@mui/x-charts/BarChart';
import { Card, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import chartColors from '../../../../theme/chartColors';
import { useTheme } from '@mui/material/styles';

const RealPower = ({ data, title }) => {
  const { t } = useTranslation();
  const theme = useTheme();

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

  const { watts_l1, watts_l2, watts_l3, watts, timestamp } = safeData;

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
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <BarChart
          slotProps={{
            legend: { hidden: true }
          }}
          key={timestamp}
          borderRadius={10}
          grid={{ horizontal: true }}
          margin={{ left: 70, right: 20, top: 50, bottom: 40 }}
          height={350}
          xAxis={[
            {
          data: [t('measurements.l1'), t('measurements.l2'), t('measurements.l3'), t('measurements.total')],              scaleType: 'band',
              label: t('measurements.phases'),
              labelStyle: { textAnchor: 'middle' },
              categoryGapRatio: 0.2,
              barGapRatio: -1,
            },
          ]}
          yAxis={[
            {
              label: t('measurements.realPowerAxis'),
              labelStyle: {
                transform: 'translateX(-20px)',
                writingMode: 'sideways-lr',
                textAnchor: 'middle',
              },
            },
          ]}
          series={[
            {
              data: [watts_l1/10000, null, null, null],
              label: t('measurements.l1'),
              color: chartColors.phase1,
              valueFormatter: (value) => `${value} kW`
            },
            {
              data: [null, watts_l2/10000, null, null],
              label: t('measurements.l2'),
              color: chartColors.phase2,
              valueFormatter: (value) => `${value} kW`
            },
            {
              data: [null, null, watts_l3/10000, null],
              label: t('measurements.l3'),
              color: chartColors.phase3,
              valueFormatter: (value) => `${value} kW`
            },
            {
              data: [null, null, null, watts/10000],
              label: t('measurements.total'),
              color: chartColors.phaseTotal,
              valueFormatter: (value) => `${value} kW`
            }
          ]}
          tooltip={{
            trigger: 'item',
            render: (params) => {
              if (params[0]?.dataIndex === 3) {
                return (
                  <Box sx={{ p: 2 }}>
                    <Typography variant="body2">
                      <strong>{t('measurements.total')}:</strong> {watts} W
                    </Typography>
                    <Typography variant="caption">{t('measurements.l1')}: {watts_l1} W</Typography><br />
                    <Typography variant="caption">{t('measurements.l2')}: {watts_l2} W</Typography><br />
                    <Typography variant="caption">{t('measurements.l3')}: {watts_l3} W</Typography>
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

export default RealPower;