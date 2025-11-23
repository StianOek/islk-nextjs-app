"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

// Eksempel medlem - dette kan senere hentes fra en database
const featuredMember = {
  name: "Thomas Grønlien",
  image: "/images/islk-folka.png", // Placeholder - bytt med faktisk bilde
  role: "Medlem siden 2025",
  qa: [
    { q: "Hva heter du?", a: "Thomas Grønlien" },
    {
      q: "Hadde du løpt mye før du ble med i Ihlen Sosiale Løpeklubb?",
      a: "Løpte for en del år siden ved siden av når jeg spilte aktivt fotball, har også løpt halvmaraton. Etter at vi fikk barn har det ikke blitt like mye prioritert og er derfor lenge siden jeg har hatt faste planlagte løpeøkter.",
    },
    {
      q: "Hva fikk deg til å bli med i løpeklubben?",
      a: "Ihlen Rundt - perfekt lengde og flott natur.",
    },
    {
      q: "Hvordan var din første gang på trening med klubben?",
      a: "Første tur med løpeklubben var i en forferdelig ruskevær med regn og vind. Hadde det ikke vært for at man hadde en avtale å forholde seg til den dagen, hadde valget om legge seg på sofaen vært enkelt. Men det sosiale, det å gjøre det sammen var noe som gjorde at sofaen fikk ligge i fred. God varm kaffe og saft ventet når vi var ferdig.",
    },
    {
      q: "Hva er det beste med å løpe med andre?",
      a: "Frisk luft og god trening.",
    },
    {
      q: "Hva ville du sagt til noen som tenker «Jeg er for dårlig til å bli med»?",
      a: "Ingen er for dårlig til å være med i Ihlen Sosiale Løpeklubb. Her har vi plass til alle enten man er godt trent eller aldri har trent.",
    },
    {
      q: "Tre ord som beskriver Ihlen Sosiale Løpeklubb for deg?",
      a: "Sosialt, vennskap og motiverende",
    },
    { q: "Morgen eller kveld?", a: "Kveld - elsker å løpe når dagen er over." },
  ],
};

