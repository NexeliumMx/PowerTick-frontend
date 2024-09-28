import React, { useState } from 'react';
import { Box, Card, CardHeader, CardContent, CardActions, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'; 
import { useTheme } from '@mui/material/styles';

const demandProfileData = [
  { name: 'Jan', kW: 240 },
  { name: 'Feb', kW: 720 },
  { name: 'Mar', kW: 480 },
  { name: 'Apr', kW: 360 },
  { name: 'May', kW: 300 },
  { name: 'Jun', kW: 450 },
  { name: 'Jul', kW: 260 },
  { name: 'Aug', kW: 750 },
  { name: 'Sept', kW: 320 },
  { name: 'Oct', kW: 600 },
  { name: 'Nov', kW: 400 },
  { name: 'Dec', kW: 550 },
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
        <p>{`kW: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const DemandProfile = () => {
  const theme = useTheme();
  const [demandPeriod, setDemandPeriod] = useState('yearly');

  const handleDemandPeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setDemandPeriod(newPeriod);
    }
  };

  return (
    <Card sx={{ height: '100%', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
      <CardHeader title="Demand Profile" />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          <ResponsiveContainer width="100%" height="100%"> 
            <LineChart data={demandProfileData} margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke={theme.palette.text.primary} />
              <YAxis stroke={theme.palette.text.primary} />
              <Tooltip content={<CustomTooltip theme={theme} />} labelStyle={{ color: theme.palette.text.primary }} />
              <Legend />
              <Line type="monotone" dataKey="kW" stroke={theme.palette.primary.main} strokeWidth={2} activeDot={{ r: 8 }} name="Total Power [kW]" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
        <ToggleButtonGroup
          value={demandPeriod}
          exclusive
          onChange={handleDemandPeriodChange}
          aria-label="Demand Profile Period"
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

export default DemandProfile;