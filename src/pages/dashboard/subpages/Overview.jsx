import { Box, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid2";

// Cards


const Overview = () => {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* First row of 4 cards */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }}>
          <Box sx={{ flexGrow: 1, height: "100%", width: "100%" , backgroundColor: "red"}}/>
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }}>
          	<Box sx={{ flexGrow: 1, height: "100%", width: "100%" , backgroundColor: "red"}}/>
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }}>
          <Box sx={{ flexGrow: 1, height: "100%", width: "100%" , backgroundColor: "red"}}/>
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 6, lg: 3 }}>
         <Box sx={{ flexGrow: 1, height: "100%", width: "100%" , backgroundColor: "red"}}/>
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
          <Box sx={{ flexGrow: 1, height: "100%", width: "100%" , backgroundColor: "red"}}/>
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6 }}>
          <Box sx={{ flexGrow: 1, height: "100%", width: "100%" , backgroundColor: "red"}}/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Overview;