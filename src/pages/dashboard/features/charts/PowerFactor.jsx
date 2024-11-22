import React from "react";
import { Card, CardHeader, CardContent, Box, Typography } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useTheme } from "@mui/material/styles";
import { useData } from "../../../../context/DataProvider";
import DataChartError from "../../../../components/DataChartError";

const PowerFactor = () => {
  const { realTimeData, isFetching, error } = useData(); // Access data from context
  const theme = useTheme();

  // Extract and format the power factor from the data
  const powerFactorValue = realTimeData && realTimeData.power_factor
    ? realTimeData.power_factor / 1000 // Convert from 0-1000 scale to 0-1
    : null;

  // Data for the PieChart
  const data = [
    { name: "Power Factor", value: powerFactorValue || 0 },
    { name: "Remaining", value: 1 - (powerFactorValue || 0) },
  ];

  // Define the colors for the PieChart
  const COLORS = [theme.palette.secondary.main, theme.palette.grey[400]];

  // Parse error code and message for DataChartError
  const errorCode = error ? (error.message.includes("404") ? 404 : error.status || "Unknown") : null;
  const errorMessage = error
    ? error.message.includes("404")
      ? "No data found"
      : error.message || "Failed to load data"
    : null;

  return (
    <Card sx={{ flexGrow: 1, height: "100%", width: "100%" }}>
      <CardHeader title="Power Factor" />
      <CardContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Loading State */}
        {isFetching && <Typography>Loading...</Typography>}

        {/* Error State */}
        {error ? (
          <DataChartError errorCode={errorCode} errorMessage={errorMessage} />
        ) : (
          !isFetching &&
          powerFactorValue !== null && (
            <>
              {/* Pie Chart */}
              <Box sx={{ width: "100%", height: 250 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      startAngle={180} // Start from bottom center
                      endAngle={0} // End at top center
                      innerRadius="60%"
                      outerRadius="80%"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Box>

              {/* Power Factor Value */}
              <Box sx={{ textAlign: "center", fontSize: 24, marginTop: -15 }}>
                {`${powerFactorValue.toFixed(2)} / 1`} {/* Display scaled value */}
              </Box>
            </>
          )
        )}

        {/* No Data Available State */}
        {!isFetching && !error && powerFactorValue === null && (
          <Box sx={{ textAlign: "center", fontSize: 18 }}>
            No data available
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default PowerFactor;