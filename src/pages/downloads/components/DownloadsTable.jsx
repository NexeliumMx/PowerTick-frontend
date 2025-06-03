import { useState } from "react";
import { Box, Select, MenuItem, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

const DownloadsTable = () => {
  // Placeholder data for serial numbers
  const powerMeters = [
    { serial_number: "SN12345" },
    { serial_number: "SN67890" },
  ];
  const [selectedSerialNumber, setSelectedSerialNumber] = useState(
    powerMeters[0].serial_number
  );
  const [selectedYear, setSelectedYear] = useState("2024");

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

  return (
    <Box sx={{ position: "relative", padding: "16px" }}>
      <Typography variant="h5" gutterBottom>
        Download Measurements (Placeholder)
      </Typography>
      <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
        {/* Serial Number Dropdown */}
        <Select
          value={selectedSerialNumber}
          onChange={(e) => setSelectedSerialNumber(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          {powerMeters.map((meter, index) => (
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
      </Box>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Serial Number</TableCell>
              <TableCell>Month</TableCell>
              <TableCell>Download</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {months.map((month) => (
              <TableRow key={month.value}>
                <TableCell>{selectedSerialNumber}</TableCell>
                <TableCell>{month.name}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled
                  >
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography
        variant="body2"
        color="textSecondary"
        sx={{ marginTop: 2 }}
      >
        This is a placeholder. Download functionality is disabled.
      </Typography>
    </Box>
  );
};

export default DownloadsTable;