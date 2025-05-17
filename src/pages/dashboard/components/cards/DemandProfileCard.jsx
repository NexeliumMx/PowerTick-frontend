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
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Bar,
  Line,
  ResponsiveContainer,
} from "recharts";
import { useDemandProfile } from '../../../../services/query/useDemandProfile';
import ChartSkeletonCard from "../cards/ChartSkeletonCard";

export default function DemandProfileCard({ selectedPowerMeter }) {
  const theme = useTheme();
  const { accounts } = useMsal();
  const user_id = accounts[0]?.idTokenClaims?.oid;

  const [timeInterval, setTimeInterval] = useState("day");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Carga datos
  useEffect(() => {
    if (!user_id || !selectedPowerMeter) return;
    setLoading(true);
    fetchDemandProfile(user_id, selectedPowerMeter, timeInterval)
      .then((raw) => {
        // Transformamos cada "YYYY-MM-DD HH-HH" → Date
        const chartData = raw.map((item) => {
          const [datePart, range] = item.demand_profile_hour_range_tz.split(" ");
          const [startHour] = range.split("-");
          // Asumimos hora local y le añadimos minutos y segundos
          const isoString = `${datePart}T${startHour.padStart(2, "0")}:00:00.000`;
          return {
            timestamp: new Date(isoString),
            avgRealPower: parseFloat(item.avg_real_power_w),
            maxRealPower: parseFloat(item.max_real_power_w),
            avgVar: parseFloat(item.avg_var),
            maxVar: parseFloat(item.max_var),
          };
        });
        setData(chartData);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [user_id, selectedPowerMeter, timeInterval]);

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardHeader
        title="Demand Profile"
        titleTypographyProps={{
          variant: "h2",
          sx: { pl: 2, textAlign: "left", alignSelf: "flex-start" },
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ width: "100%", height: 500, p: 2 }}>
          {loading ? (
            <ChartSkeletonCard />
          ) : data.length ? (
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={data}
                margin={{ top: 20, right: 40, left: 20, bottom: 20 }}
              >
                {/* Sólo líneas horizontales */}
                <CartesianGrid
                  stroke={theme.palette.divider}
                  strokeDasharray="3 3"
                  vertical={false}
                />

                {/* Eje X → timestamp formateado a CDMX */}
                <XAxis
                  dataKey="timestamp"
                  stroke={theme.palette.text.secondary}
                  interval={0}
                  tickFormatter={(ts) =>
                    new Date(ts).toLocaleTimeString("es-MX", {
                      timeZone: "America/Mexico_City",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  }
                />

                {/* Único eje Y */}
                <YAxis
                  stroke={theme.palette.text.secondary}
                  label={{
                    value: "Power (W / VAR)",
                    angle: -90,
                    position: "insideLeft",
                    fill: theme.palette.text.primary,
                  }}
                />

                {/* Tooltip oscuro, fecha CDMX y color automático */}
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
                  labelFormatter={(ts) =>
                    new Date(ts).toLocaleString("es-MX", {
                      timeZone: "America/Mexico_City",
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  }
                  // Recharts usa automáticamente el color de la serie
                  formatter={(value, name) => [
                    value.toLocaleString("en-US"),
                    name,
                  ]}
                />

                {/* Leyenda arriba */}
                <Legend
                  verticalAlign="top"
                  wrapperStyle={{ color: theme.palette.text.primary }}
                />

                {/* Barras de promedio */}
                <Bar
                  dataKey="avgRealPower"
                  barSize={20}
                  fill="#8884d8"
                  name="Avg Real Power (W)"
                />
                <Bar
                  dataKey="avgVar"
                  barSize={20}
                  fill="#82ca9d"
                  name="Avg VAR"
                />

                {/* Líneas de máximo */}
                <Line
                  type="monotone"
                  dataKey="maxRealPower"
                  stroke="#413ea0"
                  name="Max Real Power (W)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="maxVar"
                  stroke="#ff7300"
                  name="Max VAR"
                  strokeWidth={2}
                  dot={false}
                />
              </ComposedChart>
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
          onChange={(_, v) => v && setTimeInterval(v)}
        >
          <ToggleButton value="year">Yearly</ToggleButton>
          <ToggleButton value="month">Monthly</ToggleButton>
          <ToggleButton value="day">Daily</ToggleButton>
        </ToggleButtonGroup>
      </CardActions>
    </Card>
  );
}
