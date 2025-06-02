import React, { useState, useEffect, useContext } from "react";
import { Card, CardHeader, CardContent, CardActions, ToggleButton, ToggleButtonGroup, Box, Typography, Divider } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useMsal } from "@azure/msal-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer, Label } from "recharts";
import ChartSkeletonCard from "../cards/ChartSkeletonCard";
import { useConsumptionHistory } from '../../../../hooks/useConsumptionHistory';
import { formatDashboardTimestamp } from '../../utils/formatDashboardTimestamp';
import TimeFilterHistory from './TimeFilterHistory';
import chartColors from "../../../../theme/chartColors";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { ModeContext } from '../../../../context/AppModeContext';
dayjs.extend(utc);
dayjs.extend(timezone);

const LAST_HOUR_VALUE = 'last_hour';

const ConsumptionHistoryCard = ({ selectedPowerMeter, measurementRange, defaultTimeFilter }) => {
  const theme = useTheme(); 
  const { accounts } = useMsal();
  const user_id = accounts[0]?.idTokenClaims?.oid;
  const [timeInterval, setTimeInterval] = useState("day");
  const [selectedYear, setSelectedYear] = useState(defaultTimeFilter?.year || new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(defaultTimeFilter?.month || new Date().getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState(defaultTimeFilter?.day || new Date().getDate());
  // Default hour: 'last_hour' if timeInterval is 'hour', otherwise defaultTimeFilter.hour
  const [selectedHour, setSelectedHour] = useState(timeInterval === 'hour' ? LAST_HOUR_VALUE : (defaultTimeFilter?.hour || new Date().getHours()));
  const { state: appModeState } = useContext(ModeContext);

  // Compute start_utc and end_utc based on timeInterval and time filter
  const tz = dayjs.tz.guess();
  let start_utc = null;
  let end_utc = null;
  if (timeInterval === "hour") {
    if (selectedHour === LAST_HOUR_VALUE) {
      // Last hour: now - 1 hour to now
      const now = dayjs();
      const start = now.subtract(1, 'hour');
      start_utc = start.utc().format();
      end_utc = now.utc().format();
    } else {
      // For hour: range is from selected hour to selected hour + 1 (local time)
      const start = dayjs.tz(`${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}T${String(selectedHour).padStart(2, '0')}:00:00`, tz);
      let end;
      if (selectedHour < 23) {
        end = start.add(1, 'hour');
      } else {
        // If 23:00, end at 23:59:59
        end = start.endOf('hour');
      }
      start_utc = start.utc().format();
      end_utc = end.utc().format();
    }
  } else if (timeInterval === "day") {
    // For day: range is from 00:00 to now (local time)
    const now = dayjs();
    const isToday = now.year() === selectedYear && (now.month() + 1) === selectedMonth && now.date() === selectedDay;
    const start = dayjs.tz(`${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}T00:00:00`, tz);
    const end = isToday ? now : start.endOf('day');
    start_utc = start.utc().format();
    end_utc = end.utc().format();
  }

  // Use new hook
  const { data: consumptionHistoryData, isLoading } = useConsumptionHistory(
    user_id,
    selectedPowerMeter,
    start_utc,
    end_utc,
    appModeState?.mode || 'PRODUCTION'
  );

  const handleTimeIntervalChange = (event, newTimeInterval) => {
    if (newTimeInterval) {
      setTimeInterval(newTimeInterval);
    }
  };
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

  // Transform data for Recharts (show local time)
  const chartData = consumptionHistoryData?.map((item) => ({
    name: dayjs.utc(item.utc_time).tz(tz).format('HH:mm'), // x-axis label in local time
    timestamp_local: dayjs.utc(item.utc_time).tz(tz).format('YYYY-MM-DD HH:mm'), // for tooltip
    realEnergy: item.real_energy_wh,
    reactiveEnergy: item.reactive_energy_varh,
  }));

  // Custom tooltip to show local time
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Box sx={{ backgroundColor: theme.palette.background.paper, border: `1px solid ${theme.palette.divider}`, p: 1 }}>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {payload[0].payload.timestamp_local}
          </Typography>
          <Typography variant="body2">Active Energy (Wh): {payload[0].payload.realEnergy}</Typography>
          <Typography variant="body2">Reactive Energy (VARh): {payload[0].payload.reactiveEnergy}</Typography>
        </Box>
      );
    }
    return null;
  };

  // Update time filter if defaultTimeFilter changes (e.g., when measurementRange loads)
  useEffect(() => {
    if (defaultTimeFilter) {
      setSelectedYear(defaultTimeFilter.year);
      setSelectedMonth(defaultTimeFilter.month);
      setSelectedDay(defaultTimeFilter.day);
      setSelectedHour(defaultTimeFilter.hour);
    }
  }, [defaultTimeFilter]);

  // On mount or when timeInterval changes to 'hour', set default to 'Last Hour'
  useEffect(() => {
    if (timeInterval === 'hour') {
      setSelectedHour(LAST_HOUR_VALUE);
    }
  }, [timeInterval]);

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
            paddingTop: '2px'
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
                  tickFormatter={v => v}
                >
                  <Label
                    value={xAxisLabel}
                    offset={-5}
                    position="insideBottom"
                    style={{ fill: theme.palette.text.primary, fontWeight: 600 }}
                  />
                </XAxis>
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
                <Tooltip content={<CustomTooltip />} />
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
          justifyContent: "center",
          alignItems: "center",
          mt: 0,
          mb: 2,
          px: 2,
        }}
      >
        <TimeFilterHistory
          timeInterval={timeInterval}
          setTimeInterval={setTimeInterval}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          selectedHour={selectedHour}
          setSelectedHour={setSelectedHour}
          measurementRange={measurementRange}
          defaultTimeFilter={defaultTimeFilter}
        />
      </CardActions>
    </Card>
  );
};

export default ConsumptionHistoryCard;