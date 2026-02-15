"use client";

import DonutChart from "@/components/DonutChart";

export default function StoryBooksPage() {
  return (
    <div className="graph-container">
      <DonutChart
        title="Story Books Sales"
        achieved={67}
        notAchieved={33}
      />

      <DonutChart
        title="Reading Engagement"
        achieved={82}
        notAchieved={18}
      />
    </div>
  );
}
