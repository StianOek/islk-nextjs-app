"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { 
  FiMenu, 
  FiX, 
  FiHome, 
  FiFileText, 
  FiCalendar,
  FiLogOut,
  FiUser
} from "react-icons/fi";

const navItems = [
  { href: "/dashboard", label: "Home", icon: FiHome },
  { href: "/dashboard/blog", label: "Blog Posts", icon: FiFileText },
  { href: "/dashboard/events", label: "Events", icon: FiCalendar },
];

interface User {
  name: string;
  email: string;
}

export default function DashboardSidebar() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    // Fetch user data
    fetch("/api/auth/user")
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(() => setUser({ name: "Admin User", email: "admin@example.com" }));
  }, []);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileSidebarOpen]);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const userName = user?.name || "Loading...";
  const userEmail = user?.email || "";

  return (
    <>
      {/* Desktop Sidebar - Fixed */}
      <aside className="hidden md:flex md:flex-col w-72 bg-white border-r border-gray-200 shadow-sm fixed left-0 top-0 h-screen">
        <div className="flex flex-col h-full">
          {/* Logo/Brand */}
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Dashboard
            </h2>
            <p className="text-sm text-gray-500 mt-1">Content Management</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto" aria-label="Main navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group ${
                    active
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md shadow-blue-200"
                      : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className={`h-5 w-5 ${active ? "" : "group-hover:scale-110 transition-transform"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Section - Fixed at bottom */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 mb-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold text-sm">
                {user ? getInitials(userName) : <FiUser className="h-5 w-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{userName}</p>
                <p className="text-xs text-gray-500 truncate">{userEmail}</p>
              </div>
            </div>
            <form action="/api/auth/signout" method="POST">
              <button
                type="submit"
                className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600 font-medium transition-all duration-200 group"
              >
                <FiLogOut className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>Sign Out</span>
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Mobile Top Bar - Fixed */}
      <header className="flex md:hidden w-full bg-white/95 backdrop-blur-md shadow-sm px-4 py-3 items-center justify-between fixed top-0 left-0 right-0 z-30 border-b border-gray-100">
        <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Dashboard
        </h2>
        <button
          type="button"
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors active:scale-95"
          onClick={toggleMobileSidebar}
          aria-label="Toggle menu"
          aria-expanded={mobileSidebarOpen}
        >
          {mobileSidebarOpen ? (
            <FiX className="h-6 w-6 text-gray-600" />
          ) : (
            <FiMenu className="h-6 w-6 text-gray-600" />
          )}
        </button>
      </header>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          mobileSidebarOpen ? "z-[45] opacity-100" : "-z-10 opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileSidebarOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 z-[50] w-80 max-w-[85vw] h-screen bg-white shadow-2xl transition-transform duration-300 ease-out md:hidden ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Dashboard
              </h2>
              <p className="text-sm text-gray-500 mt-1">Content Management</p>
            </div>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <FiX className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto" aria-label="Main navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    active
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile User Section */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 mb-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-semibold text-sm">
                {user ? getInitials(userName) : <FiUser className="h-5 w-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{userName}</p>
                <p className="text-xs text-gray-500 truncate">{userEmail}</p>
              </div>
            </div>
            <form action="/api/auth/signout" method="POST">
              <button
                type="submit"
                onClick={() => setMobileSidebarOpen(false)}
                className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600 font-medium transition-all duration-200"
              >
                <FiLogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
