"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaStrava } from "react-icons/fa"; // Bruker react-icons for Strava-logoen
import Strava from "./components/strava/Strava";
import Hero from "./components/Hero";
import Social from "./components/social/Social";

// Registrer GSAP-plugin for å bruke det med React
gsap.registerPlugin(useGSAP);

// Hovedkomponenten for hjemmesiden
export default function Home(): React.ReactElement {
  // useRef for å referere til animasjonselementer
  const heroRef = useRef<HTMLDivElement>(null);
  const [isStravaModalOpen, setIsStravaModalOpen] = useState<boolean>(false);

  // GSAP-animasjon for innlasting av siden
  useGSAP(
    () => {
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.children,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            stagger: 0.2,
          }
        );
      }
    },
    { scope: heroRef }
  );

  return (
    <>
      <main className="  text-gray-800 dark:text-gray-300">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800 dark:text-gray-300">
          <Hero />
        </section>
        <Social />
        {/* Strava-seksjon */}
        <section id="strava-section" className="py-16 ">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-300  leading-tight">
              Klubb og segmenter
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
              Følg våre aktiviteter på strava og se hvilke segmenter vi jogger.
            </p>
            <a href="https://www.strava.com" target="_blank">
              <button className="mt-6 flex items-center px-6 py-3 bg-[#fc5200] text-white font-medium rounded-full shadow-lg hover:bg-[#fc5400d3] transition duration-300 cursor-pointer">
                <FaStrava className="mr-2 h-5 w-5" />
                Kom i gang med strava
              </button>
            </a>
          </div>

          <Strava />
        </section>
      </main>

      {/* Modal for Strava-tilkobling */}
      {isStravaModalOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm bg-gray-900 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50 p-4"
          onClick={() => setIsStravaModalOpen(false)}
        >
          <div
            className="relative bg-white p-8 rounded-lg shadow-xl max-w-sm w-full mx-auto text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsStravaModalOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="flex flex-col items-center">
              <FaStrava className="h-12 w-12 text-[#FC5200] mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Koble til Strava
              </h3>
              <p className="text-lg text-gray-700 mb-6">
                For å vise dine aktiviteter her, må du autorisere appen via
                Strava. Dette er en demo.
              </p>
              <a
                href="#"
                className="flex items-center justify-center px-6 py-3 bg-[#FC5200] text-white font-medium rounded-full shadow-lg hover:bg-[#fc5400d3] transition duration-300 w-full"
              >
                <FaStrava className="mr-2 h-5 w-5" />
                Autoriser med Strava
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
