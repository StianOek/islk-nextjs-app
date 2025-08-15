"use client";

import { FaStrava, FaInstagram, FaFacebookF } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#f2f2f2] to-[#FFF0E0]/60 dark:from-gray-900 dark:to-gray-800  transition-all duration-500 antialiased" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div>
            <h4 className="text-xl font-bold text-gray-600 dark:text-gray-200">
              Ihlen Sosiale Løpeklubb
            </h4>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Løpeglede, fellesskap og kaffe etterpå.
            </p>
          </div>

          <div>
            <h5 className="font-semibold mb-2 text-gray-600 dark:text-gray-200">
              Kontakt
            </h5>
            <ul className="space-y-1 text-gray-600 dark:text-gray-400">
              <li>E-post: hei@ihlenlop.no</li>
              <li>Sted: Askim, Indre Østfold</li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold mb-4 text-gray-600 dark:text-gray-200">
              Følg oss
            </h5>
            <div className="flex gap-4">
              <a
                href="#strava-section"
                className="group p-3 rounded-full bg-orange-600/10 dark:bg-orange-600/20 hover:bg-orange-600 dark:hover:bg-orange-600 transition-colors duration-300 shadow-md"
                aria-label="Strava"
              >
                <FaStrava className="text-[#fc5200] group-hover:text-white transition-colors duration-300 text-xl" />
              </a>
              <a
                href="#"
                className="group p-3 rounded-full bg-pink-500/10 dark:bg-pink-500/20 hover:bg-pink-500 transition-colors duration-300 shadow-md"
                aria-label="Instagram"
              >
                <FaInstagram className="text-pink-500 group-hover:text-white transition-colors duration-300 text-xl" />
              </a>
              <a
                href="#"
                className="group p-3 rounded-full bg-blue-600/10 dark:bg-blue-600/20 hover:bg-blue-600 transition-colors duration-300 shadow-md"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-blue-600 group-hover:text-white transition-colors duration-300 text-xl" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Ihlen Sosiale Løpeklubb. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
