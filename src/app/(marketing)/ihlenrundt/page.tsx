"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { IhlenRundtEventWithImages } from "@/types/ihlenrundt";

export default function IhlenRundt() {
  const [upcomingEvent, setUpcomingEvent] = useState<IhlenRundtEventWithImages | null>(null);
  const [pastEvents, setPastEvents] = useState<IhlenRundtEventWithImages[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/ihlenrundt/events")
      .then((res) => res.json())
      .then((data: IhlenRundtEventWithImages[]) => {
        const upcoming = data.find(e => e.status === "upcoming") || null;
        const past = data.filter(e => e.status === "past");
        setUpcomingEvent(upcoming);
        setPastEvents(past);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading events:", error);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("nb-NO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getDaysUntil = (dateString: string) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        {/* Hero Section with Upcoming Event */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B35]"></div>
          </div>
        ) : upcomingEvent ? (
          <section className="mb-20">
            {/* Hero Image */}
            <div className="relative overflow-hidden rounded-3xl mb-8 shadow-2xl">
              <div className="relative h-[400px] lg:h-[600px] bg-gray-100 dark:bg-gray-700">
                {upcomingEvent.images && upcomingEvent.images.length > 0 && (
                  <Image
                    src={upcomingEvent.images[0].image_url}
                    alt={upcomingEvent.title}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    unoptimized
                    priority
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12">
                  <div className="inline-block px-4 py-2 bg-[#FF6B35] rounded-full mb-4 w-fit animate-pulse">
                    <span className="text-sm font-bold text-white tracking-wide uppercase">
                      🎯 Påmelding åpen
                    </span>
                  </div>
                  
                  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4">
                    {upcomingEvent.title}
                  </h1>
                  
                  <p className="text-xl sm:text-2xl text-white/90 max-w-2xl mb-6">
                    {upcomingEvent.description}
                  </p>

                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-white font-semibold">{formatDate(upcomingEvent.date)}</span>
                    </div>
                    
                    {upcomingEvent.location && (
                      <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-white font-semibold">{upcomingEvent.location}</span>
                      </div>
                    )}

                    {getDaysUntil(upcomingEvent.date) > 0 && (
                      <div className="flex items-center gap-2 bg-[#FF6B35] px-4 py-2 rounded-full">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-white font-bold">{getDaysUntil(upcomingEvent.date)} dager igjen</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Registration CTA Card */}
            <div className="bg-gradient-to-br from-[#FF6B35] to-[#F7931E] dark:from-[#E85A2A] dark:to-[#FF6B35] rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-8 lg:p-12">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="text-white">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                      Meld deg på nå!
                    </h2>
                    <p className="text-lg text-white/90 mb-6">
                      Sikre din plass på Ihlen Rundt {upcomingEvent.year}. Løpet passer for hele familien!
                    </p>
                    
                    {upcomingEvent.registration_deadline && (
                      <div className="flex items-center gap-2 mb-6">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span className="font-semibold">
                          Påmeldingsfrist: {formatDate(upcomingEvent.registration_deadline)}
                        </span>
                      </div>
                    )}

                    <Link
                      href="/ihlenrundt/2026"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#FF6B35] rounded-full font-bold text-lg hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      Meld deg på her
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>

                  {/* Distances */}
                  {upcomingEvent.distances && upcomingEvent.distances.length > 0 && (
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        Distanser
                      </h3>
                      <ul className="space-y-3">
                        {upcomingEvent.distances.map((distance, index) => (
                          <li key={index} className="flex items-center gap-3 text-white">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="font-bold">{index + 1}</span>
                            </div>
                            <span className="text-lg font-semibold">{distance}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="relative overflow-hidden rounded-3xl mb-20">
            <div className="relative h-[400px] lg:h-[500px] bg-gray-100 dark:bg-gray-700">
              <Image
                src="/images/ihlenrundt2025/ihlen_runt.webp"
                alt="Ihlen Rundt løp"
                fill
                sizes="100vw"
                className="object-cover"
                unoptimized
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
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
        )}

        {/* Info Grid */}
        <section className="grid md:grid-cols-3 gap-6 mb-20">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-[#FF6B35]/10 dark:bg-[#FF6B35]/20 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-[#FF6B35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              For hele familien
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Løpet er åpent for alle alder og nivåer. Vi har distanser for både barn og voksne.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-600/10 dark:bg-purple-600/20 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              6. september
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Arrangeres hvert år samme dato. Sett av dagen i kalenderen!
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-green-600/10 dark:bg-green-600/20 rounded-xl flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Kiwi Hurrahølet, Askim
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Start og mål på Kiwi Hurrahølet, Askim. Lett tilgjengelig for alle.
            </p>
          </div>
        </section>

        {/* Previous Events Section */}
        {pastEvents.length > 0 && (
          <section className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  Tidligere arrangement
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Se bilder og resultater fra tidligere års Ihlen Rundt
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event) => (
                <Link
                  key={event.id}
                  href={`/ihlenrundt/${event.id}`}
                  className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Event Image */}
                  <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-gray-700">
                    {event.images && event.images.length > 0 ? (
                      <Image
                        src={event.images[0].image_url}
                        alt={event.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#FF6B35] to-[#F7931E] flex items-center justify-center">
                        <span className="text-6xl">🏃</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-lg">
                      <span className="text-sm font-bold text-[#FF6B35]">{event.year}</span>
                    </div>
                  </div>

                  {/* Event Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-[#FF6B35] transition-colors">
                      {event.title}
                    </h3>
                    
                    {event.description && (
                      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                        {event.description}
                      </p>
                    )}

                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      {event.participants_count && (
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                          </svg>
                          <span>{event.participants_count} deltakere</span>
                        </div>
                      )}
                      {event.images && event.images.length > 0 && (
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                          <span>{event.images.length} bilder</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex items-center gap-2 text-[#FF6B35] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Se bilder</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Contact CTA */}
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
