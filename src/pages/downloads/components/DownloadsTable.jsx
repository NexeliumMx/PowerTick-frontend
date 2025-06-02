import React, { useState, useContext, useEffect } from "react";
import { Box, Button, Select, MenuItem, Typography } from "@mui/material";
import { useData } from "../../../context/DataProvider";
import { generateMeasurementsCSV } from "../../../services/api/fetchDemoAPI";
import { ModeContext } from "../../../context/AppModeContext";
import LoadingOverlay from "../../../components/LoadingOverlay";

const DownloadsTable = () => {
  const { state } = useContext(ModeContext); // Get app mode from context
  const { powerMeters, isFetching, error } = useData(); // Use DataProvider to get power meters
  const [selectedSerialNumber, setSelectedSerialNumber] = useState("");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("11");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const months = [
    { name: "January", value: "1" },
    { name: "February", value: "2" },
    { name: "March", value: "3" },
    { name: "April", value: "4" },
    { name: "May", value: "5" },
    { name: "June", value: "6" },
    { name: "July", value: "7" },
    { name: "August", value: "8" },
    { name: "September", value: "9" },
    { name: "October", value: "10" },
    { name: "November", value: "11" },
    { name: "December", value: "12" },
  ];

  // Track whether powerMeters is still being fetched
  useEffect(() => {
    if (!isFetching && powerMeters && powerMeters.length > 0 && !selectedSerialNumber) {
      setSelectedSerialNumber(powerMeters[0].serial_number); // Default to the first serial number
    }
  }, [isFetching, powerMeters]);

  const handleDownloadCSV = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const blob = await generateMeasurementsCSV(selectedSerialNumber, selectedYear, selectedMonth);
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `Measurements_${selectedSerialNumber}_${selectedYear}_${selectedMonth}.csv`;
      link.click();
    } catch (error) {
      setErrorMessage("Failed to generate CSV. Please check your inputs.");
      console.error("Error downloading CSV:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ position: "relative", padding: "16px" }}>
      {/* Loading Overlay */}
      <LoadingOverlay loading={loading} />

      <Typography variant="h5" gutterBottom>
        Download Measurements
      </Typography>
      {state.mode === "LIVE_MODE" && (
        <Typography variant="body1" color="error">
          Downloads are not available in LIVE mode.
        </Typography>
      )}
      {state.mode === "DEMO_MODE" && (
        <>
          <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
            {/* Serial Number Dropdown */}
            <Select
              value={selectedSerialNumber}
              onChange={(e) => setSelectedSerialNumber(e.target.value)}
              displayEmpty
              sx={{ minWidth: 200 }}
              disabled={isFetching || !powerMeters || powerMeters.length === 0}
            >
              <MenuItem value="" disabled>
                {isFetching ? "Loading..." : "Select Serial Number"}
              </MenuItem>
              {powerMeters &&
                powerMeters.map((meter, index) => (
                  <MenuItem key={index} value={meter.serial_number}>
                    {meter.serial_number}
                  </MenuItem>
                ))}
            </Select>

            {/* Year Dropdown */}
            <Select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              sx={{ minWidth: 100 }}
            >
              <MenuItem value="2023">2023</MenuItem>
              <MenuItem value="2024">2024</MenuItem>
            </Select>

            {/* Month Dropdown */}
            <Select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              sx={{ minWidth: 150 }}
            >
              {months.map((month) => (
                <MenuItem key={month.value} value={month.value}>
                  {month.name}
                </MenuItem>
              ))}
            </Select>
          </Box>

          {/* Error Message */}
          {errorMessage && (
            <Typography variant="body2" color="error" sx={{ marginBottom: 2 }}>
              {errorMessage}
            </Typography>
          )}

          {/* Download Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleDownloadCSV}
            disabled={!selectedSerialNumber || !selectedYear || !selectedMonth || loading}
          >
            Download CSV
          </Button>
        </>
      )}
    </Box>
  );
};

export default DownloadsTable;