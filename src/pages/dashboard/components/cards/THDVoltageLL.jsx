import { BarChart } from '@mui/x-charts/BarChart';
import { Card, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import chartColors from '../../../../theme/chartColors';
import { useTheme } from '@mui/material/styles';

const THDVoltageLL = ({ data, title }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  // Use 0 if value is null or undefined
  const thd_voltage_ll = data?.thd_voltage_ll;
  const thd_voltage_l1_l2 = data?.thd_voltage_l1_l2;
  const thd_voltage_l2_l3 = data?.thd_voltage_l2_l3;
  const thd_voltage_l3_l1 = data?.thd_voltage_l3_l1;
console.log(thd_voltage_ll, thd_voltage_l1_l2, thd_voltage_l2_l3, thd_voltage_l3_l1);
  const hasValidData =
    typeof thd_voltage_ll === 'number' &&
    typeof thd_voltage_l1_l2 === 'number' &&
    typeof thd_voltage_l2_l3 === 'number' &&
    typeof thd_voltage_l3_l1 === 'number';

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
          {title || t('measurements.thdVoltageLL')}
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
        {title || t('measurements.thdVoltageLL')}
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
            data: [t('measurements.ll'), t('measurements.l1l2'), t('measurements.l2l3'), t('measurements.l3l1')],
            scaleType: 'band',
            label: t('measurements.phases'),
            labelStyle: { textAnchor: 'middle' },
          }]}
          yAxis={[{
            label: t('measurements.thdVoltageAxis'),
            labelStyle: {
              transform: 'translateX(-20px)',
              writingMode: 'sideways-lr',
              textAnchor: 'middle',
            },
          }]}
          series={[
            {
              data: [thd_voltage_ll, thd_voltage_l1_l2, thd_voltage_l2_l3, thd_voltage_l3_l1],
              label: t('measurements.thdVoltage'),
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
                      <strong>{item.seriesLabel} {[t('measurements.ll'), t('measurements.l1l2'), t('measurements.l2l3'), t('measurements.l3l1')][item.dataIndex]}:</strong> {item.value} %
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

export default THDVoltageLL;
