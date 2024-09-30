import { Box } from "@mui/material";
import DownloadsTable from "./components/DownloadsTable";
import Header from "../../components/ui/Header";

const Downloads = () => {
  return (
    <Box m="20px">
      <Header
        title="DOWNLOADS"
        subtitle="Download all the Power Measurements Data"
      />
      <DownloadsTable />
    </Box>
  );
};

export default Downloads;
