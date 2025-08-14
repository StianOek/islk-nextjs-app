"use client";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden h-screen pt-20">
      {/* Fullbredde bakgrunn */}

      {/* Innhold container */}
      <div className="max-w-7xl mx-auto py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          {/* Venstre: Tittel + CTA */}
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
            <div>
              <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 justify-center lg:justify-start">
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

            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0">
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

          {/* Høyre: Bilde */}
          <div className="w-full lg:w-1/2 max-w-sm sm:max-w-md lg:max-w-full h-auto hidden lg:block">
            <Image
              width={1000}
              height={1000}
              src="/images/islk-folka.png"
              alt="Bildet av Ihlen Sosiale Løpeklubb"
              className="w-full h-auto "
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
