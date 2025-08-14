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

      {/* Den glidende menyen */}
      <div
        className={`fixed right-0 w-full md:w-80 h-full bg-[#F2F2F2] dark:bg-[#121212] shadow-2xl transform transition-transform duration-500 ease-in-out z-50  ${
          isOpen ? "translate-y-20" : "translate-y-full"
        }`}
      >
        <div className="p-6 flex flex-col space-y-6 h-full">
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
