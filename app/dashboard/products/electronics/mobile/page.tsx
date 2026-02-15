"use client";

import DonutChart from "@/components/DonutChart";

export default function MobilePage() {
  return (
    <div className="graph-container">
      <DonutChart
        title="Mobile Sales Performance"
        achieved={72}
        notAchieved={28}
      />

      <DonutChart
        title="Mobile Target Completion"
        achieved={55}
        notAchieved={45}
      />
    </div>
  );
}
