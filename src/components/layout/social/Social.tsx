import { ReactElement } from "react";
import Image from "next/image";

const Social = (): ReactElement => {
  return (
    <section className="relative w-full py-16 sm:py-20 bg-gradient-to-b from-[#F2F2F2] via-[#FFF0E0] to-[#F2F2F2] dark:from-gray-950 dark:via-gray-800 dark:to-gray-950 overflow-hidden transition-colors duration-500">
      {/* Dekorative elementer */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-2 left-10 w-40 h-40 sm:w-60 sm:h-60 rounded-full animate-spin-slow bg-orange-600/10 dark:bg-orange-600/10"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 sm:w-80 sm:h-80 rounded-full animate-spin-slower bg-orange-600/5 dark:bg-orange-600/10"></div>
      </div>

      {/* Innhold */}
      <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 px-4 sm:px-6">
        {/* Tekst */}
        <div className="flex flex-col w-full lg:w-1/2 space-y-10 z-10 animate-fade-in">
          {/* Intro */}
          <div className="space-y-4 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-orange-600 dark:text-orange-300">
              Vi er mer enn en løpeklubb
            </h2>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-md mx-auto lg:mx-0">
              Vi samles en gang i uken for en fin goggetur, og alle nivåer er
              velkomne. Etter goggeturen tar vi oss alltid tid til en prat, en
              kopp kaffe og masse latter.
            </p>
          </div>

          {/* Fun facts */}
          {/*  <div className="grid grid-cols-1 xs:grid-cols-3 gap-4 sm:gap-6 text-center">
            <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-4 shadow-md">
              <div className="text-2xl sm:text-3xl font-bold text-[#FC5200] dark:text-[#FFA85C]">
                ☕ 12
              </div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                kaffekopper etter hver joggetur
              </p>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-4 shadow-md">
              <div className="text-2xl sm:text-3xl font-bold text-[#FC5200] dark:text-[#FFA85C]">
                😂 ∞
              </div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                sprø historier per uke
              </p>
            </div>
            <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-4 shadow-md">
              <div className="text-2xl sm:text-3xl font-bold text-[#FC5200] dark:text-[#FFA85C]">
                🏃 240+
              </div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                kilometer i måneden
              </p>
            </div>
          </div> */}

          {/* Fellesskap */}
          <div className="space-y-3 text-center lg:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-orange-600 dark:text-orange-300">
              Fellesskap & inkludering
            </h3>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-md mx-auto lg:mx-0">
              Enten du er nybegynner eller erfaren løper, vil du føle deg hjemme
              hos oss. Vi heier på hverandre og bygger vennskap som varer lenge
              etter at skoene er tatt av.
            </p>
          </div>

          {/* Sosialt liv */}
          <div className="space-y-3 text-center lg:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-orange-600 dark:text-orange-300">
              Mye mer enn løping
            </h3>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-md mx-auto lg:mx-0">
              Vi deler historier, tips, kaffe og noen ganger et godt gammeldags
              sprell. Nye medlemmer blir raskt en del av gjengen.
            </p>
          </div>

          {/* Testimonial */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 max-w-md mx-auto lg:mx-0">
            <p className="italic text-gray-700 dark:text-gray-300 text-sm sm:text-base">
              “Jeg trodde aldri det skulle være så gøy å løpe! Fellesskapet her
              er gull.”
            </p>
          </div>

          {/* CTA */}
          <div className="flex justify-center lg:justify-start mt-4">
            <a
              href="#strava-section"
              className="text-white bg-orange-600 px-5 sm:px-6 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold border-2 border-orange-600 hover:bg-white hover:text-orange-600 transition-colors duration-300 shadow-lg dark:text-gray-900 dark:bg-orange-300 dark:border-orange-300 dark:hover:bg-gray-900 dark:hover:text-orange-300"
            >
              Bli med på neste tur
            </a>
          </div>
        </div>

        {/* Bilde */}
        <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end animate-fade-in-up">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] rounded-3xl overflow-hidden shadow-2xl transform rotate-[-3deg] hover:rotate-0 transition-transform duration-700">
            <Image
              src="/images/islk-folka-sosial.png"
              alt="Sosiale folk i Ihlen Løpeklubb"
              fill
              className="object-cover rounded-3xl"
            />
            <div className="absolute -top-6 -left-6 w-16 h-16 sm:w-24 sm:h-24 bg-orange-600/20 dark:bg-orange-600/30 rounded-full animate-pulse-slow"></div>
            <div className="absolute -bottom-6 -right-6 w-20 h-20 sm:w-32 sm:h-32 bg-orange-600/30 dark:bg-orange-600/20 rounded-full animate-pulse-slower"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Social;
