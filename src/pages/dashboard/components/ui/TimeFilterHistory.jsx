// Centralized constant for 'Last Hour' selection in time filters
export const LAST_HOUR_VALUE = 'last_hour';

import { Box, Typography, FormControl, InputLabel, Select, MenuItem, ToggleButton, ToggleButtonGroup, useMediaQuery } from '@mui/material';

/**
 * TimeFilterHistory component for selecting interval and date filters (with hour support).
 * Props:
 * - timeInterval, setTimeInterval
 * - selectedYear, setSelectedYear
 * - selectedMonth, setSelectedMonth
 * - selectedDay, setSelectedDay
 * - selectedHour, setSelectedHour
 * - validYears, validMonths, validDays, validHours, hours
 */
const TimeFilterHistory = ({
  timeInterval, setTimeInterval,
  selectedYear, setSelectedYear,
  selectedMonth, setSelectedMonth,
  selectedDay, setSelectedDay,
  selectedHour, setSelectedHour,
  validYears, validMonths, validDays, validHours, hours
}) => {
  // Responsive logic
  const isSmallScreen = useMediaQuery("(max-width:960px)");

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        gap: 2,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Analysis Interval */}
      <Box
        sx={{
          width: isSmallScreen ? "100%" : "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Analysis Interval
        </Typography>
        <ToggleButtonGroup
          value={timeInterval}
          exclusive
          onChange={(e, v) => v && setTimeInterval(v)}
          aria-label="Time Interval"
          
        >
          <ToggleButton value="day" aria-label="Daily">Daily</ToggleButton>
          <ToggleButton value="hour" aria-label="Hourly">Hourly</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Time Filters */}
      <Box
        sx={{
          width: isSmallScreen ? "100%" : "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Time Filters
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection:"row",
            gap: 1,
          }}
        >
          {(timeInterval === "year" || timeInterval === "month" || timeInterval === "day" || timeInterval === "hour") && (
            <FormControl size="small" sx={{ minWidth: 90, width: isSmallScreen ? "100%" : "auto" }}>
              <InputLabel id="year-label">Year</InputLabel>
              <Select
                size="small"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                label="Year"
              >
                {validYears.map((year) => (
                  <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {(timeInterval === "month" || timeInterval === "day" || timeInterval === "hour") && (
            <FormControl size="small" sx={{ minWidth: 90, width: isSmallScreen ? "100%" : "auto" }}>
              <InputLabel id="month-label">Month</InputLabel>
              <Select
                size="small"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                label="Month"
              >
                {validMonths.map((month, idx) => (
                  <MenuItem key={month} value={idx + 1}>{month}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {(timeInterval === "day" || timeInterval === "hour") && (
            <FormControl size="small" sx={{ minWidth: 90, width: isSmallScreen ? "100%" : "auto" }}>
              <InputLabel id="day-label">Day</InputLabel>
              <Select
                size="small"
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                label="Day"
              >
                {validDays.map((day) => (
                  <MenuItem key={day} value={day}>{day}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {timeInterval === "hour" && (
            <FormControl size="small" sx={{ minWidth: 90, width: isSmallScreen ? "100%" : "auto" }}>
              <InputLabel id="hour-label">Hour</InputLabel>
              <Select
                size="small"
                value={selectedHour}
                onChange={(e) => setSelectedHour(e.target.value)}
                label="Hour"
              >
                {hours.map((hour) => (
                  <MenuItem key={hour.value} value={hour.value}>
                    {hour.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default TimeFilterHistory;
