import { BarChart } from '@mui/x-charts/BarChart';
import { Card, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import chartColors from '../../../../theme/chartColors';
import { useTheme } from '@mui/material/styles';

const THDCurrent = ({ data, title }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  // Use 0 if value is null or undefined
  const thd_current_l1 = data?.thd_current_l1 ?? 0;
  const thd_current_l2 = data?.thd_current_l2 ?? 0;
  const thd_current_l3 = data?.thd_current_l3 ?? 0;

  const hasValidData =
    typeof thd_current_l1 === 'number' &&
    typeof thd_current_l2 === 'number' &&
    typeof thd_current_l3 === 'number';

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
          {title || t('measurements.thdCurrent')}
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
        {title || t('measurements.thdCurrent')}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: -3 }}>
        <BarChart
          slotProps={{
            legend: {
              direction: 'row',
              position: { vertical: 'top', horizontal: 'center' },
              itemGap: 100, 
              shrink: true,
              markShape: 'rect',
            },
          }}
          borderRadius={10}
          grid={{ horizontal: true }}
          height={410}
          margin={{ left: 70, right: 20, top: 110, bottom: 40 }}
          xAxis={[{
          data: [t('measurements.l1'), t('measurements.l2'), t('measurements.l3')], 
           scaleType: 'band',
            label: t('measurements.phases'),
            labelStyle: { textAnchor: 'middle' },
          }]}
          yAxis={[{
            label: t('measurements.thdCurrentAxis'),
            labelStyle: {
              transform: 'translateX(-20px)',
              writingMode: 'sideways-lr',
              textAnchor: 'middle',
            },
          }]}
          series={[
            {
              data: [thd_current_l1/100, thd_current_l2/100, thd_current_l3/100],
              label: t('measurements.thdCurrent'),
              color: chartColors.phaseTotal,
              valueFormatter: (value) => `${value} %`,
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
                      <strong>{item.seriesLabel} {[t('measurements.l1'),t('measurements.l2'), t('measurements.l3')][item.dataIndex]}:</strong> {item.value} %
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

export default THDCurrent;
