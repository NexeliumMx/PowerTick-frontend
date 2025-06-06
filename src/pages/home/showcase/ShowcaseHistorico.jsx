import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Box } from "@mui/material";
import HistoricoInfoCard from "../components/Historico";
import { ResponsiveContainer, LineChart, Line, XAxis, CartesianGrid } from "recharts";
import chartColors from "../../../theme/chartColors";
import { useTheme } from "@mui/material/styles";

const initialData = Array.from({ length: 24 }, (_, i) => ({
  name: `${i.toString().padStart(2, "0")}:00`,
  value1: 0,
  value2: 0,
}));

export default function ShowcaseHistorico() {
  const theme = useTheme();
  const [chartData, setChartData] = useState(initialData);
  const lastStepRef = useRef({ value1: 1, value2: 1 });

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prev => {
        const last = prev[prev.length - 1];
        function getStep(lastDir) {
          const sameDir = Math.random() < 0.8;
          const dir = sameDir ? lastDir : -lastDir;
          return dir * (Math.random() * 5 + 1);
        }
        const step1 = getStep(lastStepRef.current.value1);
        const step2 = getStep(lastStepRef.current.value2);
        lastStepRef.current.value1 = Math.sign(step1) || 1;
        lastStepRef.current.value2 = Math.sign(step2) || 1;
        const newValue1 = Math.max(0, last.value1 + step1);
        const newValue2 = Math.max(0, last.value2 + step2);
        let [h] = last.name.split(":").map(Number);
        h = (h + 1) % 24;
        const newName = `${h.toString().padStart(2, "0")}:00`;
        if (prev.length < 24) {
          return [
            ...prev,
            { name: newName, value1: Math.round(newValue1), value2: Math.round(newValue2) },
          ];
        } else {
          return [
            ...prev.slice(1),
            { name: newName, value1: Math.round(newValue1), value2: Math.round(newValue2) },
          ];
        }
      });
    }, 1000);
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
          justifyContent: "center", // This centers horizontally
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
              <Line type="monotone" dataKey="value1" stroke={chartColors.front} name="Serie 1" strokeWidth={4} dot={false} />
              <Line type="monotone" dataKey="value2" stroke={chartColors.back} name="Serie 2" strokeWidth={4} dot={false} />
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
