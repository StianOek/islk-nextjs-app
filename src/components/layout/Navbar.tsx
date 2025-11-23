"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import HamburgerIcon from "./hamburger/HamburgerIcon";
import HamburgerMenu from "./hamburger/HamburgerMenu";
import { MdEmojiEvents } from "react-icons/md";
export default function Navbar() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navbarVisible, setNavbarVisible] = useState(true);

  const navLinks = [
    { label: "Hjem", href: "/" },
    { label: "Om oss", href: "/om-oss" },
    { label: "Arrangementer", href: "/events" },
    { label: "Blogg", href: "/blog" },
    { label: "Ihlen rundt", href: "/ihlenrundt", icon: MdEmojiEvents },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Set scrolled state
      setScrolled(currentScrollY > 10);
      
      // Don't hide navbar if mobile menu is open
      if (isMenuOpen) {
        setNavbarVisible(true);
        return;
      }
      
      // Hide/show navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down & past threshold
        setNavbarVisible(false);
      } else {
        // Scrolling up or at top
        setNavbarVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMenuOpen]);

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
        className={`fixed top-0 left-0 w-full z-50 border-b transition-all ease-in-out ${
          navbarVisible ? "translate-y-0 duration-300" : "-translate-y-full duration-200"
        } ${
          scrolled
            ? "bg-white/98 dark:bg-[#1A1A1A]/98 backdrop-blur-xl shadow-lg border-gray-200/50 dark:border-gray-800/50"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-300 ${
          scrolled ? "px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3" : "px-4 sm:px-6 lg:px-8 py-3 sm:py-4"
        }`}>
          {/* Logo */}
          <Link href="/" aria-label="Hjem" className="flex items-center gap-2 sm:gap-3 group">
            <Image
              width={40}
              height={40}
              src={isDark ? "logo-dark.svg" : "logo.svg"}
              alt="ISLK Logo"
              priority
              className="w-9 h-9 sm:w-11 sm:h-11 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
            />
            <span className="text-base sm:text-lg font-semibold tracking-tight transition-all duration-300 text-gray-900 dark:text-white leading-none">
              ISLK
            </span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
            {/* Desktop navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    pathname === link.href
                      ? "text-[#FF6B35] bg-[#FF6B35]/10"
                      : "text-gray-700 dark:text-gray-300 hover:text-[#FF6B35] hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  }`}
                >
                  {link.icon && <link.icon className="text-base" />}
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Dark mode toggle - Desktop only */}
            <button
              aria-label="Toggle Dark Mode"
              onClick={toggleDarkMode}
              className={`hidden lg:flex relative w-12 h-6 items-center rounded-full transition-all duration-300 cursor-pointer border
                ${isDark ? "bg-gray-700 border-gray-600" : "bg-gray-200 border-gray-300"}`}
            >
              <span
                className={`absolute left-0.5 w-5 h-5 rounded-full transition-all duration-300 transform flex items-center justify-center shadow-sm
                  ${isDark ? "translate-x-6 bg-[#FF6B35]" : "bg-white"}`}
              >
                {isDark ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
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
                    className="h-3 w-3 text-[#FF6B35]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
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
          isDark={isDark}
          toggleDarkMode={toggleDarkMode}
        />
      </div>
    </>
  );
}
