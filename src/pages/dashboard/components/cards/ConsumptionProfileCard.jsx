// React imports
import { useState, useEffect, useContext } from "react";
import { ModeContext } from '../../../../context/AppModeContext';
import { useMsal } from "@azure/msal-react";
import { Card, CardHeader, CardContent, CardActions, Box, Typography, Divider } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import ChartSkeletonCard from "../cards/ChartSkeletonCard";
import { BarChart } from '@mui/x-charts/BarChart';
import { useConsumptionProfile } from '../../../../hooks/useConsumptionProfile';
import TimeFilterProfile from '../ui/TimeFilterProfile';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { formatHourLocal, formatDayLocal, formatMonthLocal } from '../ui/TimestampFormatter';
import { useTranslation } from 'react-i18next';
dayjs.extend(utc);
dayjs.extend(timezone);

const ConsumptionProfileCard = ({ selectedPowerMeter, measurementRange, defaultTimeFilter, t: tProp }) => {
  const { t: tHook } = useTranslation();
  const t = tProp || tHook;
  const theme = useTheme();
  const { accounts } = useMsal();
  const { state: appModeState } = useContext(ModeContext);
  const user_id = accounts[0]?.idTokenClaims?.oid;
  const mode = appModeState?.mode || 'PRODUCTION';

  // Time filter state
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

  // Map UI timeInterval to API time_interval and compute start/end UTC
  let apiTimeInterval = 'day';
  let start_utc = null;
  let end_utc = null;
  const tz = dayjs.tz.guess();
  if (timeInterval === 'day') {
    apiTimeInterval = 'hour';
    // Start: selected day at 00:00 local, End: next day at 00:00 local
    const start = dayjs.tz(`${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}T00:00:00`, tz);
    const end = start.add(1, 'day');
    start_utc = start.utc().format();
    end_utc = end.utc().format();
  } else if (timeInterval === 'month') {
    apiTimeInterval = 'day';
    // Start: first day of month, End: first day of next month
    const start = dayjs.tz(`${selectedYear}-${String(selectedMonth).padStart(2, '0')}-01T00:00:00`, tz);
    const end = start.add(1, 'month');
    start_utc = start.utc().format();
    end_utc = end.utc().format();
  } else if (timeInterval === 'year') {
    apiTimeInterval = 'month';
    // Start: Jan 1, End: Jan 1 next year
    const start = dayjs.tz(`${selectedYear}-01-01T00:00:00`, tz);
    const end = start.add(1, 'year');
    start_utc = start.utc().format();
    end_utc = end.utc().format();
  }

  // Valid time filter options
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
  const months = Array.from({ length: 12 }, (_, i) => ({ label: dayjs().month(i).format('MMMM'), value: i + 1 }));
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  let validYears = years;
  let validMonths = months;
  let validDays = days;
  if (measurementRange && measurementRange.min_utc && measurementRange.max_utc) {
    const min = dayjs.utc(measurementRange.min_utc).tz(tz);
    const max = dayjs.utc(measurementRange.max_utc).tz(tz);
    validYears = [];
    for (let y = min.year(); y <= max.year(); y++) validYears.push(y);
    if (selectedYear === min.year() && selectedYear === max.year()) {
      validMonths = months.slice(min.month(), max.month() + 1);
    } else if (selectedYear === min.year()) {
      validMonths = months.slice(min.month());
    } else if (selectedYear === max.year()) {
      validMonths = months.slice(0, max.month() + 1);
    } else {
      validMonths = months;
    }
    const daysInMonth = dayjs(`${selectedYear}-${selectedMonth}-01`).daysInMonth();
    let startDay = 1, endDay = daysInMonth;
    if (selectedYear === min.year() && selectedMonth === min.month() + 1) startDay = min.date();
    if (selectedYear === max.year() && selectedMonth === max.month() + 1) endDay = max.date();
    validDays = [];
    for (let d = startDay; d <= endDay; d++) validDays.push(d);
  }

  // Fetch data
  const { data: consumptionProfileData, isLoading } = useConsumptionProfile(
    user_id,
    selectedPowerMeter,
    apiTimeInterval,
    start_utc,
    end_utc,
    mode
  );

  // X axis label and dataKey
  let xAxisLabel = '';
  let xDataKey = '';
  if (apiTimeInterval === 'month') {
    xAxisLabel = t('dashboard.month', 'Mes');
    xDataKey = 'month_start_local';
  } else if (apiTimeInterval === 'year') {
    xAxisLabel = t('dashboard.year', 'Ano');
    xDataKey = 'year';
  } else if (apiTimeInterval === 'day') {
    xAxisLabel = t('dashboard.day', 'Dia');
    xDataKey = 'day_start_utc';
  } else {
    xAxisLabel = t('dashboard.time', 'Tiempo');
    xDataKey = 'time';
  }

  // Value formatters for chart
  const whFormatter = (value) => value != null ? `${value} Wh` : '';
  const varhFormatter = (value) => value != null ? `${value} VArh` : '';

  // Transform data for MUI X BarChart (show formatted local time for x-axis)
  const chartData = consumptionProfileData?.map((item) => {
    let formattedName = item[xDataKey];
    if (apiTimeInterval === 'hour') {
      formattedName = formatHourLocal(item[xDataKey]);
    } else if (apiTimeInterval === 'day') {
      formattedName = formatDayLocal(item[xDataKey]);
    } else if (apiTimeInterval === 'month') {
      formattedName = formatMonthLocal(item[xDataKey]);
    }
    return {
      ...item,
      name: formattedName,
      wh: item.wh,
      varh: item.varh,
    };
  });

  // Use t('Analysis.consumptionProfile') for the card title
  const cardTitle = t('Analysis.consumptionProfile');

  return (
    <Card sx={{ minHeight: "580px", display: "flex", flexDirection: "column" }}>
      <CardHeader
        title={cardTitle}
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
            <BarChart
              dataset={chartData}
              series={[
                { dataKey: 'wh', label: 'Wh', valueFormatter: whFormatter },
                { dataKey: 'varh', label: 'VARh', valueFormatter: varhFormatter },
              ]}
              xAxis={[{ dataKey: 'name', label: xAxisLabel, scaleType: 'band', tickLabelStyle: { angle: -45, textAnchor: 'end', fontSize: 12 }, minStep: 20, interval: 0 }]}
              height={350}
              margin={{ left: 40, bottom: 60 }}
              sx={{ background: 'transparent' }}
            />
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
        <TimeFilterProfile
          timeInterval={timeInterval}
          setTimeInterval={setTimeInterval}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          validYears={validYears}
          validMonths={validMonths}
          validDays={validDays}
        />
      </CardActions>
    </Card>
  );
};

export default ConsumptionProfileCard;