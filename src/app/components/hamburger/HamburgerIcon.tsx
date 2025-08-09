import { FC, ReactElement } from "react";

type HamburgerIconProps = {
  // Prop types here
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
      className="text-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2 hover:text-slate-500 transition duration-200 ease-in-out cursor-pointer"
      aria-label="Toggle menu"
    >
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Renders 'X' icon if menu is open, otherwise renders hamburger */}
        {isMenuOpen ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        )}
      </svg>
    </button>
  );
};

export default HamburgerIcon;
