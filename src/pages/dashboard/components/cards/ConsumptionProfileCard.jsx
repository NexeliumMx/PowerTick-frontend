import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, CardActions, ToggleButton, ToggleButtonGroup, Box, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useMsal } from "@azure/msal-react";
import { ComposedChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Bar, Line, ResponsiveContainer, Label } from "recharts";
import ChartSkeletonCard from "../cards/ChartSkeletonCard";
import { useConsumptionProfile } from '../../../../hooks/useConsumptionProfile';
import { formatDashboardTimestamp } from '../../utils/formatDashboardTimestamp';
import { Select, MenuItem, FormControl, InputLabel, Divider } from "@mui/material";
import chartColors from "../../../../theme/chartColors";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

const ConsumptionProfileCard = ({ selectedPowerMeter, measurementRange, defaultTimeFilter }) => {
  const theme = useTheme(); 
  const { accounts } = useMsal();
  const user_id = accounts[0]?.idTokenClaims?.oid;
  // Use defaultTimeFilter for initial state
  const [timeInterval, setTimeInterval] = useState("day");
  const [selectedYear, setSelectedYear] = useState(defaultTimeFilter?.year || new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(defaultTimeFilter?.month || new Date().getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState(defaultTimeFilter?.day || new Date().getDate());

  // Update time filter if defaultTimeFilter changes
  useEffect(() => {
    if (defaultTimeFilter) {
      setSelectedYear(defaultTimeFilter.year);
      setSelectedMonth(defaultTimeFilter.month);
      setSelectedDay(defaultTimeFilter.day);
    }
  }, [defaultTimeFilter]);
  
  // Use React Query hook for on-demand fetching and caching
  const { data: consumptionProfileData, isLoading } = useConsumptionProfile(user_id, selectedPowerMeter, timeInterval);

  const handleTimeIntervalChange = (event, newTimeInterval) => {
    if (newTimeInterval) {
      setTimeInterval(newTimeInterval);
    }
  };
  // Generate years, months, days arrays
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
  const months = Array.from({ length: 12 }, (_, i) => ({ label: dayjs().month(i).format('MMMM'), value: i + 1 }));
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  // Compute valid years, months, days based on measurementRange
  let validYears = years;
  let validMonths = months;
  let validDays = days;
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
  }

  // X axis label
  const xAxisLabel = timeInterval === "year"
    ? "Month"
    : timeInterval === "month"
    ? "Day"
    : timeInterval === "day"
    ? "Hour"
    : timeInterval === "hour"
    ? "Minutes"
    : "Time";

  // Transform data for Recharts
  const chartData = consumptionProfileData?.map((item) => ({
    name: formatDashboardTimestamp(item.timestamp_utc),
    realEnergy: item.real_energy_wh,
    reactiveEnergy: item.reactive_energy_varh,
  }));

  return (
    <Card sx={{ minHeight: "580px", display: "flex", flexDirection: "column" }}>
      <CardHeader
        title="Consumption Profile"
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
        <Box sx={{ width: "100%", overflow: "auto", px: 2, py:1}}>
          {isLoading ? (
            <ChartSkeletonCard/>
          ) : consumptionProfileData ? (
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={chartData}>
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
                    value="Energy (Wh|VArh)"
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
                <CartesianGrid stroke="#f5f5f5" />
                {/* Bars for realEnergy */}
                <Bar dataKey="realEnergy" barSize={20} fill={chartColors.realEnergy} name="Real Energy (Wh)" />
                {/* Lines for reactiveEnergy */}
                <Line type="monotone" dataKey="reactiveEnergy" stroke={chartColors.reactiveEnergy} name="Reactive Energy (VARh)" strokeWidth={3}/>
              </ComposedChart>
            </ResponsiveContainer>
          ) : (
            <Typography variant="body1">Data not available</Typography>
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
            width: "50%",
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
          <ToggleButton value="year" aria-label="Yearly">
            Yearly
          </ToggleButton>
          <ToggleButton value="month" aria-label="Monthly">
            Monthly
          </ToggleButton>
          <ToggleButton value="day" aria-label="Daily">
            Daily
          </ToggleButton>
        </ToggleButtonGroup>
        </Box>
        <Box sx={{
        width: "50%", 
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
        gap: 2
         }}>
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
      </CardActions>
    </Card>
  );
};

export default ConsumptionProfileCard;