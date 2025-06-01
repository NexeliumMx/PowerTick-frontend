import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardActions, ToggleButton, ToggleButtonGroup, Box, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useMsal } from "@azure/msal-react";
import { ComposedChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Bar, Line, ResponsiveContainer, Label } from "recharts";
import ChartSkeletonCard from "../cards/ChartSkeletonCard";
import { useConsumptionProfile } from '../../../../hooks/useConsumptionProfile';
import { formatDashboardTimestamp } from '../../utils/formatDashboardTimestamp';
import { Select, MenuItem, FormControl, InputLabel, Divider } from "@mui/material";
import chartColors from "../../../../theme/chartColors";

const ConsumptionProfileCard = ({ selectedPowerMeter }) => {
  const theme = useTheme(); 
  const { accounts } = useMsal();
  const user_id = accounts[0]?.idTokenClaims?.oid;
  const [timeInterval, setTimeInterval] = useState("day");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  
  // Use React Query hook for on-demand fetching and caching
  const { data: consumptionProfileData, isLoading } = useConsumptionProfile(user_id, selectedPowerMeter, timeInterval);

  const handleTimeIntervalChange = (event, newTimeInterval) => {
    if (newTimeInterval) {
      setTimeInterval(newTimeInterval);
    }
  };

  //Hacer que despliegue los meses y años disponibles
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

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
  const chartData = consumptionProfileData?.map((item) => {
    let name = '';
    if (timeInterval === 'day') {
      name = formatDashboardTimestamp(item.consumption_profile_hour_range_utc, 'day');
    } else if (timeInterval === 'month') {
      name = formatDashboardTimestamp(item.consumption_profile_day_range_tz, 'month');
    } else if (timeInterval === 'year') {
      name = formatDashboardTimestamp(item.consumption_profile_month_range_tz, 'year');
    }
    return {
      name,
      realEnergy: item.real_energy_wh,
      reactiveEnergy: item.reactive_energy_varh,
    };
  });

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
                    value="Energía (Wh|VArh)"
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
            <Typography variant="body1">Datos no disponibles</Typography>
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
                      Intervalo de análisis
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
          Filtro de tiempo
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
          <InputLabel id="year-label">Año</InputLabel>
          <Select
            size="small"
            value={selectedYear}
            onChange={e => setSelectedYear(e.target.value)}
            label="Año"
          >
            {years.map(year => (
              <MenuItem key={year} value={year}>{year}</MenuItem>
            ))}
          </Select>
          </FormControl>
        )}
        {(timeInterval === "month" || timeInterval === "day") && (
        <FormControl size="small" sx={{ minWidth: 90 }}>
        <InputLabel id="month-label">Mes</InputLabel>
          <Select
            size="small"
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
            label="Month"
          >
            {months.map(month => (
              <MenuItem key={month} value={month}>{month}</MenuItem>
            ))}
          </Select>
          </FormControl>
        )}
        {timeInterval === "day" && (
        <FormControl size="small" sx={{ minWidth: 90 }}>
        <InputLabel id="day-label">Día</InputLabel>
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
      </Box>
      </Box>
      </CardActions>
    </Card>
  );
};

export default ConsumptionProfileCard;