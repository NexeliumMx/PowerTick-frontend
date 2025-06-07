import { useEffect, useState } from "react";
import { Box} from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import TiempoRealInfoCard from "../components/TiempoReal";
import chartColors from "../../../theme/chartColors";

// Color logic for gauge
//const getColorByFP = (value) => {
//  if (value >= 0.95) return chartColors.powerFactorGood;
//  if (value >= 0.90) return chartColors.powerFactorModerate;
//  return chartColors.powerFactorPoor;
//};

export default function ShowcaseTiempoReal() {
  // State for real-time values
  const [potenciaActual, setPotenciaActual] = useState(0.8);
  const [barValues, setBarValues] = useState([32, 28, 35]);
  const [barValues2, setBarValues2] = useState([29, 31, 27]);

  // Helper to step a value up or down within min/max
  const stepValue = (value, min, max, step = 0.01) => {
    const direction = Math.random() < 0.5 ? -1 : 1;
    let next = +(value + direction * step).toFixed(2);
    if (next < min) next = min;
    if (next > max) next = max;
    return next;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Step gauge value
      setPotenciaActual((prev) => stepValue(prev, 0.8, 1.0, 0.01));
      // Step each bar value (first graph)
      setBarValues((prev) =>
        prev.map((v, i) => {
          const min = [30, 25, 33][i];
          const max = [39, 34, 42][i];
          return stepValue(v, min, max, 1);
        })
      );
      // Step each bar value (second graph)
      setBarValues2((prev) =>
        prev.map((v, i) => {
          const min = [27, 28, 25][i];
          const max = [36, 36, 34][i];
          return stepValue(v, min, max, 1);
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  //const total = barValues.reduce((a, b) => a + b, 0);
  const avg = +(barValues.reduce((a, b) => a + b, 0) / barValues.length).toFixed(2);
  const avg2 = +(barValues2.reduce((a, b) => a + b, 0) / barValues2.length).toFixed(2);
  //const gaugeColor = getColorByFP(potenciaActual);

  return (
    <Box
      sx={{
        width: "100%",
        position: "absolute",
        display: "flex",
        height: "100%",
      }}
    >
      <Box
        sx={{
          width: "50%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
        }}
      >
        {/* Combined Gauge and Bar Chart */}
        <Box
          sx={{
            width: 350,
            height: 250,
            position: "relative",
            mb: 4,
            mr:25
          }}
        >
          {/* Gauge - positioned absolutely, in front */}
          <Box
            sx={{
              position: "absolute",
              top: 180,
              left: -30,
              width: 200,
              height: 200,
              zIndex: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <Box sx={{ perspective: 300, width: "100%", height: "100%" }}>
              <Box sx={{ height: "100%", transform: "rotateY(-50deg)", transformOrigin: "center" }}>
                <Gauge
                  value={potenciaActual}
                  valueMin={0}
                  valueMax={1}
                  startAngle={-110}
                  endAngle={110}
                  innerRadius={60}
                  sx={{
                    [`& .${gaugeClasses.valueArc}`]: {
                      fill: chartColors.back,
                    },
                    [`& .${gaugeClasses.valueText}`]: {
                      display: "none",
                    },
                  }}
                  text={() => ""}
                />
              </Box>
            </Box>
          </Box>
          {/* Bar Chart - positioned absolutely, slightly offset for depth */}
          <Box
            sx={{
              position: "absolute",
              top: 80,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 1,
              pointerEvents: "none",
            }}
          >
            <Box sx={{ perspective: 300, width: "100%", height: "100%" }}>
              <Box sx={{ transform: "rotateY(-50deg)", transformOrigin: "center" }}>
                <BarChart
                  height={180}
                  borderRadius={10}
                  xAxis={[
                    {
                      data: ["L1", "L2", "L3", "AVG"],
                      scaleType: "band",
                      label: 'Phases',
                      axis: null,
                      tickLabelStyle: { display: "none" },
                      categoryGapRatio: 0.2, 
                      barGapRatio: -1,
                    },
                  ]}
                  yAxis={[
                    {
                      axis: null,
                      tickLabelStyle: { display: "none" },
                    },
                  ]}
                  series={[
                    {
                      data: [barValues[0], null, null, null],
                      label: "L1",
                      bar: { style: { stroke: "black", strokeWidth: 3 } },
                      color: chartColors.front,
                    },
                    {
                      data: [null, barValues[1], null, null],
                      label: "L2",
                      bar: { style: { stroke: "black", strokeWidth: 3 } },
                      color: chartColors.front,
                    },
                    {
                      data: [null, null, barValues[2], null],
                      label: "L3",
                      bar: { style: { stroke: "black", strokeWidth: 3 } },
                      color: chartColors.front,
                    },
                    {
                      data: [null, null, null, avg],
                      label: "AVG",
                      bar: { style: { stroke: "black", strokeWidth: 3 } },
                      color: chartColors.front,
                    },
                  ]}
                  grid={null}
                  legend={null}
                  slotProps={{
                    legend: { hidden: true },
                    tooltip: { hidden: true },
                  }}
                  margin={{ left: 0, right: 0, top: 10, bottom: 10 }}
                />
              </Box>
            </Box>
          </Box>
          {/* Second Bar Chart - positioned absolutely, offset further for depth */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 150,
              width: "100%",
              height: "100%",
              zIndex: 0,
              pointerEvents: "none",
            }}
          >
            <Box sx={{ perspective: 300, width: "100%", height: "100%" }}>
              <Box sx={{ transform: "rotateY(-30deg)", transformOrigin: "center" }}>
                <BarChart
                  height={180}
                  borderRadius={10}
                  xAxis={[
                    {
                      data: ["L1", "L2", "L3", "AVG"],
                      scaleType: "band",
                      axis: null,
                      tickLabelStyle: { display: "none" },
                      categoryGapRatio: 0.2, 
                      barGapRatio: -1,
                    },
                  ]}
                  yAxis={[
                    {
                      axis: null,
                      tickLabelStyle: { display: "none" },
                    },
                  ]}
                  series={[
    {
      data: [barValues2[0], null, null, null],
      label: "L1",
      bar: { style: { stroke: "black", strokeWidth: 1.5, filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.18))" } },
      color: chartColors.back,
    },
    {
      data: [null, barValues2[1], null, null],
      label: "L2",
      bar: { style: { stroke: "black", strokeWidth: 1.5, filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.18))" } },
      color: chartColors.back,
    },
    {
      data: [null, null, barValues2[2], null],
      label: "L3",
      bar: { style: { stroke: "black", strokeWidth: 1.5, filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.18))" } },
      color: chartColors.back,
    },
    {
      data: [null, null, null, avg2],
      label: "AVG",
      bar: { style: { stroke: "black", strokeWidth: 1.5, filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.18))" } },
      color: chartColors.back,
    },
  ]}
                  grid={null}
                  legend={null}
                  slotProps={{
                    legend: { hidden: true },
                    tooltip: { hidden: true },
                  }}
                  margin={{ left: 0, right: 0, top: 10, bottom: 10 }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: "50%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <TiempoRealInfoCard />
      </Box>
    </Box>
  );
}
