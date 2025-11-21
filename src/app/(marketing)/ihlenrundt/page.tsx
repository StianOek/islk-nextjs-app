import Image from "next/image";
import { FaCalendarAlt, FaRunning } from "react-icons/fa";

export default function IhlenRundt() {
  return (
    <div className="dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen">
      <main className="container mx-auto p-4 md:p-8">
        {/* Hero */}
        <header className="relative w-full h-72 md:h-[420px] rounded-2xl overflow-hidden shadow-xl mb-12">
          <Image
            src="/images/ihlen_runt.webp"
            alt="Ihlenrundt løp"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-orange-600/40 via-black/30 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg">
              Ihlenrundt
            </h1>
            <p className="text-white text-lg md:text-xl mt-2 drop-shadow-md">
              Det årlige løpet til Ihlen Sosiale Løpeklubb
            </p>
          </div>
        </header>

        {/* Main content */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 md:p-12 mb-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#FC5200]/10 mb-4">
              <FaRunning className="text-4xl text-[#FC5200]" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
              Takk for i år!
            </h2>
            
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              Årets Ihlenrundt har vært gjennomført. Takk til alle som deltok og bidro til å gjøre arrangementet vellykket!
            </p>

            <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-600/10 mb-4">
                <FaCalendarAlt className="text-3xl text-purple-600" />
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Neste år kommer snart
              </h3>
              
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Mer informasjon om neste års Ihlenrundt vil bli publisert her når planleggingen er i gang.
              </p>
              
              <p className="text-base text-gray-600 dark:text-gray-400 mt-4">
                Hold øye med denne siden og våre sosiale medier for oppdateringer!
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
