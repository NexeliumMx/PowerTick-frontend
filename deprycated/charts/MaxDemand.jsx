import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  CardActions,
  Box,
  useTheme,
} from "@mui/material";
import DataChartError from "../../../../components/DataChartError";
import Loading from "../../../../components/Loading";
import { useData } from "../../../../context/DataProvider";

const MaxDemand = () => {
  const [maxDemandPeriod, setMaxDemandPeriod] = useState("daily");
  const theme = useTheme();
  const { realTimeData, isFetching, error } = useData();

  // Extract data
  const totalRealPower =
    realTimeData && typeof realTimeData.total_real_power !== "undefined"
      ? realTimeData.total_real_power
      : null;

  const reactivePowerVar =
    realTimeData && typeof realTimeData.reactive_power_var !== "undefined"
      ? realTimeData.reactive_power_var
      : null;

  // Debug logs
  console.log("Total Real Power (W):", totalRealPower);
  console.log("Reactive Power (VAr):", reactivePowerVar);

  const handleMaxDemandPeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setMaxDemandPeriod(newPeriod);
    }
  };

  const errorCode = error ? (error.message.includes("404") ? 404 : error.status || "Unknown") : null;
  const errorMessage = error
    ? error.message.includes("404")
      ? "No data found"
      : error.message || "Failed to load data"
    : null;

  return (
    <Card sx={{ flexGrow: 1, height: "100%", width: "100%" }}>
      <CardHeader title="Max Demand" />

      <CardContent>
        {isFetching && <Loading />}

        {error ? (
          <DataChartError errorCode={errorCode} errorMessage={errorMessage} />
        ) : (
          !isFetching && (totalRealPower !== null && reactivePowerVar !== null) ? (
            <>
              {/* Display W */}
              <Box
                sx={{
                  textAlign: "center",
                  mt: 2,
                  mb: 2,
                  backgroundColor: theme.palette.secondary.main,
                  padding: 2,
                  borderRadius: 10,
                }}
              >
                <Typography variant="h4">
                  {`${totalRealPower.toLocaleString()} W`}
                </Typography>
              </Box>

              {/* Display VAr */}
              <Box
                sx={{
                  textAlign: "center",
                  mt: 2,
                  mb: 2,
                  backgroundColor: theme.palette.secondary.main,
                  padding: 2,
                  borderRadius: 10,
                }}
              >
                <Typography variant="h4">
                  {`${reactivePowerVar.toLocaleString()} VAr`}
                </Typography>
              </Box>
            </>
          ) : (
            !isFetching && !error && (
              <Box sx={{ textAlign: "center", fontSize: 18 }}>
                No data available
              </Box>
            )
          )
        )}
      </CardContent>

      <CardActions sx={{ justifyContent: "center" }}>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}>
          <ToggleButtonGroup
            value={maxDemandPeriod}
            exclusive
            onChange={handleMaxDemandPeriodChange}
            aria-label="Max Demand Time Period"
          >
            <ToggleButton value="daily" aria-label="Daily">
              Daily
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </CardActions>
    </Card>
  );
};

export default MaxDemand;