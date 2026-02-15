"use client";

import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

interface Props {
  title: string;
  achieved: number;
  notAchieved: number;
}

export default function DonutChart({
  title,
  achieved,
  notAchieved,
}: Props) {
  const [animatedValue, setAnimatedValue] = useState(0);

  // Animate from 0 → achieved value
  useEffect(() => {
    let start = 0;
    const duration = 1000; // 1 second
    const increment = achieved / (duration / 16);

    const animate = () => {
      start += increment;
      if (start < achieved) {
        setAnimatedValue(Math.floor(start));
        requestAnimationFrame(animate);
      } else {
        setAnimatedValue(achieved);
      }
    };

    animate();
  }, [achieved]);

  const data = [
    { name: "Achieved", value: animatedValue },
    { name: "Remaining", value: 100 - animatedValue },
  ];

  const COLORS = ["#0f766e", "#cbd5e1"];

  return (
    <div style={{ textAlign: "center" }}>
      <h3>{title}</h3>

      <PieChart width={250} height={250}>
        <Pie
          data={data}
          innerRadius={70}
          outerRadius={100}
          paddingAngle={3}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>

        <Tooltip />
      </PieChart>

      <h2>{animatedValue}%</h2>
    </div>
  );
}
