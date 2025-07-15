import { useContext, useState, useEffect } from "react";
import {
  Box,
  Select,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
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
import { useApiData } from "../../../hooks/useApiData";
import { ModeContext } from "../../../context/AppModeContext";
import { useMsal } from "@azure/msal-react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/en";
import "dayjs/locale/es"; // Import Spanish locale


dayjs.extend(utc);
dayjs.extend(timezone);

const getValidYears = (measurementRange) => {
  if (
    measurementRange &&
    measurementRange.min_utc &&
    measurementRange.max_utc &&
    dayjs.utc(measurementRange.min_utc).isValid() &&
    dayjs.utc(measurementRange.max_utc).isValid()
  ) {
    const tz = dayjs.tz.guess();
    const minYear = dayjs.utc(measurementRange.min_utc).tz(tz).year();
    const maxYear = dayjs.utc(measurementRange.max_utc).tz(tz).year();
    const years = [];
    for (let year = minYear; year <= maxYear; year += 1) {
      years.push(year);
    }
    return years.reverse();
  }
  return [];
};

const MonthlyReportsTable = () => {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const { state } = useContext(ModeContext);
  const { accounts } = useMsal ? useMsal() : { accounts: [] };
  const user_id = accounts && accounts[0]?.idTokenClaims?.oid;
  const { powermetersByUserAccess, measurementRange: useMeasurementRange, monthlyReport: useMonthlyReport } = useApiData();
  const {
    data: powerMeters = [],
    isLoading: isPowerMetersLoading,
    error: powerMetersError,
  } = powermetersByUserAccess(user_id, state.mode);

  const [selectedPowerMeter, setSelectedPowerMeter] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const { state: appModeState } = useContext(ModeContext);
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  // Use the measurement range hook for the selected powermeter
  const {
    data: measurementRange,
    isLoading: isRangeLoading,
    error: rangeError,
  } = useMeasurementRange(selectedPowerMeter, state.mode);

  // Compute valid years from measurementRange (like in Analysis/ConsumptionHistory)
  const validYears = getValidYears(measurementRange);

  // Set selectedYear when validYears changes
  useEffect(() => {
    if (validYears.length > 0 && !validYears.includes(Number(selectedYear))) {
      setSelectedYear(String(validYears[0]));
    }
    if (validYears.length === 0 && selectedYear !== "") {
      setSelectedYear("");
    }
  }, [validYears, selectedYear]);

  // Set dayjs locale when language changes
  useEffect(() => {
    dayjs.locale(i18n.language === "es" ? "es" : "en");
  }, [i18n.language]);

  const {
    data: monthlyReport,
    isMonthlyReportLoading,
    error: monthlyReportError,
  } = useMonthlyReport(
    user_id,
    selectedPowerMeter,
    selectedYear,
    appModeState?.mode || "PRODUCTION"
  );

  if (isPowerMetersLoading || isRangeLoading) {
    return <CircularProgress />;
  }

  if (isMonthlyReportLoading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          pt: 2,
          paddingBottom: 1,
        }}
      >
        <Header
          title={t("monthlyReports.title")}
          subtitle={t("monthlyReports.subtitle")}
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
              label={t("monthlyReports.powermeter")}
              onChange={(e) => setSelectedPowerMeter(e.target.value)}
              disabled={isPowerMetersLoading}
              onOpen={handleOpen}
              onClose={handleClose}
            >
              <MenuItem value="" disabled />
              {powerMeters.map((meter) => (
                <MenuItem key={meter.powermeter_id} value={meter.powermeter_id}>
                  {meter.powermeter_alias || meter.powermeter_id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Year Dropdown */}
          <FormControl size="small" sx={{ minWidth: 100 }} disabled={!validYears.length}>
            <InputLabel id="year-label">{t('monthlyReports.year')}</InputLabel>
            <Select
              labelId="year-label"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              label="Year"
            >
              {Array.isArray(validYears) &&
                validYears.length > 0 &&
                validYears.map((year) => (
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
          <Typography color="error">
            Error: {monthlyReportError.message ||   t('dashboard.error')}
          </Typography>
        ) : !Array.isArray(monthlyReport) || monthlyReport.length === 0 ? (
          <Typography>
            {t('monthlyReports.noDataAvailable')}
          </Typography>
        ) : (
          <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: theme.palette.background.paper }}>
                  <TableCell align="center">
                    <Typography variant="h6" fontWeight={600}>
                      {t('monthlyReports.month')}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6" fontWeight={600}>
                      {t('monthlyReports.consumption')}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6" fontWeight={600}>
                      {t('monthlyReports.PowerFactor')}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6" fontWeight={600}>
                      {t('monthlyReports.maxDemand')}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="h6" fontWeight={600}>
                      {t('monthlyReports.download')}
                    </Typography>
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
                      <Typography variant="h6">
                        {dayjs(row.month, "YYYY-MM").format("MMMM")}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6">{row.consumption}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6">{(row.avg_power_factor/1000).toFixed(4)}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="h6">{row.max_demand}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Button variant="contained" color="primary" disabled>
                        <Typography variant="h6">{t('monthlyReports.download')}</Typography>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default MonthlyReportsTable;