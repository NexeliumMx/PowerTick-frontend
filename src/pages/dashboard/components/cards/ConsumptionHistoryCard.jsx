import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  ToggleButtonGroup,
  ToggleButton,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import { useMsal } from "@azure/msal-react";
import ChartSkeletonCard from "../cards/ChartSkeletonCard";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";import { useConsumptionHistory } from '../../../../services/query/useConsumptionHistory';

const ConsumptionHistoryCard = ({ selectedPowerMeter }) => {
  const theme = useTheme();
  const { accounts } = useMsal();
  const user_id = accounts[0]?.idTokenClaims?.oid;

  const [timeInterval, setTimeInterval] = useState("day");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!user_id || !selectedPowerMeter) return;
      setLoading(true);
      try {
        const raw = await fetchConsumptionHistory(
          user_id,
          selectedPowerMeter,
          timeInterval
        );
        // --- aquí convertimos Wh→kWh y VARh→kVarh y guardamos Date para CDMX:
        setData(
          raw.map((item) => ({
            timestamp: new Date(item.timestamp_tz),
            realEnergy: item.real_energy_wh / 1000,
            reactiveEnergy: item.reactive_energy_varh / 1000,
          }))
        );
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user_id, selectedPowerMeter, timeInterval]);

  const handleTimeIntervalChange = (event, newTimeInterval) => {
    if (newTimeInterval) {
      setTimeInterval(newTimeInterval);
    }
  };

  // Transform data for Recharts
  const chartData = consumptionHistoryData?.map((item) => ({
    name: item.timestamp_tz,
    realEnergy: item.real_energy_wh,
    reactiveEnergy: item.reactive_energy_varh,
  }));

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardHeader
        title="Consumption History"
        titleTypographyProps={{
          variant: "h2",
          sx: { pl: 2, textAlign: "left", alignSelf: "flex-start" },
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ width: "100%", height: 500, p: 2 }}>
          {loading ? (
            <ChartSkeletonCard />
          ) : data && data.length ? (
            <LineChart
              width={Math.min(1700, window.innerWidth - 100)}
              height={400}
              data={data}
              margin={{ top: 20, right: 40, left: 20, bottom: 20 }}
            >
              {/* grid sólo horizontal */}
              <CartesianGrid
                stroke={theme.palette.divider}
                strokeDasharray="3 3"
                vertical={false}
              />

              {/* eje X: mostramos hora CDMX */}
              <XAxis
                dataKey="timestamp"
                stroke={theme.palette.text.secondary}
                tickFormatter={(ts) =>
                  new Date(ts).toLocaleTimeString("es-MX", {
                    timeZone: "America/Mexico_City",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                }
                interval={Math.floor(data.length / 12)}
              />

              {/* eje Y kWh: dominio ajustado a los datos */}
              <YAxis
                yAxisId="left"
                orientation="left"
                stroke={theme.palette.text.secondary}
                domain={["dataMin", "dataMax"]}
                tickFormatter={(v) => v.toFixed(2)}
                label={{
                  value: "Real Energy (kWh)",
                  angle: -90,
                  position: "insideLeft",
                  fill: theme.palette.text.primary,
                }}
              />

              {/* eje Y kVarh: dominio ajustado a los datos */}
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke={theme.palette.text.secondary}
                domain={["dataMin", "dataMax"]}
                tickFormatter={(v) => v.toFixed(2)}
                label={{
                  value: "Reactive Energy (kVarh)",
                  angle: 90,
                  position: "insideRight",
                  fill: theme.palette.text.primary,
                }}
              />

              {/* tooltip oscuro y hora CDMX */}
              <Tooltip
  wrapperStyle={{ outline: "none" }}
  contentStyle={{
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
  }}
  labelStyle={{ color: theme.palette.text.secondary }}
  // Quitamos itemStyle para que Recharts pinte el marcador con el color de la línea:
  // itemStyle={{ color: theme.palette.text.primary }}
  cursor={{
    stroke: theme.palette.divider,
    strokeWidth: 1,
  }}
  // formatteamos la fecha para CDMX
  labelFormatter={(ts) =>
    new Date(ts).toLocaleString("es-MX", {
      timeZone: "America/Mexico_City",
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    })
  }
  // aquí devolvemos [valor + unidad, nombre legible]
  formatter={(value, name, props) => {
    const isReal = props.dataKey === "realEnergy";
    const unit = isReal ? "kWh" : "kVarh";
    const label = isReal ? "Real Energy" : "Reactive Energy";
    return [`${value.toLocaleString("en-US")} ${unit}`, label];
  }}
/>

              {/* leyenda encima */}
              <Legend
                verticalAlign="top"
                wrapperStyle={{ color: theme.palette.text.primary }}
              />

              {/* líneas */}
              <Line
                type="monotone"
                dataKey="realEnergy"
                yAxisId="left"
                stroke="#8884d8"
                strokeWidth={3}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="reactiveEnergy"
                yAxisId="right"
                stroke="#82ca9d"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          ) : (
            <Typography>No data available</Typography>
          )}
        </Box>
      </CardContent>
      <CardActions sx={{ justifyContent: "center", mb: 2 }}>
        <ToggleButtonGroup
          value={timeInterval}
          exclusive
          onChange={handleInterval}
        >
          <ToggleButton value="day">Daily</ToggleButton>
          <ToggleButton value="hour">Hourly</ToggleButton>
        </ToggleButtonGroup>
      </CardActions>
    </Card>
  );
};

export default ConsumptionHistoryCard;
