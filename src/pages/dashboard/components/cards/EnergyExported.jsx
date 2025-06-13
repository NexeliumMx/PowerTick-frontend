import { BarChart } from '@mui/x-charts/BarChart';
import { Card, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import chartColors from '../../../../theme/chartColors';
import { useTheme } from '@mui/material/styles';

const EnergyExported = ({ data, title }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  // Use 0 if value is null or undefined
  const kwh_exported_total = data?.kwh_exported_total ?? 0;
  const kwh_exported_l1 = data?.kwh_exported_l1 ?? 0;
  const kwh_exported_l2 = data?.kwh_exported_l2 ?? 0;
  const kwh_exported_l3 = data?.kwh_exported_l3 ?? 0;
  const varh_exported_q4 = data?.varh_exported_q4 ?? 0;
  const varh_exported_q4_l1 = data?.varh_exported_q4_l1 ?? 0;
  const varh_exported_q4_l2 = data?.varh_exported_q4_l2 ?? 0;
  const varh_exported_q4_l3 = data?.varh_exported_q4_l3 ?? 0;

  const hasValidData =
    typeof kwh_exported_total === 'number' &&
    typeof kwh_exported_l1 === 'number' &&
    typeof kwh_exported_l2 === 'number' &&
    typeof kwh_exported_l3 === 'number';

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
          {title || t('measurements.energyExported')}
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
        {title || t('measurements.energyExported')}
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
            data: ['L1', 'L2', 'L3', 'Total'],
            scaleType: 'band',
            label: 'Phases',
            labelStyle: { textAnchor: 'middle' },
          }]}
          yAxis={[{
            label: 'kWh / varh',
            labelStyle: {
              transform: 'translateX(-20px)',
              writingMode: 'sideways-lr',
              textAnchor: 'middle',
            },
          }]}
          series={[
            {
              data: [kwh_exported_l1, kwh_exported_l2, kwh_exported_l3, kwh_exported_total],
              label: 'kWh Exported',
              color: chartColors.phase1,
              valueFormatter: (value) => `${value} kWh`,
            },
            {
              data: [varh_exported_q4_l1, varh_exported_q4_l2, varh_exported_q4_l3, varh_exported_q4],
              label: 'varh Exported Q4',
              color: chartColors.phase2,
              valueFormatter: (value) => `${value} varh`,
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
                      <strong>{item.seriesLabel} {['L1', 'L2', 'L3', 'Total'][item.dataIndex]}:</strong> {item.value} {item.seriesLabel.includes('kWh') ? 'kWh' : 'varh'}
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

export default EnergyExported;
