import { FC, ReactElement } from "react";

/**
 * @typedef {object} HamburgerIconProps
 * @property {() => void} toggleMenu - Funksjon som kaller på menyen.
 * @property {boolean} isMenuOpen - En boolean som indikerer om menyen er åpen eller lukket.
 */
type HamburgerIconProps = {
  toggleMenu: () => void;
  isMenuOpen: boolean;
};

/**
 * En animert hamburger-ikon komponent for å veksle mellom en meny og et lukkeikon.
 *
 * @param {HamburgerIconProps} props - Egenskaper for komponenten.
 * @returns {ReactElement} En React-knapp med animerte linjer.
 */
const HamburgerIcon: FC<HamburgerIconProps> = ({
  toggleMenu,
  isMenuOpen,
}: HamburgerIconProps): ReactElement => {
  return (
    <button
      onClick={toggleMenu}
      className="relative z-50 flex flex-col justify-between items-center w-8  group focus:outline-none focus:ring-2  rounded-md transition duration-200 ease-in-out cursor-pointer"
      aria-label="Toggle menu"
    >
      {/* Container for de animerte linjene */}
      <div className="flex flex-col justify-between w-[24px] h-[20px] transform transition-all duration-300 ease-in-out">
        {/* Første linje */}
        <div
          className={`h-1 w-full bg-slate-950 dark:bg-white rounded-lg transition-all duration-300 ease-in-out ${
            isMenuOpen ? "rotate-45 translate-y-[9px] translate-x-0" : ""
          }`}
        ></div>
        {/* Andre linje (midten) */}
        <div
          className={`h-1 w-full bg-slate-950 dark:bg-white rounded-lg transition-all duration-300 ease-in-out ${
            isMenuOpen ? "opacity-0" : ""
          }`}
        ></div>
        {/* Tredje linje */}
        <div
          className={`h-1 w-full bg-slate-950 dark:bg-white rounded-lg transition-all duration-300 ease-in-out ${
            isMenuOpen ? "-rotate-45 -translate-y-[9px] translate-x-0" : ""
          }`}
        ></div>
      </div>
    </button>
  );
};

export default HamburgerIcon;
