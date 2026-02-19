"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type Props = {
  title: string;
  labels: string[];
  values: number[];
};

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#ef4444"];

export default function DonutChart({ title, labels, values }: Props) {
  const data = labels.map((label, index) => ({
    name: label,
    value: values[index] || 0,
  }));

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl mx-auto">
      <h3 className="text-xl font-semibold mb-6 text-slate-800 text-center">
        {title}
      </h3>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={70}
              outerRadius={100}
              paddingAngle={4}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
