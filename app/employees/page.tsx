"use client";

import { useEffect, useState } from "react";

type Employee = {
  id: number;
  name: string;
  salary: number;
};

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  async function fetchEmployees() {
    const res = await fetch("/api/employees");
    const data = await res.json();
    setEmployees(data);
  }

  async function addEmployee() {
    if (!name || !salary) return;

    await fetch("/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, salary: Number(salary) }),
    });

    setName("");
    setSalary("");
    fetchEmployees();
  }

  async function updateEmployee() {
    if (!editId) return;

    await fetch("/api/employees", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editId,
        name,
        salary: Number(salary),
      }),
    });

    setEditId(null);
    setName("");
    setSalary("");
    fetchEmployees();
  }

  async function deleteEmployee(id: number) {
    await fetch(`/api/employees?id=${id}`, {
      method: "DELETE",
    });
    fetchEmployees();
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="bg-gray-100 w-full max-w-4xl rounded-2xl shadow-2xl p-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        Employee Management
      </h1>

      <h2 className="text-2xl font-semibold mb-4">
        {editId ? "Edit Employee" : "Add Employee"}
      </h2>

      <div className="flex gap-4 mb-8">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 p-3 rounded-lg border border-gray-300"
        />
        <input
          type="number"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="flex-1 p-3 rounded-lg border border-gray-300"
        />
        <button
          onClick={editId ? updateEmployee : addEmployee}
          className="bg-blue-600 text-white px-6 rounded-lg"
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>

      <h2 className="text-2xl font-semibold mb-4">All Employees</h2>

      <div className="space-y-4">
        {employees.map((emp) => (
          <div
            key={emp.id}
            className="bg-gray-200 p-4 rounded-xl flex justify-between items-center"
          >
            <span>
              {emp.id} – {emp.name} – ₹{emp.salary}
            </span>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setEditId(emp.id);
                  setName(emp.name);
                  setSalary(emp.salary.toString());
                }}
                className="bg-green-600 text-white px-4 py-1 rounded-lg"
              >
                Edit
              </button>

              <button
                onClick={() => deleteEmployee(emp.id)}
                className="bg-red-600 text-white px-4 py-1 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
