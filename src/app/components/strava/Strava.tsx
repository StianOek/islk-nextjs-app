"use client";

import {
  ClubActivity,
  StravaClub,
  StravaSegment,
} from "@/app/types/strava_types";
import { useState, useEffect } from "react";
import ClubActivitiesGrid from "./ClubActivitiesGrid";
import ClubCard from "./ClubCard";
import SegmentsGrid from "./segments/SegmentsGrid";
import RundenCard from "./segments/RundenCard";

export default function StravaPage() {
  const [segments, setSegments] = useState<StravaSegment[]>([]);
  const [club, setClub] = useState<StravaClub | null>(null);
  const [activities, setActivities] = useState<ClubActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/api/strava/segments").then((res) => res.json()),
      fetch("/api/strava/clubs").then((res) => res.json()),
    ])
      .then(([segmentsData, clubData]) => {
        setSegments(segmentsData.segments || []);
        setClub(clubData.club || null);
        setActivities(clubData.activities || []);
      })
      .catch((e) => setError(e instanceof Error ? e : new Error("Ukjent feil")))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <p>Laster...</p>;
  if (error) return <p>Feil: {error.message}</p>;

  // Find Runden and separate it
  const runden = segments.find((s) => s.name.toLowerCase().includes("runden"));
  const otherSegments = segments.filter((s) => s.id !== runden?.id);

  return (
    <main className="min-h-screen text-gray-800 dark:text-gray-300 flex flex-col items-center py-10 md:py-16 gap-12 max-w-7xl mx-auto">
      {club && <ClubCard club={club} />}
      <ClubActivitiesGrid activities={activities} />

      <section className="w-full flex flex-col gap-4">
        <h3 className="text-lg font-bold  text-orange-600 dark:text-orange-600">
          Segmenter
        </h3>
        {runden && <RundenCard segment={runden} />}

        {otherSegments.length > 0 && <SegmentsGrid segments={otherSegments} />}
      </section>
    </main>
  );
}
