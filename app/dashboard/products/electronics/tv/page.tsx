"use client";

import DonutChart from "@/components/DonutChart";

export default function TVPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "50px",
        flexWrap: "wrap",
      }}
    >
      <DonutChart
        title="Companies with Mobile CRM"
        achieved={65}
        notAchieved={35}
      />

      <DonutChart
        title="Companies without Mobile CRM"
        achieved={22}
        notAchieved={78}
      />
    </div>
  );
}
