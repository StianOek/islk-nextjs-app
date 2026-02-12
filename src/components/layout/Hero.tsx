"use client";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-[#FF6B35]/5 dark:bg-[#FF6B35]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#004E89]/5 dark:bg-[#004E89]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-[#FF6B35]/10 dark:bg-[#FF6B35]/20 rounded-full">
                <span className="text-sm font-semibold text-[#FF6B35] tracking-wide uppercase">
                  Lavterskel • Fellesskap • Løpeglede
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight">
                <span className="text-gray-900 dark:text-white">Ihlen</span>
                <br />
                <span className="text-gray-900 dark:text-white font-light">
                  Sosiale
                </span>
                <br />
                <span className="text-[#FF6B35] bg-gradient-to-r from-[#FF6B35] to-[#F7931E] bg-clip-text">
                  Løpeklubb
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Din lokale løpeklubb i Indre Østfold. Vi fokuserer på løpeglede,
                fellesskap og kaffe etterpå – uansett nivå!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#strava-section"
                className="group relative px-8 py-4 bg-[#FF6B35] text-white rounded-full text-base font-semibold shadow-lg hover:shadow-xl hover:bg-[#E85A2A] transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">Se våre løpeturer</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>

              <a
                href="/om-oss"
                className="px-8 py-4 bg-transparent border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-full text-base font-semibold hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all duration-300"
              >
                Les mer om oss
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-[#FF6B35]">50+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Aktive medlemmer
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-[#FF6B35]">1x</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Ukentlig trening
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-[#FF6B35]">100%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Løpeglede
                </div>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative lg:flex justify-center lg:justify-end hidden">
            <div className="relative w-full max-w-lg">
              {/* Main image */}
              <div className="relative aspect-square rounded-3xl overflow-hidden ">
                <Image
                  width={600}
                  height={600}
                  src="/images/islk-folka.png"
                  alt="Ihlen Sosiale Løpeklubb"
                  className="w-full h-full object-cover"
                  priority
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 " />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#F7931E]/20 rounded-full blur-2xl animate-pulse-slow" />
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-[#004E89]/20 rounded-full blur-2xl animate-pulse-slower" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
