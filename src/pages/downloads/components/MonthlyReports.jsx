import { useContext, useState, useEffect } from "react";
import { Box, Select, MenuItem, Typography, FormControl, InputLabel,CircularProgress } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Header from "../../../layout/Header";
import { useMonthlyReport } from "../../../hooks/useMonthlyReport"; 
import { usePowermetersByUserAccess } from "../../../hooks/usePowermetersByUserAccess";
import { ModeContext } from "../../../context/AppModeContext";
import { useMsal } from "@azure/msal-react";
import { useTranslation } from 'react-i18next';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const MonthlyReportsTable = () => {
  // Placeholder data for serial numbers
  const theme = useTheme();
  const { t } = useTranslation();
  const {state}=useContext(ModeContext);
  const { accounts } = useMsal? useMsal() : { accounts: [] };
  const user_id = accounts && accounts[0]?.idTokenClaims?.oid;
  const { data: powerMeters = [], isLoading: isPowerMetersLoading, error: powerMetersError } = usePowermetersByUserAccess(user_id, state.mode);
  const [selectedPowerMeter, setSelectedPowerMeter] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [validYears, setValidYears] = useState([]);
  const { state: appModeState } = useContext(ModeContext);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  
  const { data: monthlyReport, isMonthlyReportLoading, error: monthlyReportError } = useMonthlyReport(
    user_id,
    selectedPowerMeter,
    selectedYear,
    appModeState?.mode || 'PRODUCTION'
    
  );


  useEffect(() => {
    if (selectedPowerMeter) {
      const powermeter = powerMeters.find((pm) => pm.powermeter_id === selectedPowerMeter);
      const measurementRange = powermeter?.measurementRange; // Assuming measurementRange is part of powermeter data
      console.log("Measurement Range:", measurementRange);

      if (measurementRange && measurementRange.min_utc && measurementRange.max_utc) {
        const tz = dayjs.tz.guess();
        const min = dayjs.utc(measurementRange.min_utc).tz(tz);
        const max = dayjs.utc(measurementRange.max_utc).tz(tz);

        const years = [];
        for (let year = min.year(); year <= max.year(); year++) {
          years.push(year);
        }
        setValidYears(years);
      } else {
        console.warn("Measurement Range is undefined or invalid. Using fallback logic.");
        const fallbackYears = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
        setValidYears(fallbackYears); // Fallback to last 5 years
      }
    } else {
      setValidYears([]); // Reset valid years if no power meter is selected
    }
  }, [selectedPowerMeter, powerMeters]);

  if (isPowerMetersLoading) {
    return <CircularProgress />;
  }

  if (isMonthlyReportLoading) {
    return <CircularProgress />;
  }

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
          <InputLabel id="serial-number-label">
          {isOpen || selectedPowerMeter
            ? t("dashboard.selectedPowerMeter") 
              : t("dashboard.selectPowerMeter")} 
          </InputLabel>
          <Select
            labelId="serial-number-label"
            value={selectedPowerMeter || ""}
            label="Power Meter"
            onChange={(e) => setSelectedPowerMeter(e.target.value)}
            disabled={isPowerMetersLoading}
            onOpen={handleOpen}
            onClose={handleClose}
          >
           <MenuItem value="" disabled>
        
      </MenuItem>
      {powerMeters.map((meter, index) => (
        <MenuItem key={index} value={meter.powermeter_id}>
          {meter.powermeter_alias || meter.powermeter_id}
        </MenuItem>
      ))}
          </Select>
        </FormControl>

        {/* Year Dropdown */}
        <FormControl size="small" sx={{ minWidth: 100 }} disabled={!validYears.length}>
          <InputLabel id="year-label">Year</InputLabel>
          <Select
            labelId="year-label"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            label="Year"
          >
            {Array.isArray(validYears) && validYears.length > 0 && validYears.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
      
      </Box>

      <Box>
        {monthlyReportError ? (
          <Typography color="error">Error: {monthlyReportError.message || "Failed to load monthly report."}</Typography>
        ) : !Array.isArray(monthlyReport) || monthlyReport.length === 0 ? (
          <Typography>No data available for the selected powermeter and year.</Typography>
        ) : (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: theme.palette.background.paper }}>
            <TableCell align="center">
              <Typography variant="h6" fontWeight={600}>Power Meter</Typography>
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
              <Typography variant="h6" fontWeight={600}>Download</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {monthlyReport.map((row, index) => (
            <TableRow
              key={row.month}
              sx={{
                backgroundColor:
                  index % 2 === 0
                    ? theme.palette.background.default
                    : theme.palette.background.default,
              }}
            >
              <TableCell align="center">
                <Typography variant="h6">{selectedPowerMeter}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">{row.month}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">{row.consumption}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">{row.demand}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6">{row.powerFactor}</Typography>
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
        )}</Box>
    </Box>
  );
};

export default MonthlyReportsTable;