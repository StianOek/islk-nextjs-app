"use client";

import { StravaSegment } from "@/types/strava_types";

interface SegmentStatsProps {
  segment: StravaSegment;
  isLight?: boolean;
}

export default function SegmentStats({ segment, isLight = false }: SegmentStatsProps) {
  const textColor = isLight 
    ? "text-white" 
    : "text-gray-900 dark:text-white";
  const subTextColor = isLight 
    ? "text-white/80" 
    : "text-gray-600 dark:text-gray-400";

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className={`text-2xl font-bold ${textColor}`}>
          {(segment.distance / 1000).toFixed(2)}
        </p>
        <p className={`text-sm ${subTextColor} mt-1`}>km</p>
      </div>
      <div>
        <p className={`text-2xl font-bold ${textColor}`}>
          {segment.average_grade.toFixed(1)}%
        </p>
        <p className={`text-sm ${subTextColor} mt-1`}>Stigning</p>
      </div>
      <div>
        <p className={`text-2xl font-bold ${textColor}`}>
          {segment.total_elevation_gain.toFixed(0)}
        </p>
        <p className={`text-sm ${subTextColor} mt-1`}>m høyde</p>
      </div>
      <div>
        <p className={`text-2xl font-bold ${textColor}`}>
          {segment.elevation_high.toFixed(0)}
        </p>
        <p className={`text-sm ${subTextColor} mt-1`}>Maks høyde</p>
      </div>
    </div>
  );
}
