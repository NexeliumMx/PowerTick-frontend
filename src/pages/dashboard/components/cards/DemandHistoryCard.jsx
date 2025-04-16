import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardActions, ToggleButton, ToggleButtonGroup, Box, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { fetchDemandHistory } from "../../../../services/api/httpRequests";
import { useMsal } from "@azure/msal-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";
import ChartSkeletonCard from "../cards/ChartSkeletonCard";

const DemandHistoryCard = ({ selectedPowerMeter }) => {
  const theme = useTheme(); 
  const { accounts } = useMsal();
  const user_id = accounts[0]?.idTokenClaims?.oid; // Retrieve user_id from MSAL
  const [timeInterval, setTimeInterval] = useState("day"); // Default to "day"
  const [demandHistoryData, setDemandHistoryData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (user_id && selectedPowerMeter && timeInterval) {
        setIsLoading(true);
        try {
          const data = await fetchDemandHistory(user_id, selectedPowerMeter, timeInterval);
          setDemandHistoryData(data);
        } catch (error) {
          console.error("Error fetching demand history:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [user_id, selectedPowerMeter, timeInterval]);

  const handleTimeIntervalChange = (event, newTimeInterval) => {
    if (newTimeInterval) {
      setTimeInterval(newTimeInterval);
    }
  };

  // Transform data for Recharts
  const chartData = demandHistoryData?.map((item) => ({
    name: item.timestamp_tz, // Use the local timestamp for the X-axis
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
                <Line type="monotone" dataKey="realPower" stroke="#8884d8" name="Real Power (W)" dot={false} />
                <Line type="monotone" dataKey="reactivePower" stroke="#82ca9d" name="Reactive Power (VAR)" dot={false}/>
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