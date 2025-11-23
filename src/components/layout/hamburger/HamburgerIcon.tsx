import { FC, ReactElement } from "react";

type HamburgerIconProps = {
  toggleMenu: () => void;
  isMenuOpen: boolean;
};

const HamburgerIcon: FC<HamburgerIconProps> = ({
  toggleMenu,
  isMenuOpen,
}: HamburgerIconProps): ReactElement => {
  return (
    <button
      onClick={toggleMenu}
      className="relative z-50 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center"
      aria-label={isMenuOpen ? "Lukk meny" : "Åpne meny"}
    >
      {/* Container for animated lines */}
      <div className="flex flex-col justify-between w-6 h-5 items-center">
        {/* Top line */}
        <span
          className={`h-0.5 w-full bg-[#FF6B35] rounded-full transition-all duration-300 ease-out ${
            isMenuOpen
              ? "rotate-45 translate-y-[9px]"
              : "rotate-0 translate-y-0"
          }`}
        />
        {/* Middle line */}
        <span
          className={`h-0.5 w-full bg-[#FF6B35] rounded-full transition-all duration-300 ease-out ${
            isMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
          }`}
        />
        {/* Bottom line */}
        <span
          className={`h-0.5 w-full bg-[#FF6B35] rounded-full transition-all duration-300 ease-out ${
            isMenuOpen
              ? "-rotate-45 -translate-y-[9px]"
              : "rotate-0 translate-y-0"
          }`}
        />
      </div>
    </button>
  );
};

export default HamburgerIcon;
