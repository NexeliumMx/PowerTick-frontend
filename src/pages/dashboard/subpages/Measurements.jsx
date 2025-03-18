import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function Measurements() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {/* Placeholder for removed components */}
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
          <Box sx={{ flexGrow: 1, height: "100%", width: "100%", backgroundColor: "lightgray" }}>
            Placeholder for Current
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
          <Box sx={{ flexGrow: 1, height: "100%", width: "100%", backgroundColor: "lightgray" }}>
            Placeholder for HistoricPF
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
          <Box sx={{ flexGrow: 1, height: "100%", width: "100%", backgroundColor: "lightgray" }}>
            Placeholder for RealPower
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 6 }}>
          <Box sx={{ flexGrow: 1, height: "100%", width: "100%", backgroundColor: "lightgray" }}>
            Placeholder for ReactivePower
          </Box>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12 }}>
          <Box sx={{ flexGrow: 1, height: "100%", width: "100%", backgroundColor: "lightgray" }}>
            Placeholder for HistoricConsumption
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}