"use client";

import DonutChart from "@/components/DonutChart";

export default function DiningTablesPage() {
  return (
    <div className="graph-container">
      <DonutChart
        title="Dining Tables Sales"
        achieved={58}
        notAchieved={42}
      />

      <DonutChart
        title="Customer Satisfaction"
        achieved={75}
        notAchieved={25}
      />
    </div>
  );
}
