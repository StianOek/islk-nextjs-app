// components/HamburgerMenu.tsx
import { NavLinks } from "@/app/types/nav_types";
import React from "react";

/**
 * Interface for HamburgerMenu component props.
 * Defines the types for the properties that the HamburgerMenu component accepts.
 */
interface HamburgerMenuProps {
  isOpen: boolean; // Controls whether the menu is visible or hidden.
  onClose: () => void; // Function to call when the menu or overlay should close.
  navLinks: NavLinks[];
}

/**
 * HamburgerMenu Component
 * This component renders the full-screen sliding menu and its overlay.
 * It's now written in TypeScript with prop type definitions and uses a dynamic navLinks array.
 * @param {HamburgerMenuProps} props - Component props
 */
export default function HamburgerMenu({
  isOpen,
  onClose,
  navLinks,
}: HamburgerMenuProps) {
  return (
    <>
      {/* Overlay for when the menu is open - uses a subtle fade-in */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 transition-opacity duration-500 ease-in-out"
          onClick={onClose} // Close menu when overlay is clicked
          aria-hidden="true"
        ></div>
      )}

      {/* Sliding Menu - full screen width, with updated styling */}
      <div
        className={`fixed inset-y-0 right-0 w-full md:w-80 bg-white shadow-2xl transform transition-transform duration-500 ease-in-out z-50 rounded-l-lg ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col space-y-6 w-full">
          {/* Close button inside the menu, styled to match the club's design */}
          <button
            onClick={onClose}
            className="self-end text-gray-700 hover:text-[#FC5200] focus:outline-none rounded-full p-2 transition-colors duration-200 ease-in-out"
            aria-label="Close menu"
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
          {/* Navigation Links - rendered dynamically from navLinks */}
          <div className="flex items-center flex-col w-full">
            {navLinks.map((item) => (
              <a
                key={item.href} // Use href as a unique key for list rendering
                href={item.href}
                className="w-full flex items-center justify-center text-gray-800 hover:text-[#FC5200] hover:bg-gray-100 transition duration-300 ease-in-out rounded-lg p-4 text-3xl font-medium"
                onClick={onClose} // Close menu on link click
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
