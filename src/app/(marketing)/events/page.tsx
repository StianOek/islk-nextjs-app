import Link from "next/link";

export default function EventsPage() {
  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-[#FF6B35]/10 dark:bg-[#FF6B35]/20 rounded-full mb-6">
            <span className="text-sm font-semibold text-[#FF6B35] tracking-wide uppercase">
              Arrangementer
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-8">
            <span className="text-gray-900 dark:text-white">Våre</span>
            <br />
            <span className="text-[#FF6B35] bg-gradient-to-r from-[#FF6B35] to-[#F7931E] bg-clip-text text-transparent">
              Arrangementer
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Ihlen Rundt er vårt årlige hovedarrangement som finner sted{" "}
            <span className="font-semibold text-[#FF6B35]">7. september</span>{" "}
            hvert år i Askim.
          </p>
        </header>

        {/* Main Event Card */}
        <section className="max-w-3xl mx-auto mb-20">
          <div className="bg-gradient-to-br from-[#FF6B35] to-[#F7931E] dark:from-[#E85A2A] dark:to-[#FF6B35] rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-8 lg:p-12 text-white text-center">
              <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <span className="text-sm font-semibold uppercase tracking-wide">
                  🏃 Hovedarrangement
                </span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                Ihlen Rundt
              </h2>
              
              <p className="text-xl text-white/90 mb-8 max-w-xl mx-auto">
                Vårt årlige mosjonistløp for hele familien. Et lavterskel arrangement 
                hvor alle kan delta, uansett nivå.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/ihlenrundt"
                  className="px-8 py-4 bg-white text-[#FF6B35] rounded-xl font-semibold hover:bg-white/90 transition-all duration-300 shadow-lg cursor-pointer"
                >
                  Les mer om Ihlen Rundt
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="text-center">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 lg:p-12 border border-gray-100 dark:border-gray-700 max-w-3xl mx-auto">
            <div className="text-5xl mb-6">📅</div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Flere arrangementer kommer!
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
              Dette er bare starten. Vi planlegger flere løp, sosiale samlinger 
              og aktiviteter. Følg med for oppdateringer!
            </p>
            
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              {["Sosiale løp", "Treningssamlinger", "Kaffe & prat"].map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-[#FF6B35]/10 dark:bg-[#FF6B35]/20 text-[#FF6B35] rounded-full text-sm font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
