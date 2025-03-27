import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardActions, ToggleButton, ToggleButtonGroup, Box, Typography } from "@mui/material";
import { fetchConsumptionProfile } from "../../../../services/api/httpRequests";
import { useMsal } from "@azure/msal-react";

const ConsumptionProfileCard = ({ selectedPowerMeter }) => {
  const { accounts } = useMsal();
  const user_id = accounts[0]?.idTokenClaims?.oid; // Retrieve user_id from MSAL
  const [timeInterval, setTimeInterval] = useState("day"); // Default to "day"
  const [consumptionProfileData, setConsumptionProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (user_id && selectedPowerMeter && timeInterval) {
        setIsLoading(true);
        try {
          const data = await fetchConsumptionProfile(user_id, selectedPowerMeter, timeInterval);
          setConsumptionProfileData(data);
        } catch (error) {
          console.error("Error fetching consumption profile:", error);
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

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardHeader title="Consumption Profile" />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ width: "100%", height: "500px", overflow: "auto", p: 2 }}>
          {isLoading ? (
            <Typography variant="body1">Loading...</Typography>
          ) : consumptionProfileData ? (
            <Typography variant="body1" component="pre">
              {JSON.stringify(consumptionProfileData, null, 2)}
            </Typography>
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

export default ConsumptionProfileCard;