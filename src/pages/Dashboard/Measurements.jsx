
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
        <Grid size={ 6 }>
          <Current />
        </Grid>
        <Grid size={ 6 }>
          <HistoricPF />
        </Grid>
        <Grid size={ 6 }>
          <RealPower />
        </Grid>
        <Grid size={ 6 }>
          <ReactivePower />
        </Grid>
        <Grid size={ 12 }>
          <HistoricConsumption />
        </Grid>
      </Grid>
    </Box>
  );
}