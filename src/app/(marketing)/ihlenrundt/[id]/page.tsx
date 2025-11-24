"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { IhlenRundtEventWithImages } from "@/types/ihlenrundt";

export default function IhlenRundtEventPage() {
  const params = useParams();
  const [event, setEvent] = useState<IhlenRundtEventWithImages | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<number>(0);

  useEffect(() => {
    if (params.id) {
      fetch(`/api/ihlenrundt/events/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setEvent(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error loading event:", error);
          setLoading(false);
        });
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF6B35]"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Arrangement ikke funnet
          </h1>
          <Link
            href="/ihlenrundt"
            className="text-[#FF6B35] hover:underline"
          >
            Tilbake til Ihlen Rundt
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("nb-NO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        {/* Back Button */}
        <Link
          href="/ihlenrundt"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#FF6B35] dark:hover:text-[#FF6B35] mb-8 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Tilbake til Ihlen Rundt
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="inline-block px-4 py-2 bg-[#FF6B35]/10 dark:bg-[#FF6B35]/20 rounded-full mb-4">
            <span className="text-sm font-semibold text-[#FF6B35] tracking-wide uppercase">
              {event.year}
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            {event.title}
          </h1>
          
          <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formatDate(event.date)}</span>
            </div>
            
            {event.participants_count && (
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <span>{event.participants_count} deltakere</span>
              </div>
            )}
            
            {event.weather && (
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
                <span>{event.weather}</span>
              </div>
            )}
          </div>
        </div>

        {/* Main Image Gallery */}
        {event.images && event.images.length > 0 && (
          <section className="mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
              {/* Main Image */}
              <div className="relative h-[400px] lg:h-[600px] bg-gray-100 dark:bg-gray-700">
                <Image
                  src={event.images[selectedImage].image_url}
                  alt={event.images[selectedImage].caption || event.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  unoptimized
                  priority
                />
              </div>
              
              {/* Image Caption */}
              {event.images[selectedImage].caption && (
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50">
                  <p className="text-gray-700 dark:text-gray-300 text-center">
                    {event.images[selectedImage].caption}
                  </p>
                </div>
              )}
              
              {/* Thumbnail Gallery */}
              {event.images.length > 1 && (
                <div className="p-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                  {event.images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setSelectedImage(index)}
                      className={`relative h-20 rounded-lg overflow-hidden border-2 transition-all bg-gray-100 dark:bg-gray-700 ${
                        selectedImage === index
                          ? "border-[#FF6B35] scale-105"
                          : "border-transparent hover:border-gray-300 dark:hover:border-gray-600"
                      }`}
                    >
                      <Image
                        src={image.image_url}
                        alt={image.caption || `Bilde ${index + 1}`}
                        fill
                        sizes="80px"
                        className="object-cover"
                        unoptimized
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Event Details Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Description */}
          {event.description && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Om arrangementet
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {event.description}
              </p>
            </div>
          )}

          {/* Highlights */}
          {event.highlights && event.highlights.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Høydepunkter
              </h2>
              <ul className="space-y-3">
                {event.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#FF6B35] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-[#FF6B35] to-[#F7931E] dark:from-[#E85A2A] dark:to-[#FF6B35] rounded-3xl shadow-xl p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Bli med neste år!
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            Ihlen Rundt arrangeres hvert år 7. september. Følg med for påmelding!
          </p>
          <Link
            href="/ihlenrundt"
            className="inline-block px-8 py-4 bg-white text-[#FF6B35] rounded-full font-semibold hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Tilbake til hovedsiden
          </Link>
        </div>
      </main>
    </div>
  );
}
