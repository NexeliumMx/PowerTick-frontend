import { Box, useTheme } from "@mui/material";
import GeographyChart from "./GeographyChart";
import Header from "../../components/ui/Header";
import { tokens } from "../../theme";

const Locations = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="Locations" subtitle="Locations Installations" />

      <Box
        height="75vh"
        border={`1px solid ${colors.grey[100]}`}
        borderRadius="4px"
      >
        <GeographyChart />
      </Box>
    </Box>
  );
};

export default Locations;
