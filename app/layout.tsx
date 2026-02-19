"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openStudents, setOpenStudents] = useState(false);
  const [openEmployees, setOpenEmployees] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  }, [pathname]);

  return (
  <html lang="en">
    <body>

      <div className="dashboard-wrapper">

        {/* Sidebar */}
        <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>

          <h2>Main Menu</h2>

          {/* Students */}
          <div>
            <h4
              onClick={() => setOpenStudents(!openStudents)}
              className="menu-title"
            >
              🎓 Students
            </h4>

            {openStudents && (
              <div className="submenu">
                <Link
                  href="/students"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Management
                </Link>

                <Link
                  href="/students/chart"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Chart
                </Link>
              </div>
            )}
          </div>

          {/* Employees */}
          <div>
            <h4
              onClick={() => setOpenEmployees(!openEmployees)}
              className="menu-title"
            >
              👨‍💼 Employees
            </h4>

            {openEmployees && (
              <div className="submenu">
                <Link
                  href="/employees"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Management
                </Link>

                <Link
                  href="/employees/chart"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  Chart
                </Link>
              </div>
            )}
          </div>

        </aside>

        {/* Content */}
        <div
          className={`dashboard-content ${
            isSidebarOpen ? "shift" : ""
          }`}
        >

          <header className="dashboard-header">
            <button
              className="menu-btn"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              ☰
            </button>

            <h3>Student & Employee Management System</h3>
          </header>

          <main className="main-content flex justify-center items-start">
            {children}
          </main>

          <footer className="dashboard-footer">
            © 2026 Management System
          </footer>

        </div>

      </div>

    </body>
  </html>
);

}
