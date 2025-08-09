import { NavLinks } from "@/app/types/nav_types";
import React from "react";
import Link from "next/link"; // Importerer Link-komponenten for navigasjon

/**
 * @typedef {object} HamburgerMenuProps
 * @property {boolean} isOpen - Kontrollerer om menyen er synlig eller skjult.
 * @property {() => void} onClose - Funksjon som kaller på når menyen skal lukkes.
 * @property {NavLinks[]} navLinks - En array av nav-objekter for å generere lenkene.
 */
interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLinks[];
}

/**
 * En responsiv mobilmeny som glir inn fra høyre.
 * Den har en semi-transparent, utvisket bakgrunn og er optimalisert for en moderne brukeropplevelse.
 *
 * @param {HamburgerMenuProps} props - Egenskaper for komponenten.
 * @returns {React.ReactElement} En fullskjermsmeny med navigasjonslenker.
 */
export default function HamburgerMenu({
  isOpen,
  onClose,
  navLinks,
}: HamburgerMenuProps): React.ReactElement {
  return (
    <>
      {/* Bakgrunns-overlay som lukker menyen ved klikk */}
      <div
        className={`fixed inset-0 bg-black/50 z-30 transition-opacity duration-500 ease-in-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
        aria-hidden="true"
      ></div>

      {/* Den glidende menyen */}
      <div
        className={`fixed inset-y-0 right-0 w-full md:w-80 h-full backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 shadow-2xl transform transition-transform duration-500 ease-in-out z-50 rounded-l-2xl ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="p-6 flex flex-col space-y-6 h-full">
          {/* Lukkeknapp inne i menyen */}
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="text-gray-700 dark:text-gray-300 hover:text-[#FC5200] focus:outline-none rounded-full p-2 transition-colors duration-200 ease-in-out"
              aria-label="Lukk meny"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          {/* Navigasjonslenker */}
          <nav className="flex flex-col space-y-2 flex-grow">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="w-full flex items-center justify-center text-gray-800 dark:text-gray-200 hover:text-[#FC5200] hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-300 ease-in-out rounded-xl p-4 text-3xl font-medium"
                onClick={onClose}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
