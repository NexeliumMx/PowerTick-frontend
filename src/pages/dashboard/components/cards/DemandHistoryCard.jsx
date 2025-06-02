import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardActions, ToggleButton, ToggleButtonGroup, Box, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useMsal } from "@azure/msal-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer, Label } from "recharts";
import ChartSkeletonCard from "../cards/ChartSkeletonCard";
import { useDemandHistory } from '../../../../hooks/useDemandHistory';
import { formatDashboardTimestamp } from '../../utils/formatDashboardTimestamp';
import { Select, MenuItem, FormControl, InputLabel, Divider } from "@mui/material";
import chartColors from "../../../../theme/chartColors";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

const LAST_HOUR_VALUE = 'last_hour';

const DemandHistoryCard = ({ selectedPowerMeter, measurementRange, defaultTimeFilter }) => {
  const theme = useTheme(); 
  const { accounts } = useMsal();
  const user_id = accounts[0]?.idTokenClaims?.oid;
  // Use defaultTimeFilter for initial state
  const [timeInterval, setTimeInterval] = useState("day");
  const [selectedYear, setSelectedYear] = useState(defaultTimeFilter?.year || new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(defaultTimeFilter?.month || new Date().getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState(defaultTimeFilter?.day || new Date().getDate());
  // Default hour: 'last_hour' if timeInterval is 'hour', otherwise defaultTimeFilter.hour
  const [selectedHour, setSelectedHour] = useState(timeInterval === 'hour' ? LAST_HOUR_VALUE : (defaultTimeFilter?.hour || new Date().getHours()));

  // Update time filter if defaultTimeFilter changes
  useEffect(() => {
    if (defaultTimeFilter) {
      setSelectedYear(defaultTimeFilter.year);
      setSelectedMonth(defaultTimeFilter.month);
      setSelectedDay(defaultTimeFilter.day);
      setSelectedHour(timeInterval === 'hour' ? LAST_HOUR_VALUE : defaultTimeFilter.hour);
    }
  }, [defaultTimeFilter, timeInterval]);

  // Compute start_utc and end_utc based on timeInterval and time filter
  const tz = dayjs.tz.guess();
  let start_utc = null;
  let end_utc = null;
  const now = dayjs();
  const isToday =
    selectedYear === now.year() &&
    selectedMonth === now.month() + 1 &&
    selectedDay === now.date();
  if (timeInterval === "hour") {
    if (selectedHour === LAST_HOUR_VALUE) {
      const start = now.subtract(1, 'hour');
      start_utc = start.utc().format();
      end_utc = now.utc().format();
    } else {
      const start = dayjs.tz(`${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}T${String(selectedHour).padStart(2, '0')}:00:00`, tz);
      let end;
      if (selectedHour < 23) {
        end = start.add(1, 'hour');
      } else {
        end = start.endOf('hour');
      }
      start_utc = start.utc().format();
      end_utc = end.utc().format();
    }
  } else if (timeInterval === "day") {
    const start = dayjs.tz(`${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}T00:00:00`, tz);
    const end = isToday ? now : start.endOf('day');
    start_utc = start.utc().format();
    end_utc = end.utc().format();
  }

  // Generate hour options: 'Last Hour' + 00:00-23:00 (as { value, label } objects)
  let hours = [];
  if (isToday) {
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
    hours = Array.from({ length: 24 }, (_, i) => ({
      value: i,
      label: `${String(i).padStart(2, '0')}:00`,
    }));
    // If 'Last Hour' is selected but not available, reset to 0
    if (selectedHour === LAST_HOUR_VALUE) {
      setSelectedHour(0);
    }
  }

  // Time filter arrays (copied from ConsumptionHistoryCard)
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
  const months = Array.from({ length: 12 }, (_, i) => dayjs().month(i).format('MMMM'));
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

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

  // Use new hook for demand history
  const { data: demandHistoryData, isLoading } = useDemandHistory(
    user_id,
    selectedPowerMeter,
    start_utc,
    end_utc,
    // Use app mode if available, fallback to PRODUCTION
    (typeof appModeState !== 'undefined' && appModeState.mode) ? appModeState.mode : 'PRODUCTION'
  );

  // Transform data for Recharts (show local time)
  const chartData = demandHistoryData?.map((item) => ({
    name: dayjs.utc(item.utc_time).tz(tz).format('HH:mm'), // x-axis label in local time
    timestamp_local: dayjs.utc(item.utc_time).tz(tz).format('YYYY-MM-DD HH:mm'), // for tooltip
    realPower: item.real_power_w,
    reactivePower: item.reactive_power_var,
  }));

  // X label variable title (copied from ConsumptionHistoryCard)
  const xAxisLabel = timeInterval === "year"
    ? "Mes"
    : timeInterval === "month"
    ? "Día"
    : timeInterval === "day"
    ? "Hora"
    : timeInterval === "hour"
    ? "Minutos"
    : "Tiempo";

  // Add handleTimeIntervalChange (copied from ConsumptionHistoryCard)
  const handleTimeIntervalChange = (event, newTimeInterval) => {
    if (newTimeInterval) {
      setTimeInterval(newTimeInterval);
    }
  };

  return (
    <Card sx={{ minHeight: "580px", display: "flex", flexDirection: "column" }}>
      <CardHeader
        title="Demand History"
        titleTypographyProps={{
          variant: 'h3',
          sx: {
            textAlign: 'left',
            paddingLeft: 2, 
            alignSelf: 'flex-start',
            paddingTop: '2px', 
            fontWeight:600 , 
            paddingBottom: 0
          }
        }}
      />
      <CardContent sx={{ flexGrow: 1, pt: 0 }}>
        <Box sx={{ width: "100%", overflow: "auto", px: 2, py:1 }}>
          {isLoading ? (
            <ChartSkeletonCard/>
          ) : demandHistoryData ? (
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  stroke={theme.palette.text.primary}
                  tick={{ fill: theme.palette.text.primary }}
                >
                  <Label
                    value={xAxisLabel}
                    offset={-5}
                    position="insideBottom"
                    style={{ fill: theme.palette.text.primary, fontWeight: 600 }}
                  />
                </XAxis>
                <YAxis
                  stroke={theme.palette.text.primary}
                  tick={{ fill: theme.palette.text.primary }}>
                   <Label
                    value="Power (W|VAR)"
                    angle={-90}
                    position="insideLeft"
                    style={{ textAnchor: 'middle', fill: theme.palette.text.primary, fontWeight: 600 }}
                    offset={10}
                  />
                </YAxis>
                <Tooltip 
                contentStyle={{
                  backgroundColor: theme.palette.background.paper,
                  border: `1px solid ${theme.palette.divider}`,
                  color: theme.palette.text.primary,
                }}
                labelStyle={{
                  color: theme.palette.text.secondary,
                }}
                 />
                <Legend layout="horizontal" verticalAlign="top" align="right" wrapperStyle={{paddingBottom: 8}} />
                <Line type="monotone" dataKey="realPower" stroke={chartColors.realEnergy} name="Real Power (W)" dot={false} strokeWidth={3}/>
                <Line type="monotone" dataKey="reactivePower" stroke={chartColors.reactiveEnergy} name="Reactive Power (VAR)" dot={false} strokeWidth={3}/>
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <Typography variant="body1">No data available</Typography>
          )}
        </Box>
      </CardContent>
      <Divider
        variant="middle"
        sx={{ mb: 1, borderColor: 'primary.main', borderBottomWidth: 3 }}
      />
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 0,
          mb: 2,
          px: 2,
        }}
      > 
        <Box sx={{
    width: "40%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  }}>
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
        </Box>
        <Box sx={{
        width: "60%", 
        display: "flex",
        flexDirection: "column",
        alignItems: "center", 
        justifyContent: "center"
         }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Time Filter
        </Typography> 
        <Box sx={{ 
          width: "100%", 
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          gap: 1
        }}>
          {(timeInterval === "year" || timeInterval === "month" || timeInterval === "day" || timeInterval === "hour") && (
            <FormControl size="small" sx={{ minWidth: 90 }}>
              <InputLabel id="year-label">Year</InputLabel>
              <Select
                size="small"
                value={selectedYear}
                onChange={e => setSelectedYear(e.target.value)}
                label="Year"
              >
                {years.map(year => (
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
                {months.map((month, idx) => (
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
                {days.map(day => (
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
      </CardActions>
    </Card>
  );
};

export default DemandHistoryCard;