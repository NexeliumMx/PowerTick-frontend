import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Box } from "@mui/material";
import HistoricoInfoCard from "../components/Historico";
import { ResponsiveContainer, LineChart, Line, XAxis, CartesianGrid } from "recharts";
import chartColors from "../../../theme/chartColors";
import { useTheme } from "@mui/material/styles";

const initialData = Array.from({ length: 24 }, (_, i) => ({
  name: `${i.toString().padStart(2, "0")}:00`,
  value1: null,
  value2: null,
}));

export default function ShowcaseHistorico() {
  const theme = useTheme();
  const [chartData, setChartData] = useState(initialData);
  const lastStepRef = useRef({ value1: 1, value2: 1 });
  const stepRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prev => {
        const nextIdx = stepRef.current;
        // If not filled, fill next point
        if (nextIdx < 24) {
          const lastIdx = nextIdx === 0 ? 0 : nextIdx - 1;
          const last = prev[lastIdx] || { value1: 0, value2: 0 };

          function getStep(lastDir, lastValue) {
            if (lastValue < 10) {
              // Always rising if value is less than 10
              return Math.abs(Math.random() * 5 + 1);
            }
            if (lastValue > 100) {
              // Always falling if value is greater than 100
              return -Math.abs(Math.random() * 5 + 1);
            }
            const sameDir = Math.random() < 0.8;
            const dir = sameDir ? lastDir : -lastDir;
            return dir * (Math.random() * 5 + 1);
          }
          const step1 = getStep(lastStepRef.current.value1, last.value1 ?? 0);
          const step2 = getStep(lastStepRef.current.value2, last.value2 ?? 0);
          lastStepRef.current.value1 = Math.sign(step1) || 1;
          lastStepRef.current.value2 = Math.sign(step2) || 1;
          const newValue1 = Math.max(0, (last.value1 ?? 0) + step1);
          const newValue2 = Math.max(0, (last.value2 ?? 0) + step2);

          const newData = prev.map((d, i) =>
            i === nextIdx
              ? {
                  ...d,
                  value1: Math.round(newValue1),
                  value2: Math.round(newValue2),
                }
              : d
          );
          stepRef.current += 1;
          return newData;
        } else {
          // Once filled, shift left and add new value at the end
          const last = prev[prev.length - 1] || { value1: 0, value2: 0 };

          function getStep(lastDir, lastValue) {
            if (lastValue < 10) {
              return Math.abs(Math.random() * 5 + 1);
            }
            if (lastValue > 100) {
              return -Math.abs(Math.random() * 5 + 1);
            }
            const sameDir = Math.random() < 0.8;
            const dir = sameDir ? lastDir : -lastDir;
            return dir * (Math.random() * 5 + 1);
          }
          const step1 = getStep(lastStepRef.current.value1, last.value1 ?? 0);
          const step2 = getStep(lastStepRef.current.value2, last.value2 ?? 0);
          lastStepRef.current.value1 = Math.sign(step1) || 1;
          lastStepRef.current.value2 = Math.sign(step2) || 1;
          const newValue1 = Math.max(0, (last.value1 ?? 0) + step1);
          const newValue2 = Math.max(0, (last.value2 ?? 0) + step2);

          const newData = [
            ...prev.slice(1),
            {
              ...prev[prev.length - 1],
              value1: Math.round(newValue1),
              value2: Math.round(newValue2),
            },
          ];
          return newData;
        }
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -80 }}
      transition={{ duration: 0.5 }}
      style={{ width: "100%", position: "absolute", display: "flex", height: "100%" }}
    >
      <Box
        sx={{
          width: "50%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: 600, maxWidth: "100%" }}>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData}>
              <XAxis
                dataKey="name"
                stroke={theme.palette.background.default}
                tick={{ fill: theme.palette.background.default }}
              />
              <CartesianGrid stroke={theme.palette.background.default} />
              <Line
                type="monotone"
                dataKey="value1"
                stroke={chartColors.front}
                name="Serie 1"
                strokeWidth={4}
                dot={false}
                isAnimationActive={false}
                connectNulls={false}
              />
              <Line
                type="monotone"
                dataKey="value2"
                stroke={chartColors.back}
                name="Serie 2"
                strokeWidth={4}
                dot={false}
                isAnimationActive={false}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
      <Box sx={{ width: "50%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <HistoricoInfoCard />
      </Box>
    </motion.div>
  );
}
