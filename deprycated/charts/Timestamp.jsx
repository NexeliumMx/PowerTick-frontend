import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import Loading from "../../../../components/Loading";
import DataChartError from "../../../../components/DataChartError";
import { useData } from "../../../../context/DataProvider";

const Timestamp = React.memo(() => {
  const { realTimeData, isFetching, error } = useData();

  console.log("Real-Time Data in Timestamp Component:", realTimeData);

  const errorCode = error ? (error.message.includes("404") ? 404 : error.status || "Unknown") : null;
  const errorMessage = error
    ? error.message.includes("404")
      ? "No data found"
      : error.message || "Failed to load data"
    : null;

  return (
    <Card sx={{ flexGrow: 1, height: "100%", width: "100%" }}>
      <CardHeader title="Timestamp" />
      <CardContent>
        {isFetching && <Loading />}
        {error ? (
          <DataChartError errorCode={errorCode} errorMessage={errorMessage} />
        ) : !isFetching && realTimeData && realTimeData.timestamp ? (
          <Typography variant="h4" textAlign="center">
            {realTimeData.timestamp}
          </Typography>
        ) : (
          !isFetching && (
            <Typography variant="h6" textAlign="center">
              No data available
            </Typography>
          )
        )}
      </CardContent>
    </Card>
  );
});

export default Timestamp;