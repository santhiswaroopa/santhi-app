"use client";

import DonutChart from "@/components/DonutChart";

export default function AIPage() {
  return (
    <div className="graph-container">
      <DonutChart
        title="AI & Data Science Sales"
        achieved={74}
        notAchieved={26}
      />

      <DonutChart
        title="Industry Adoption Rate"
        achieved={63}
        notAchieved={37}
      />
    </div>
  );
}
