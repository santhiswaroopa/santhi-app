"use client";

import DonutChart from "@/components/DonutChart";

export default function ActivityBooksPage() {
  return (
    <div className="graph-container">
      <DonutChart
        title="Activity Books Sales"
        achieved={59}
        notAchieved={41}
      />

      <DonutChart
        title="Participation Rate"
        achieved={70}
        notAchieved={30}
      />
    </div>
  );
}
