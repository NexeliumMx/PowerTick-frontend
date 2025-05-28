import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardActions, ToggleButton, ToggleButtonGroup, Box, Typography, Skeleton } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useDemandProfile } from '../../../../services/query/useDemandProfile';
import { useMsal } from "@azure/msal-react";
import { ComposedChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Bar, Line, ResponsiveContainer } from "recharts";
import ChartSkeletonCard from "../cards/ChartSkeletonCard";
import { formatDashboardTimestamp } from '../../utils/formatDashboardTimestamp';

const DemandProfileCard = ({ selectedPowerMeter }) => {
  const theme = useTheme(); 
  const { accounts } = useMsal();
  const user_id = accounts[0]?.idTokenClaims?.oid; // Retrieve user_id from MSAL
  const [timeInterval, setTimeInterval] = useState("day"); // Default to "day"

  // Use React Query hook for on-demand fetching and caching
  const { data: demandProfileData, isLoading } = useDemandProfile(user_id, selectedPowerMeter, timeInterval);

  const handleTimeIntervalChange = (event, newTimeInterval) => {
    if (newTimeInterval) {
      setTimeInterval(newTimeInterval);
    }
  };

  // Transform data for Recharts
  const chartData = demandProfileData?.map((item) => {
    let name = '';
    if (timeInterval === 'day') {
      name = formatDashboardTimestamp(item.demand_profile_hour_range_utc, 'day');
    } else if (timeInterval === 'month') {
      name = formatDashboardTimestamp(item.demand_profile_day_range_tz, 'month');
    } else if (timeInterval === 'year') {
      name = formatDashboardTimestamp(item.demand_profile_month_range_tz, 'year');
    }
    return {
      name,
      avgRealPower: parseFloat(item.avg_real_power_w),
      maxRealPower: item.max_real_power_w,
      avgVar: parseFloat(item.avg_var),
      maxVar: item.max_var,
    };
  });

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardHeader title="Demand Profile" titleTypographyProps={{variant: 'h3', sx: { textAlign: 'left',paddingLeft:10, alignSelf: 'flex-start' , paddingTop:'10px'} // Tamaño del texto
      }} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ width: "100%", height: "600px", overflow: "auto", p: 2 }}>
          {isLoading ? (
            <ChartSkeletonCard/>
          ) : demandProfileData ? (
            <ResponsiveContainer width="100%" height={350}>
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
                {/* Bars for avgRealPower and avgVar */}
                <Bar dataKey="avgRealPower" barSize={20} fill="#8884d8" name="Avg Real Power (W)" />
                <Bar dataKey="avgVar" barSize={20} fill="#82ca9d" name="Avg VAR" />
                {/* Lines for maxRealPower and maxVar */}
                <Line type="monotone" dataKey="maxRealPower" stroke="#ffc658" name="Max Real Power (W)" strokeWidth={3}/>
                <Line type="monotone" dataKey="maxVar" stroke="#ff7300" name="Max VAR" strokeWidth={3}/>
              </ComposedChart>
            </ResponsiveContainer>
          ) : (
            <Typography variant="body1">No data available</Typography>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "center", mt: 2, mb: 2 }}>
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

export default DemandProfileCard;