"use client";

import React, { useRef } from "react";
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
      <main className="  text-gray-800 dark:text-gray-300 ">
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
              <button className="mt-6 flex items-center px-6 py-3 bg-orange-600 text-white font-medium rounded-full shadow-lg hover:bg-[#orange-600 transition duration-300 cursor-pointer">
                <FaStrava className="mr-2 h-5 w-5" />
                Kom i gang med strava
              </button>
            </a>
          </div>

          <Strava />
        </section>
      </main>
    </>
  );
}
