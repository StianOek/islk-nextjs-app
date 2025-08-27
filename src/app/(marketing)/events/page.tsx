import Link from "next/link";

export default function EventsPage() {
  return (
    <div className="text-gray-900 dark:text-gray-100 min-h-screen dark:bg-gray-950">
      <main className="container mx-auto px-4 md:px-8 py-12">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 py-2 text-transparent bg-clip-text bg-gradient-to-r from-[#FC5200] to-purple-500 animate-gradient">
            Arrangementer
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
            Ihlen Rundt er vårt årlige hovedarrangement som finner sted <br />
            <span className="font-semibold text-[#FC5200]">
              7. september
            </span>{" "}
            hvert år i Askim.
          </p>
        </header>

        {/* Info */}
        <section className="max-w-2xl mx-auto text-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
          <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
            Mer informasjon om løpet finner du i hovedmenyen under{" "}
            <span className="font-semibold">“Ihlen Rundt”</span>.
          </p>
          <Link
            href="/ihlenrundt"
            className="inline-block px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-[#FC5200] to-purple-500 text-white shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Gå til Ihlen Rundt →
          </Link>
        </section>

        {/* Coming soon */}
        <section className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Flere arrangement kommer!</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            Dette er bare starten – etter hvert vil vi legge til flere løp og
            samlinger her. Følg med for oppdateringer!
          </p>
        </section>
      </main>
    </div>
  );
}
