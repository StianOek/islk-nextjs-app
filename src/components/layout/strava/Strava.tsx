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

  // Fetch club data (includes activities)
  const {
    data: clubData,
    error: errorClub,
    loading: loadingClub,
  } = useFetch<{ club: StravaClub; activities: ClubActivity[] }>(
    "/api/strava/clubs"
  );

  if (loadingSegments || loadingClub) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#FF6B35] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 dark:text-gray-400">Laster Strava data...</p>
        </div>
      </div>
    );
  }

  if (errorSegments || errorClub) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-600 dark:text-gray-400">Kunne ikke laste Strava data</p>
        </div>
      </div>
    );
  }

  // Find Runden and separate it
  const runden = segments?.find((s) => s.name.toLowerCase().includes("runden"));
  const otherSegments = segments?.filter((s) => s.id !== runden?.id) || [];

  return (
    <div className="space-y-16">
      {/* Club Card */}
      {clubData?.club && (
        <div>
          <ClubCard club={clubData.club} />
        </div>
      )}

      {/* Activities */}
      {clubData?.activities && clubData.activities.length > 0 && (
        <div>
          <ClubActivitiesGrid activities={clubData.activities} />
        </div>
      )}

      {/* Segments Section */}
      {(runden || otherSegments.length > 0) && (
        <section className="space-y-8">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Segmenter
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Utforsk våre favoritt løperuter og se hvem som er Local Legend
            </p>
          </div>

          {/* Runden (featured segment) */}
          {runden && (
            <div>
              <RundenCard segment={runden} />
            </div>
          )}

          {/* Other segments */}
          {otherSegments.length > 0 && (
            <div>
              <SegmentsGrid segments={otherSegments} />
            </div>
          )}
        </section>
      )}
    </div>
  );
}
