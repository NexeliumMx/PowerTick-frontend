import { BarChart } from '@mui/x-charts/BarChart';
import { Card, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import chartColors from '../../../../theme/chartColors';
import { useTheme } from '@mui/material/styles';

const Currents = ({ data, title }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const hasValidData =
    data &&
    typeof data.current_l1 === 'number' &&
    typeof data.current_l2 === 'number' &&
    typeof data.current_l3 === 'number';

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
          sx={{
            fontWeight: 600,
            textAlign: 'left',
            paddingLeft: 1,
            alignSelf: 'flex-start',
            paddingTop: 2,
          }}
        >
          {title || t('measurements.currents')}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          pt={20}
        >
          {t('dashboard.dataNotAvailable')}
        </Typography>
      </Card>
    );
  }

  const { current_l1, current_l2, current_l3, timestamp } = data;
  const total = current_l1 + current_l2 + current_l3;

  return (
    <Card
      sx={{
        px: 3,
        py: 2,
        minHeight: 450,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: theme.palette.background.card, // Matches the Card theme
        boxShadow: theme.shadows[3], // Adds elevation
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: 600,
          textAlign: 'left',
          paddingLeft: 2,
          alignSelf: 'flex-start',
          paddingTop: 2,
        }}
      >
        {title || t('measurements.currents')}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <BarChart
          slotProps={{
            legend: { hidden: true },
          }}
          borderRadius={10}
          grid={{ horizontal: true }}
          margin={{ left: 70, right: 20, top: 50, bottom: 40 }}
          xAxis={[
            {
              data: ['Phase 1', 'Phase 2', 'Phase 3', 'Total'],
              scaleType: 'band',
              label: 'Phases',
              labelStyle: { textAnchor: 'middle' },
              categoryGapRatio: 0.2,
              barGapRatio: -1,
            },
          ]}
          yAxis={[
            {
              label: 'Current (A)',
              labelStyle: {
                transform: 'translateX(-20px)',
                writingMode: 'sideways-lr',
                textAnchor: 'middle',
              },
            },
          ]}
          height={350}
          series={[
            {
              data: [current_l1/1000, null, null, null],
              label: 'Phase 1',
              valueFormatter: (value) => `${value} A`,
            },
            {
              data: [null, current_l2/1000, null, null],
              label: 'Phase 2',
              valueFormatter: (value) => `${value} A`,
            },
            {
              data: [null, null, current_l3/1000, null],
              label: 'Phase 3',
              valueFormatter: (value) => `${value} A`,
            },
            {
              data: [null, null, null, total/1000],
              label: 'Total',
              valueFormatter: (value) => `${value} A`,
            },
          ]}
          colors={[
            chartColors.phase1,
            chartColors.phase2,
            chartColors.phase3,
            chartColors.phaseTotal,
          ]}
          tooltip={{
            trigger: 'item',
            render: (params) => {
              if (params[0]?.dataIndex === 3) {
                return (
                  <Box sx={{ p: 2 }}>
                    <Typography variant="body2">
                      <strong>Total:</strong> {total.toFixed(0)} A
                    </Typography>
                    <Typography variant="caption">L1: {current_l1} A</Typography>
                    <br />
                    <Typography variant="caption">L2: {current_l2} A</Typography>
                    <br />
                    <Typography variant="caption">L3: {current_l3} A</Typography>
                  </Box>
                );
              }
              return null; // Use default tooltip for other bars
            },
          }}
        />
      </Box>
    </Card>
  );
};

export default Currents;