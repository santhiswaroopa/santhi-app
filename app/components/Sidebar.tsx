"use client";

import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [openStudents, setOpenStudents] = useState(false);
  const [openEmployees, setOpenEmployees] = useState(false);

  return (
    <aside className="w-72 bg-slate-900 text-white p-6 min-h-screen">

      {/* Title */}
      <h2 className="text-3xl font-bold mb-10 border-b border-slate-600 pb-4">
        Main Menu
      </h2>

      <nav className="space-y-8">

        {/* ================= STUDENTS ================= */}
        <div>
          <button
            onClick={() => setOpenStudents(!openStudents)}
            className="w-full text-left text-xl font-semibold hover:text-blue-400 transition duration-200"
          >
            🎓 Students
          </button>

          {openStudents && (
            <div className="ml-6 mt-4 space-y-3 text-lg">
              <Link
                href="/students"
                className="block text-gray-300 hover:text-white transition"
              >
                Management
              </Link>

              <Link
                href="/students/chart"
                className="block text-gray-300 hover:text-white transition"
              >
                Chart
              </Link>
            </div>
          )}
        </div>

        {/* ================= EMPLOYEES ================= */}
        <div>
          <button
            onClick={() => setOpenEmployees(!openEmployees)}
            className="w-full text-left text-xl font-semibold hover:text-blue-400 transition duration-200"
          >
            👨‍💼 Employees
          </button>

          {openEmployees && (
            <div className="ml-6 mt-4 space-y-3 text-lg">
              <Link
                href="/employees"
                className="block text-gray-300 hover:text-white transition"
              >
                Management
              </Link>

              <Link
                href="/employees/chart"
                className="block text-gray-300 hover:text-white transition"
              >
                Chart
              </Link>
            </div>
          )}
        </div>

      </nav>
    </aside>
  );
}
