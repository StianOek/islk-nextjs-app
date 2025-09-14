"use client";

import { ClubActivity, StravaClub, StravaSegment } from "@/types/strava_types";
import ClubActivitiesGrid from "./ClubActivitiesGrid";
import ClubCard from "./ClubCard";
import RundenCard from "./RundenCard";
import SegmentsGrid from "./SegmentsGrid";
import useFetch from "@/hooks/useFetch";

export default function StravaPage() {
  // Fetch segments
  const {
    data: segments,
    error: errorSegments,
    loading: loadingSegments,
  } = useFetch<StravaSegment[]>("/api/strava/segments");
  console.log(segments);
  // Fetch club data (includes activities)
  const {
    data: clubData,
    error: errorClub,
    loading: loadingClub,
  } = useFetch<{ club: StravaClub; activities: ClubActivity[] }>(
    "/api/strava/clubs"
  );

  if (loadingSegments || loadingClub) return <p>Laster...</p>;
  if (errorSegments || errorClub) return <p>Her ble det en feil.</p>;

  // Find Runden and separate it
  const runden = segments?.find((s) => s.name.toLowerCase().includes("runden"));
  const otherSegments = segments?.filter((s) => s.id !== runden?.id) || [];

  return (
    <main className="min-h-screen text-gray-800 dark:text-gray-300 flex flex-col items-center py-10 md:py-16 gap-12 max-w-7xl mx-auto">
      {clubData?.club && <ClubCard club={clubData.club} />}
      {clubData?.activities && (
        <ClubActivitiesGrid activities={clubData.activities} />
      )}

      <section className="w-full flex flex-col gap-4">
        <h3 className="text-lg font-bold text-orange-600 dark:text-orange-600">
          Segmenter
        </h3>
        {runden && <RundenCard segment={runden} />}
        {otherSegments.length > 0 && <SegmentsGrid segments={otherSegments} />}
      </section>
    </main>
  );
}
