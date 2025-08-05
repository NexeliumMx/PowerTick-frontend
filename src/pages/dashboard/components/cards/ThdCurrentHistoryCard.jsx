// React imports
import { useState, useEffect, useContext } from "react";
import PropTypes from 'prop-types';

// Context imports
import { ModeContext } from '../../../../context/AppModeContext';

// MSAL imports
import { useMsal } from "@azure/msal-react";

// MUI imports
import { Card, CardHeader, CardContent, CardActions, Box, Typography, Divider } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import ChartSkeletonCard from "../cards/ChartSkeletonCard";

// Recharts imports
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer, Label } from "recharts";

// Hooks imports
import { useApiData } from '../../../../hooks/useApiData';
import { useTranslation } from 'react-i18next';

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

const ThdCurrentHistoryCard = ({ selectedPowerMeter, measurementRange, defaultTimeFilter, t: tProp }) => {
  const { t: tHook } = useTranslation();
  const t = tProp || tHook;

  const theme = useTheme(); 
  const { accounts } = useMsal();
  const user_id = accounts[0]?.idTokenClaims?.oid;
  const { state: appModeState } = useContext(ModeContext);
  const [timeInterval, setTimeInterval] = useState("day");
  const [selectedYear, setSelectedYear] = useState(defaultTimeFilter?.year || new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(defaultTimeFilter?.month || new Date().getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState(defaultTimeFilter?.day || new Date().getDate());
  // Default hour: 'last_hour' if timeInterval is 'hour', otherwise defaultTimeFilter.hour
  const [selectedHour, setSelectedHour] = useState(timeInterval === 'hour' ? LAST_HOUR_VALUE : (defaultTimeFilter?.hour || new Date().getHours()));

  // Update time filter if defaultTimeFilter changes
  useEffect(() => {
    console.log('THD Current History - useEffect triggered with defaultTimeFilter:', defaultTimeFilter);
    console.log('THD Current History - Current state before update:', { selectedYear, selectedMonth, selectedDay, selectedHour });
    if (defaultTimeFilter) {
      console.log('THD Current History - Setting state to:', {
        year: defaultTimeFilter.year,
        month: defaultTimeFilter.month,
        day: defaultTimeFilter.day,
        hour: defaultTimeFilter.hour
      });
      setSelectedYear(defaultTimeFilter.year);
      setSelectedMonth(defaultTimeFilter.month);
      setSelectedDay(defaultTimeFilter.day);
      // Only update hour if not in hour interval mode or not using 'last_hour'
      if (timeInterval !== 'hour' || selectedHour !== LAST_HOUR_VALUE) {
        setSelectedHour(defaultTimeFilter.hour);
      }
    }
  }, [defaultTimeFilter]);

  // On mount or when timeInterval changes to 'hour', set default to 'Last Hour'
  useEffect(() => {
    if (timeInterval === 'hour') {
      setSelectedHour(LAST_HOUR_VALUE);
    }
  }, [timeInterval]);

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

  const { thdCurrentHistory } = useApiData();
  // Use hook - only call API if we have valid UTC dates
  const { data: thdCurrentHistoryData, isLoading } = thdCurrentHistory(
    user_id,
    selectedPowerMeter,
    start_utc,
    end_utc,
    appModeState?.mode || 'PRODUCTION',
    {
      enabled: !!(user_id && selectedPowerMeter && start_utc && end_utc) // Only run when all required params are available
    }
  );

  // Debug logging
  console.log('THD Current History - defaultTimeFilter received:', defaultTimeFilter);
  console.log('THD Current History - measurementRange:', measurementRange);
  console.log('THD Current History - State Values:', {
    selectedYear,
    selectedMonth,
    selectedDay,
    selectedHour,
    timeInterval
  });
  console.log('THD Current History - API Call Parameters:', {
    user_id,
    selectedPowerMeter,
    start_utc,
    end_utc,
    mode: appModeState?.mode || 'PRODUCTION'
  });
  console.log('THD Current History - API Response:', thdCurrentHistoryData);

  const handleTimeIntervalChange = (event, newTimeInterval) => {
    if (newTimeInterval) {
      setTimeInterval(newTimeInterval);
    }
  };

  // Generate time filter options
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
  const months = Array.from({ length: 12 }, (_, i) => ({ label: dayjs().month(i).format('MMMM'), value: i + 1 }));
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
    // For previous days, show 00:00-23:00, but do NOT show 'Last Hour'
    hours = Array.from({ length: 24 }, (_, i) => ({
      value: i,
      label: `${String(i).padStart(2, '0')}:00`,
    }));
  }

  // If 'Last Hour' is selected but not available for the selected date, reset to hour 0
  useEffect(() => {
    if (selectedHour === LAST_HOUR_VALUE && !isToday) {
      setSelectedHour(0);
    }
  }, [selectedHour, isToday]);

  // Compute valid years, months, days, and hours based on measurementRange
  let validYears = years;
  let validMonths = months;
  let validDays = days;
  let validHours = hours;
  if (measurementRange && measurementRange.min_utc && measurementRange.max_utc) {
    const min = dayjs.utc(measurementRange.min_utc).tz(tz);
    const max = dayjs.utc(measurementRange.max_utc).tz(tz);
    
    // Filter valid years
    validYears = years.filter(year => year >= min.year() && year <= max.year());
    
    // Filter valid months
    if (selectedYear === min.year() && selectedYear === max.year()) {
      validMonths = months.slice(min.month(), max.month() + 1);
    } else if (selectedYear === min.year()) {
      validMonths = months.slice(min.month());
    } else if (selectedYear === max.year()) {
      validMonths = months.slice(0, max.month() + 1);
    }
    
    // Filter valid days
    const daysInMonth = dayjs(`${selectedYear}-${selectedMonth}-01`).daysInMonth();
    let startDay = 1, endDay = daysInMonth;
    if (selectedYear === min.year() && selectedMonth === min.month() + 1) {
      startDay = min.date();
    }
    if (selectedYear === max.year() && selectedMonth === max.month() + 1) {
      endDay = max.date();
    }
    validDays = days.filter(day => day >= startDay && day <= endDay);
    
    // Filter valid hours
    if (selectedYear === min.year() && selectedMonth === min.month() + 1 && selectedDay === min.date() &&
        selectedYear === max.year() && selectedMonth === max.month() + 1 && selectedDay === max.date()) {
      validHours = hours.filter(hour => hour.value >= min.hour() && hour.value <= max.hour());
    } else if (selectedYear === min.year() && selectedMonth === min.month() + 1 && selectedDay === min.date()) {
      validHours = hours.filter(hour => hour.value >= min.hour());
    } else if (selectedYear === max.year() && selectedMonth === max.month() + 1 && selectedDay === max.date()) {
      validHours = hours.filter(hour => hour.value <= max.hour());
    }
  }

  // X label variable title
  const xAxisLabel = timeInterval === "year"
    ? t('analysis.month', 'Mes')
    : timeInterval === "month"
    ? t('analysis.day', 'Día')
    : timeInterval === "day"
    ? t('analysis.hour', 'Hora')
    : timeInterval === "hour"
    ? t('analysis.minutes', 'Minutos')
    : t('analysis.time', 'Tiempo');

  // Transform data for Recharts (show local time)
  const chartData = thdCurrentHistoryData?.map((item) => ({
    name: dayjs.utc(item.utc_time).tz(tz).format('HH:mm'),
    timestamp_local: dayjs.utc(item.utc_time).tz(tz).format('YYYY-MM-DD HH:mm'),
    thdCurrentL1: item.thd_current_l1 ,
    thdCurrentL2: item.thd_current_l2 ,
    thdCurrentL3: item.thd_current_l3 ,
  }));

  // Custom tooltip to show local time
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            padding: 1,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
            boxShadow: theme.shadows[3],
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            {data.timestamp_local}
          </Typography>
          {payload.map((entry) => (
            <Typography
              key={entry.dataKey}
              variant="body2"
              sx={{ color: entry.color }}
            >
              {`${entry.name}: ${entry.value?.toFixed(2) || 'N/A'}%`}
            </Typography>
          ))}
        </Box>
      );
    }
    return null;
  };

  // PropTypes for CustomTooltip
  CustomTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.arrayOf(PropTypes.object),
  };

  // Use t for the card title
  const cardTitle = t('analysis.thdCurrentHistory');

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
            paddingTop: '2px',
            fontWeight: 600,
            paddingBottom: 0
          }
        }}
      />
      <CardContent sx={{ flexGrow: 1, pt: 0 }}>
        <Box sx={{ width: "100%", overflow: "hidden", px: 2, my: 0 }}>
          {isLoading ? (
            <Box sx={{ mt: 0 }}>
              <ChartSkeletonCard />
            </Box>
          ) : thdCurrentHistoryData && thdCurrentHistoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
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
                  stroke={theme.palette.text.primary}
                  tick={{ fill: theme.palette.text.primary }}
                >
                  <Label 
                    value={t('analysis.thdCurrent', 'THD (%)')} 
                    angle={-90} 
                    position="insideLeft"
                    offset={-10}
                    style={{ 
                      textAnchor: 'middle', 
                      fill: theme.palette.text.primary,
                      fontWeight: 600
                    }}
                  />
                </YAxis>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  layout="horizontal" 
                  verticalAlign="top" 
                  align="right" 
                  wrapperStyle={{marginRight: 40, paddingBottom: 8}} 
                />
                <Line 
                  type="monotone" 
                  dataKey="thdCurrentL1" 
                  stroke={chartColors.phaseA || "#ff7300"} 
                  strokeWidth={3}
                  name={t('analysis.THDphase1Avg', 'THD Current L1')}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="thdCurrentL2" 
                  stroke={chartColors.phaseB || "#8884d8"} 
                  strokeWidth={3}
                  name={t('analysis.THDphase2Avg', 'THD Current L2')}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="thdCurrentL3" 
                  stroke={chartColors.phaseC || "#82ca9d"} 
                  strokeWidth={3}
                  name={t('analysis.THDphase3Avg', 'THD Current L3')}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <Typography variant="body1">Data not available</Typography>
          )}
        </Box>
      </CardContent>
      <Divider
        variant="middle"
        sx={{ 
          mb: 1, 
          borderColor: 'primary.main', 
          borderBottomWidth: 3 
        }}
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
          handleTimeIntervalChange={handleTimeIntervalChange}
          t={t}
        />
      </CardActions>
    </Card>
  );
};

// PropTypes validation
ThdCurrentHistoryCard.propTypes = {
  selectedPowerMeter: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  measurementRange: PropTypes.shape({
    min_utc: PropTypes.string,
    max_utc: PropTypes.string,
  }),
  defaultTimeFilter: PropTypes.shape({
    year: PropTypes.number,
    month: PropTypes.number,
    day: PropTypes.number,
    hour: PropTypes.number,
  }),
  t: PropTypes.func,
};

export default ThdCurrentHistoryCard;
