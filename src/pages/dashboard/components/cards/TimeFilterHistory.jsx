import React, { useEffect } from "react";
import { Box, Typography, ToggleButton, ToggleButtonGroup, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

const LAST_HOUR_VALUE = 'last_hour';

/**
 * TimeFilterHistory is a reusable component for time filtering logic.
 *
 * Props:
 * - timeInterval, setTimeInterval
 * - selectedYear, setSelectedYear
 * - selectedMonth, setSelectedMonth
 * - selectedDay, setSelectedDay
 * - selectedHour, setSelectedHour
 * - measurementRange
 * - defaultTimeFilter
 */
const TimeFilterHistory = ({
  timeInterval, setTimeInterval,
  selectedYear, setSelectedYear,
  selectedMonth, setSelectedMonth,
  selectedDay, setSelectedDay,
  selectedHour, setSelectedHour,
  measurementRange,
  defaultTimeFilter
}) => {
  // Years, months, days arrays
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
  const months = Array.from({ length: 12 }, (_, i) => dayjs().month(i).format('MMMM'));
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const now = dayjs();
  const isToday =
    selectedYear === now.year() &&
    selectedMonth === now.month() + 1 &&
    selectedDay === now.date();

  // Generate hour options: 'Last Hour' + 00:00-23:00
  let hours = [];
  if (isToday) {
    // Descending order for today
    hours = [
      { value: LAST_HOUR_VALUE, label: 'Last Hour' },
      ...Array.from({ length: now.hour() + 1 }, (_, i) => {
        const hour = now.hour() - i;
        return {
          value: hour,
          label: `${String(hour).padStart(2, '0')}:00`,
        };
      })
    ];
  } else {
    // Ascending order for other days
    hours = Array.from({ length: 24 }, (_, i) => ({
      value: i,
      label: `${String(i).padStart(2, '0')}:00`,
    }));
    if (selectedHour === LAST_HOUR_VALUE) {
      setSelectedHour(0);
    }
  }

  // Compute valid years, months, days, and hours based on measurementRange
  let validYears = years;
  let validMonths = months;
  let validDays = days;
  let validHours = hours;
  if (measurementRange && measurementRange.min_utc && measurementRange.max_utc) {
    const tz = dayjs.tz.guess();
    const min = dayjs.utc(measurementRange.min_utc).tz(tz);
    const max = dayjs.utc(measurementRange.max_utc).tz(tz);
    // Years
    validYears = [];
    for (let y = min.year(); y <= max.year(); y++) validYears.push(y);
    // Months
    if (selectedYear === min.year() && selectedYear === max.year()) {
      validMonths = months.slice(min.month(), max.month() + 1);
    } else if (selectedYear === min.year()) {
      validMonths = months.slice(min.month());
    } else if (selectedYear === max.year()) {
      validMonths = months.slice(0, max.month() + 1);
    } else {
      validMonths = months;
    }
    // Days
    const daysInMonth = dayjs(`${selectedYear}-${selectedMonth}-01`).daysInMonth();
    let startDay = 1, endDay = daysInMonth;
    if (selectedYear === min.year() && selectedMonth === min.month() + 1) startDay = min.date();
    if (selectedYear === max.year() && selectedMonth === max.month() + 1) endDay = max.date();
    validDays = [];
    for (let d = startDay; d <= endDay; d++) validDays.push(d);
    // Hours (always as { value, label })
    if (
      selectedYear === min.year() && selectedMonth === min.month() + 1 && selectedDay === min.date() &&
      selectedYear === max.year() && selectedMonth === max.month() + 1 && selectedDay === max.date()
    ) {
      validHours = [];
      for (let h = min.hour(); h <= max.hour(); h++) {
        validHours.push({ value: h, label: `${String(h).padStart(2, '0')}:00` });
      }
    } else if (selectedYear === min.year() && selectedMonth === min.month() + 1 && selectedDay === min.date()) {
      validHours = [];
      for (let h = min.hour(); h < 24; h++) {
        validHours.push({ value: h, label: `${String(h).padStart(2, '0')}:00` });
      }
    } else if (selectedYear === max.year() && selectedMonth === max.month() + 1 && selectedDay === max.date()) {
      validHours = [];
      for (let h = 0; h <= max.hour(); h++) {
        validHours.push({ value: h, label: `${String(h).padStart(2, '0')}:00` });
      }
    } else {
      validHours = hours;
    }
    // If selectedHour is not in validHours, reset to first available
    if (timeInterval === 'hour' && !validHours.some(h => h.value === selectedHour)) {
      setSelectedHour(validHours.length > 0 ? validHours[0].value : '');
    }
  }

  // Update time filter if defaultTimeFilter changes (e.g., when measurementRange loads)
  useEffect(() => {
    if (defaultTimeFilter) {
      setSelectedYear(defaultTimeFilter.year);
      setSelectedMonth(defaultTimeFilter.month);
      setSelectedDay(defaultTimeFilter.day);
      setSelectedHour(defaultTimeFilter.hour);
    }
  }, [defaultTimeFilter, setSelectedYear, setSelectedMonth, setSelectedDay, setSelectedHour]);

  // On mount or when timeInterval or selected date changes, set default hour appropriately
  useEffect(() => {
    if (timeInterval === 'hour') {
      if (isToday) {
        setSelectedHour(LAST_HOUR_VALUE);
      } else {
        // If not today and selectedHour is 'last_hour', set to latest hour for that day
        if (selectedHour === LAST_HOUR_VALUE || !hours.some(h => h.value === selectedHour)) {
          setSelectedHour(hours.length > 0 ? hours[hours.length - 1].value : 0);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeInterval, selectedYear, selectedMonth, selectedDay]);

  // Handler for time interval change
  const handleTimeIntervalChange = (event, newTimeInterval) => {
    if (newTimeInterval) {
      setTimeInterval(newTimeInterval);
    }
  };

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Analysis Interval
      </Typography>
      <ToggleButtonGroup
        value={timeInterval}
        exclusive
        onChange={handleTimeIntervalChange}
        aria-label="Time Interval"
      >
        <ToggleButton value="day" aria-label="Daily">
          Daily
        </ToggleButton>
        <ToggleButton value="hour" aria-label="Hourly">
          Hourly
        </ToggleButton>
      </ToggleButtonGroup>
      <Typography variant="h5" sx={{ mb: 2, mt: 3 }}>
        Time Filter
      </Typography>
      <Box sx={{ width: "100%", display: "flex", alignItems: "flex-end", justifyContent: "center", gap: 1 }}>
        {(timeInterval === "year" || timeInterval === "month" || timeInterval === "day" || timeInterval === "hour") && (
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
        {(timeInterval === "month" || timeInterval === "day" || timeInterval === "hour") && (
          <FormControl size="small" sx={{ minWidth: 90 }}>
            <InputLabel id="month-label">Month</InputLabel>
            <Select
              size="small"
              value={selectedMonth}
              onChange={e => setSelectedMonth(e.target.value)}
              label="Month"
            >
              {validMonths.map((month, idx) => (
                <MenuItem key={month} value={idx + 1}>{month}</MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {(timeInterval === "day" || timeInterval === "hour") && (
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
        {timeInterval === "hour" && (
          <FormControl size="small" sx={{ minWidth: 90 }}>
            <InputLabel id="hour-label">Hour</InputLabel>
            <Select
              size="small"
              value={selectedHour}
              onChange={e => setSelectedHour(e.target.value)}
              label="Hour"
            >
              {validHours.map(hour => (
                <MenuItem key={hour.value} value={hour.value}>
                  {hour.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Box>
    </Box>
  );
};

export default TimeFilterHistory;
