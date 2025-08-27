"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import HamburgerIcon from "./hamburger/HamburgerIcon";
import HamburgerMenu from "./hamburger/HamburgerMenu";

export default function Navbar() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { label: "Hjem", href: "/" },
    { label: "Om oss", href: "/om-oss" },
    { label: "Arrangementer", href: "/events" },
    { label: "Blogg", href: "/blog" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const darkMode = saved === "dark" || (!saved && prefersDark);
    setIsDark(darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleDarkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 dark:bg-gray-950/60 backdrop-blur-lg shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between py-5 px-6">
          {/* Logo */}
          <Link href="/" aria-label="Hjem" className="flex items-center gap-2">
            <Image
              width={50}
              height={50}
              src={isDark ? "logo-dark.svg" : "logo.svg"}
              alt="Logo"
              priority
            />
          </Link>

          <div className="flex items-center gap-4">
            {/* Desktop navigation */}
            <nav className="hidden lg:flex items-center gap-8 text-base font-medium">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`transition-colors duration-200 ${
                    pathname === link.href
                      ? "text-orange-600"
                      : scrolled
                        ? "text-gray-800 dark:text-gray-200 hover:text-orange-600"
                        : "text-gray-800 dark:text-gray-200 hover:text-orange-600"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Dark mode toggle */}
            <button
              aria-label="Toggle Dark Mode"
              onClick={toggleDarkMode}
              className={`relative w-14 h-7 flex items-center rounded-full transition-colors duration-300 cursor-pointer
                ${isDark ? "bg-gray-700" : "bg-gray-300"}`}
            >
              <span
                className={`absolute left-1 w-5 h-5 rounded-full transition-all duration-300 transform flex items-center justify-center
                  ${isDark ? "translate-x-7 bg-yellow-400 text-gray-900" : "bg-gray-800 text-yellow-400"}`}
              >
                {isDark ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v1m0 16v1m8.66-10h-1M4.34 12h-1m15.07 4.24l-.71-.71M6.34 6.34l-.71-.71m12.02 12.02l-.71-.71M6.34 17.66l-.71-.71M12 7a5 5 0 100 10 5 5 0 000-10z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
                    />
                  </svg>
                )}
              </span>
            </button>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <HamburgerIcon toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div className="lg:hidden">
        <HamburgerMenu
          navLinks={navLinks}
          isOpen={isMenuOpen}
          onClose={toggleMenu}
        />
      </div>
    </>
  );
}
