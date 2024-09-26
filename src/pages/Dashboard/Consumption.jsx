import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ConsumptionHistory from "./cardsA/ConsumptionHistory";
import DemandProfile from "./cardsA/DemandProfile";
import MaxDemand from "./cardsA/MaxDemand";
import AccumulatedConsumption from "./cardsA/AccumulatedConsumption";
import PowerFactor from "./cardsA/PowerFactor";
import Timestamp from "./cardsA/Timestamp";

const Consumption = () => {
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
    <Box sx={{ flexGrow: 1}}>
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

export default Consumption;