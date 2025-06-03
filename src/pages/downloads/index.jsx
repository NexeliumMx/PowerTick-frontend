import { Box } from "@mui/material";
import MonthlyReportsTable from "./components/MonthlyReports";


const MonthlyReportsPage = () => {
  return (
    <Box sx={{position: "relatisve", minHeight: "100vh", padding: "20px", boxSizing: "border-box"}}>
     
      <MonthlyReportsTable />
    </Box>
  );
};

export default MonthlyReportsPage;
