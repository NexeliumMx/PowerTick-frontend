import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import LoadCenterCard from './components/LoadCenterCard';

const LoadCenter = () => {


  return (
    <Box sx={{ flexGrow: 1}}>
        <Grid container spacing={3}>
        <Grid size={4}>
          <LoadCenterCard/>
        </Grid>

        <Grid size={4}>
          <LoadCenterCard/>
        </Grid>

        <Grid size={4}>
          <LoadCenterCard/>
        </Grid>
        </Grid>
    </Box>
  );
};

export default LoadCenter;