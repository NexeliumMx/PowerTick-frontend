import React, { useState } from "react";
import { Card, CardHeader, CardContent, CardActions, ToggleButton, ToggleButtonGroup, Box, Typography } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useMsal } from "@azure/msal-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";
import ChartSkeletonCard from "../cards/ChartSkeletonCard";
import { useConsumptionHistory } from '../../../../services/query/useConsumptionHistory';
import { formatDashboardTimestamp } from '../../utils/formatDashboardTimestamp';
import { Select, MenuItem, FormControl, InputLabel, Divider } from "@mui/material";

const ConsumptionHistoryCard = ({ selectedPowerMeter }) => {
  const theme = useTheme(); 
  const { accounts } = useMsal();
  const user_id = accounts[0]?.idTokenClaims?.oid;
  const [timeInterval, setTimeInterval] = useState("day");
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [selectedHour, setSelectedHour] = useState(new Date().getHours());
  // Use React Query hook for on-demand fetching and caching
  const { data: consumptionHistoryData, isLoading } = useConsumptionHistory(user_id, selectedPowerMeter, timeInterval);

  const handleTimeIntervalChange = (event, newTimeInterval) => {
    if (newTimeInterval) {
      setTimeInterval(newTimeInterval);
    }
  };
  //Hacer que despliegue los meses y años disponibles
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
  const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const hours = Array.from({ length: 24 }, (_, i) => i);


  // Transform data for Recharts
  const chartData = consumptionHistoryData?.map((item) => ({
    name: formatDashboardTimestamp(item.timestamp_utc),
    realEnergy: item.real_energy_wh,
    reactiveEnergy: item.reactive_energy_varh,
  }));

  return (
    <Card sx={{ minHeight: "600px", display: "flex", flexDirection: "column" }}>
      <CardHeader title="Consumption History" 
     titleTypographyProps={{variant: 'h3', sx: { textAlign: 'left',paddingLeft:10, alignSelf: 'flex-start' , paddingTop:'10px'} // Tamaño del texto
      }} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ width: "100%", overflow: "auto", p: 2 }}>
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
                />
                {/* Eje Izquierdo*/}
                <YAxis  yAxisId="left" domain={['auto','auto']} tick={{ fill: theme.palette.text.primary }}
                 stroke={theme.palette.text.primary}
                />
                {/* Eje Derecho*/}
                <YAxis  yAxisId="right" orientation="right"  tick={{ fill: theme.palette.text.primary }}
                 stroke={theme.palette.text.primary}
                />


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
                <Legend />
                <Line type="monotone" dataKey="realEnergy" stroke="#8884d8" name="Real Energy (Wh)" dot={false} yAxisId="left" strokeWidth={3}/>
                <Line type="monotone" dataKey="reactiveEnergy" stroke="#82ca9d" name="Reactive Energy (VARh)"  dot={false} yAxisId="right" strokeWidth={3}/>
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <Typography variant="body1">No data available</Typography>
          )}
        </Box>
      </CardContent>
      <Divider
        variant="middle"
        sx={{ my: 2, borderColor: 'primary.main', borderBottomWidth: 3 }}
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
      Intervalo de análisis
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
          Filtro de tiempo
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
          {(timeInterval === "month" || timeInterval === "day" || timeInterval === "hour") && (
            <FormControl size="small" sx={{ minWidth: 90 }}>
              <InputLabel id="month-label">Mes</InputLabel>
              <Select
                size="small"
                value={selectedMonth}
                onChange={e => setSelectedMonth(e.target.value)}
                label="Mes"
              >
                {months.map((month, idx) => (
                  <MenuItem key={month} value={idx + 1}>{month}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {(timeInterval === "day" || timeInterval === "hour") && (
            <FormControl size="small" sx={{ minWidth: 90 }}>
              <InputLabel id="day-label">Día</InputLabel>
              <Select
                size="small"
                value={selectedDay}
                onChange={e => setSelectedDay(e.target.value)}
                label="Día"
              >
                {days.map(day => (
                  <MenuItem key={day} value={day}>{day}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {timeInterval === "hour" && (
            <FormControl size="small" sx={{ minWidth: 90 }}>
              <InputLabel id="hour-label">Hora</InputLabel>
              <Select
                size="small"
                value={selectedHour}
                onChange={e => setSelectedHour(e.target.value)}
                label="Hora"
              >
                {hours.map(hour => (
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