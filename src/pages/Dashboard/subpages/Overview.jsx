import { Box, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Cards
import AccumulatedConsumption from "../features/charts/AccumulatedConsumption";
import ConsumptionHistory from "../features/charts/ConsumptionHistory";
import DemandProfile from "../features/charts/DemandProfile";
import MaxDemand from "../features/charts/MaxDemand";
import PowerFactor from "../features/charts/PowerFactor";
import Timestamp from "../features/charts/Timestamp";

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