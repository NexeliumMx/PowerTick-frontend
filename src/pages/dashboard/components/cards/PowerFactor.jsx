import { Card, Typography, Box } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { useTranslation } from 'react-i18next';
import chartColors from '../../../../theme/chartColors';
import { useTheme } from '@mui/material/styles';
const getColorByFP = (value) => {
  
  if (value >= 0.95) return chartColors.powerFactorGood;     // Green
  if (value >= 0.92) return chartColors.powerFactorModerate; // Yellow
  if (value >= 0.90) return chartColors.powerFactorRisky;    // Orange
  return chartColors.powerFactorPoor;                       // Red
};

const PowerFactor = ({ data, title }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const hasValidData =
    data &&
    typeof data.pf_l1 === 'number' &&
    typeof data.pf_l2 === 'number' &&
    typeof data.pf_l3 === 'number' &&
    typeof data.power_factor === 'number';

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
          {title || t('measurements.powerFactorRange')}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" pt={20}>
          {t('dashboard.dataNotAvailable')}
        </Typography>
      </Card>
    );
  }

  const gauges = [
    { label: t('measurements.l1'), value: data.pf_l1 / 1000 },
    { label: t('measurements.l1'), value: data.pf_l2 / 1000 },
    { label: t('measurements.l1'), value: data.pf_l3 / 1000 },
    { label: t('measurements.avg'), value: data.power_factor / 1000 },
  ];

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
        {title || t('measurements.powerFactorRange')}
      </Typography>
      <Grid2 container spacing={2} 
        justifyContent="center" 
        alignItems="center"
        sx={{ flex: 1, minHeight: 0 }}
      >
        {gauges.map(({ label, value }) => {
          const color = getColorByFP(value);
          return (
            <Grid2
              key={label}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Box sx={{ width: 140, height: 150, mx: 'auto' }}>
                <Gauge
                  value={value}
                  valueMin={0}
                  valueMax={1}
                  startAngle={-110}
                  endAngle={110}
                  sx={{
                    [`& .${gaugeClasses.valueText}`]: {
                      fontSize: 30,
                    },
                    [`& .${gaugeClasses.valueArc}`]: {
                      fill: color,
                    },
                  }}
                  text={({ value }) => value.toFixed(2)}
                />
              </Box>
              <Typography align="center" sx={{ mt: 0 }}>
                {label}
              </Typography>
            </Grid2>
          );
        })}
      </Grid2>
    </Card>
  );
};

export default PowerFactor;