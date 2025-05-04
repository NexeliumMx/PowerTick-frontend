import { useState, useEffect, useContext } from "react";
import { Box, Typography, Select, MenuItem } from "@mui/material";
import NavButtons from "./components/ui/NavButtons";
import Configuration from "./subpages/Configuration";
import Analysis from "./subpages/Analysis";
import Measurements from "./subpages/Measurements";
import Header from "../../components/ui/Header";
import { ModeContext } from "../../context/AppModeContext";
import LoadingOverlay from "../../components/test/LoadingOverlay";
import { fetchPowermetersByUserAccess, fetchRealTimeData } from "../../services/api/httpRequests";

const Dashboard = () => {
  const { state } = useContext(ModeContext);
  const [powerMeters, setPowerMeters] = useState([]);
  const [selectedPowerMeter, setSelectedPowerMeter] = useState("");
  const [realTimeData, setRealTimeData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [activePage, setActivePage] = useState("Analysis");

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const user_id = "4c7c56fe-99fc-4611-b57a-0d5683f9bc95"; // Replace with actual user_id
        const data = await fetchPowermetersByUserAccess(user_id);
        setPowerMeters(data);
        if (data.length > 0) {
          setSelectedPowerMeter(data[0].serial_number);
          fetchRealTimeData(user_id, data[0].serial_number).then(setRealTimeData);
        }
      } catch (error) {
        console.error("Error fetching powermeters:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedPowerMeter) {
      const user_id = "4c7c56fe-99fc-4611-b57a-0d5683f9bc95"; // Replace with actual user_id
      fetchRealTimeData(user_id, selectedPowerMeter).then(setRealTimeData);
    }
  }, [selectedPowerMeter]);

  const renderPage = () => {
    switch (activePage) {
      case "Analysis":
        return <Analysis powerMeter={selectedPowerMeter} />;
      case "Measurements":
        return <Measurements powerMeter={selectedPowerMeter} realTimeData={realTimeData} />;
      case "Configuration":
        return <Configuration powerMeter={selectedPowerMeter} />;
      default:
        return <Analysis powerMeter={selectedPowerMeter} />;
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