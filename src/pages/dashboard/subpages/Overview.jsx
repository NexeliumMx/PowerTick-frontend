import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import DemandProfileCard from "../components/cards/DemandProfileCard";
import DemandHistoryCard from "../components/cards/DemandHistoryCard";
import ConsumptionProfileCard from "../components/cards/ConsumptionProfileCard";
import ConsumptionHistoryCard from "../components/cards/ConsumptionHistoryCard";

const Overview = ({ powerMeter }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <DemandProfileCard selectedPowerMeter={powerMeter} />
        </Grid>
        <Grid size={12}>
          <DemandHistoryCard selectedPowerMeter={powerMeter} />
        </Grid>
        <Grid size={12}>
          <ConsumptionProfileCard selectedPowerMeter={powerMeter} />
        </Grid>
        <Grid size={12}>
          <ConsumptionHistoryCard selectedPowerMeter={powerMeter} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Overview;