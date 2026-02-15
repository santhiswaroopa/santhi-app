"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openProducts, setOpenProducts] = useState(false);
  const [openElectronics, setOpenElectronics] = useState(false);
  const [openFurniture, setOpenFurniture] = useState(false);

  const [openBooks, setOpenBooks] = useState(false);
  const [openTechBooks, setOpenTechBooks] = useState(false);
  const [openKidsBooks, setOpenKidsBooks] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const pathname = usePathname();

useEffect(() => {
  // Close sidebar automatically when route changes (mobile only)
  if (window.innerWidth <= 768) {
    setIsSidebarOpen(false);
  }
}, [pathname]);


  // const handleLinkClick = () => {
  //   setIsSidebarOpen(false);
  // };

  return (
    <div className="dashboard-wrapper">

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <h2>Main menu</h2>

        {/* Products */}
        <div>
          <h4
            onClick={() => setOpenProducts(!openProducts)}
            className="menu-title"
          >
            Products
          </h4>

          {openProducts && (
            <div className="submenu">

              <h5
                onClick={() => setOpenElectronics(!openElectronics)}
                className="submenu-title"
              >
                Electronics
              </h5>

              {openElectronics && (
                <div className="inner-menu">
                  <Link href="/dashboard/products/electronics/tv" >TV</Link>
                  <Link href="/dashboard/products/electronics/mobile">Mobile</Link>
                </div>
              )}

              <h5
                onClick={() => setOpenFurniture(!openFurniture)}
                className="submenu-title"
              >
                Furniture
              </h5>

              {openFurniture && (
                <div className="inner-menu">
                  <Link href="/dashboard/products/furniture/computer-tables" >Computer Tables</Link>
                  <Link href="/dashboard/products/furniture/dining-tables" >Dining Tables</Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Books */}
        <div>
          <h4
            onClick={() => setOpenBooks(!openBooks)}
            className="menu-title"
          >
            Books
          </h4>

          {openBooks && (
            <div className="submenu">

              <h5
                onClick={() => setOpenTechBooks(!openTechBooks)}
                className="submenu-title"
              >
                Technology Books
              </h5>

              {openTechBooks && (
                <div className="inner-menu">
                  <Link href="/dashboard/books/technology-books/programming" >Programming</Link>
                  <Link href="/dashboard/books/technology-books/ai-data-science" >AI & Data Science</Link>
                </div>
              )}

              <h5
                onClick={() => setOpenKidsBooks(!openKidsBooks)}
                className="submenu-title"
              >
                Kids Books
              </h5>

              {openKidsBooks && (
                <div className="inner-menu">
                  <Link href="/dashboard/books/kids-books/story-books" >Story Books</Link>
                  <Link href="/dashboard/books/kids-books/activity-books" >Activity Books</Link>
                </div>
              )}
            </div>
          )}
        </div>
      </aside>

      {/* Content */}
      <div className="dashboard-content">

        <header className="dashboard-header">
          <button
            className="menu-btn"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>
          <h3>Store Management System</h3>
        </header>

        <main>
          {children}
        </main>

        <footer className="dashboard-footer">
          © 2026 My Store
        </footer>

      </div>

    </div>
  );
}
