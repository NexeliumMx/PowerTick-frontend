import { Box, Typography, FormControl, InputLabel, Select, MenuItem, ToggleButton, ToggleButtonGroup, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';


/**
 * TimeFilterProfile component for selecting interval and date filters.
 * Props:
 * - timeInterval, setTimeInterval
 * - selectedYear, setSelectedYear
 * - selectedMonth, setSelectedMonth
 * - selectedDay, setSelectedDay
 * - validYears, validMonths, validDays
 */
const TimeFilterProfile = ({
  timeInterval, setTimeInterval,
  selectedYear, setSelectedYear,
  selectedMonth, setSelectedMonth,
  selectedDay, setSelectedDay,
  validYears, validMonths, validDays,
  t: tProp

}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery("(max-width:960px)");
  const { t: tHook } = useTranslation();
  const t = tProp || tHook;
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
          <ToggleButton value="year" aria-label={t('analysis.yearly')}>{t('analysis.yearly')}</ToggleButton>
          <ToggleButton value="month" aria-label={t('analysis.monthly')}>{t('analysis.monthly')}</ToggleButton>
          <ToggleButton value="day" aria-label={t('analysis.daily')}>{t('analysis.daily')}</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Time Filter */}
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
            flexDirection: "row",
            gap: 2,
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          {(timeInterval === "year" || timeInterval === "month" || timeInterval === "day") && (
            <FormControl size="small" sx={{ minWidth: 90, width: isSmallScreen ? "100%" : "auto" }}>
              <InputLabel id="year-label">{t('analysis.year')}</InputLabel>
              <Select
                size="small"
                value={selectedYear}
                onChange={e => setSelectedYear(e.target.value)}
                label={t('analysis.year')}
              >
                {validYears.map(year => (
                  <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {(timeInterval === "month" || timeInterval === "day") && (
            <FormControl size="small" sx={{ minWidth: 90, width: isSmallScreen ? "100%" : "auto" }}>
              <InputLabel id="month-label">{t('analysis.month')}</InputLabel>
              <Select
                size="small"
                value={selectedMonth}
                onChange={e => setSelectedMonth(e.target.value)}
                label={t('analysis.month')}
              >
                {validMonths.map((month) => (
                  <MenuItem key={month.value} value={month.value}>{month.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {timeInterval === "day" && (
            <FormControl size="small" sx={{ minWidth: 90, width: isSmallScreen ? "100%" : "auto" }}>
              <InputLabel id="day-label">{t('analysis.day')}</InputLabel>
              <Select
                size="small"
                value={selectedDay}
                onChange={e => setSelectedDay(e.target.value)}
                label={t('analysis.day')}
              >
                {validDays.map(day => (
                  <MenuItem key={day} value={day}>{day}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default TimeFilterProfile;
