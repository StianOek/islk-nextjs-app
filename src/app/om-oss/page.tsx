"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export default function OmOssPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (sectionRef.current) {
        gsap.fromTo(
          sectionRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
          }
        );
      }
    },
    { scope: sectionRef }
  );

  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <main ref={sectionRef} className="min-h-screen dark:bg-gray-950">
        {/* Hero Section (ren og enkel) */}
        <section className="max-w-7xl mx-auto px-6  py-16 grid md:grid-cols-2 gap-10 items-center">
          {/* Tekstdel */}
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-gray-900 dark:text-white">
              <span className="text-[#FC5200]">OM</span> OSS
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto md:mx-0">
              Løpeglede i fokus – for alle nivåer!
            </p>
            <button
              onClick={handleOpenModal}
              className="px-6 py-3 bg-[#FC5200] text-white font-semibold rounded-full shadow-md hover:shadow-lg hover:bg-[#e64a00] transition duration-300"
            >
              Bli med på neste trening!
            </button>
          </div>

          {/* Bilde-del med kreativ styling */}
          <div className="relative w-full h-72 sm:h-96 md:h-full flex justify-end items-center">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-[3rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700 ease-out">
              <Image
                src="/images/aboutus.png"
                alt="Om oss"
                fill
                className="object-cover"
                priority
              />
              {/* Gradient overlay for dark mode */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FC5200]/30 via-transparent to-purple-600/30 mix-blend-multiply dark:mix-blend-overlay" />
            </div>
            {/* Dekorative blobs */}
            {/*  <div className="absolute -top-6 -left-6 w-28 h-28 bg-purple-500/40 dark:bg-purple-700/40 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-8 -right-8 w-36 h-36 bg-orange-400/30 dark:bg-orange-600/40 rounded-full blur-3xl animate-pulse" /> */}
          </div>
        </section>

        {/* Info Section */}
        <section className="max-w-7xl mx-auto px-6  py-20 grid md:grid-cols-2 gap-16 items-start">
          <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300">
            <p>
              Ihlen Sosiale Løpeklubb er et lavterskeltilbud for alle som ønsker
              å løpe sammen i en hyggelig og uformell setting. Vi holder til i
              Askim og Indre Østfold og har som mål å skape et inkluderende
              miljø hvor løping handler like mye om fellesskap som om fysisk
              aktivitet.
            </p>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 pt-4">
              Hvem kan bli med?
            </h2>
            <p>
              Alle som liker å løpe – uansett nivå! Enten du er en erfaren løper
              eller nettopp har begynt, er du hjertelig velkommen. Vi har ingen
              krav til fart eller prestasjon – her er det løpeglede og samhold
              som teller.
            </p>
            <p className="italic text-purple-600 dark:text-purple-400">
              #IhlenSosialeLøpeklubb #Løpeglede #Askim #IndreØstfold
              #MosjonForAlle
            </p>
          </div>

          <div className="bg-white/90 dark:bg-gray-800/70 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Hva tilbyr vi?
            </h2>
            <ul className="space-y-5 text-lg text-gray-700 dark:text-gray-300">
              {[
                "Felles løpeturer med sosialt fokus",
                "Variert tempo og tilpassede ruter",
                "Årlig Ihlen Mosjonistløp & Barneløp – et lavterskel løp for alle aldre",
                "En uformell møteplass for løpere i Askim og omegn",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start bg-gradient-to-r from-orange-50 to-purple-50 dark:from-orange-900/30 dark:to-purple-900/20 p-4 rounded-xl"
                >
                  <svg
                    className="w-6 h-6 text-[#FC5200] mr-3 mt-1 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative mt-12 py-16 px-6 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FC5200] to-purple-600 dark:from-orange-700 dark:to-purple-800 opacity-90  -z-10" />
          <div className="max-w-3xl mx-auto text-white space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold">
              Bli med oss på neste tur!
            </h2>
            <p className="text-lg text-white/90">
              Følg oss for oppdateringer om tid og sted for neste løpetur. Vi
              lover en hyggelig atmosfære, gode samtaler og mestringsfølelse på
              kjøpet.
            </p>
            <button
              onClick={handleOpenModal}
              className="px-8 py-4 bg-white text-[#FC5200] font-semibold rounded-full shadow-lg hover:bg-gray-100 transition duration-300"
            >
              Se møtested
            </button>
          </div>
        </section>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 backdrop-blur-md bg-black/60 flex justify-center items-center z-50 p-4"
          onClick={handleCloseModal}
        >
          <div
            className="relative bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl max-w-sm w-full mx-auto animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
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
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Møtested
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Oppmøte på Tovengtunet utenfor nr. 49 hver mandag kl 18:30. Vi
                ses der! 🙂
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
