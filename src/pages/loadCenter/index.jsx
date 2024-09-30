import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import LoadCenterCard from "./components/LoadCenterCard";
import Header from "../../components/ui/Header";

const LoadCenter = () => {
  return (
    <>
    <Box m="20px">
      <Header title="LOAD CENTERS" subtitle="Overview and Management of Energy Distribution and Consumption" />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid size={4}>
            <LoadCenterCard />
          </Grid>

          <Grid size={4}>
            <LoadCenterCard />
          </Grid>

          <Grid size={4}>
            <LoadCenterCard />
          </Grid>
        </Grid>
      </Box>
      </Box>
    </>
  );
};

export default LoadCenter;
