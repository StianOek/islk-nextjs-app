import Link from "next/link";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

export default function EventDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  // Hardkodet data for Ihlen Rundt 2025.
  // params.slug brukes ikke, men komponenten beholder strukturen for å passe inn i ruten
  const event = {
    title: "Ihlen Rundt 2025",
    date: "2025-05-18",
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
        "Løypekart og løypeprofil for 4km-runden kan dere finne her:",
        "Barneløpet (500 m) går fra krysset opp mot Rom skole og ned til Kiwi.",
        "Løypekart og løypeprofil for barneløpet kan dere finne her:",
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
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <main className="container mx-auto p-4 md:p-8">
        <header className="py-8 text-center md:py-12">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#FC5200] to-orange-400">
            {event.title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 md:text-xl font-light mb-8">
            Dato: {new Date(event.date).toLocaleDateString("nb-NO")}
          </p>
          <div className="relative w-2xl h-full md:h-96 rounded-xl overflow-hidden shadow-xl mx-auto">
            <Image
              src="/images/ihlen_runt.webp"
              alt="Bilde av et løp"
              fill
              className="object-cover"
            />
          </div>
        </header>

        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 mb-8 mt-12">
          <div className="space-y-6">
            {event.description.map((p, index) => (
              <p key={index} className="text-lg leading-relaxed">
                {p}
              </p>
            ))}

            {event.registrationLink && (
              <Link
                href={event.registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-bold rounded-lg shadow-sm text-white bg-[#FC5200] hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FC5200] transition-colors duration-300"
              >
                Påmelding gjøres her
                <FaArrowRight
                  className="ml-2 -mr-1 h-5 w-5"
                  aria-hidden="true"
                />
              </Link>
            )}
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-[#FC5200]">
              {event.courseDetails.title}
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              {event.courseDetails.content.map((p, index) => (
                <p key={index}>{p}</p>
              ))}
              <div className="space-y-2">
                {event.courseDetails.links.map((link, index) => (
                  <p key={index}>
                    <Link
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FC5200] hover:underline"
                    >
                      {link.text}
                    </Link>
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4 text-[#FC5200]">
              {event.practicalInfo.title}
            </h2>
            <ul className="space-y-4 text-gray-700 dark:text-gray-300">
              {event.practicalInfo.items.map((item, index) => (
                <li key={index}>
                  <span className="font-semibold">{item.label}:</span>
                  <ul className="list-disc list-inside ml-4 mt-1">
                    {item.details.map((detail, detailIndex) => (
                      <li key={detailIndex}>{detail}</li>
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
