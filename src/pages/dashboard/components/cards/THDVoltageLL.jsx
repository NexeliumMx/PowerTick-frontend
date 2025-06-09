import { BarChart } from '@mui/x-charts/BarChart';
import { Paper, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import chartColors from '../../../../theme/chartColors';

const THDVoltageLL = ({ data, title }) => {
  const { t } = useTranslation();

  // Use 0 if value is null or undefined
  const thd_voltage_ll = data?.thd_voltage_ll ?? 0;
  const thd_voltage_l1_l2 = data?.thd_voltage_l1_l2 ?? 0;
  const thd_voltage_l2_l3 = data?.thd_voltage_l2_l3 ?? 0;
  const thd_voltage_l3_l1 = data?.thd_voltage_l3_l1 ?? 0;
  const hasValidData =
    typeof thd_voltage_ll === 'number' &&
    typeof thd_voltage_l1_l2 === 'number' &&
    typeof thd_voltage_l2_l3 === 'number' &&
    typeof thd_voltage_l3_l1 === 'number';

  if (!hasValidData) {
    return (
      <Paper elevation={3} sx={{ px: 2, height: 450 }}>
        <Typography variant="h3" sx={{ fontWeight:600, textAlign: 'left', paddingLeft: 1, alignSelf: 'flex-start', paddingTop: 2 }}>
          {title || t('measurements.thdVoltageLL')}
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
        {title || t('measurements.thdVoltageLL')}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <BarChart
          borderRadius={10}
          grid={{ horizontal: true }}
          height={350}
          margin={{ left: 70, right: 20, top: 50, bottom: 40 }}
          xAxis={[{
            data: ['LL', 'L1-L2', 'L2-L3', 'L3-L1'],
            scaleType: 'band',
            label: 'Phases',
            labelStyle: { textAnchor: 'middle'}
          }]}
          yAxis={[{
            label: 'THD (%)',
            labelStyle: {
              transform: 'translateX(-20px)',
              writingMode: 'sideways-lr',
              textAnchor: 'middle',
            },
          }]}
          series={[
            {
              data: [thd_voltage_ll, thd_voltage_l1_l2, thd_voltage_l2_l3, thd_voltage_l3_l1],
              label: 'THD Voltage LL',
              color: chartColors.phaseTotal,
              valueFormatter: (value) => `${value} %`
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
                      <strong>{item.seriesLabel} {['LL','L1-L2','L2-L3','L3-L1'][item.dataIndex]}:</strong> {item.value} %
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

export default THDVoltageLL;
