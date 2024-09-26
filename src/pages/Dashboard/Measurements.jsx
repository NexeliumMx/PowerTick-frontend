
import { Box, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";

import Current from "./cardsB/Current";
import HistoricConsumption from "./cardsB/HistoricConsumption";
import HistoricPF from "./cardsB/HistoricPF";
import ReactivePower from "./cardsB/ReactivePower";
import RealPower from "./cardsB/RealPower";

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