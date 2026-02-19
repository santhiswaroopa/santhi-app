"use client";

import { useEffect, useState } from "react";
import DonutChart from "@/app/components/DonutChart";

type Employee = {
  id: number;
  name: string;
  salary: number;
};

export default function EmployeeChartPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  async function fetchEmployees() {
    const res = await fetch("/api/employees");
    const data = await res.json();
    setEmployees(data);
  }

  const lowSalary = employees.filter(emp => emp.salary < 40000).length;
  const midSalary = employees.filter(emp => emp.salary >= 40000 && emp.salary < 70000).length;
  const highSalary = employees.filter(emp => emp.salary >= 70000).length;

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-xl">
      <h1 className="text-3xl font-bold mb-8 text-slate-800 text-center">
        Employee Salary Analytics
      </h1>

      <DonutChart
        title="Salary Distribution"
        labels={["Low Salary", "Mid Salary", "High Salary"]}
        values={[lowSalary, midSalary, highSalary]}
      />
    </div>
  );
}


