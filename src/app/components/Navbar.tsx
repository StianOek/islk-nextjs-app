"use client";

import { MouseEvent, useEffect, useState } from "react";
import { useTransitionRouter } from "next-view-transitions";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import HamburgerIcon from "./hamburger/HamburgerIcon";
import HamburgerMenu from "./hamburger/HamburgerMenu";

// Navbar-komponenten fungerer som hovednavigasjonslinjen
// og håndterer mobilmeny, overganger og mørk modus.
export default function Navbar() {
  const pathname = usePathname();
  const router = useTransitionRouter();
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: "Hjem", href: "/" },
    { label: "Om oss", href: "/om-oss" },
    { label: "Arrangementer", href: "/events" },
    { label: "Blogg", href: "/blog" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  function triggerPageTransition() {
    document.documentElement.animate(
      [
        { clipPath: "polygon(25% 75%, 75% 75%, 75% 75%, 25% 75%)" },
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)" },
      ],
      {
        duration: 2000,
        easing: "cubic-bezier(0.9, 0, 0.1,1)",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  }

  const handleNavigation = (e: MouseEvent, path: string) => {
    if (path === pathname) {
      e.preventDefault();
      return;
    }
    router.push(path, {
      onTransitionReady: triggerPageTransition,
    });
    // Lukk mobilmenyen etter at en lenke er klikket
    setIsMenuOpen(false);
  };

  // Håndterer lagring av tema i lokal lagring og sjekker foretrukket tema
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const darkMode = saved === "dark" || (!saved && prefersDark);

    setIsDark(darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, []);

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
      <header className="sticky top-0 z-30 backdrop-blur-md ">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 md:px-8">
          {/* Logo */}
          <div>
            <Link
              onClick={(e) => handleNavigation(e, "/")}
              href={"/"}
              aria-label="Hjem"
            >
              <Image width={50} height={50} src={"logo.svg"} alt="Logo" />
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {/* Desktop-navigasjonslenker */}
            <nav className="hidden lg:flex items-center gap-6 text-base font-semibold text-gray-700 dark:text-gray-300">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavigation(e, link.href)}
                  className={`hover:text-[#FC5200] transition-colors duration-200 ${
                    pathname === link.href ? "text-[#FC5200]" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Veksle mellom lys og mørk modus */}
            <button
              aria-label="Toggle Dark Mode"
              onClick={toggleDarkMode}
              className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition cursor-pointer"
              title="Toggle Dark Mode"
            >
              {isDark ? (
                // Sol-ikon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-yellow-400"
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
                // Måne-ikon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-800 dark:text-gray-200"
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
            </button>

            {/* Hamburger-ikon for mobil - skjult på store skjermer */}
            <div className="lg:hidden">
              <HamburgerIcon toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
            </div>
          </div>
        </div>
      </header>

      {/* Hamburgermeny for mobil - skjult på store skjermer */}
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
