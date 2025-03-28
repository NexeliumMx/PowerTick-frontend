import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardActions, ToggleButton, ToggleButtonGroup, Box, Typography } from "@mui/material";
import { fetchDemandProfile } from "../../../../services/api/httpRequests";
import { useMsal } from "@azure/msal-react";
import { ComposedChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Bar, Line, ResponsiveContainer } from "recharts";

const DemandProfileCard = ({ selectedPowerMeter }) => {
  const { accounts } = useMsal();
  const user_id = accounts[0]?.idTokenClaims?.oid; // Retrieve user_id from MSAL
  const [timeInterval, setTimeInterval] = useState("day"); // Default to "day"
  const [demandProfileData, setDemandProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (user_id && selectedPowerMeter && timeInterval) {
        setIsLoading(true);
        try {
          const data = await fetchDemandProfile(user_id, selectedPowerMeter, timeInterval);
          setDemandProfileData(data);
        } catch (error) {
          console.error("Error fetching demand profile:", error);
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
  const chartData = demandProfileData?.map((item) => ({
    name: item.demand_profile_hour_range_tz,
    avgRealPower: parseFloat(item.avg_real_power_w),
    maxRealPower: item.max_real_power_w,
    avgVar: parseFloat(item.avg_var),
    maxVar: item.max_var,
  }));

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardHeader title="Demand Profile" />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ width: "100%", height: "500px", overflow: "auto", p: 2 }}>
          {isLoading ? (
            <Typography variant="body1">Loading...</Typography>
          ) : demandProfileData ? (
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid stroke="#f5f5f5" />
                {/* Bars for avgRealPower and avgVar */}
                <Bar dataKey="avgRealPower" barSize={20} fill="#8884d8" name="Avg Real Power (W)" />
                <Bar dataKey="avgVar" barSize={20} fill="#82ca9d" name="Avg VAR" />
                {/* Lines for maxRealPower and maxVar */}
                <Line type="monotone" dataKey="maxRealPower" stroke="#413ea0" name="Max Real Power (W)" />
                <Line type="monotone" dataKey="maxVar" stroke="#ff7300" name="Max VAR" />
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