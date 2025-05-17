import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  ToggleButton,
  ToggleButtonGroup,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import { useMsal } from "@azure/msal-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import ChartSkeletonCard from "../cards/ChartSkeletonCard";
import { useDemandHistory } from '../../../../services/query/useDemandHistory';

const DemandHistoryCard = ({ selectedPowerMeter }) => {
  const theme = useTheme();
  const { accounts } = useMsal();
  const user_id = accounts[0]?.idTokenClaims?.oid;

  const [timeInterval, setTimeInterval] = useState("day");
  const [demandHistoryData, setDemandHistoryData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (user_id && selectedPowerMeter && timeInterval) {
        setIsLoading(true);
        try {
          const data = await fetchDemandHistory(
            user_id,
            selectedPowerMeter,
            timeInterval
          );
          setDemandHistoryData(data);
        } catch (error) {
          console.error("Error fetching demand history:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, [user_id, selectedPowerMeter, timeInterval]);

  const handleTimeIntervalChange = (_, newInterval) => {
    if (newInterval) setTimeInterval(newInterval);
  };

  // Mapeamos: dejamos el timestamp ISO en “timestamp”
  const chartData = demandHistoryData?.map((item) => ({
    timestamp: item.timestamp_tz,
    realPower: item.real_power_w,
    reactivePower: item.reactive_power_var,
  }));

  // Calculamos un intervalo razonable para los ticks X
  const tickInterval = chartData
    ? Math.max(1, Math.floor(chartData.length / 6))
    : 0;

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardHeader
        title="Demand History"
        titleTypographyProps={{
          variant: "h2",
          sx: { textAlign: "left", pl: 2, alignSelf: "flex-start" },
        }}
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ width: "100%", height: 500, p: 2 }}>
          {isLoading ? (
            <ChartSkeletonCard />
          ) : chartData && chartData.length ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
    data={chartData}
    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
  >
    {/* Solo grid horizontal */}
    <CartesianGrid
      stroke={theme.palette.divider}
      strokeDasharray="3 3"
      vertical={false}
    />

    {/* Eje X: ISO → hora CDMX legible */}
    <XAxis
      dataKey="timestamp"
      stroke={theme.palette.text.secondary}
      interval={Math.floor(chartData.length / 12)}
      tickFormatter={(iso) =>
        new Date(iso).toLocaleTimeString("es-MX", {
          hour: "2-digit",
          minute: "2-digit",
        })
      }
    />

    {/* Único eje Y */}
    <YAxis
      stroke={theme.palette.text.secondary}
      tickFormatter={(v) => v.toLocaleString("en-US")}
      label={{
        value: "Power",
        angle: -90,
        position: "insideLeft",
        fill: theme.palette.text.primary,
      }}
    />

    {/* Tooltip con marcador de color, formato oscuro, labelFormatter para CDMX */}
    <Tooltip
  wrapperStyle={{ outline: "none" }}
  contentStyle={{
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
  }}
  labelStyle={{ color: theme.palette.text.secondary }}
  cursor={{
    stroke: theme.palette.divider,
    strokeWidth: 1,
  }}
  // Fecha en CDMX
  labelFormatter={(iso) =>
    new Date(iso).toLocaleString("es-MX", {
      timeZone: "America/Mexico_City",
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    })
  }
  // [valor + unidad, nombre] para cada serie
  formatter={(value, name) => {
    const unit = name === "Real Power (W)" ? " W" : " VAR";
    return [`${value.toLocaleString("en-US")}${unit}`, name];
  }}
/>
    {/* Leyenda arriba */}
    <Legend
      verticalAlign="top"
      wrapperStyle={{ color: theme.palette.text.primary }}
    />

    {/* Series compartiendo el mismo eje Y */}
    <Line
      type="monotone"
      dataKey="realPower"
      name="Real Power (W)"
      stroke="#8884d8"
      strokeWidth={2}
      dot={false}
    />
    <Line
      type="monotone"
      dataKey="reactivePower"
      name="Reactive Power (VAR)"
      stroke="#82ca9d"
      strokeWidth={2}
      dot={false}
    />
  </LineChart>
            </ResponsiveContainer>
          ) : (
            <Typography variant="body1">No data available</Typography>
          )}
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "center", mb: 2 }}>
        <ToggleButtonGroup
          value={timeInterval}
          exclusive
          onChange={handleTimeIntervalChange}
        >
          <ToggleButton value="day">Daily</ToggleButton>
          <ToggleButton value="hour">Hourly</ToggleButton>
        </ToggleButtonGroup>
      </CardActions>
    </Card>
  );
};

export default DemandHistoryCard;
