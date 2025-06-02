import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardActions, ToggleButton, ToggleButtonGroup, Box, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useMsal } from "@azure/msal-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer, Label } from "recharts";
import ChartSkeletonCard from "../cards/ChartSkeletonCard";
import { useConsumptionHistory } from '../../../../hooks/useConsumptionHistory';
import { formatDashboardTimestamp } from '../../utils/formatDashboardTimestamp';
import { Select, MenuItem, FormControl, InputLabel, Divider } from "@mui/material";
import chartColors from "../../../../theme/chartColors";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

const ConsumptionHistoryCard = ({ selectedPowerMeter, measurementRange, defaultTimeFilter }) => {
  const theme = useTheme(); 
  const { accounts } = useMsal();
  const user_id = accounts[0]?.idTokenClaims?.oid;
  // Use defaultTimeFilter for initial state
  const [timeInterval, setTimeInterval] = useState("day");
  const [selectedYear, setSelectedYear] = useState(defaultTimeFilter?.year || new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(defaultTimeFilter?.month || new Date().getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState(defaultTimeFilter?.day || new Date().getDate());
  const [selectedHour, setSelectedHour] = useState(defaultTimeFilter?.hour || new Date().getHours());
  // Use React Query hook for on-demand fetching and caching
  const { data: consumptionHistoryData, isLoading } = useConsumptionHistory(user_id, selectedPowerMeter, timeInterval);

  const handleTimeIntervalChange = (event, newTimeInterval) => {
    if (newTimeInterval) {
      setTimeInterval(newTimeInterval);
    }
  };
  //Hacer que despliegue los meses y años disponibles
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
  // Use date library for month names (localized, maintainable)
  const months = Array.from({ length: 12 }, (_, i) =>
  dayjs().month(i).format('MMMM')
);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const hours = Array.from({ length: 24 }, (_, i) => i);

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
    // Hours
    if (
      selectedYear === min.year() && selectedMonth === min.month() + 1 && selectedDay === min.date() &&
      selectedYear === max.year() && selectedMonth === max.month() + 1 && selectedDay === max.date()
    ) {
      validHours = [];
      for (let h = min.hour(); h <= max.hour(); h++) validHours.push(h);
    } else if (selectedYear === min.year() && selectedMonth === min.month() + 1 && selectedDay === min.date()) {
      validHours = [];
      for (let h = min.hour(); h < 24; h++) validHours.push(h);
    } else if (selectedYear === max.year() && selectedMonth === max.month() + 1 && selectedDay === max.date()) {
      validHours = [];
      for (let h = 0; h <= max.hour(); h++) validHours.push(h);
    } else {
      validHours = hours;
    }
  }

  //X lable variable title
  const xAxisLabel = timeInterval === "year"
  ? "Mes"
  : timeInterval === "month"
  ? "Día"
  : timeInterval === "day"
  ? "Hora"
  : timeInterval === "hour"
  ? "Minutos"
      : "Tiempo";

  // Transform data for Recharts
  const chartData = consumptionHistoryData?.map((item) => ({
    name: formatDashboardTimestamp(item.timestamp_utc),
    realEnergy: item.real_energy_wh,
    reactiveEnergy: item.reactive_energy_varh,
  }));

  // Update time filter if defaultTimeFilter changes (e.g., when measurementRange loads)
  useEffect(() => {
    if (defaultTimeFilter) {
      setSelectedYear(defaultTimeFilter.year);
      setSelectedMonth(defaultTimeFilter.month);
      setSelectedDay(defaultTimeFilter.day);
      setSelectedHour(defaultTimeFilter.hour);
    }
  }, [defaultTimeFilter]);

  return (
    <Card sx={{ minHeight: "580px", display: "flex", flexDirection: "column" }}>
      <CardHeader
          title="Consumption History"
          titleTypographyProps={{
            variant: 'h3',
            sx: {
              textAlign: 'left',
              paddingLeft: 2,
              alignSelf: 'flex-start',
              fontWeight:600 ,
              paddingTop: '2px' // reduce from '10px' to '2px'
            }
          }}
        />
      <CardContent sx={{ flexGrow: 1, pt: 0 }}>
        <Box sx={{ width: "100%", overflow: "auto", px: 2, py:1 }}>
          {isLoading ? (
            <ChartSkeletonCard/>
          ) : consumptionHistoryData ? (
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
                {/* Left Axis */}
                <YAxis
                  yAxisId="left"
                  domain={['auto','auto']}
                  tick={{ fill: theme.palette.text.primary }}
                  stroke={theme.palette.text.primary}
                >
                  <Label
                    value="Active Energy (Wh)"
                    angle={-90}
                    position="insideLeft"
                    offset={-10}
                    style={{
                      textAnchor: 'middle',
                      fill: theme.palette.text.primary,
                      fontWeight: 600,
                    }}
                  />
                </YAxis>
                {/* Right Axis */}
                <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fill: theme.palette.text.primary }}
                    stroke={theme.palette.text.primary}
                  >
                    <Label
                      value="Reactive Energy (VARh)"
                      angle={-90}
                      position="insideRight"
                      offset={-10}
                      style={{
                        textAnchor: 'middle',
                        fill: theme.palette.text.primary,
                        fontWeight: 600,
                      }}
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
                <Legend layout="horizontal" verticalAlign="top" align="right" wrapperStyle={{marginRight: 40, paddingBottom: 8}} />
                <Line type="monotone" dataKey="realEnergy" stroke={chartColors.realEnergy} name="Active Energy (Wh)" dot={false} yAxisId="left" strokeWidth={3}/>
                <Line type="monotone" dataKey="reactiveEnergy" stroke={chartColors.reactiveEnergy} name="Reactive Energy (VARh)"  dot={false} yAxisId="right" strokeWidth={3}/>
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
                  <MenuItem key={hour} value={hour}>
                    {hour.toString().padStart(2, '0')}:00
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

export default ConsumptionHistoryCard;