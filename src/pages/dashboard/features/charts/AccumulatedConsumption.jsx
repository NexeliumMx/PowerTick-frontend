import React from "react";
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

const AccumulatedConsumption = () => {
  const [accumulatedPeriod, setAccumulatedPeriod] = React.useState("monthly");
  const theme = useTheme();
  const { realTimeData, isFetching, error } = useData();

  // Extract data
  const totalEnergyImported =
    realTimeData && typeof realTimeData.total_real_energy_imported !== "undefined"
      ? realTimeData.total_real_energy_imported
      : null;

  const totalVarhImported =
    realTimeData && typeof realTimeData.total_var_hours_imported_q1 !== "undefined"
      ? realTimeData.total_var_hours_imported_q1
      : null;

  // Debug logs
  console.log("Total Real Energy Imported (kWh):", totalEnergyImported);
  console.log("Total Varh Imported (kVArh):", totalVarhImported);

  const handleAccumulatedPeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setAccumulatedPeriod(newPeriod);
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
      <CardHeader title="Accumulated Consumption" />

      <CardContent>
        {isFetching && <Loading />}

        {error ? (
          <DataChartError errorCode={errorCode} errorMessage={errorMessage} />
        ) : (
          !isFetching && (totalEnergyImported !== null && totalVarhImported !== null) ? (
            <>
              {/* Display kWh */}
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
                  {`${totalEnergyImported.toLocaleString()} Wh`}
                </Typography>
              </Box>

              {/* Display kVArh */}
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
                  {`${totalVarhImported.toLocaleString()} VArh`}
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

      <CardActions sx={{ justifyContent: "center", mt: 2, mb: 2 }}>
        <ToggleButtonGroup
          value={accumulatedPeriod}
          exclusive
          onChange={handleAccumulatedPeriodChange}
          aria-label="Accumulated Consumption Time Period"
        >
          <ToggleButton value="monthly" aria-label="Monthly">
            Monthly
          </ToggleButton>
        </ToggleButtonGroup>
      </CardActions>
    </Card>
  );
};

export default AccumulatedConsumption;