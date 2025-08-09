"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Registrer GSAP-plugin for å bruke det med React
gsap.registerPlugin(useGSAP);

// Definerer komponenten med TypeScript-typer
export default function OmOss(): React.ReactElement {
  // Tilstand for å kontrollere synligheten til modalen, med type-hinting
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // useRef for å referere til animasjonselementer
  const sectionRef = useRef<HTMLDivElement>(null);

  // GSAP-animasjon for innlasting av siden
  useGSAP(
    () => {
      if (sectionRef.current) {
        gsap.fromTo(
          sectionRef.current.children,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.15,
          }
        );
      }
    },
    { scope: sectionRef }
  );

  // Funksjon for å åpne modalen, med riktig event-type for knappen
  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault(); // Forhindrer at siden laster på nytt
    setIsModalOpen(true);
  };

  // Funksjon for å lukke modalen
  const handleCloseModal = (): void => {
    setIsModalOpen(false);
  };

  return (
    <>
      <main
        ref={sectionRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-gray-800"
      >
        <header className="mb-12 text-center animate-fade-in-down">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-300 leading-tight">
            <span className="text-[#FC5200]">OM</span> OSS
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 font-light">
            Løpeglede i fokus – for alle nivåer!
          </p>
        </header>

        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-lg text-gray-700 dark:text-gray-500">
            <p>
              Ihlen Sosiale Løpeklubb er et lavterskeltilbud for alle som ønsker
              å løpe sammen med andre i en hyggelig og uformell setting. Vi
              holder til i Askim og Indre Østfold og har som mål å skape et
              inkluderende miljø hvor løping handler like mye om fellesskap som
              om fysisk aktivitet.
            </p>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-300 pt-4">
              Hvem kan bli med?
            </h2>
            <p>
              Alle som liker å løpe – uansett nivå! Enten du er en erfaren løper
              eller nettopp har begynt, er du hjertelig velkommen. Vi har ingen
              krav til fart eller prestasjon, her er det løpeglede og samhold
              som teller.
            </p>
            <p className="italic text-gray-500">
              #IhlenSosialeLøpeklubb #Løpeglede #Askim #IndreØstfold
              #MosjonForAlle
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-300 mb-4">
              Hva tilbyr vi?
            </h2>
            <ul className="space-y-4 text-lg text-gray-700 dark:text-gray-400 ">
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 text-[#FC5200] mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Felles løpeturer med sosialt fokus
              </li>
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 text-[#FC5200] mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Variert tempo og tilpassede ruter
              </li>
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 text-[#FC5200] mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Årlig Ihlen Mosjonistløp & Barneløp – et lavterskel løp for alle
                aldre
              </li>
              <li className="flex items-center">
                <svg
                  className="w-6 h-6 text-[#FC5200] mr-3 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                En uformell møteplass for løpere i Askim og omegn
              </li>
            </ul>
          </div>
        </section>

        <section className="mt-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-300 leading-tight">
            Bli med oss!
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Har du lyst til å bli med på en løpetur? Følg oss for oppdateringer
            om tid og sted for neste økt. Vi lover en hyggelig atmosfære, gode
            samtaler og mestringsfølelse på kjøpet!
          </p>
          {/* Forbedret responsivitet for knapper: stablet på mobil, rad på større skjermer */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center sm:space-x-4 space-y-4 sm:space-y-0">
            <button
              onClick={handleOpenModal}
              className="px-6 py-4 border-2 border-[#FC5200] text-[#FC5200] font-bold rounded-full hover:bg-[#FC5200] hover:text-white transition duration-300 cursor-pointer"
            >
              Bli med på neste trening!
            </button>
          </div>
        </section>
      </main>

      {/* Modal-komponent */}
      {isModalOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm  bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50 p-4"
          onClick={handleCloseModal} // Lukk modalen ved å klikke på bakgrunnen
        >
          <div
            className="relative bg-white p-8 rounded-lg shadow-xl max-w-sm w-full mx-auto"
            onClick={(e) => e.stopPropagation()} // Forhindrer lukking når du klikker inne i modalen
          >
            <button
              onClick={handleCloseModal}
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
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Møtested</h3>
              <p className="text-lg text-gray-700">
                Oppmøte på tovengtunet utenfor 49 hver mandag kl 18:30. Vi ses
                der! :)
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
