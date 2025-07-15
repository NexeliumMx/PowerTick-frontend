// React imports
import { useState, useEffect, useContext } from "react";

// Context imports
import { ModeContext } from '../../../../context/AppModeContext';

// MSAL imports
import { useMsal } from "@azure/msal-react";

//MUI imports
import { Card, CardHeader, CardContent, CardActions, ToggleButton, ToggleButtonGroup, Box, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import ChartSkeletonCard from "../cards/ChartSkeletonCard";
import { Select, MenuItem, FormControl, InputLabel, Divider } from "@mui/material";

//Recharts imports
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer, Label } from "recharts";

// Hooks imports
import { useConsumptionHistory } from '../../../../hooks/useConsumptionHistory';

// Theme imports
import chartColors from "../../../../theme/chartColors";

// Components imports
import TimeFilterHistory, { LAST_HOUR_VALUE } from '../ui/TimeFilterHistory';

// Date handling
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

// Deprycated
import { formatDashboardTimestamp } from '../../utils/formatDashboardTimestamp';
import { useTranslation } from 'react-i18next';

const ConsumptionHistoryCard = ({ selectedPowerMeter, measurementRange, defaultTimeFilter, t: tProp }) => {
  const { t: tHook } = useTranslation();
  const t = tProp || tHook;

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
  //Hacer que despliegue los meses y años disponibles
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
  // Use date library for month names (localized, maintainable)
  const months = Array.from({ length: 12 }, (_, i) =>
  dayjs().month(i).format('MMMM')
);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  // Generate hour options: 'Last Hour' + 00:00-23:00
  const now = dayjs();
  const isToday =
    selectedYear === now.year() &&
    selectedMonth === now.month() + 1 &&
    selectedDay === now.date();

  let hours = [];
  if (isToday) {
    // Only show hours up to the current hour, in descending order
    hours = [
      { value: LAST_HOUR_VALUE, label: t('analysis.lastHour') },
      ...Array.from({ length: now.hour() + 1 }, (_, i) => {
        const hour = now.hour() - i;
        return {
          value: hour,
          label: `${String(hour).padStart(2, '0')}:00`,
        };
      })
    ];
  } else {
    // For previous days, show 00:00-23:00, but do NOT show 'Last Hour'
    hours = Array.from({ length: 24 }, (_, i) => ({
      value: i,
      label: `${String(i).padStart(2, '0')}:00`,
    }));
    // If 'Last Hour' is selected but not available, reset to 0
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

  // X lable variable title
  const xAxisLabel = timeInterval === "year"
    ? t('analysis.month', 'Mes')
    : timeInterval === "month"
    ? t('analysis.day', 'Día')
    : timeInterval === "day"
    ? t('analysis.hour', 'Hora')
    : timeInterval === "hour"
    ? t('analysis.minutes', 'Minutos')
    : t('dashboard.time', 'Tiempo');

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
          <Typography variant="body2">{t('analysis.activeEnergy')}: {payload[0].payload.realEnergy}</Typography>
          <Typography variant="body2">{t('analysis.reactiveEnergy')}: {payload[0].payload.reactiveEnergy}</Typography>
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

  // Use t('Analysis.consumptionHistory') for the card title
  const cardTitle = t('analysis.consumptionHistory');

  return (
    <Card sx={{ minHeight: "580px", display: "flex", flexDirection: "column", backgroundColor: theme.palette.background.card }}>
      <CardHeader
        title={cardTitle}
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
                    value={t('analysis.activeEnergy')}
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
                    value={t('analysis.reactiveEnergy')}
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
                <Line type="monotone" dataKey="realEnergy" stroke={chartColors.realEnergy} name={t('analysis.activeEnergy')} dot={false} yAxisId="left" strokeWidth={3}/>
                <Line type="monotone" dataKey="reactiveEnergy" stroke={chartColors.reactiveEnergy} name={t('analysis.reactiveEnergy')}  dot={false} yAxisId="right" strokeWidth={3}/>
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <Typography variant="body1">{t('analysis.noData')}</Typography>
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
          validYears={validYears}
          validMonths={validMonths}
          validDays={validDays}
          validHours={validHours}
          hours={hours}
        />
      </CardActions>
    </Card>
  );
};

export default ConsumptionHistoryCard;