// Centralized constant for 'Last Hour' selection in time filters
export const LAST_HOUR_VALUE = 'last_hour';
import { useTranslation } from 'react-i18next';
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
  validYears, validMonths, validDays, validHours, hours,
  t: tProp
}) => {
  const { t: tHook } = useTranslation();
  const t = tProp || tHook;
  
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
            {t('analysis.interval')}
        </Typography>
        <ToggleButtonGroup
          value={timeInterval}
          exclusive
          onChange={(e, v) => v && setTimeInterval(v)}
          aria-label={t('analysis.interval')}
          
        >
          <ToggleButton value="day" aria-label={t('analysis.daily')}>{t('analysis.daily')}</ToggleButton>
          <ToggleButton value="hour" aria-label={t('analysis.hourly')}>{t('analysis.hourly')}</ToggleButton>
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
          {t('analysis.time')}
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection:"row",
            gap: 1,
            justifyContent: "center",
          }}
        >
          {(timeInterval === "year" || timeInterval === "month" || timeInterval === "day" || timeInterval === "hour") && (
            <FormControl size="small" sx={{ minWidth: 90, width: isSmallScreen ? "100%" : "auto" }}>
              <InputLabel id="year-label">{t('analysis.year')}</InputLabel>
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
              <InputLabel id="month-label">{t('analysis.month')}</InputLabel>
              <Select
                size="small"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                label={t('analysis.month')}
              >
                {validMonths.map((month, idx) => (
                  <MenuItem key={month} value={idx + 1}>{month}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {(timeInterval === "day" || timeInterval === "hour") && (
            <FormControl size="small" sx={{ minWidth: 90, width: isSmallScreen ? "100%" : "auto" }}>
              <InputLabel id="day-label">{t('analysis.day')}</InputLabel>
              <Select
                size="small"
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                label={t('analysis.day')}
              >
                {validDays.map((day) => (
                  <MenuItem key={day} value={day}>{day}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {timeInterval === "hour" && (
            <FormControl size="small" sx={{ minWidth: 90, width: isSmallScreen ? "100%" : "auto" }}>
              <InputLabel id="hour-label">{t('analysis.hour')}</InputLabel>
              <Select
                size="small"
                value={selectedHour}
                onChange={(e) => setSelectedHour(e.target.value)}
                label={t('analysis.hour')}
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
