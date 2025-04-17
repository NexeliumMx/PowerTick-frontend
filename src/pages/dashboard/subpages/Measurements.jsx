import { Box, Typography, Paper } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import CurrentBarChart from "../components/meas_cards/CurrentBarChart"
import VoltageBarChart from "../components/meas_cards/Voltage_lnBarChart";
import VoltageLLBarChart from "../components/meas_cards/VoltageLLBarChart";
import DemandBarChart from "../components/meas_cards/DemandBarChart";
import ReactivePowerBarChart from "../components/meas_cards/ReactivePowerBarChart";



export default function Measurements({ realTimeData }) {
  const parsedData = realTimeData?.[0];

  return (
    <Box m="20px">
      <Typography variant="h5" color="primary" gutterBottom>
        Real Time Data
      </Typography>

      {/* JSON oculto para depuración */}
      <Box sx={{ display: 'none' }}>
        <Typography variant="body1" component="pre">
          {JSON.stringify(parsedData, null, 2)}
        </Typography>
      </Box>

      {/* Grid de 2 columnas */}
      <Grid2 container spacing={2}>
        {/* Gráfica 1: Corriente */}
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <CurrentBarChart data={parsedData} />
        </Grid2>

        {/* Gráfica #: Demanda por línea */}
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <DemandBarChart data={parsedData} />
        </Grid2>

        {/* Gráfica #: Voltajes LN */}
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <VoltageBarChart data={parsedData} />
        </Grid2>

        {/* Gráfica #: Voltajes LL */}
         <Grid2 size={{ xs: 12, lg: 6 }}>
          <VoltageLLBarChart data={parsedData} />
        </Grid2>

        {/* Gráfica #: Voltajes LL */}
        <Grid2 size={{ xs: 12, lg: 6 }}>
          <ReactivePowerBarChart data={parsedData} />
        </Grid2>



        {/* Gráficas 3 a 8 (placeholders) */}
        {Array.from({ length: 3 }).map((_, index) => (
          <Grid2 key={index} size={{ xs: 12, lg: 6 }}>
            <Paper elevation={3} sx={{ p: 2, height: 400 }}>
              <Typography variant="subtitle1">
                Gráfica {index + 1} (Placeholder)
              </Typography>
            </Paper>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}