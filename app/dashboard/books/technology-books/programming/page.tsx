"use client";

import DonutChart from "@/components/DonutChart";

export default function ProgrammingBooksPage() {
  return (
    <div className="graph-container">
      <DonutChart
        title="Programming Book Sales"
        achieved={80}
        notAchieved={20}
      />

      <DonutChart
        title="Course Completion Rate"
        achieved={68}
        notAchieved={32}
      />
    </div>
  );
}
