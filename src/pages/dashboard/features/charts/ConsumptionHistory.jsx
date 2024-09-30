import { useState } from 'react';
import { Card, CardHeader, CardContent, CardActions, ToggleButton, ToggleButtonGroup, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '@mui/material/styles';

const consumptionData = [
  { name: 'Jan', kWh: 50 },
  { name: 'Feb', kWh: 60 },
  { name: 'Mar', kWh: 55 },
  { name: 'Apr', kWh: 40 },
  { name: 'May', kWh: 45 },
  { name: 'Jun', kWh: 47 },
  { name: 'Jul', kWh: 43 },
  { name: 'Aug', kWh: 52 },
  { name: 'Sept', kWh: 61 },
  { name: 'Oct', kWh: 64 },
  { name: 'Nov', kWh: 58 },
  { name: 'Dec', kWh: 67 },
];

const CustomTooltip = ({ active, payload, label, theme }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#fff',
          color: theme.palette.mode === 'dark' ? '#fff' : '#000',
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid',
          borderColor: theme.palette.divider,
        }}
      >
        <p>{label}</p>
        <p>{`kWh: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const ConsumptionHistory = () => {
  const theme = useTheme();
  const [consumptionPeriod, setConsumptionPeriod] = useState('yearly');

  const handleConsumptionPeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setConsumptionPeriod(newPeriod);
    }
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader title="Consumption History" />

      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ width: '100%', height: '500px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={consumptionData}
              layout="vertical"  // Layout set to vertical for horizontal bars
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" stroke={theme.palette.text.primary} />
              <YAxis type="category" dataKey="name" stroke={theme.palette.text.primary} />
              <Tooltip content={<CustomTooltip theme={theme} />} />
              <Legend />
              <Bar dataKey="kWh" fill={theme.palette.primary.main} name="Total Real Energy Imported [kWh]" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: 'center', mt: 2, mb: 2 }}>
        <ToggleButtonGroup
          value={consumptionPeriod}
          exclusive
          onChange={handleConsumptionPeriodChange}
          aria-label="Consumption History Period"
        >
          <ToggleButton value="yearly" aria-label="Yearly">
            Yearly
          </ToggleButton>
          {/*
          <ToggleButton value="monthly" aria-label="Monthly">
            Monthly
          </ToggleButton>
          <ToggleButton value="daily" aria-label="Daily">
            Daily
          </ToggleButton>
          */}
        </ToggleButtonGroup>
      </CardActions>
    </Card>
  );
};

export default ConsumptionHistory;