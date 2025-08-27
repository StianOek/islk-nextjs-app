import Link from "next/link";
import Image from "next/image";
import { FaArrowRight, FaMapMarkedAlt, FaInfoCircle } from "react-icons/fa";

export default function EventDetailPage() {
  const event = {
    title: "Ihlen Rundt 2025",
    date: "2025-09-07",
    description: [
      "Bli med på **Ihlen Rundt 2025** – et sosialt og uhøytidelig løp i Askim! Dette er et 4 km lavterskelløp uten tidtaking, perfekt for både mosjonister og turgåere. Alle som deltar, får medalje (sponset av Elektrotjenesten)!",
      "Dette er et lavterskelarrangement hvor det viktigste er å ha det gøy, være aktiv og nyte den sosiale stemningen. Ta med venner og familie – vi gleder oss til å se deg på startstreken!",
      "De 50 første som melder seg på er med i trekningen av premier fra Askim Frukt- og bærpresseri!",
    ],
    registrationLink: "https://pameldinger.no/e/tplwrc",
    courseDetails: {
      title: "Løypebeskrivelse",
      content: [
        "4 km-runden følger det vi liker å kalle «Ihlenrunden»:",
        "Start ved Kiwi Hurrahølet, opp forbi Steinerskolen, mot Krosby, videre innover mot rundkjøringen ved Romskollen, forbi Shuckertlinna, og ned til mål ved Kiwi.",
        "Barneløpet (500 m) går fra krysset opp mot Rom skole og ned til Kiwi.",
      ],
      links: [
        {
          text: "Strava-lenke (4 km)",
          href: "https://strava.app.link/jstj5Ir61Rb",
        },
        {
          text: "Strava-lenke (Barneløpet)",
          href: "https://strava.app.link/CoGg2zp61Rb",
        },
      ],
    },
    practicalInfo: {
      title: "Praktisk info",
      items: [
        {
          label: "Tidspunkt",
          details: [
            "Barneløpet (500 m): Start kl. 12:00",
            "Ihlen Rundt (4 km): Start kl. 12:45",
          ],
        },
        {
          label: "Startkontingent",
          details: ["150 kr for voksne / 100 kr for barn"],
        },
        {
          label: "Påmelding",
          details: ["Forhåndspåmelding eller på løpsdagen"],
        },
        {
          label: "Premiering",
          details: [
            "Medalje til alle – både store og små (sponset av Elektrotjenesten)!",
          ],
        },
        {
          label: "Servering",
          details: [
            "Vi har kiosksalg med kaffe og vafler, samt gratis saft til alle.",
          ],
        },
      ],
    },
  };

  return (
    <div className=" dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen">
      <main className="container mx-auto p-4 md:p-8">
        {/* Hero */}
        <header className="relative w-full h-72 md:h-[420px] rounded-2xl overflow-hidden shadow-xl mb-12">
          <Image
            src="/images/ihlen_runt.webp"
            alt="Bilde av et løp"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-orange-600/20 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg">
              {event.title}
            </h1>
            <span className="inline-block mt-3 bg-[#FC5200] text-white text-sm font-semibold px-4 py-2 rounded-full shadow-md">
              {new Date(event.date).toLocaleDateString("nb-NO", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </header>

        {/* Description */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-10 mb-10 animate-fade-in-up">
          <div className="space-y-6">
            {event.description.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed">
                {p}
              </p>
            ))}

            {event.registrationLink && (
              <Link
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center px-8 py-3 text-base font-bold rounded-xl shadow-md text-white bg-gradient-to-r from-[#FC5200] to-purple-600 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FC5200] transition-all duration-300 hover:scale-105"
              >
                Meld deg på nå
                <FaArrowRight className="ml-3 h-5 w-5" />
              </Link>
            )}
          </div>
        </section>

        {/* Split cards */}
        <section className="grid md:grid-cols-2 gap-8">
          {/* Løype */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#FC5200]/10 rounded-bl-full" />
            <h2 className="flex items-center text-2xl font-bold mb-4 text-[#FC5200]">
              <FaMapMarkedAlt className="mr-2" /> {event.courseDetails.title}
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              {event.courseDetails.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <div className="mt-4 flex flex-col space-y-2">
                {event.courseDetails.links.map((link, i) => (
                  <Link
                    key={i}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FC5200] hover:underline"
                  >
                    {link.text}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Praktisk info */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-24 h-24 bg-purple-600/10 rounded-br-full" />
            <h2 className="flex items-center text-2xl font-bold mb-4 text-purple-600">
              <FaInfoCircle className="mr-2" /> {event.practicalInfo.title}
            </h2>
            <ul className="space-y-5 text-gray-700 dark:text-gray-300">
              {event.practicalInfo.items.map((item, i) => (
                <li key={i}>
                  <span className="font-semibold">{item.label}:</span>
                  <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                    {item.details.map((d, di) => (
                      <li key={di}>{d}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
