import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function Measurements({ realTimeData }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h5" color="primary" gutterBottom>
        Real Time Data
      </Typography>
      {realTimeData ? (
        <Typography variant="body1" component="pre">
          {JSON.stringify(realTimeData, null, 2)}
        </Typography>
      ) : (
        <Typography variant="body1">Loading...</Typography>
      )}
    </Box>
  );
}