import Link from "next/link";
import Image from "next/image";

export default function EventsPage() {
  // Hardkodet data for alle arrangementer
  const events = [
    {
      _id: "ihlen-rundt-2025",
      title: "Ihlen Rundt 2025",
      slug: { current: "ihlen-rundt-2025" },
      date: "2025-09-07",
      excerpt:
        "Bli med på Ihlen Rundt 2025 – et sosialt og uhøytidelig løp i Askim! Dette er et 4 km lavterskelløp uten tidtaking, perfekt for både mosjonister og turgåere. Alle som deltar, får medalje (sponset av Elektrotjenesten)!",
    },
    // Flere events kan legges til her
  ];

  return (
    <div className="text-gray-900 dark:text-gray-100 min-h-screen  dark:bg-gray-950">
      <main className="container mx-auto px-4 md:px-8 py-12">
        {/* Header */}
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#FC5200] to-purple-500 animate-gradient">
            Arrangementer
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 ">
            Kommende og tidligere løp og samlinger – bli en del av fellesskapet!
          </p>
        </header>

        {/* Grid */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {events.map((event, index) => (
            <Link
              href={`/events/${event.slug.current}`}
              key={event._id}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 ease-out overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Glow-effekt bak kortet */}
              <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 blur-2xl bg-gradient-to-r from-[#FC5200]/40 to-purple-500/40 transition duration-700" />

              {/* Image med dato-badge */}
              <div className="relative w-full h-56 overflow-hidden">
                <Image
                  src={"/images/ihlen_runt.webp"}
                  alt={"ihlen rundt"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute top-3 left-3 bg-[#FC5200] text-white text-xs sm:text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                  {new Date(event.date).toLocaleDateString("nb-NO", {
                    day: "2-digit",
                    month: "short",
                  })}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col">
                <h2 className="text-xl font-bold mb-2 group-hover:text-[#FC5200] transition-colors duration-300">
                  {event.title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {new Date(event.date).toLocaleDateString("nb-NO", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-gray-700 dark:text-gray-300 flex-grow">
                  {event.excerpt}
                </p>
                <span className="mt-4 inline-block font-semibold text-[#FC5200] group-hover:translate-x-2 transition-transform duration-300">
                  Se detaljer →
                </span>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}
