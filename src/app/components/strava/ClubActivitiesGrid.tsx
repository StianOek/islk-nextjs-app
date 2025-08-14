"use client";

import { ClubActivity } from "@/app/types/strava_types";

interface ClubActivitiesGridProps {
  activities: ClubActivity[];
}

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
}

export default function ClubActivitiesGrid({
  activities,
}: ClubActivitiesGridProps) {
  if (!activities.length) {
    return (
      <p className="text-gray-500 dark:text-gray-400 text-sm italic mt-4">
        Ingen aktiviteter funnet
      </p>
    );
  }

  return (
    <section className="w-full mt-4" aria-label="Recent Club Activities">
      <h3 className="text-lg font-bold mb-3 text-[#FC5200] dark:text-[#FC5200]">
        Siste aktiviteter
      </h3>

      {/* Horizontal scroll container */}
      <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
        {activities.map((act, i) => (
          <div
            key={`${act.name}-${i}`}
            className="flex-shrink-0 snap-start bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 w-64 p-4 flex flex-col gap-2 border border-gray-100 dark:border-gray-700 hover:border-[#FC5200]"
          >
            <h4 className="text-base font-semibold truncate">{act.name}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {act.athlete.firstname} {act.athlete.lastname}
            </p>

            <div className="flex justify-between text-sm font-semibold mt-1">
              <div className="text-center">
                <p>{(act.distance / 1000).toFixed(1)} km</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Distanse
                </p>
              </div>
              <div className="text-center">
                <p>{formatTime(act.moving_time)}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Tid</p>
              </div>
              <div className="text-center">
                <p>{act.total_elevation_gain.toFixed(0)} m</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Høyde
                </p>
              </div>
            </div>

            <span className="text-[10px] uppercase tracking-wide text-[#FC5200] mt-auto self-end bg-[#FC5200]/10 px-2 py-0.5 rounded-full">
              {act.sport_type}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
