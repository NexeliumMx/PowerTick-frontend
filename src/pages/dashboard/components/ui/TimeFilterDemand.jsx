import { Box, Typography, FormControl, InputLabel, Select, MenuItem, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';

/**
 * TimeFilterDemand component for selecting interval and date filters.
 * Props:
 * - timeInterval, setTimeInterval
 * - selectedYear, setSelectedYear
 * - selectedMonth, setSelectedMonth
 * - selectedDay, setSelectedDay
 * - validYears, validMonths, validDays
 */
const TimeFilterDemand = ({
  timeInterval, setTimeInterval,
  selectedYear, setSelectedYear,
  selectedMonth, setSelectedMonth,
  selectedDay, setSelectedDay,
  validYears, validMonths, validDays
}) => {
  const theme = useTheme();
  return (
    <>
      <Box sx={{ width: "50%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Analysis Interval
        </Typography>
        <ToggleButtonGroup
          value={timeInterval}
          exclusive
          onChange={(e, v) => v && setTimeInterval(v)}
          aria-label="Time Interval"
        >
          <ToggleButton value="year" aria-label="Yearly">Yearly</ToggleButton>
          <ToggleButton value="month" aria-label="Monthly">Monthly</ToggleButton>
          <ToggleButton value="day" aria-label="Daily">Daily</ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box sx={{ width: "50%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Time Filter
        </Typography>
        <Box sx={{ width: "100%", display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 2 }}>
          {(timeInterval === "year" || timeInterval === "month" || timeInterval === "day") && (
            <FormControl size="small" sx={{ minWidth: 90 }}>
              <InputLabel id="year-label">Year</InputLabel>
              <Select
                size="small"
                value={selectedYear}
                onChange={e => setSelectedYear(e.target.value)}
                label="Year"
              >
                {validYears.map(year => (
                  <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {(timeInterval === "month" || timeInterval === "day") && (
            <FormControl size="small" sx={{ minWidth: 90 }}>
              <InputLabel id="month-label">Month</InputLabel>
              <Select
                size="small"
                value={selectedMonth}
                onChange={e => setSelectedMonth(e.target.value)}
                label="Month"
              >
                {validMonths.map((month) => (
                  <MenuItem key={month.value} value={month.value}>{month.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {timeInterval === "day" && (
            <FormControl size="small" sx={{ minWidth: 90 }}>
              <InputLabel id="day-label">Day</InputLabel>
              <Select
                size="small"
                value={selectedDay}
                onChange={e => setSelectedDay(e.target.value)}
                label="Day"
              >
                {validDays.map(day => (
                  <MenuItem key={day} value={day}>{day}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>
      </Box>
    </>
  );
};

export default TimeFilterDemand;
