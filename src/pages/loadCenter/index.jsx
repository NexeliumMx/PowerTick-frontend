import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Header from "../../components/ui/Header";
import { useContext } from "react";
import { ModeContext } from "../../context/AppModeContext";
import { fetchAllPowerMeters } from "../../services/api/fetchDemoAPI";

const LoadCenter = () => {
  const { state } = useContext(ModeContext); // Get app mode from context
  const [powerMeters, setPowerMeters] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (state.mode === "DEMO_MODE") {
      setIsLoading(true); // Show loading state
      fetchAllPowerMeters()
        .then((data) => {
          setPowerMeters(data); // Store power meters in state
          setError(""); // Clear any previous errors
        })
        .catch((err) => {
          console.error("Error fetching power meters:", err);
          setError("Failed to retrieve power meters. Please try again.");
        })
        .finally(() => {
          setIsLoading(false); // Hide loading state
        });
    }
  }, [state.mode]);

  return (
    <Box m="20px">
      <Header title="LOAD CENTERS" subtitle="Overview and Management of Energy Distribution and Consumption" />

      {/* Display error if app is in LIVE_MODE */}
      {state.mode === "LIVE_MODE" && (
        <Typography variant="body1" color="error" sx={{ textAlign: "center", marginTop: 4 }}>
          Load centers are not available in LIVE mode.
        </Typography>
      )}

      {/* Show loading state */}
      {state.mode === "DEMO_MODE" && isLoading && (
        <Typography variant="h6" sx={{ textAlign: "center", marginTop: 4 }}>
          Loading power meters...
        </Typography>
      )}

      {/* Show error if any */}
      {state.mode === "DEMO_MODE" && error && (
        <Typography variant="body1" color="error" sx={{ textAlign: "center", marginTop: 4 }}>
          {error}
        </Typography>
      )}

      {/* Display power meter serial numbers as buttons */}
      {state.mode === "DEMO_MODE" && !isLoading && !error && powerMeters.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, marginTop: 4 }}>
          {powerMeters.map((powerMeter, index) => (
            <Button
              key={index}
              variant="contained"
              color="primary"
              sx={{ minWidth: "150px" }}
            >
              {powerMeter.serial_number}
            </Button>
          ))}
        </Box>
      )}

      {/* Show message if no power meters are available */}
      {state.mode === "DEMO_MODE" && !isLoading && !error && powerMeters.length === 0 && (
        <Typography variant="body1" sx={{ textAlign: "center", marginTop: 4 }}>
          No power meters available.
        </Typography>
      )}
    </Box>
  );
};

export default LoadCenter;