import { useState } from "react";
import { Box, Select, MenuItem, Typography, FormControl, InputLabel } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Header from "../../../components/ui/Header";

const MonthlyReportsTable = () => {
  // Placeholder data for serial numbers
  const theme = useTheme();
  const powerMeters = [
    { serial_number: "SN12345" },
    { serial_number: "SN67890" },
  ];
  const [selectedSerialNumber, setSelectedSerialNumber] = useState(
    powerMeters[0].serial_number
  );
  const [selectedYear, setSelectedYear] = useState("2024");

  const pf = [
    0.76, 0.79, 0.82, 0.85, 0.88, 0.91, 0.93, 0.8, 0.83, 0.9, 0.95, 0.77,
  ];
  const consumption = [
    18245, 23102, 19876, 16354, 21789, 24501, 17932, 22648, 20517, 15982,
    25000, 18777,
  ];
  const maxDemand = [
    45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100,
  ];
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
    <Box sx={{ position: "relative"}}>
           <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          pt: 2,
          paddingBottom: 1
        }}>
      <Header
        title="MONTHLY REPORTS"
        subtitle="Read and download all the Power Measurements Data"
      />
      
      <Box sx={{ display: "flex", gap: 2 }}>
        {/* Serial Number Dropdown */}
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel id="serial-number-label">Serial Number</InputLabel>
          <Select
            labelId="serial-number-label"
            value={selectedSerialNumber}
            label="Serial Number"
            onChange={(e) => setSelectedSerialNumber(e.target.value)}
          >
            {powerMeters.map((meter, index) => (
              <MenuItem key={index} value={meter.serial_number}>
                {meter.serial_number}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Year Dropdown */}
        <FormControl size="small" sx={{ minWidth: 100 }}>
          <InputLabel id="year-label">Year</InputLabel>
          <Select
            labelId="year-label"
            value={selectedYear}
            label="Year"
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <MenuItem value="2023">2023</MenuItem>
            <MenuItem value="2024">2024</MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      </Box>

      
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: theme.palette.background.paper }}>
              <TableCell align="center">
                <Typography variant="h6" fontWeight={600}>Serial Number</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" fontWeight={600}>Month</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" fontWeight={600}>Consumption</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" fontWeight={600}>Power Factor</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" fontWeight={600}>Max Demand</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6"fontWeight={600}>Download</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {months.map((month, idx) => (
              <TableRow
                key={month.value}
                sx={{
                  backgroundColor:
                    idx % 2 === 0
                      ? theme.palette.background.default
                      : theme.palette.background.default,
                }}
              >
                <TableCell align="center">
                  <Typography variant="h6">{selectedSerialNumber}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">{month.name}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">{consumption[idx]}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">{pf[idx]}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="h6">{maxDemand[idx]}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Button variant="contained" color="primary" disabled>
                    <Typography variant="h6">Download</Typography>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MonthlyReportsTable;