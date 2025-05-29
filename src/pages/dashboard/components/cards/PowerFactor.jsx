import { Paper, Typography, Box } from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

const getColorByFP = (value) => {
  if (value >= 0.95) return '#4caf50';     // Green
  if (value >= 0.90) return '#ffb300';     // Yellow
  return '#f44336';                        // Red
};

const PowerFactor = ({ data }) => {
  const hasValidData =
    data &&
    typeof data.pf_l1 === 'number' &&
    typeof data.pf_l2 === 'number' &&
    typeof data.pf_l3 === 'number' &&
    typeof data.power_factor === 'number';

  if (!hasValidData) {
    return (
      <Paper elevation={3} sx={{ p: 2, height: 300 }}>
        <Typography 
  variant="h2" 
  sx={{ textAlign: 'left', paddingLeft: 3, alignSelf: 'flex-start', paddingTop: 1 }}
>
          Power Factor
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Data not available.
        </Typography>
      </Paper>
    );
  }

  const gauges = [
    { label: 'L1', value: data.pf_l1 / 1000 },
    { label: 'L2', value: data.pf_l2 / 1000 },
    { label: 'L3', value: data.pf_l3 / 1000 },
    { label: 'Avg.', value: data.power_factor / 1000 },
  ];

  return (
    <Paper elevation={3} sx={{ p: 3, minHeight: 450, display: 'flex', flexDirection: 'column' }}>
      <Typography 
 variant="h3" 
  sx={{ fontWeight:600 ,textAlign: 'left', paddingLeft: 1, alignSelf: 'flex-start', paddingTop: 0 }}
>
        Power Factor (0 to 1)
      </Typography>
      <Grid2 container spacing={2} 
      justifyContent="center" 
      alignItems="center"
      sx={{ flex:1, minHeight: 0 }}
      >
        {gauges.map(({ label, value }) => {
          const color = getColorByFP(value);
          return (
          <Grid2
                  key={label}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
      ><Box sx={{ width: 140, height: 150, mx: 'auto' }}>
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
    </Paper>
  );
};

export default PowerFactor;