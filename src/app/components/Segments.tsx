"use client";

import { useState, useEffect } from "react";
import { StravaClub, StravaSegment } from "../types/strava_types";
import Image from "next/image";

export default function Segments() {
  const [segments, setSegments] = useState<StravaSegment[]>([]);
  const [club, setClub] = useState<StravaClub | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = process.env.NEXT_PUBLIC_STRAVA_ACCESS_TOKEN;
        const segmentIds = [
          process.env.NEXT_PUBLIC_STRAVA_SEGMENT_ID_1,
          process.env.NEXT_PUBLIC_STRAVA_SEGMENT_ID_2,
          process.env.NEXT_PUBLIC_STRAVA_SEGMENT_ID_3,
        ].filter(Boolean);

        const segmentPromises = segmentIds.map((id) =>
          fetch(`https://www.strava.com/api/v3/segments/${id}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          }).then((res) => {
            if (!res.ok)
              throw new Error(`Segment fetch error: ${res.statusText}`);
            return res.json();
          })
        );
        const segmentsData = await Promise.all(segmentPromises);
        setSegments(segmentsData);

        const clubId = process.env.NEXT_PUBLIC_STRAVA_CLUB_ID;
        if (clubId) {
          const clubRes = await fetch(
            `https://www.strava.com/api/v3/clubs/${clubId}`,
            {
              headers: { Authorization: `Bearer ${accessToken}` },
            }
          );
          if (!clubRes.ok)
            throw new Error(`Club fetch error: ${clubRes.statusText}`);
          const clubData = await clubRes.json();
          setClub(clubData);
        }
      } catch (e: unknown) {
        if (e instanceof Error) {
          setError(e);
        } else {
          setError(new Error("En ukjent feil oppstod."));
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-300">
        <p className="text-lg font-medium animate-pulse">Laster data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900 text-red-500 px-4 text-center">
        <p className="text-lg font-medium">Noe gikk galt: {error.message}</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen text-gray-800 dark:text-gray-300 flex flex-col items-center  py-10 md:py-16 gap-12 max-w-7xl mx-auto">
      {/* Club Section */}
      {club && (
        <section
          className="relative w-full rounded-2xl shadow-md"
          aria-label="Strava Club"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
            <Image
              width={1000}
              height={1000}
              src={club.profile}
              alt={`${club.name} profile`}
              className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover shadow-sm p-1"
              loading="lazy"
            />
            <div className="flex-1 text-center md:text-left space-y-3 w-full">
              <h2 className="text-2xl md:text-3xl font-bold text-[#FC5200] dark:text-[#FC5200]">
                {club.name}
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 w-full text-gray-500 dark:text-gray-400 text-sm font-medium max-w-md mx-auto md:mx-0 mt-2">
                <p>
                  <span className="font-semibold text-gray-800 dark:text-gray-300">
                    Sted:
                  </span>{" "}
                  {club.city}, {club.state}, {club.country}
                </p>
                <p>
                  <span className="font-semibold text-gray-800 dark:text-gray-300">
                    Medlemmer:
                  </span>{" "}
                  {club.member_count.toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold text-gray-800 dark:text-gray-300">
                    Idrettstype:
                  </span>{" "}
                  {club.sport_type}
                </p>
                <p>
                  <span className="font-semibold text-gray-800 dark:text-gray-300">
                    Aktivitetstyper:
                  </span>{" "}
                  {club.activity_types.join(", ")}
                </p>
              </div>
              <div className="py-4 hidden lg:block">
                <p>{club.description}</p>
              </div>
              <a
                href={`https://www.strava.com/clubs/${club.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-6 py-2 rounded-full border-2 border-[#FC5200] text-[#FC5200] hover:bg-[#FC5200] hover:text-white font-bold transition-colors duration-300"
              >
                Besøk klubben på Strava
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Segments Section */}
      <section className="w-full  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {segments.map((segment) => (
          <article
            key={segment.id}
            className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow duration-250 flex flex-col"
            tabIndex={0}
            aria-label={`Segment details for ${segment.name}`}
          >
            <h3 className="text-xl md:text-2xl font-semibold mb-2 text-[#FC5200] dark:text-[#FC5200] truncate">
              {segment.name}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4 text-center md:text-left text-sm font-medium truncate">
              {segment.city}, {segment.state} • {segment.country}
            </p>

            <div className="grid grid-cols-2 gap-3 text-center text-sm text-gray-800 dark:text-gray-300 font-semibold">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                <p className="text-lg">
                  {(segment.distance / 1000).toFixed(2)} km
                </p>
                <p className="uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Distanse
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                <p className="text-lg">{segment.average_grade}%</p>
                <p className="uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Gj.snittlig stigning
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                <p className="text-lg">
                  {segment.total_elevation_gain.toFixed(0)} m
                </p>
                <p className="uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Høydestigning
                </p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                <p className="text-lg">{segment.elevation_high.toFixed(0)} m</p>
                <p className="uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Maks høyde
                </p>
              </div>
              <div className="col-span-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                <p className="text-lg">
                  {segment.effort_count.toLocaleString()}
                </p>
                <p className="uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Antall turer
                </p>
              </div>
            </div>

            {/* Local Legend Section */}
            {segment.local_legend && (
              <div className="mt-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-4 text-gray-800 dark:text-gray-300 flex flex-col sm:flex-row items-center gap-4 shadow-inner">
                <img
                  src={segment.local_legend.profile}
                  alt={segment.local_legend.title}
                  className="w-16 h-16 rounded-full border-2 border-gray-200 dark:border-gray-600 shadow-sm object-cover"
                  loading="lazy"
                />
                <div className="text-center sm:text-left">
                  <h4 className="text-lg font-semibold">
                    {segment.local_legend.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {segment.local_legend.effort_description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    Totalt: {segment.local_legend.effort_counts.overall} •
                    Kvinner: {segment.local_legend.effort_counts.female}
                  </p>
                </div>
              </div>
            )}

            <p className="text-center md:text-right text-xs text-gray-500 dark:text-gray-400 mt-4 select-none truncate">
              Oppdatert: {new Date(segment.updated_at).toLocaleDateString()}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}
