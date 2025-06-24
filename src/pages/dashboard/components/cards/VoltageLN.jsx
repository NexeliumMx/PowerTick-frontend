import { BarChart } from '@mui/x-charts/BarChart';
import { Card, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import chartColors from '../../../../theme/chartColors';
import { useTheme } from '@mui/material/styles';

const VoltageLN = ({ data, title }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const hasValidData =
    data &&
    typeof data.voltage_l1 === 'number' &&
    typeof data.voltage_l2 === 'number' &&
    typeof data.voltage_l3 === 'number' &&
    typeof data.voltage_ln === 'number';

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
          {title || t('measurements.voltageLN')}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" pt={20}>
          {t('dashboard.dataNotAvailable')}
        </Typography>
      </Card>
    );
  }

  const { voltage_l1, voltage_l2, voltage_l3, voltage_ln } = data;

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
        {title || t('measurements.voltageLN')}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <BarChart
          slotProps={{
            legend: { hidden: true }
          }}
          borderRadius={10}
          grid={{ horizontal: true }}
          height={350}
          margin={{ left: 70, right: 20, top: 50, bottom: 40 }}
          xAxis={[
            {
              data: ['L1', 'L2', 'L3', 'Average'],
              scaleType: 'band',
              categoryGapRatio: 0.2,
              barGapRatio: -1,
              label: 'Phases',
              labelStyle: { textAnchor: 'middle' }
            },
          ]}
          yAxis={[
            {
              label: 'Voltage (V)',
              labelStyle: {
                transform: 'translateX(-20px)',
                writingMode: 'sideways-lr',
                textAnchor: 'middle',
              },
            },
          ]}
          series={[
            {
              data: [voltage_l1/10, 0, 0, 0],
              label: 'L1',
              color: chartColors.phase1,
              valueFormatter: (value) => `${value} V`
            },
            {
              data: [0, voltage_l2/10, 0, 0],
              label: 'L2',
              color: chartColors.phase2,
              valueFormatter: (value) => `${value} V`
            },
            {
              data: [0, 0, voltage_l3/10, 0],
              label: 'L3',
              color: chartColors.phase3,
              valueFormatter: (value) => `${value} V`
            },
            {
              data: [0, 0, 0, voltage_ln/10],
              label: 'Average',
              color: chartColors.phaseTotal,
              valueFormatter: (value) => `${value} V`
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
                      <strong>{item.seriesLabel}:</strong> {item.value} V
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

export default VoltageLN;