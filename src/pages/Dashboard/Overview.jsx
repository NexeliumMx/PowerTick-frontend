import { Box, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Cards
import AccumulatedConsumption from "./cardsA/AccumulatedConsumption";
import ConsumptionHistory from "./cardsA/ConsumptionHistory";
import DemandProfile from "./cardsA/DemandProfile";
import MaxDemand from "./cardsA/MaxDemand";
import PowerFactor from "./cardsA/PowerFactor";
import Timestamp from "./cardsA/Timestamp";

const Overview = () => {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* First row of 4 cards */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }}>
          <MaxDemand />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }}>
          <AccumulatedConsumption />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }}>
          <PowerFactor />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }}>
          <Timestamp />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
          <DemandProfile />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
          <ConsumptionHistory />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Overview;