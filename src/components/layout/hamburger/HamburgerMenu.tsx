import { NavLinks } from "@/types/nav_types";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLinks[];
  isDark: boolean;
  toggleDarkMode: () => void;
}

export default function HamburgerMenu({
  isOpen,
  onClose,
  navLinks,
  isDark,
  toggleDarkMode,
}: HamburgerMenuProps): React.ReactElement {
  const pathname = usePathname();

  return (
    <>
      {/* Sliding menu from bottom */}
      <div
        className={`fixed inset-0 w-full bg-white dark:bg-[#1A1A1A] shadow-2xl transform transition-transform duration-500 ease-out z-40 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ 
          paddingTop: '65px'
        }}
      >
        {/* Navigation links */}
        <nav className="flex flex-col p-4 pt-6 space-y-2 overflow-y-auto h-full pb-8">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-6 py-4 rounded-xl text-lg font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#FF6B35] text-white shadow-lg"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 active:scale-95"
                }`}
                onClick={onClose}
              >
                {item.icon && (
                  <item.icon
                    className={`text-2xl ${
                      isActive ? "text-white" : "text-[#FF6B35]"
                    }`}
                  />
                )}
                <span>{item.label}</span>
                {isActive && (
                  <svg
                    className="w-5 h-5 ml-auto"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </Link>
            );
          })}

          {/* Divider */}
          <div className="py-4">
            <div className="border-t border-gray-200 dark:border-gray-800" />
          </div>

          {/* Dark Mode Toggle */}
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                  {isDark ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#FF6B35]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#FF6B35]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {isDark ? "Mørk modus" : "Lys modus"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Bytt tema
                  </p>
                </div>
              </div>
              <button
                onClick={toggleDarkMode}
                className={`relative w-14 h-7 flex items-center rounded-full transition-all duration-300 cursor-pointer border
                  ${isDark ? "bg-gray-700 border-gray-600" : "bg-gray-200 border-gray-300"}`}
                aria-label="Toggle Dark Mode"
              >
                <span
                  className={`absolute left-0.5 w-6 h-6 rounded-full transition-all duration-300 transform flex items-center justify-center shadow-sm
                    ${isDark ? "translate-x-7 bg-[#FF6B35]" : "bg-white"}`}
                />
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="py-2">
            <div className="border-t border-gray-200 dark:border-gray-800" />
          </div>

          {/* Additional info */}
          <div className="px-6 py-4 bg-gradient-to-br from-[#FF6B35]/10 to-[#F7931E]/10 dark:from-[#FF6B35]/20 dark:to-[#F7931E]/20 rounded-xl">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Ihlen Sosiale Løpeklubb
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Lavterskel løpeklubb i Indre Østfold. Alle nivåer er velkomne!
            </p>
          </div>

          {/* Social links */}
          <div className="px-6 py-4">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
              Følg oss
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.strava.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#FF6B35]/10 dark:bg-[#FF6B35]/20 text-[#FF6B35] rounded-lg hover:bg-[#FF6B35] hover:text-white transition-all duration-200 text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
                </svg>
                Strava
              </a>
              <a
                href="https://www.instagram.com/ihlensosialelopeklubb"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-pink-500/10 dark:bg-pink-500/20 text-pink-500 rounded-lg hover:bg-pink-500 hover:text-white transition-all duration-200 text-sm font-medium"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Instagram
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
