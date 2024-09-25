import { useState } from "react";
import { Box } from "@mui/material";
import NavButtons from "./components/NavButtons";
import Configuration from "./Configuration";
import Consumption from "./Consumption";
import Measurements from "./Measurements";

const Dashboard = () => {
  const [activePage, setActivePage] = useState('Consumption');

  const renderPage = () => {
    switch (activePage) {
      case 'Consumption':
        return <Consumption />;
      case 'Measurements':
        return <Measurements />;
      case 'Configuration':
        return <Configuration />;
      default:
        return <Consumption />;
    }
  };

  return (
    <Box>
      <h1>Dashboard</h1>
      <NavButtons setActivePage={setActivePage} />
      {renderPage()}
    </Box>
  );
};

export default Dashboard;