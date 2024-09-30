import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

import Current from "../features/charts/Current";
import HistoricConsumption from "../features/charts/HistoricConsumption";
import HistoricPF from "../features/charts/HistoricPF";
import ReactivePower from "../features/charts/ReactivePower";
import RealPower from "../features/charts/RealPower";

export default function Measurments() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {/* Primera fila */}
        <Grid size={{xs:12, sm:12, md:12, lg:6}}>
          <Current />
        </Grid>
        <Grid size={ {xs:12, sm:12, md:12, lg:6} }>
          <HistoricPF />
        </Grid>
        <Grid size={ {xs:12, sm:12, md:12, lg:6} }>
          <RealPower />
        </Grid>
        <Grid size={ {xs:12, sm:12, md:12, lg:6} }>
          <ReactivePower />
        </Grid>
        <Grid size={ {xs:12, sm:12, md:12, lg:12, xl:12} }>
          <HistoricConsumption />
        </Grid>
      </Grid>
    </Box>
  );
}