import React, { useEffect, useState } from "react";
import { Box, Button, Select, MenuItem, Typography, CircularProgress } from "@mui/material";
import { useContext } from "react";
import { ModeContext } from "../../../context/AppModeContext";

const DownloadsTable = () => {
  const { state } = useContext(ModeContext);
  const [serialNumbers, setSerialNumbers] = useState([]);
  const [selectedSerialNumber, setSelectedSerialNumber] = useState("");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("11");
  const [error, setError] = useState(""); // State to display errors
  const [isLoading, setIsLoading] = useState(false); // State to show loading animation

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

  // Fetch serial numbers if mode is DEMO_MODE
  useEffect(() => {
    if (state.mode === "DEMO_MODE") {
      fetch("https://powertick-api-js.azurewebsites.net/api/demoGetPowerMetersInfo")
        .then((response) => response.json())
        .then((data) => {
          const serialNumbers = data.map((item) => item.serial_number);
          setSerialNumbers(serialNumbers);
          if (serialNumbers.length > 0) setSelectedSerialNumber(serialNumbers[0]);
        })
        .catch((error) => {
          console.error("Error fetching serial numbers:", error);
        });
    }
  }, [state.mode]);

  const handleDownloadCSV = () => {
    if (state.mode === "DEMO_MODE" && selectedSerialNumber && selectedYear && selectedMonth) {
      setIsLoading(true); // Start loading animation
      setError(""); // Clear previous errors

      const url = `https://powertick-api-py.azurewebsites.net/api/demoGenerateMeasurementsCSV?sn=${selectedSerialNumber}&year=${selectedYear}&month=${selectedMonth}`;
      fetch(url)
        .then((response) => {
          if (!response.ok) throw new Error("Failed to generate CSV");
          return response.blob();
        })
        .then((blob) => {
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = `Measurements_${selectedSerialNumber}_${selectedYear}_${selectedMonth}.csv`;
          link.click();
        })
        .catch((error) => {
          setError("Failed to generate CSV. Please check your inputs."); // Set error message
        })
        .finally(() => {
          setIsLoading(false); // Stop loading animation
        });
    }
  };

  return (
    <Box sx={{ position: "relative", padding: "16px" }}>
      {/* Loading Overlay */}
      {isLoading && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim background
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1300, // Above other elements
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      )}

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
            >
              <MenuItem value="" disabled>
                Select Serial Number
              </MenuItem>
              {serialNumbers.map((serial, index) => (
                <MenuItem key={index} value={serial}>
                  {serial}
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
          {error && (
            <Typography variant="body2" color="error" sx={{ marginBottom: 2 }}>
              {error}
            </Typography>
          )}

          {/* Download Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleDownloadCSV}
            disabled={!selectedSerialNumber || !selectedYear || !selectedMonth || isLoading}
          >
            Download CSV
          </Button>
        </>
      )}
    </Box>
  );
};

export default DownloadsTable;