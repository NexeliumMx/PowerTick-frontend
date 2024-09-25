import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Current from "./cards/Current";

import AccumulatedConsumption from "./cards/AccumulatedConsumption";
import PowerFactor from "./cards/PowerFactor";
import Timestamp from "./cards/Timestamp";


export default function Measurments (){
    return (
        <Box sx={{ flexGrow: 1}}>
            {/* First row of 2 cards */}
            <Grid container spacing={3}>
            <Grid size={6}>
                <Current/>
              </Grid>
    
              <Grid size={6}>
                <AccumulatedConsumption/>
              </Grid>

             {/* Second row of 2 cards */}
              <Grid size={6}>
                <PowerFactor />
              </Grid>
    
              <Grid size={6}>
                <Timestamp />
              </Grid>
    
            
            </Grid>
        </Box>
      );
    };
    