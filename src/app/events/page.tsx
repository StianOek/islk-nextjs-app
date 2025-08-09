import Link from "next/link";
import Image from "next/image";

export default function EventsPage() {
  // Hardkodet data for alle arrangementer
  const events = [
    {
      _id: "ihlen-rundt-2025",
      title: "Ihlen Rundt 2025",
      slug: { current: "ihlen-rundt-2025" },
      date: "2025-05-18",
      /*  image: {
        // En placeholder-lenke for å vise et bilde
        // Du kan bytte ut denne med en lenke til ditt eget bilde
        url: "https://placehold.co/600x400/FF5733/ffffff?text=Ihlen+Rundt",
        alt: "Bilde av et løp",
      }, */
      excerpt:
        "Bli med på Ihlen Rundt 2025 – et sosialt og uhøytidelig løp i Askim! Dette er et 4 km lavterskelløp uten tidtaking, perfekt for både mosjonister og turgåere. Alle som deltar, får medalje (sponset av Elektrotjenesten)!",
    },
    // Legg til flere arrangementer her i fremtiden
  ];

  return (
    <div className="text-gray-900 dark:text-gray-100">
      <main className="container mx-auto p-4 md:p-8 animate-fade-in-up">
        <header className="py-8 text-center md:py-12">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#FC5200] to-orange-400">
            Arrangementer
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 md:text-xl font-light">
            Kommende og tidligere løp og samlinger
          </p>
        </header>
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <Link
              href={`/events/${event.slug.current}`}
              key={event._id}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {event && (
                <div className="relative w-full h-48 rounded-t-xl overflow-hidden">
                  <Image
                    src={"/images/ihlen_runt.webp"}
                    alt={"ihlen rundt"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-6 flex-grow flex flex-col">
                <h2 className="text-xl font-bold mb-2 group-hover:text-[#FC5200] transition-colors duration-300">
                  {event.title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Dato: {new Date(event.date).toLocaleDateString("nb-NO")}
                </p>
                <p className="mt-4 text-gray-700 dark:text-gray-300 flex-grow">
                  {event.excerpt}
                </p>
                <span className="mt-4 text-[#FC5200] font-semibold group-hover:underline">
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
