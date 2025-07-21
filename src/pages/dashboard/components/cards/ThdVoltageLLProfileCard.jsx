import { useState, useEffect, useContext } from "react";
import PropTypes from 'prop-types';
import { Card, CardHeader, CardContent, CardActions, Box, Typography, Divider } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useApiData } from '../../../../hooks/useApiData';
import { useMsal } from "@azure/msal-react";
import { BarChart } from '@mui/x-charts/BarChart';
import ChartSkeletonCard from "../cards/ChartSkeletonCard";
import TimeFilterProfile from '../ui/TimeFilterProfile';
import { ModeContext } from '../../../../context/AppModeContext';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { formatHourLocal, formatDayLocal, formatMonthLocal } from '../ui/TimestampFormatter';
import { useTranslation } from 'react-i18next';
import chartColors from "../../../../theme/chartColors";

dayjs.extend(utc);
dayjs.extend(timezone);

const ThdVoltageLLProfileCard = ({ selectedPowerMeter, measurementRange, defaultTimeFilter, t: tProp }) => {
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
    for (let y = min.year(); y <= max.year(); y++) {
      validYears.push(y);
    }
    if (selectedYear === min.year() && selectedYear === max.year()) {
      validMonths = months.slice(min.month(), max.month() + 1);
    } else if (selectedYear === min.year()) {
      validMonths = months.slice(min.month());
    } else if (selectedYear === max.year()) {
      validMonths = months.slice(0, max.month() + 1);
    }
    const daysInMonth = dayjs(`${selectedYear}-${selectedMonth}-01`).daysInMonth();
    let startDay = 1, endDay = daysInMonth;
    if (selectedYear === min.year() && selectedMonth === min.month() + 1) {
      startDay = min.date();
    }
    if (selectedYear === max.year() && selectedMonth === max.month() + 1) {
      endDay = max.date();
    }
    validDays = [];
    for (let d = startDay; d <= endDay; d++) {
      validDays.push(d);
    }
  }

  const { thdVoltageLLProfile } = useApiData();
  // Fetch data
  const { data: thdVoltageLLProfileData, isLoading } = thdVoltageLLProfile(
    user_id,
    selectedPowerMeter,
    apiTimeInterval,
    start_utc,
    end_utc,
    mode
  );
  console.log('THD Voltage LL Profile Data:', thdVoltageLLProfileData);

  // X axis label and dataKey
  let xAxisLabel = '';
  let xDataKey = '';
  if (apiTimeInterval === 'month') {
    xAxisLabel = t('dashboard.month', 'Mes');
    xDataKey = 'month_start_local';
  } else if (apiTimeInterval === 'hour') {
    xAxisLabel = t('dashboard.hour', 'Hora');
    xDataKey = 'hour_start_utc';
  } else if (apiTimeInterval === 'day') {
    xAxisLabel = t('dashboard.day', 'Día');
    xDataKey = 'day_start_utc';
  }

  // Transform data for MUI X BarChart (show formatted local time for x-axis)
  const chartData = thdVoltageLLProfileData?.map((item) => {
    let formattedName = item[xDataKey];
    
    // Format the name based on the time interval
    if (apiTimeInterval === 'hour' && item.hour_start_utc) {
      formattedName = formatHourLocal(item.hour_start_utc);
    } else if (apiTimeInterval === 'day' && item.day_start_utc) {
      formattedName = formatDayLocal(item.day_start_utc);
    } else if (apiTimeInterval === 'month' && item.month_start_local) {
      formattedName = formatMonthLocal(item.month_start_local);
    }

    // Debug: Log all available fields in the first item
    if (thdVoltageLLProfileData.indexOf(item) === 0) {
      console.log('Available fields in THD Voltage LL Profile data:', Object.keys(item));
      console.log('Sample item data:', item);
    }

    return {
      name: formattedName,
      thd_voltage_ab_max: item.thd_voltage_l1_l2_max || 0,
      thd_voltage_ab_avg: item.thd_voltage_l1_l2_avg || 0,
      thd_voltage_bc_max: item.thd_voltage_l2_l3_max || 0,
      thd_voltage_bc_avg: item.thd_voltage_l2_l3_avg || 0,
      thd_voltage_ca_max: item.thd_voltage_l3_l1_max || 0,
      thd_voltage_ca_avg: item.thd_voltage_l3_l1_avg || 0,
    };
  });
  
  // Check if we have actual data values (not just null values)
  const hasActualData = thdVoltageLLProfileData?.some(item => 
    item.thd_voltage_l1_l2_max !== null || 
    item.thd_voltage_l1_l2_avg !== null || 
    item.thd_voltage_l2_l3_max !== null || 
    item.thd_voltage_l2_l3_avg !== null || 
    item.thd_voltage_l3_l1_max !== null || 
    item.thd_voltage_l3_l1_avg !== null
  );

  // Value formatters for chart
  const percentFormatter = (value) => value != null ? `${value.toFixed(2)}%` : '';

  // Use t for the card title
  const cardTitle = t('Analysis.thdVoltageLLProfile', 'THD Voltage LL Profile');

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
        <Box sx={{ width: "100%", overflow: "auto", px: 2, my:-5}}>
          {isLoading ? (
            <ChartSkeletonCard/>
          ) : (thdVoltageLLProfileData && thdVoltageLLProfileData.length > 0 && hasActualData) ? (
            <BarChart
              
              slotProps={{
                legend: {
                  hidden: false,
                  position: { vertical: 'top', horizontal: 'center' },
                  itemGap: 50,
                }
              }}
              dataset={chartData}
              
              series={[
                { dataKey: 'thd_voltage_ab_max', stack: 'l1l2', label: 'L1-L2 Max', valueFormatter: percentFormatter, color: chartColors.voltageABMax || '#ff5722' },
                { dataKey: 'thd_voltage_ab_avg', stack: 'l1l2', label: 'L1-L2 Avg', valueFormatter: percentFormatter, color: chartColors.voltageABAvg || '#ff7043' },
                { dataKey: 'thd_voltage_bc_max', stack: 'l2l3', label: 'L2-L3 Max', valueFormatter: percentFormatter, color: chartColors.voltageBCMax || '#2196f3' },
                { dataKey: 'thd_voltage_bc_avg', stack: 'l2l3', label: 'L2-L3 Avg', valueFormatter: percentFormatter, color: chartColors.voltageBCAvg || '#42a5f5' },
                { dataKey: 'thd_voltage_ca_max', stack: 'l3l1', label: 'L3-L1 Max', valueFormatter: percentFormatter, color: chartColors.voltageCAMax || '#4caf50' },
                { dataKey: 'thd_voltage_ca_avg', stack: 'l3l1', label: 'L3-L1 Avg', valueFormatter: percentFormatter, color: chartColors.voltageCAAvg || '#66bb6a' },
              ]}
              xAxis={[{ dataKey: 'name', label: xAxisLabel, scaleType: 'band', tickLabelStyle: { angle: -45, textAnchor: 'end', fontSize: 12 }, minStep: 20, interval: 0 , labelStyle: { transform:'translateY(15px)' } }]}
              height={400}
              margin={{ 
                top: 100,
                left: 40, 
                bottom: 60 
              }}
              sx={{ background: 'transparent' }}
            />
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 200, gap: 2 }}>
              <Typography variant="body1" color="text.secondary">
                {thdVoltageLLProfileData && thdVoltageLLProfileData.length > 0 
                  ? "THD Voltage LL Profile data contains no measurements (all values are null)"
                  : "No THD Voltage LL Profile data available for the selected period"
                }
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                {thdVoltageLLProfileData && thdVoltageLLProfileData.length > 0 
                  ? "The API returned data structure but all THD voltage LL measurements are null. This suggests the measurement device may not support THD voltage measurements or no valid measurements were recorded during this period."
                  : "This could be due to: no measurements in the selected time range, API endpoint not returning data, or the measurement device not supporting THD measurements."
                }
              </Typography>
              {thdVoltageLLProfileData && thdVoltageLLProfileData.length > 0 && (
                <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center', fontFamily: 'monospace', mt: 1 }}>
                  Debug: API returned {thdVoltageLLProfileData.length} data points with null values
                </Typography>
              )}
            </Box>
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
ThdVoltageLLProfileCard.propTypes = {
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

export default ThdVoltageLLProfileCard;
