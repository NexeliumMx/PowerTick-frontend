import { Box } from "@mui/material";
import NewMeter from "./components/MeterForm";
import Header from "../../components/ui/Header";

const AddMeter = () => {
  return (
    <Box m="20px">
      <Header title="REGISTER NEW METER" subtitle="Enter Meter Information Below" />
      <NewMeter />
    </Box>
  );
};

export default AddMeter;
