import { useState, useEffect, useContext } from "react";
import { Box, Typography, Select, MenuItem } from "@mui/material";
import NavButtons from "./components/ui/NavButtons";
import Configuration from "./subpages/Configuration";
import Overview from "./subpages/Overview";
import Measurements from "./subpages/Measurements";
import Header from "../../components/ui/Header";
import { ModeContext } from "../../context/AppModeContext";
import LoadingOverlay from "../../components/test/LoadingOverlay";

// Mock data
const mockPowerMeters = [
  { serial_number: "MOCK0000001" },
  { serial_number: "MOCK0000002" },
  { serial_number: "MOCK0000003" },
];

const Dashboard = () => {
  const { state } = useContext(ModeContext);
  const [powerMeters, setPowerMeters] = useState(mockPowerMeters);
  const [selectedPowerMeter, setSelectedPowerMeter] = useState(mockPowerMeters[0].serial_number);
  const [isFetching, setIsFetching] = useState(false);
  const [activePage, setActivePage] = useState("Overview");

  const renderPage = () => {
    switch (activePage) {
      case "Overview":
        return <Overview powerMeter={selectedPowerMeter} />;
      case "Measurements":
        return <Measurements powerMeter={selectedPowerMeter} />;
      case "Configuration":
        return <Configuration powerMeter={selectedPowerMeter} />;
      default:
        return <Overview powerMeter={selectedPowerMeter} />;
    }
  };

  if (state.mode === "LIVE_MODE") {
    return (
      <Box sx={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h5" color="error">
          Dashboard is not available in LIVE mode.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", padding: "20px", boxSizing: "border-box" }}>
      {/* Loading Overlay */}
      <LoadingOverlay loading={isFetching} />

      {/* Header and Navigation */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "absolute",
          top: "20px",
          left: "20px",
          right: "20px",
        }}
      >
        <Header title="DASHBOARD" subtitle="Comprehensive Monitoring of Energy Metrics and Historical Performance" />
        <NavButtons setActivePage={setActivePage} />
      </Box>

      {/* Power Meter Dropdown */}
      <Box
        sx={{
          marginTop: "100px",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Select
          value={selectedPowerMeter || ""} // Ensure a fallback empty string
          onChange={(e) => setSelectedPowerMeter(e.target.value)} // Update state
          displayEmpty
          sx={{ minWidth: 200 }}
          disabled={isFetching} // Disable dropdown while loading
        >
          <MenuItem value="" disabled>
            Select Power Meter
          </MenuItem>
          {powerMeters.map((meter, index) => (
            <MenuItem key={index} value={meter.serial_number}>
              {meter.serial_number}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* Render Active Page */}
      <Box sx={{ marginTop: "20px", textAlign: "center", minHeight: "100%" }}>{renderPage()}</Box>
    </Box>
  );
};

export default Dashboard;