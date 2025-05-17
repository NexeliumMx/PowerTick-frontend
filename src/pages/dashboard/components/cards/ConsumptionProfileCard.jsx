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
import ChartSkeletonCard from "../cards/ChartSkeletonCard";
import { useConsumptionProfile } from '../../../../services/query/useConsumptionProfile';

const ConsumptionProfileCard = ({ selectedPowerMeter }) => {
  const theme = useTheme();
  const { accounts } = useMsal();
  const user_id = accounts[0]?.idTokenClaims?.oid;

  const [timeInterval, setTimeInterval] = useState("day");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user_id || !selectedPowerMeter) return;

    setLoading(true);
    fetchConsumptionProfile(user_id, selectedPowerMeter, timeInterval)
      .then((raw) => {
        const parsed = raw.map((item) => {
          // item.consumption_profile_hour_range_tz viene como "YYYY-MM-DD HH-HH"
          const [date, hours] = item.consumption_profile_hour_range_tz.split(" ");
          const [startHour] = hours.split("-");
          // Creamos un ISO válido: "YYYY-MM-DDTHH:00:00"
          const iso = `${date}T${startHour.padStart(2, "0")}:00:00`;
          return {
            timestamp: new Date(iso),
            realEnergy: item.real_energy_wh,
            reactiveEnergy: item.reactive_energy_varh,
          };
        });
        setData(parsed);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [user_id, selectedPowerMeter, timeInterval]);

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardHeader
        title="Consumption Profile"
        titleTypographyProps={{
          variant: "h2",
          sx: { pl: 2, textAlign: "left", alignSelf: "flex-start" },
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ width: "100%", height: 500, p: 2 }}>
          {loading ? (
            <ChartSkeletonCard />
          ) : data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={data}
                margin={{ top: 20, right: 40, left: 20, bottom: 20 }}
              >
                {/* grid sólo horizontal */}
                <CartesianGrid
                  stroke={theme.palette.divider}
                  strokeDasharray="3 3"
                  vertical={false}
                />

                {/* eje X: formateamos Date a hora CDMX */}
                <XAxis
                  dataKey="timestamp"
                  stroke={theme.palette.text.secondary}
                  interval={0}
                  tickFormatter={(ts) =>
                    ts.toLocaleTimeString("es-MX", {
                      timeZone: "America/Mexico_City",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  }
                />

                {/* único eje Y para ambas series */}
                <YAxis
                  stroke={theme.palette.text.secondary}
                  tickFormatter={(v) => v.toLocaleString("en-US")}
                  label={{
                    value: "Energy (Wh / VARh)",
                    angle: -90,
                    position: "insideLeft",
                    fill: theme.palette.text.primary,
                  }}
                />

                {/* tooltip oscuro con fecha y color */}
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
                    ts.toLocaleString("es-MX", {
                      timeZone: "America/Mexico_City",
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  }
                  formatter={(value, name) => {
                    const unit = name === "Real Energy (Wh)" ? " Wh" : " VARh";
                    return [`${value.toLocaleString("en-US")}${unit}`, name];
                  }}
                />

                {/* leyenda arriba */}
                <Legend
                  verticalAlign="top"
                  wrapperStyle={{ color: theme.palette.text.primary }}
                />

                {/* columnas y línea */}
                <Bar
                  dataKey="realEnergy"
                  name="Real Energy (Wh)"
                  fill="#8884d8"
                  barSize={20}
                />
                <Line
                  type="monotone"
                  dataKey="reactiveEnergy"
                  name="Reactive Energy (VARh)"
                  stroke="#ff7300"
                  strokeWidth={3}
                  dot={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          ) : (
            <Typography>No data available</Typography>
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
};

export default ConsumptionProfileCard;
