import { BarChart } from '@mui/x-charts/BarChart';
import { Card, Typography, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import chartColors from '../../../../theme/chartColors';
import { useTheme } from '@mui/material/styles';

const EnergyImported = ({ data, title }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  // Use 0 if value is null or undefined
  const kwh_imported_total = data?.kwh_imported_total ?? 0;
  const kwh_imported_l1 = data?.kwh_imported_l1 ?? 0;
  const kwh_imported_l2 = data?.kwh_imported_l2 ?? 0;
  const kwh_imported_l3 = data?.kwh_imported_l3 ?? 0;
  const varh_imported_q1 = data?.varh_imported_q1 ?? 0;
  const varh_imported_q1_l1 = data?.varh_imported_q1_l1 ?? 0;
  const varh_imported_q1_l2 = data?.varh_imported_q1_l2 ?? 0;
  const varh_imported_q1_l3 = data?.varh_imported_q1_l3 ?? 0;
  const varh_imported_q2 = data?.varh_imported_q2 ?? 0;
  const varh_imported_q2_l1 = data?.varh_imported_q2_l1 ?? 0;
  const varh_imported_q2_l2 = data?.varh_imported_q2_l2 ?? 0;
  const varh_imported_q2_l3 = data?.varh_imported_q2_l3 ?? 0;

  const hasValidData =
    typeof kwh_imported_total === 'number' &&
    typeof kwh_imported_l1 === 'number' &&
    typeof kwh_imported_l2 === 'number' &&
    typeof kwh_imported_l3 === 'number';

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
          {title || t('measurements.energyImported')}
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
        {title || t('measurements.energyImported')}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: -12 }}>
        <BarChart
          slotProps={{
            legend: {
              direction: 'row',
              position: { vertical: 'top', horizontal: 'center' },
              itemGap: 240,
              shrink: true,
              markShape: 'rect',
            },
          }}
          borderRadius={10}
          grid={{ horizontal: true }}
          height={480}
          margin={{ left: 70, right: 20, top: 180, bottom: 40 }}
          xAxis={[{
          data: [t('measurements.l1'), t('measurements.l2'), t('measurements.l3'), t('measurements.total')],            
          scaleType: 'band',
            label: t('measurements.phases'),
            labelStyle: { textAnchor: 'middle' },
          }]}
          yAxis={[{
            label: t('measurements.energyAxis'),
            labelStyle: {
              transform: 'translateX(-20px)',
              writingMode: 'sideways-lr',
              textAnchor: 'middle',
            },
          }]}
          series={[
            {
              data: [kwh_imported_l1, kwh_imported_l2, kwh_imported_l3, kwh_imported_total],
              label: t('measurements.kwhEnergyImported'),
              color: chartColors.phase1,
              valueFormatter: (value) => `${value} kWh`,
            },
            {
              data: [varh_imported_q1_l1, varh_imported_q1_l2, varh_imported_q1_l3, varh_imported_q1],
              label: t('measurements.varhImportedQ1'),
              color: chartColors.phase2,
              valueFormatter: (value) => `${value} varh`,
            },
            {
              data: [varh_imported_q2_l1, varh_imported_q2_l2, varh_imported_q2_l3, varh_imported_q2],
              label: t('measurements.varhImportedQ2'),
              color: chartColors.phase3,
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
                      <strong>{item.seriesLabel} {[t('measurements.l1'), t('measurements.l2'), t('measurements.l3'), t('measurements.total')][item.dataIndex]}:</strong> {item.value} {item.seriesLabel.includes('kWh') ? 'kWh' : 'varh'}
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

export default EnergyImported;
