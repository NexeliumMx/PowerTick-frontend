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
        padding: '20px',
        boxSizing: 'border-box'
      }}
    >
      {/* Top bar containing the title and NavButtons */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',
          top: '20px',
          left: '20px',
          right: '20px',
        }}
      >
        <h1 style={{ margin: 0 }}>Dashboard</h1>
        <NavButtons setActivePage={setActivePage} />
      </Box>

      {/* Main content */}
      <Box
        sx={{
          marginTop: '100px',
          textAlign: 'center',
          minHeight: '100%', // Ensures the content stretches
        }}
      >
        {renderPage()}
      </Box>
    </Box>
  );
};

export default Dashboard;