import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import DemandProfileCard from "../components/cards/DemandProfileCard";
import DemandHistoryCard from "../components/cards/DemandHistoryCard";
import ConsumptionProfileCard from "../components/cards/ConsumptionProfileCard";
import ConsumptionHistoryCard from "../components/cards/ConsumptionHistoryCard";




const Analysis = ({ powerMeter }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={6}>
          <ConsumptionHistoryCard selectedPowerMeter={powerMeter} />
        </Grid>
        <Grid size={6}>
          <DemandHistoryCard selectedPowerMeter={powerMeter} />
        </Grid>
        <Grid size={6}>
          <ConsumptionProfileCard selectedPowerMeter={powerMeter} />
        </Grid>
        <Grid size={6}>
        <DemandProfileCard selectedPowerMeter={powerMeter} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analysis;