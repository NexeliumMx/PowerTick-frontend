import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardActions, ToggleButton, ToggleButtonGroup, Box, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useMsal } from "@azure/msal-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";
import ChartSkeletonCard from "../cards/ChartSkeletonCard";
import { useDemandHistory } from '../../../../services/query/useDemandHistory';
import { formatDashboardTimestamp } from '../../utils/formatDashboardTimestamp';

const DemandHistoryCard = ({ selectedPowerMeter }) => {
  const theme = useTheme(); 
  const { accounts } = useMsal();
  const user_id = accounts[0]?.idTokenClaims?.oid;
  const [timeInterval, setTimeInterval] = useState("day");

  // Use React Query hook for on-demand fetching and caching
  const { data: demandHistoryData, isLoading } = useDemandHistory(user_id, selectedPowerMeter, timeInterval);

  const handleTimeIntervalChange = (event, newTimeInterval) => {
    if (newTimeInterval) {
      setTimeInterval(newTimeInterval);
    }
  };

  // Transform data for Recharts
  const chartData = demandHistoryData?.map((item) => ({
    name: formatDashboardTimestamp(item.timestamp_utc),
    realPower: item.real_power_w,
    reactivePower: item.reactive_power_var,
  }));

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardHeader title="Demand History" 
      titleTypographyProps={{variant: 'h2' ,sx: { textAlign: 'left',paddingLeft:12, alignSelf: 'flex-start' }// Tamaño del texto
      }} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ width: "100%", height: "600px", overflow: "auto", p: 2 }}>
          {isLoading ? (
            <ChartSkeletonCard/>
          ) : demandHistoryData ? (
            <ResponsiveContainer width="100%" height={500}>
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
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
                <Line type="monotone" dataKey="realPower" stroke="#8884d8" name="Real Power (W)" dot={false} strokeWidth={3}/>
                <Line type="monotone" dataKey="reactivePower" stroke="#82ca9d" name="Reactive Power (VAR)" dot={false} strokeWidth={3}/>
              </LineChart>
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
          <ToggleButton value="day" aria-label="Daily">
            Daily
          </ToggleButton>
          <ToggleButton value="hour" aria-label="Hourly">
            Hourly
          </ToggleButton>
        </ToggleButtonGroup>
      </CardActions>
    </Card>
  );
};

export default DemandHistoryCard;