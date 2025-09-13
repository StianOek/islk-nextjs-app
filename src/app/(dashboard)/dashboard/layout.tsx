"use client";

import { Inter } from "next/font/google";
import "../../../globals.css";
import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <div className="flex min-h-screen">
          {/* Desktop Sidebar */}
          <aside className="hidden md:flex md:flex-col w-64 bg-white border-r shadow-md p-6 rounded-tr-2xl rounded-br-2xl">
            <h2 className="text-2xl font-bold text-blue-600 mb-8">Dashboard</h2>
            <nav className="space-y-3">
              <Link
                href="/dashboard"
                className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition"
              >
                Home
              </Link>
              <Link
                href="/dashboard/blog"
                className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition"
              >
                Blog Posts
              </Link>
              <Link
                href="/dashboard/events"
                className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition"
              >
                Events
              </Link>
            </nav>
          </aside>

          {/* Mobile Sidebar */}
          <div
            className={`fixed top-0 left-0 z-40 w-full h-full bg-white shadow-lg p-6 transform transition-transform duration-300 ease-in-out md:hidden ${
              mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition"
            >
              <FiX className="h-6 w-6 text-gray-600" />
            </button>
            <h2 className="text-2xl font-bold text-blue-600 mb-8">Dashboard</h2>
            <nav className="space-y-3">
              <Link
                href="/dashboard"
                onClick={() => setMobileSidebarOpen(false)}
                className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition"
              >
                Home
              </Link>
              <Link
                href="/dashboard/blog"
                onClick={() => setMobileSidebarOpen(false)}
                className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition"
              >
                Blog Posts
              </Link>
              <Link
                href="/dashboard/events"
                onClick={() => setMobileSidebarOpen(false)}
                className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition"
              >
                Events
              </Link>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-h-screen">
            {/* Mobile Top Bar */}
            <header className="flex md:hidden w-full bg-white shadow-md px-4 py-3 items-center justify-between sticky top-0 z-30">
              <h2 className="text-lg font-bold text-blue-600">Dashboard</h2>
              <button
                className="p-2 rounded-lg hover:bg-gray-100 transition"
                onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              >
                {mobileSidebarOpen ? (
                  <FiX className="h-6 w-6 text-gray-600 transition-transform duration-300" />
                ) : (
                  <FiMenu className="h-6 w-6 text-gray-600 transition-transform duration-300" />
                )}
              </button>
            </header>

            {/* Page Content */}
            <main className="flex-1 p-4 sm:p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
