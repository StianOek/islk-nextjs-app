"use client";

import Image from "next/image";
import Link from "next/link";

export default function IhlenRundt2026() {
  const isEarlyBird = new Date() < new Date("2025-12-31");
  const earlyBirdPrice = { barn: 25, voksne: 50 };
  const regularPrice = { barn: 50, voksne: 100 };

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        {/* Back Button */}
        <Link
          href="/ihlenrundt"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#FF6B35] dark:hover:text-[#FF6B35] mb-8 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Tilbake til Ihlen Rundt
        </Link>

        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl mb-12 shadow-2xl">
          <div className="relative h-[400px] lg:h-[600px] bg-gray-100 dark:bg-gray-700">
            <Image
              src="/images/ihlenrundt2026/ihlenrundt_2026.jpg"
              alt="Ihlen Rundt 2026"
              fill
              sizes="100vw"
              className="object-cover"
              unoptimized
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            
            <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12">
              {isEarlyBird && (
                <div className="inline-block px-4 py-2 bg-green-500 rounded-full mb-4 w-fit animate-pulse">
                  <span className="text-sm font-bold text-white tracking-wide uppercase">
                    🎉 Early Bird - Spar penger!
                  </span>
                </div>
              )}
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4">
                Ihlen Rundt 2026
              </h1>
              
              <p className="text-xl sm:text-2xl text-white/90 max-w-2xl mb-6">
                Lavterskelløp for alle! Et sosialt og uhøytidelig løp uten tidtaking – perfekt for både mosjonister og turgåere.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-white font-semibold">Søndag 6. september 2026</span>
                </div>
                
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-white font-semibold">Askim sentrum</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Early Bird Alert */}
        {isEarlyBird && (
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 mb-12 shadow-xl">
            <div className="flex items-start gap-4">
              <div className="text-4xl">🎯</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Early Bird-påmelding!
                </h3>
                <p className="text-white/90 text-lg mb-3">
                  Meld deg på før 31. desember 2025 og spar penger:
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                    <span className="text-white font-bold">Barn: {earlyBirdPrice.barn} kr</span>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                    <span className="text-white font-bold">Voksne: {earlyBirdPrice.voksne} kr</span>
                  </div>
                </div>
                <p className="text-white/80 text-sm mt-3">
                  Ordinær pris etter 31. desember: Barn {regularPrice.barn} kr, Voksne {regularPrice.voksne} kr
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Registration CTA */}
        <div className="bg-gradient-to-br from-[#FF6B35] to-[#F7931E] dark:from-[#E85A2A] dark:to-[#FF6B35] rounded-3xl shadow-2xl overflow-hidden mb-12">
          <div className="p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="text-white">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  Meld deg på nå!
                </h2>
                <p className="text-lg text-white/90 mb-6">
                  Et sosialt og uhøytidelig 4 km lavterskelløp uten tidtaking. Alle som deltar får medalje sponset av Askim & Spydeberg Sparebank!
                </p>
                
                <div className="flex items-center gap-2 mb-6">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold">
                    Påmeldingsfrist: 1. september 2026
                  </span>
                </div>

                <a
                  href="https://pameldinger.no/e/xgujhe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#FF6B35] rounded-full font-bold text-lg hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Meld deg på her
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>

              {/* Distances */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Distanser
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-white">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="font-bold">🏃</span>
                    </div>
                    <span className="text-lg font-semibold">4 km (Ihlenrunden)</span>
                  </li>
                  <li className="flex items-center gap-3 text-white">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="font-bold">👶</span>
                    </div>
                    <span className="text-lg font-semibold">500 m (barneløp)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Practical Information Grid */}
        <section className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Løypebeskrivelse */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-500/10 dark:bg-blue-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Løypebeskrivelse
              </h2>
            </div>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <div>
                <p className="mb-2">
                  <strong className="text-gray-900 dark:text-white">4 km-runden</strong> følger det vi kaller Ihlenrunden:
                </p>
                <p className="mb-3">
                  Start ved Kiwi Hurrahølet, opp forbi Steinerskolen, mot Krosby, videre inn til rundkjøringen ved Romskollen, forbi Shuckertlinna, og fortsetter ned til mål ved Kiwi.
                </p>
                <a
                  href="https://strava.app.link/OhEGRYSPLWb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#FF6B35] hover:text-[#E85A2A] font-semibold transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Se løypekart for 4 km
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <p className="mb-3">
                  <strong className="text-gray-900 dark:text-white">Barneløpet (ca. 500 m)</strong> går en runde rundt Kiwi.
                </p>
                <a
                  href="https://strava.app.link/iDiu0UVPLWb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#FF6B35] hover:text-[#E85A2A] font-semibold transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Se løypekart for barneløpet
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Tidspunkter */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-500/10 dark:bg-purple-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Tidspunkter
              </h2>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-20 flex-shrink-0 font-bold text-[#FF6B35]">12:00</div>
                <div className="text-gray-600 dark:text-gray-400">
                  <strong className="text-gray-900 dark:text-white">Start barneløpet (500 m)</strong>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-20 flex-shrink-0 font-bold text-[#FF6B35]">12:45</div>
                <div className="text-gray-600 dark:text-gray-400">
                  <strong className="text-gray-900 dark:text-white">Start Ihlen Rundt (4 km)</strong>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-green-500/10 dark:bg-green-500/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Påmeldingsavgift
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-2 border-green-500 rounded-xl p-6 bg-green-50 dark:bg-green-900/10">
              <div className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2 uppercase tracking-wide">
                Early Bird (før 31. des 2025)
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">Barn (500 m)</span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">{earlyBirdPrice.barn} kr</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">Voksne (4 km)</span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">{earlyBirdPrice.voksne} kr</span>
                </div>
              </div>
            </div>

            <div className="border-2 border-gray-300 dark:border-gray-600 rounded-xl p-6">
              <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
                Ordinær pris (etter 31. des 2025)
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">Barn (500 m)</span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">{regularPrice.barn} kr</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">Voksne (4 km)</span>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">{regularPrice.voksne} kr</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ihlen Rundt Trøya */}
        <section className="bg-gradient-to-br from-[#FF6B35] to-[#F7931E] dark:from-[#E85A2A] dark:to-[#FF6B35] rounded-2xl shadow-lg p-8 mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="text-5xl">👕</div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white mb-3">
                Ihlen Rundt-trøya 2026
              </h2>
              <p className="text-white/90 text-lg mb-4">
                For de som vil ta med seg litt av løpsfølelsen hjem, tilbyr vi den offisielle Ihlen Rundt-trøya 2026 – en lett og komfortabel teknisk t-skjorte med løpets farger og logo. Perfekt både under løpet, på trening eller som et minne fra dagen.
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-2xl font-bold text-white">220 kr</span>
                </div>
                <ul className="space-y-2 text-white/90">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Må forhåndsbestilles senest én måned før løpet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Bestilles enkelt sammen med påmeldingen</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Info Grid */}
        <section className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 bg-[#FF6B35]/10 dark:bg-[#FF6B35]/20 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#FF6B35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Ingen tidtaking
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Dette er et lavterskelløp uten tidtaking. Perfekt for mosjonister og turgåere!
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 bg-yellow-500/10 dark:bg-yellow-500/20 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Medalje til alle
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Alle deltakere får medalje! Sponset av Askim & Spydeberg Sparebank.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 bg-red-500/10 dark:bg-red-500/20 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Mat og drikke
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Gratis vafler, frukt og drikke til alle deltakere etter løpet!
            </p>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 lg:p-12 border border-gray-100 dark:border-gray-700">
          <div className="text-5xl mb-6">📧</div>
          
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Har du spørsmål?
          </h2>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Kontakt oss hvis du lurer på noe om arrangementet eller påmeldingen.
          </p>
          
          <a
            href="mailto:ihlenslk@gmail.com"
            className="inline-block px-8 py-4 bg-[#FF6B35] text-white rounded-full font-semibold hover:bg-[#E85A2A] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Send oss en e-post
          </a>
        </section>
      </main>
    </div>
  );
}
