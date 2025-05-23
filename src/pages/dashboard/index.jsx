import { useState, useEffect, useContext } from "react";
import { Box, Typography, Select, MenuItem } from "@mui/material";
import NavButtons from "./components/ui/NavButtons";
import Configuration from "./subpages/Configuration";
import Analysis from "./subpages/Analysis";
import Measurements from "./subpages/Measurements";
import Header from "../../components/ui/Header";
import { ModeContext } from "../../context/AppModeContext";
import LoadingOverlay from "../../components/test/LoadingOverlay";
import { fetchRealTimeData } from "../../services/api/httpRequests";
import { usePowermeters } from "../../services/query/usePowermeters";
import { useMsal } from "@azure/msal-react";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const { state } = useContext(ModeContext);
  const { accounts } = useMsal ? useMsal() : { accounts: [] };
  const user_id = accounts && accounts[0]?.idTokenClaims?.oid;
  const { data: powerMeters = [], isLoading: isPowerMetersLoading, error: powerMetersError } = usePowermeters(user_id);
  const [selectedPowerMeter, setSelectedPowerMeter] = useState("");
  const [realTimeData, setRealTimeData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [activePage, setActivePage] = useState("Analysis");
  const location = useLocation();

  // Set selectedPowerMeter from query param if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serialFromQuery = params.get('serial_number');
    if (serialFromQuery && powerMeters.some(m => m.serial_number === serialFromQuery)) {
      setSelectedPowerMeter(serialFromQuery);
    }
  }, [location.search, powerMeters]);

  useEffect(() => {
    if (selectedPowerMeter) {
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
          value={selectedPowerMeter || ""}
          onChange={(e) => setSelectedPowerMeter(e.target.value)}
          displayEmpty
          sx={{ minWidth: 200 }}
          disabled={isPowerMetersLoading}
        >
          <MenuItem value="" disabled>
            Select Power Meter
          </MenuItem>
          {powerMeters.map((meter, index) => (
            <MenuItem key={index} value={meter.serial_number}>
              {meter.powermeter_alias || meter.serial_number}
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