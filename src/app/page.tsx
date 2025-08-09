"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { FaStrava } from "react-icons/fa"; // Bruker react-icons for Strava-logoen

// Registrer GSAP-plugin for å bruke det med React
gsap.registerPlugin(useGSAP);

// Definerer en mock-type for Strava-aktiviteter
interface StravaActivity {
  id: number;
  name: string;
  distance: number; // i meter
  moving_time: number; // i sekunder
  start_date: string;
}

// Mock data for Strava-aktiviteter
const mockStravaActivities: StravaActivity[] = [
  {
    id: 1,
    name: "Morgentur i skogen",
    distance: 7200, // 7.2 km
    moving_time: 2700, // 45 min
    start_date: "2023-10-25T08:00:00Z",
  },
  {
    id: 2,
    name: "Rask økt i sentrum",
    distance: 5000, // 5 km
    moving_time: 1500, // 25 min
    start_date: "2023-10-23T18:30:00Z",
  },
  {
    id: 3,
    name: "Langtur rundt Ihlen-vannet",
    distance: 15500, // 15.5 km
    moving_time: 5400, // 90 min
    start_date: "2023-10-21T10:00:00Z",
  },
];

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

  // Hjelpefunksjon for å formatere tid til minutter og sekunder
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  // Hjelpefunksjon for å formatere distanse fra meter til kilometer
  const formatDistance = (meters: number): string => {
    return `${(meters / 1000).toFixed(1)} km`;
  };

  return (
    <>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-800">
        <section
          ref={heroRef}
          className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center justify-between py-16"
        >
          {/* Venstre side: Tittel og knapper */}
          <div className="flex flex-col w-full lg:w-1/2 text-center lg:text-left space-y-8 animate-fade-in">
            <div className="flex flex-col w-full">
              <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
                  IHLEN
                </h1>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-thin">
                  SOSIALE
                </h1>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#FC5200]">
                LØPEKLUBB
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-lg mx-auto lg:mx-0">
              Din lavterskel løpeklubb i Indre Østfold. Vi fokuserer på
              løpeglede og fellesskap, uansett nivå!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
              <a
                href="#strava-section"
                className="text-[#FC5200] px-6 py-4 rounded-full text-lg font-bold border-2 border-[#FC5200] hover:bg-[#FC5200] hover:text-white transition-colors duration-300"
              >
                SE VÅRE LØPETURER
              </a>
            </div>
          </div>

          {/* Høyre side: Bilde */}
          <div className="w-full lg:w-1/2 max-w-sm sm:max-w-md lg:max-w-full h-auto mt-8 lg:mt-0 animate-fade-in-up">
            <Image
              width={1000}
              height={1000}
              src={"/images/islk-folka.png"}
              alt={"Bildet av Ihlen Sosiale Løpeklubb"}
              className="w-full h-auto rounded-xl "
            />
          </div>
        </section>

        {/* --- */}

        {/* Strava-seksjon */}
        <section id="strava-section" className="py-16">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
              Siste løpeturer på Strava
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl">
              Følg våre aktiviteter og se hvilke løpeturer vi har vært på.
            </p>
            <button
              onClick={() => setIsStravaModalOpen(true)}
              className="mt-6 flex items-center px-6 py-3 bg-[#fc5200] text-white font-medium rounded-full shadow-lg hover:bg-[#fc5400d3] transition duration-300"
            >
              <FaStrava className="mr-2 h-5 w-5" />
              Koble til Strava
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Viser mock data for Strava-aktiviteter */}
            {mockStravaActivities.map((activity) => (
              <div
                key={activity.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    {activity.name}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {new Date(activity.start_date).toLocaleDateString("nb-NO")}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold text-[#FC5200]">
                      {formatDistance(activity.distance)}
                    </span>
                    <span className="text-sm text-gray-500">Distanse</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-3xl font-bold text-[#FC5200]">
                      {formatTime(activity.moving_time)}
                    </span>
                    <span className="text-sm text-gray-500">
                      Tid i bevegelse
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
