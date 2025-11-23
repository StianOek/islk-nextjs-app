import Image from "next/image";

export default function IhlenRundt() {
  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl mb-20">
          <div className="relative h-[400px] lg:h-[500px]">
            <Image
              src="/images/ihlen_runt.webp"
              alt="Ihlen Rundt løp"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12">
              <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4 w-fit">
                <span className="text-sm font-semibold text-white tracking-wide uppercase">
                  🏆 Årlig arrangement
                </span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4">
                Ihlen Rundt
              </h1>
              
              <p className="text-xl sm:text-2xl text-white/90 max-w-2xl">
                Vårt årlige mosjonistløp for hele familien
              </p>
            </div>
          </div>
        </section>

        {/* Thank You Section */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-[#FF6B35] to-[#F7931E] dark:from-[#E85A2A] dark:to-[#FF6B35] rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-8 lg:p-12 text-white text-center">
              <div className="text-6xl mb-6">🎉</div>
              
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Takk for i år!
              </h2>
              
              <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                Årets Ihlen Rundt har vært gjennomført. Takk til alle som deltok 
                og bidro til å gjøre arrangementet vellykket!
              </p>
            </div>
          </div>
        </section>

        {/* Info Grid */}
        <section className="grid md:grid-cols-2 gap-8 mb-20">
          {/* About the Race */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 bg-[#FF6B35]/10 dark:bg-[#FF6B35]/20 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-[#FF6B35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Om løpet
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Ihlen Rundt er et lavterskel mosjonistløp som arrangeres årlig 
              7. september i Askim. Løpet er åpent for alle, uansett alder og nivå.
            </p>
            
            <ul className="space-y-3">
              {[
                "Familievennlig arrangement",
                "Flere distanser å velge mellom",
                "Barneløp for de minste",
                "Premiering og lodtrekning"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#FF6B35] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Next Year */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
            <div className="w-12 h-12 bg-purple-600/10 dark:bg-purple-600/20 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Neste år
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Planleggingen av neste års Ihlen Rundt starter snart. 
              Mer informasjon vil bli publisert her når alt er klart.
            </p>
            
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                📅 Dato: 7. september
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Hold øye med denne siden og våre sosiale medier for oppdateringer!
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 lg:p-12 border border-gray-100 dark:border-gray-700">
            <div className="text-5xl mb-6">📢</div>
            
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Vil du være med å arrangere?
            </h2>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              Vi trenger alltid hjelp til å gjennomføre Ihlen Rundt. 
              Kontakt oss hvis du vil bidra!
            </p>
            
            <a
              href="mailto:ihlenslk@gmail.com"
              className="inline-block px-8 py-4 bg-[#FF6B35] text-white rounded-full font-semibold hover:bg-[#E85A2A] transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
            >
              Send oss en e-post
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
