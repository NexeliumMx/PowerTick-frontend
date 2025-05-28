import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardActions, ToggleButton, ToggleButtonGroup, Box, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useMsal } from "@azure/msal-react";
import { ComposedChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Bar, Line, ResponsiveContainer } from "recharts";
import ChartSkeletonCard from "../cards/ChartSkeletonCard";
import { useConsumptionProfile } from '../../../../services/query/useConsumptionProfile';
import { formatDashboardTimestamp } from '../../utils/formatDashboardTimestamp';

const ConsumptionProfileCard = ({ selectedPowerMeter }) => {
  const theme = useTheme(); 
  const { accounts } = useMsal();
  const user_id = accounts[0]?.idTokenClaims?.oid;
  const [timeInterval, setTimeInterval] = useState("day");

  // Use React Query hook for on-demand fetching and caching
  const { data: consumptionProfileData, isLoading } = useConsumptionProfile(user_id, selectedPowerMeter, timeInterval);

  const handleTimeIntervalChange = (event, newTimeInterval) => {
    if (newTimeInterval) {
      setTimeInterval(newTimeInterval);
    }
  };

  // Transform data for Recharts
  const chartData = consumptionProfileData?.map((item) => {
    let name = '';
    if (timeInterval === 'day') {
      name = formatDashboardTimestamp(item.consumption_profile_hour_range_utc, 'day');
    } else if (timeInterval === 'month') {
      name = formatDashboardTimestamp(item.consumption_profile_day_range_tz, 'month');
    } else if (timeInterval === 'year') {
      name = formatDashboardTimestamp(item.consumption_profile_month_range_tz, 'year');
    }
    return {
      name,
      realEnergy: item.real_energy_wh,
      reactiveEnergy: item.reactive_energy_varh,
    };
  });

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardHeader title="Consumption Profile" 
      titleTypographyProps={{variant: 'h2', sx: { textAlign: 'left',paddingLeft:10, alignSelf: 'flex-start' , paddingTop:'10px'} // Tamaño del texto
      }} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ width: "100%", height: "600px", overflow: "auto", p: 2}}>
          {isLoading ? (
            <ChartSkeletonCard/>
          ) : consumptionProfileData ? (
            <ResponsiveContainer width="100%" height={500}>
              <ComposedChart data={chartData}>
                <XAxis 
                  dataKey="name" 
                  stroke={theme.palette.text.primary}
                  tick={{ fill: theme.palette.text.primary }}
                />
                <YAxis
                  stroke={theme.palette.text.primary}
                  tick={{ fill: theme.palette.text.primary }} />
                <Tooltip
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  color: theme.palette.text.primary,
                }}
                labelStyle={{
                  color: theme.palette.text.secondary,
                }}
                />
                <Legend />
                <CartesianGrid stroke="#f5f5f5" />
                {/* Bars for realEnergy */}
                <Bar dataKey="realEnergy" barSize={20} fill="#8884d8" name="Real Energy (Wh)" />
                {/* Lines for reactiveEnergy */}
                <Line type="monotone" dataKey="reactiveEnergy" stroke="#ff7300" name="Reactive Energy (VARh)" strokeWidth={3}/>
              </ComposedChart>
            </ResponsiveContainer>
          ) : (
            <Typography variant="body1">No data available</Typography>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "center", mt:2, mb: 2 }}>
        <ToggleButtonGroup
          value={timeInterval}
          exclusive
          onChange={handleTimeIntervalChange}
          aria-label="Time Interval"
        >
          <ToggleButton value="year" aria-label="Yearly">
            Yearly
          </ToggleButton>
          <ToggleButton value="month" aria-label="Monthly">
            Monthly
          </ToggleButton>
          <ToggleButton value="day" aria-label="Daily">
            Daily
          </ToggleButton>
        </ToggleButtonGroup>
      </CardActions>
    </Card>
  );
};

export default ConsumptionProfileCard;