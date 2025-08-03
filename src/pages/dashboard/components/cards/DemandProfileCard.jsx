import { useState, useEffect, useContext } from "react";
import PropTypes from 'prop-types';
import { Card, CardHeader, CardContent, CardActions, Box, Typography, Divider } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useApiData } from '../../../../hooks/useApiData';
import { useMsal } from "@azure/msal-react";
import {
  ResponsiveChartContainer,
  BarPlot,
  LinePlot,
  ChartsXAxis,
  ChartsYAxis,
  ChartsLegend,
  ChartsTooltip,
  ChartsGrid,
  MarkPlot,
} from '@mui/x-charts';

import ChartSkeletonCard from "../cards/ChartSkeletonCard";
import TimeFilterProfile from '../ui/TimeFilterProfile';
import { ModeContext } from '../../../../context/AppModeContext';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { formatHourLocal, formatDayLocal, formatMonthLocal } from '../ui/TimestampFormatter';
import { useTranslation } from 'react-i18next';
import chartColors from "../../../../theme/chartColors";
import { AnalyticsSharp } from "@mui/icons-material";
dayjs.extend(utc);
dayjs.extend(timezone);

const DemandProfileCard = ({ selectedPowerMeter, measurementRange, defaultTimeFilter, t: tProp }) => {
  const theme = useTheme();
  const { accounts } = useMsal();
  const { state: appModeState } = useContext(ModeContext);
  const user_id = accounts[0]?.idTokenClaims?.oid;
  const mode = appModeState?.mode || 'PRODUCTION';
  const { t: tHook } = useTranslation();
  const t = tProp || tHook;

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
    const start = dayjs.tz(`${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}T00:00:00`, tz);
    const end = start.add(1, 'day');
    start_utc = start.utc().format();
    end_utc = end.utc().format();
  } else if (timeInterval === 'month') {
    apiTimeInterval = 'day';
    const start = dayjs.tz(`${selectedYear}-${String(selectedMonth).padStart(2, '0')}-01T00:00:00`, tz);
    const end = start.add(1, 'month');
    start_utc = start.utc().format();
    end_utc = end.utc().format();
  } else if (timeInterval === 'year') {
    apiTimeInterval = 'month';
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

  const { demandProfile } = useApiData();
  // Fetch data
  const { data: demandProfileData, isLoading } = demandProfile(
    user_id,
    selectedPowerMeter,
    apiTimeInterval,
    start_utc,
    end_utc,
    mode
  );
  console.log('Demand Profile Data:', demandProfileData);

  // X axis label and dataKey
  let xAxisLabel = '';
  let xDataKey = '';
  if (apiTimeInterval === 'month') {
    xAxisLabel = t('analysis.month', 'Mes');
    xDataKey = 'month_start_local';
  } else if (apiTimeInterval === 'hour') {
    xAxisLabel = t('analysis.hour', 'hora');
    xDataKey = 'hour_start_utc';
  } else if (apiTimeInterval === 'day') {
    xAxisLabel = t('analysis.day', 'dia');
    xDataKey = 'day_start_utc';
  } else {
    xAxisLabel = t('dashboard.time', 'Tiempo');
    xDataKey = 'time';
  }

  // Transform data for MUI X BarChart (show formatted local time for x-axis)
  const chartData = demandProfileData?.map((item) => {
    let formattedName = item[xDataKey];
    if (apiTimeInterval === 'hour') {
      formattedName = formatHourLocal(item[xDataKey]);
    } else if (apiTimeInterval === 'day') {
      formattedName = formatDayLocal(item[xDataKey]);
    } else if (apiTimeInterval === 'month') {
      formattedName = formatMonthLocal(item[xDataKey]);
    }
     console.log( typeof item.w_avg)

  const wMax = item.w_max / 10;
  const wAvg = parseFloat(parseFloat(item.w_avg).toFixed(3)) / 10;
  const varMax = item.var_max/10;
  const varAvg = parseFloat(parseFloat(item.var_avg).toFixed(3)) / 10;
    return {
      ...item,
      name: formattedName,
      w_m: wMax,
      w_a: wAvg,
      w_diff: wMax - wAvg,
      var_m: varMax,
      var_a: varAvg,
      var_diff: varMax - varAvg,
    };
  });
  
  // Value formatters for chart
  const wFormatter = (value) => value != null ? `${value} W` : '';
  const varFormatter = (value) => value != null ? `${value} VAr` : '';

  // Use t('Analysis.demandProfile') for the card title
  const cardTitle = t('analysis.demandProfile');

  return (
    <Card sx={{ minHeight: "580px", display: "flex", flexDirection: "column" , backgroundColor: theme.palette.background.card}}>
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
        <Box sx={{ width: "100%", overflow: "auto", px: 2, my:-10}}>
          {isLoading ? (
            <Box sx={{ mt: 11 }}>
            <ChartSkeletonCard />
          </Box>
          ) : demandProfileData ? (
  <ResponsiveChartContainer
  series={[
    { type: 'bar', dataKey: 'w_a', label: t('analysis.realAvg'), valueFormatter: wFormatter, color: chartColors.avgRealPower },
    { type: 'line', dataKey: 'w_m', label: t('analysis.realMax'), valueFormatter: wFormatter, color: chartColors.maxRealPower },
    { type: 'bar', dataKey: 'var_a', label: t('analysis.reactiveAvg'), valueFormatter: varFormatter, color: chartColors.avgVar },
    { type: 'line', dataKey: 'var_m', label: t('analysis.reactiveMax'), valueFormatter: varFormatter, color: chartColors.maxVar },
  ]}
  dataset={chartData}
  xAxis={[{
    dataKey: 'name',
    label: xAxisLabel,
    scaleType: 'band',
    tickLabelStyle: { angle: -45, textAnchor: 'end', fontSize: 12 },
    minStep: 20,
    interval: 0,
    labelStyle: { transform:'translateY(15px)' }
  }]}
  yAxis={[{
    label: t('analysis.demand'),
    labelStyle: {
      transform: 'translate(-90px, 0px) rotate(-90deg)',
      transformOrigin: 'left center',
      dominantBaseline: 'middle',
      textAnchor: 'middle'
    },
    tickLabelStyle: { fontSize: 12 }
  }]}
  height={450}
  margin={{ top: 150, left: 70, bottom: 60 }}
  sx={{ background: 'transparent' }}
>

  <BarPlot />
  <LinePlot />
  <MarkPlot />
  <ChartsGrid horizontal vertical/>


  <ChartsLegend
    position={{ vertical: 'top', horizontal: 'center' }}
    itemGap={180}
  />

  <ChartsTooltip
    content={({ dataIndex }) => {
      if (!chartData || dataIndex == null) return null;
      const row = chartData[dataIndex];
      return (
        <Box sx={{ p: 1 }}>
          <Typography variant="subtitle2">{row.name}</Typography>
          <Typography variant="body2" color={chartColors.avgRealPower}>
            {t('analysis.realAvg')}: {wFormatter(row.w_a)}
          </Typography>
          <Typography variant="body2" color={chartColors.maxRealPower}>
            {t('analysis.realMax')}: {wFormatter(row.w_m)}
          </Typography>
          <Typography variant="body2" color={chartColors.avgVar}>
            {t('analysis.reactiveAvg')}: {varFormatter(row.var_a)}
          </Typography>
          <Typography variant="body2" color={chartColors.maxVar}>
            {t('analysis.reactiveMax')}: {varFormatter(row.var_m)}
          </Typography>
        </Box>
      );
    }}
  />

  <ChartsXAxis />
  <ChartsYAxis />
</ResponsiveChartContainer>

          ) : (
            <Typography variant="body1">{t('analysis.noData')}</Typography>
          )}
        </Box>
      </CardContent>
      <Divider
        variant="middle"
        sx={{ 
          mt: { xs: 4, sm: 4, md: 4 },
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

// PropTypes validation
DemandProfileCard.propTypes = {
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

export default DemandProfileCard;