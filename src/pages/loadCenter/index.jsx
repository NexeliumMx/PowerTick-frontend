import React, { useEffect, useState, useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import Header from "../../components/ui/Header";
import { useNavigate } from "react-router-dom";
import { ModeContext } from "../../context/AppModeContext";
import { useData } from "../../context/DataProvider";
import { fetchAllPowerMeters } from "../../services/api/fetchDemoAPI";
import LoadingOverlay from "../../components/LoadingOverlay";

const LoadCenter = () => {
  const { state } = useContext(ModeContext);
  const { setSelectedPowerMeter } = useData(); // Get setSelectedPowerMeter from DataProvider
  const [powerMeters, setPowerMeters] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (state.mode === "DEMO_MODE") {
      setIsLoading(true);
      fetchAllPowerMeters()
        .then((data) => {
          setPowerMeters(data);
          setError("");
        })
        .catch((err) => {
          console.error("Error fetching power meters:", err);
          setError("Failed to retrieve power meters. Please try again.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [state.mode]);

  const handleNavigateToDashboard = (serialNumber) => {
    setSelectedPowerMeter(serialNumber); // Update selected power meter in context
    navigate(`/dashboard`); // Navigate to the dashboard
  };

  return (
    <Box m="20px">
      <LoadingOverlay loading={isLoading} /> {/* Add LoadingOverlay */}

      <Header title="LOAD CENTERS" subtitle="Overview and Management of Energy Distribution and Consumption" />

      {state.mode === "LIVE_MODE" && (
        <Typography variant="body1" color="error" sx={{ textAlign: "center", marginTop: 4 }}>
          Load centers are not available in LIVE mode.
        </Typography>
      )}

      {state.mode === "DEMO_MODE" && error && (
        <Typography variant="body1" color="error" sx={{ textAlign: "center", marginTop: 4 }}>
          {error}
        </Typography>
      )}

      {state.mode === "DEMO_MODE" && !isLoading && !error && powerMeters.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, marginTop: 4 }}>
          {powerMeters.map((powerMeter, index) => (
            <Button
              key={index}
              variant="contained"
              color="primary"
              sx={{ minWidth: "150px" }}
              onClick={() => handleNavigateToDashboard(powerMeter.serial_number)} // Update and navigate
            >
              {powerMeter.serial_number}
            </Button>
          ))}
        </Box>
      )}

      {state.mode === "DEMO_MODE" && !isLoading && !error && powerMeters.length === 0 && (
        <Typography variant="body1" sx={{ textAlign: "center", marginTop: 4 }}>
          No power meters available.
        </Typography>
      )}
    </Box>
  );
};

export default LoadCenter;