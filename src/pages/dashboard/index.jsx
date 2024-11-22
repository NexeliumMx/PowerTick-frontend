import { useState, useEffect, useContext } from "react";
import { Box, Typography, Select, MenuItem, CircularProgress } from "@mui/material";
import { useSearchParams } from "react-router-dom"; // To read query parameters
import NavButtons from "./components/ui/NavButtons";
import Configuration from "./subpages/Configuration";
import Overview from "./subpages/Overview";
import Measurements from "./subpages/Measurements";
import Header from "../../components/ui/Header";
import { useData } from "../../context/DataProvider";
import { ModeContext } from "../../context/AppModeContext";

const Dashboard = () => {
  const [activePage, setActivePage] = useState("Overview");
  const { powerMeters, isFetching, error } = useData();
  const { state } = useContext(ModeContext);
  const [selectedPowerMeter, setSelectedPowerMeter] = useState("");
  const [searchParams] = useSearchParams(); // React Router's hook to access query parameters

  useEffect(() => {
    const serialNumberFromQuery = searchParams.get("serialNumber"); // Get serialNumber from query
    if (serialNumberFromQuery) {
      setSelectedPowerMeter(serialNumberFromQuery); // Set the query parameter as the selected power meter
    } else if (!isFetching && powerMeters && powerMeters.length > 0) {
      setSelectedPowerMeter(powerMeters[0].serial_number); // Default to the first power meter
    }
  }, [isFetching, powerMeters, searchParams]);

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

  if (!isFetching && (!powerMeters || powerMeters.length === 0)) {
    return (
      <Box sx={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h5" color="error">
          No power meters available. Please check your data.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", padding: "20px", boxSizing: "border-box" }}>
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
        {isFetching ? (
          <CircularProgress color="primary" />
        ) : (
          <Select
            value={selectedPowerMeter}
            onChange={(e) => setSelectedPowerMeter(e.target.value)}
            displayEmpty
            sx={{ minWidth: 200 }}
          >
            {powerMeters.map((meter, index) => (
              <MenuItem key={index} value={meter.serial_number}>
                {meter.serial_number}
              </MenuItem>
            ))}
          </Select>
        )}
      </Box>

      <Box sx={{ marginTop: "20px", textAlign: "center", minHeight: "100%" }}>{renderPage()}</Box>
    </Box>
  );
};

export default Dashboard;