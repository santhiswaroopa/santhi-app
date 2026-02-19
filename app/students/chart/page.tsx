"use client";

import { useEffect, useState } from "react";
import DonutChart from "@/app/components/DonutChart";

type Student = {
  id: number;
  name: string;
  course: string;
};

export default function StudentChartPage() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    async function fetchStudents() {
      const res = await fetch("/api/students");
      const data = await res.json();
      setStudents(data);
    }

    fetchStudents();
  }, []);

  // Count students by course
  const courseCounts: { [key: string]: number } = {};

  students.forEach((student) => {
    courseCounts[student.course] =
      (courseCounts[student.course] || 0) + 1;
  });

  const labels = Object.keys(courseCounts);
  const values = Object.values(courseCounts);

  return (
    <div style={{ padding: 20 }}>
      <h1>Student Chart</h1>

      <DonutChart
        title="Student Course Distribution"
        labels={labels}
        values={values}
      />
    </div>
  );
}
