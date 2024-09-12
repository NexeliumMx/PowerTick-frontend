import React, { useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';

// Colores personalizados para las secciones del PieChart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Componente personalizado para la aguja del gráfico
const Needle = ({ cx, cy, radius, value }) => {
  const radian = Math.PI * value / 180;
  const x = cx + radius * Math.cos(radian);
  const y = cy + radius * Math.sin(radian);

  return (
    <line
      x1={cx}
      y1={cy}
      x2={x}
      y2={y}
      stroke="red"
      strokeWidth={2}
    />
  );
};

const PieChartWithNeedle = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  // Valor que determina la posición de la aguja (en grados)
  const needleValue = 90;  // Este es el ángulo de la aguja, ajusta este valor según lo que desees mostrar.

  return (
    <PieChart width={400} height={400}>
      <Pie
        activeIndex={activeIndex}
        data={data}
        cx={200}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        onMouseEnter={onPieEnter}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      {/* Renderizamos la aguja */}
      <Needle cx={200} cy={200} radius={80} value={needleValue} />
    </PieChart>
  );
};

export default PieChartWithNeedle;
