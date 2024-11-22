import React from "react";
import { Card, CardHeader, CardContent, CardActions, ToggleButton, ToggleButtonGroup, Box, Typography } from "@mui/material";
import { useData } from "../../../../context/DataProvider";

const ConsumptionHistory = () => {
  const {
    consumptionData,
    isFetching,
    error,
    selectedTimePeriod,
    setSelectedTimePeriod,
  } = useData();

  const handleConsumptionPeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setSelectedTimePeriod(newPeriod);
    }
  };

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardHeader title="Consumption History" />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ width: "100%", height: "500px", overflow: "auto", p: 2 }}>
          {isFetching && <Typography>Loading...</Typography>}
          {error && (
            <Typography variant="h6" color="error">
              {`Error: ${error}`}
            </Typography>
          )}
          {consumptionData && (
            <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
              {JSON.stringify(consumptionData, null, 2)}
            </pre>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "center", mt: 2, mb: 2 }}>
        <ToggleButtonGroup
          value={selectedTimePeriod}
          exclusive
          onChange={handleConsumptionPeriodChange}
          aria-label="Consumption History Period"
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
          <ToggleButton value="hour" aria-label="Hourly">
            Hourly
          </ToggleButton>
        </ToggleButtonGroup>
      </CardActions>
    </Card>
  );
};

export default ConsumptionHistory;