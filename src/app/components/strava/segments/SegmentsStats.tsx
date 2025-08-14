"use client";

import { StravaSegment } from "@/app/types/strava_types";

interface SegmentStatsProps {
  segment: StravaSegment;
}

export default function SegmentStats({ segment }: SegmentStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 text-sm font-medium text-gray-800 dark:text-gray-300 mt-2">
      <div>
        <p className="text-lg">{(segment.distance / 1000).toFixed(2)} km</p>
        <p className="text-gray-500 dark:text-gray-400">Distanse</p>
      </div>
      <div>
        <p className="text-lg">{segment.average_grade}%</p>
        <p className="text-gray-500 dark:text-gray-400">Stigning</p>
      </div>
      <div>
        <p className="text-lg">{segment.total_elevation_gain.toFixed(0)} m</p>
        <p className="text-gray-500 dark:text-gray-400">Høydestigning</p>
      </div>
      <div>
        <p className="text-lg">{segment.elevation_high.toFixed(0)} m</p>
        <p className="text-gray-500 dark:text-gray-400">Maks høyde</p>
      </div>
    </div>
  );
}
