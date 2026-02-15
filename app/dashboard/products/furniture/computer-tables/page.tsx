"use client";

import DonutChart from "@/components/DonutChart";

export default function ComputerTablesPage() {
  return (
    <div className="graph-container">
      <DonutChart
        title="Computer Tables Sales"
        achieved={48}
        notAchieved={52}
      />

      <DonutChart
        title="Market Demand Analysis"
        achieved={60}
        notAchieved={40}
      />
    </div>
  );
}
