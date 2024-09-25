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
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh', // Ensures the height of the container is always 100% of the viewport
        backgroundColor: 'blue',
        padding: '20px',
        boxSizing: 'border-box'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'absolute',
          top: '20px',
          right: '20px',
        }}
      >
        <NavButtons setActivePage={setActivePage} />
      </Box>
      <Box
        sx={{
          marginTop: '100px',
          textAlign: 'center',
          minHeight: '100%', // Ensures the content stretches
        }}
      >
        <h1>Dashboard</h1>
        {renderPage()}
      </Box>
    </Box>
  );
};

export default Dashboard;