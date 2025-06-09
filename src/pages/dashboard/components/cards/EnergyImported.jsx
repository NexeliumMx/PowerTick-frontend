import { BarChart } from '@mui/x-charts/BarChart';
import { Paper, Typography, Box } from '@mui/material';
import chartColors from '../../../../theme/chartColors';

const EnergyImported = ({ data }) => {
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
      <Paper elevation={3} sx={{ px: 2, height: 450 }}>
        <Typography variant="h3" sx={{ fontWeight:600, textAlign: 'left', paddingLeft: 1, alignSelf: 'flex-start', paddingTop: 2 }}>
          Energy Imported
        </Typography>
        <Typography variant="body2" color="text.secondary" pt={20}>
          Data not available.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ px: 3, minHeight: 450, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h3" sx={{ fontWeight:600, textAlign: 'left', paddingLeft: 1, alignSelf: 'flex-start', paddingTop: 2 }}>
        Energy Imported
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <BarChart
          borderRadius={10}
          grid={{ horizontal: true }}
          height={350}
          margin={{ left: 70, right: 20, top: 50, bottom: 40 }}
          xAxis={[{
            data: ['L1', 'L2', 'L3', 'Total'],
            scaleType: 'band',
            label: 'Phases',
            labelStyle: { textAnchor: 'middle'}
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
              data: [kwh_imported_l1, kwh_imported_l2, kwh_imported_l3, kwh_imported_total],
              label: 'kWh Imported',
              color: chartColors.phase1,
              valueFormatter: (value) => `${value} kWh`
            },
            {
              data: [varh_imported_q1_l1, varh_imported_q1_l2, varh_imported_q1_l3, varh_imported_q1],
              label: 'varh Imported Q1',
              color: chartColors.phase2,
              valueFormatter: (value) => `${value} varh`
            },
            {
              data: [varh_imported_q2_l1, varh_imported_q2_l2, varh_imported_q2_l3, varh_imported_q2],
              label: 'varh Imported Q2',
              color: chartColors.phase3,
              valueFormatter: (value) => `${value} varh`
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
                      <strong>{item.seriesLabel} {['L1','L2','L3','Total'][item.dataIndex]}:</strong> {item.value} {item.seriesLabel.includes('kWh') ? 'kWh' : 'varh'}
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

export default EnergyImported;
