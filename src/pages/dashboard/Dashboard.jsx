import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ConsumptionHistory from "./cards/ConsumptionHistory";
import DemandProfile from "./cards/DemandProfile";
import MaxDemand from "./cards/MaxDemand";
import AccumulatedConsumption from "./cards/AccumulatedConsumption";
import PowerFactor from "./cards/PowerFactor";
import Timestamp from "./cards/Timestamp";

const Dashboard = () => {
  const theme = useTheme();
  const [maxDemandPeriod, setMaxDemandPeriod] = useState("daily");
  const [accumulatedPeriod, setAccumulatedPeriod] = useState("daily");

  const handleMaxDemandPeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setMaxDemandPeriod(newPeriod);
    }
  };

  const handleAccumulatedPeriodChange = (event, newPeriod) => {
    if (newPeriod !== null) {
      setAccumulatedPeriod(newPeriod);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, padding: "16px" }}>
        {/* First row of 4 cards */}
        <Grid container spacing={3}>
        <Grid size={3}>
            <MaxDemand
              period={maxDemandPeriod}
              handlePeriodChange={handleMaxDemandPeriodChange}
            />
          </Grid>

          <Grid size={3}>
            <AccumulatedConsumption
              period={accumulatedPeriod}
              handlePeriodChange={handleAccumulatedPeriodChange}
            />
          </Grid>

          <Grid size={3}>
            <PowerFactor />
          </Grid>

          <Grid size={3}>
            <Timestamp />
          </Grid>

          <Grid size={5}>
            <DemandProfile />
          </Grid>

          <Grid size={7}>
            <ConsumptionHistory />
          </Grid>
        </Grid>
    </Box>
  );
};

export default Dashboard;