export default function OmOssPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
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
      <main ref={sectionRef} className="min-h-screen">
        {/* Hero Section - Story Focused */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <div className="inline-block px-4 py-2 bg-[#FF6B35]/10 dark:bg-[#FF6B35]/20 rounded-full mb-6">
              <span className="text-sm font-semibold text-[#FF6B35] tracking-wide uppercase">
                Vår Historie
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-8">
              <span className="text-gray-900 dark:text-white">
                Mer enn bare
              </span>
              <br />
              <span className="text-[#FF6B35] bg-gradient-to-r from-[#FF6B35] to-[#F7931E] bg-clip-text text-transparent">
                en løpeklubb
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-12">
              Det startet med en idé mellom naboer som ønsket å løpe sammen.
              Målet var enkelt: å fremme helse og trivsel gjennom fellesskap og
              fysisk aktivitet. I dag er vi et levende fellesskap som samler
              mennesker fra hele Indre Østfold.
            </p>

            {/* Image Grid */}
            <div className="grid grid-cols-2 gap-4 mb-12">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/islk-folka.png"
                  alt="ISLK Medlemmer"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/islk-folka-sosial.png"
                  alt="ISLK Sosial"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <button
              onClick={handleOpenModal}
              className="px-8 py-4 bg-[#FF6B35] text-white rounded-full text-base font-semibold shadow-lg hover:shadow-xl hover:bg-[#E85A2A] transition-all duration-300 cursor-pointer"
            >
              Bli med på neste trening
            </button>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 lg:py-32 bg-gradient-to-b from-white via-gray-50 to-white dark:from-[#1A1A1A] dark:via-[#2D2D2D] dark:to-[#1A1A1A]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Our Values */}
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Våre verdier
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Dette er grunnlaget for alt vi gjør
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {[
                {
                  icon: "🤝",
                  title: "Inkludering",
                  description:
                    "Alle er velkomne, uansett nivå eller bakgrunn. Vi heier på hverandre og bygger hverandre opp.",
                },
                {
                  icon: "😊",
                  title: "Løpeglede",
                  description:
                    "Det handler ikke om å være raskest, men om å ha det gøy sammen og nyte turen.",
                },
                {
                  icon: "☕",
                  title: "Fellesskap",
                  description:
                    "Kaffen etterpå er like viktig som løpeturen. Vi skaper vennskap som varer.",
                },
              ].map((value, i) => (
                <div
                  key={i}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 text-center hover:shadow-xl transition-shadow"
                >
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>

            {/* What We Offer */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 lg:p-12 border border-gray-100 dark:border-gray-700">
              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Hva vi tilbyr
                  </h2>
                  <ul className="space-y-4">
                    {[
                      "Ukentlige løpeturer hver mandag kl. 17:30",
                      "Varierte ruter tilpasset alle nivåer",
                      "Årlig Ihlen Mosjonistløp & Barneløp",
                      "Sosiale sammenkomster og kaffe",
                      "Strava-klubb for å dele aktiviteter",
                      "Et støttende og motiverende miljø",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <svg
                          className="w-6 h-6 text-[#FF6B35] flex-shrink-0 mt-0.5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Hvem kan bli med?
                  </h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Alle som liker å løpe – uansett nivå! Enten du er en erfaren
                    løper eller nettopp har begynt, er du hjertelig velkommen.
                  </p>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                    Vi har ingen krav til fart eller prestasjon. Her er det
                    løpeglede, samhold og gode samtaler som teller.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Nybegynnere",
                      "Mosjonister",
                      "Erfarne",
                      "Alle aldre",
                    ].map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 bg-[#FF6B35]/10 dark:bg-[#FF6B35]/20 text-[#FF6B35] rounded-full text-sm font-semibold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Meet a Member Section - Subtle */}
        <section className="py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Møt en av oss
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Lær mer om medlemmene våre
                </p>
              </div>
            </div>

            <div
              onClick={() => setIsMemberModalOpen(true)}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer group"
            >
              <div className="flex flex-col sm:flex-row items-center gap-6 p-6">
                {/* Avatar */}
                <div className="relative w-24 h-24 flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35] to-[#F7931E] rounded-full opacity-20 group-hover:opacity-30 transition-opacity" />
                  <div className="relative w-full h-full bg-gradient-to-br from-[#FF6B35] to-[#F7931E] rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    TG
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {featuredMember.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {featuredMember.role}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    💬 Klikk for å lese 7 spørsmål
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-[#FF6B35] group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B35] via-[#F7931E] to-[#FF6B35] dark:from-[#E85A2A] dark:via-[#F7931E] dark:to-[#E85A2A]" />

          <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center space-y-8">
            <h2 className="text-4xl sm:text-5xl font-bold text-white">
              Bli med oss på neste tur!
            </h2>
            <p className="text-xl text-white/95 leading-relaxed max-w-2xl mx-auto">
              Følg oss for oppdateringer om tid og sted for neste løpetur. Vi
              lover en hyggelig atmosfære, gode samtaler og mestringsfølelse på
              kjøpet.
            </p>
            <button
              onClick={handleOpenModal}
              className="px-10 py-5 bg-white text-[#FF6B35] font-semibold rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 text-lg cursor-pointer"
            >
              Se møtested
            </button>
          </div>
        </section>
      </main>

      {/* Member Q&A Modal */}
      {isMemberModalOpen && (
        <div
          className="fixed inset-0 backdrop-blur-md bg-black/60 flex justify-center items-center z-50 p-4"
          onClick={() => setIsMemberModalOpen(false)}
        >
          <div
            className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-2xl w-full mx-auto animate-fade-in overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] p-6 text-white flex-shrink-0">
              <button
                onClick={() => setIsMemberModalOpen(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition cursor-pointer"
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
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  EM
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{featuredMember.name}</h3>
                  <p className="text-white/90">{featuredMember.role}</p>
                </div>
              </div>
            </div>

            {/* Content - Scrollable */}
            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-6">
                {featuredMember.qa.map((item, index) => (
                  <div key={index} className="group">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-[#FF6B35]/10 dark:bg-[#FF6B35]/20 rounded-full flex items-center justify-center text-[#FF6B35] font-bold text-sm">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 dark:text-white mb-2">
                          {item.q}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {item.a}
                        </p>
                      </div>
                    </div>
                    {index < featuredMember.qa.length - 1 && (
                      <div className="mt-6 border-t border-gray-100 dark:border-gray-700" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Meeting Place Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 backdrop-blur-md bg-black/60 flex justify-center items-center z-50 p-4"
          onClick={handleCloseModal}
        >
          <div
            className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-lg w-full mx-auto animate-fade-in overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] p-8 text-white">
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition cursor-pointer"
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
              <h3 className="text-3xl font-bold">Møtested</h3>
            </div>

            {/* Content */}
            <div className="p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#FF6B35]/10 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-[#FF6B35]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Når
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Hver mandag kl. 17:30
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#FF6B35]/10 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-[#FF6B35]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Hvor
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Lekeplassen på Tovengtunet
                    <br />
                    <span className="text-sm">(Tovengveien 21 i GPS-en)</span>
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="text-gray-700 dark:text-gray-300">
                  Kom som du er – enten du løper, går eller triller! 🙂
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
