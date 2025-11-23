"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaStrava } from "react-icons/fa"; // Bruker react-icons for Strava-logoen

import Strava from "@/components/layout/strava/Strava";
import Hero from "@/components/layout/Hero";
import Social from "@/components/layout/social/Social";
import LastBlogPost from "@/components/layout/LastBlogPost";

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
      <main className="text-gray-900 dark:text-gray-300">
        <section>
          <Hero />
        </section>
        <section>
          <Social />
        </section>
        <section>
          <LastBlogPost />
        </section>
        {/* Strava-seksjon */}
        <section
          id="strava-section"
          className="py-24 sm:py-32 bg-gradient-to-b from-white via-gray-50 to-white dark:from-[#1A1A1A] dark:via-[#2D2D2D] dark:to-[#1A1A1A] overflow-hidden transition-colors duration-500"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col items-center text-center mb-16 space-y-6">
              <div className="inline-block px-4 py-2 bg-[#FF6B35]/10 dark:bg-[#FF6B35]/20 rounded-full">
                <span className="text-sm font-semibold text-[#FF6B35] tracking-wide uppercase">
                  Strava
                </span>
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight max-w-3xl">
                Klubb og segmenter
              </h2>
              
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
                Følg våre aktiviteter på Strava og se hvilke segmenter vi jogger.
              </p>
              
              <a href="https://www.strava.com" target="_blank" rel="noopener noreferrer">
                <button className="flex items-center gap-3 px-8 py-4 bg-[#FF6B35] text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:bg-[#E85A2A] transition-all duration-300">
                  <FaStrava className="h-5 w-5" />
                  Kom i gang med Strava
                </button>
              </a>
            </div>

            <Strava />
          </div>
        </section>
      </main>
    </>
  );
}
