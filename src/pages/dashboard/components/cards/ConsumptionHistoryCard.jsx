import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardActions, ToggleButton, ToggleButtonGroup, Box, Typography } from "@mui/material";
import { fetchConsumptionHistory } from "../../../../services/api/httpRequests";
import { useMsal } from "@azure/msal-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";

const ConsumptionHistoryCard = ({ selectedPowerMeter }) => {
  const { accounts } = useMsal();
  const user_id = accounts[0]?.idTokenClaims?.oid; // Retrieve user_id from MSAL
  const [timeInterval, setTimeInterval] = useState("day"); // Default to "day"
  const [consumptionHistoryData, setConsumptionHistoryData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (user_id && selectedPowerMeter && timeInterval) {
        setIsLoading(true);
        try {
          const data = await fetchConsumptionHistory(user_id, selectedPowerMeter, timeInterval);
          setConsumptionHistoryData(data);
        } catch (error) {
          console.error("Error fetching consumption history:", error);
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
  const chartData = consumptionHistoryData?.map((item) => ({
    name: item.timestamp_tz, // Use the local timestamp for the X-axis
    realEnergy: item.real_energy_wh,
    reactiveEnergy: item.reactive_energy_varh,
  }));

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardHeader title="Consumption History" />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ width: "100%", height: "500px", overflow: "auto", p: 2 }}>
          {isLoading ? (
            <Typography variant="body1">Loading...</Typography>
          ) : consumptionHistoryData ? (
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="realEnergy" stroke="#8884d8" name="Real Energy (Wh)" />
                <Line type="monotone" dataKey="reactiveEnergy" stroke="#82ca9d" name="Reactive Energy (VARh)" />
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

export default ConsumptionHistoryCard;