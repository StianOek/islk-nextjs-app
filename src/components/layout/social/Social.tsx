import { ReactElement } from "react";
import Image from "next/image";

const Social = (): ReactElement => {
  return (
    <section className="relative w-full py-24 sm:py-32 bg-gradient-to-b from-white via-gray-50 to-white dark:from-[#1A1A1A] dark:via-[#2D2D2D] dark:to-[#1A1A1A] overflow-hidden transition-colors duration-500">
      {/* Subtle background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#FF6B35]/5 dark:bg-[#FF6B35]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#004E89]/5 dark:bg-[#004E89]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Content */}
          <div className="space-y-10">
            {/* Section badge */}
            <div className="inline-block px-4 py-2 bg-[#FF6B35]/10 dark:bg-[#FF6B35]/20 rounded-full">
              <span className="text-sm font-semibold text-[#FF6B35] tracking-wide uppercase">
                Fellesskap
              </span>
            </div>

            {/* Main heading */}
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                Vi er mer enn en løpeklubb
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Vi samles hver uke for en fin løpetur, og alle nivåer er velkomne. 
                Etter turen tar vi oss alltid tid til en prat, en kopp kaffe og masse latter.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#FF6B35]/10 dark:bg-[#FF6B35]/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#FF6B35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Fellesskap & inkludering
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Enten du er nybegynner eller erfaren løper, vil du føle deg hjemme hos oss. 
                    Vi heier på hverandre og bygger vennskap som varer.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-[#F7931E]/10 dark:bg-[#F7931E]/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#F7931E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Mye mer enn løping
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Vi deler historier, tips, kaffe og noen ganger et godt gammeldags sprell. 
                    Nye medlemmer blir raskt en del av gjengen.
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#FF6B35] rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic text-lg">
                Jeg trodde aldri det skulle være så gøy å løpe! Fellesskapet her er gull.
              </p>
            </div>

            {/* CTA */}
            <div className="pt-4">
              <a
                href="#strava-section"
                className="inline-block px-8 py-4 bg-[#FF6B35] text-white rounded-full text-base font-semibold shadow-lg hover:shadow-xl hover:bg-[#E85A2A] transition-all duration-300 cursor-pointer"
              >
                Bli med på neste tur
              </a>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/islk-folka-sosial.png"
                  alt="Sosiale folk i Ihlen Løpeklubb"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6B35]/10 via-transparent to-transparent" />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#F7931E]/20 rounded-full blur-2xl animate-pulse-slow" />
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-[#004E89]/20 rounded-full blur-2xl animate-pulse-slower" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Social;
