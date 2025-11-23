"use client";

import { FaStrava, FaInstagram, FaFacebookF } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-[#1A1A1A] dark:to-[#2D2D2D] border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Brand */}
          <div className="space-y-4">
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
              Ihlen Sosiale Løpeklubb
            </h4>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Løpeglede, fellesskap og kaffe etterpå.
            </p>
            <div className="inline-block px-4 py-2 bg-[#FF6B35]/10 dark:bg-[#FF6B35]/20 rounded-full">
              <span className="text-sm font-semibold text-[#FF6B35]">
                Lavterskel • Alle nivåer
              </span>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
              Kontakt
            </h5>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#FF6B35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                ihlenslk@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#FF6B35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Askim, Indre Østfold
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h5 className="text-lg font-semibold text-gray-900 dark:text-white">
              Følg oss
            </h5>
            <div className="flex gap-3">
              <a
                href="https://www.strava.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-xl bg-[#FF6B35]/10 dark:bg-[#FF6B35]/20 hover:bg-[#FF6B35] transition-all duration-300 shadow-sm hover:shadow-md"
                aria-label="Strava"
              >
                <FaStrava className="text-[#FF6B35] group-hover:text-white transition-colors duration-300 text-xl" />
              </a>
              <a
                href="https://www.instagram.com/ihlensosialelopeklubb?igsh=MW01bmV2cTB1ajFjcQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-xl bg-pink-500/10 dark:bg-pink-500/20 hover:bg-pink-500 transition-all duration-300 shadow-sm hover:shadow-md"
                aria-label="Instagram"
              >
                <FaInstagram className="text-pink-500 group-hover:text-white transition-colors duration-300 text-xl" />
              </a>
              <a
                href="https://www.facebook.com/share/1FdUz7xf8u/"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-xl bg-blue-600/10 dark:bg-blue-600/20 hover:bg-blue-600 transition-all duration-300 shadow-sm hover:shadow-md"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-blue-600 group-hover:text-white transition-colors duration-300 text-xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Ihlen Sosiale Løpeklubb. Alle rettigheter reservert.
          </p>
          <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400">
            <a href="/om-oss" className="hover:text-[#FF6B35] transition-colors cursor-pointer">
              Om oss
            </a>
            <a href="/events" className="hover:text-[#FF6B35] transition-colors cursor-pointer">
              Arrangementer
            </a>
            <a href="/blog" className="hover:text-[#FF6B35] transition-colors cursor-pointer">
              Blogg
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
