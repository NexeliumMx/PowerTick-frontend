import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Current from "./cards/Current";

import AccumulatedConsumption from "./cards/AccumulatedConsumption";
import PowerFactor from "./cards/PowerFactor";
import Timestamp from "./cards/Timestamp";


export default function Measurments() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {/* Primera fila */}
        <Grid size={{ xs: 12, sm: 12, md:12, lg:6 }}>
          <Current />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg:6 }}>
          <AccumulatedConsumption />
        </Grid>

        {/* Segunda fila */}
        <Grid size={{ xs: 12, sm: 12, md: 12, lg:6 }}>
          <PowerFactor />
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg:6 }}>
          <Timestamp />
        </Grid>
      </Grid>
    </Box>
  );
}