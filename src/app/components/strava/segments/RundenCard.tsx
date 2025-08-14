"use client";

import { StravaSegment } from "@/app/types/strava_types";

import { SegmentMap } from "../SegmentMap";
import SegmentStats from "./SegmentsStats";

interface RundenCardProps {
  segment: StravaSegment;
}

export default function RundenCard({ segment }: RundenCardProps) {
  return (
    <section className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row p-6 gap-6">
      {/* Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold text-[#FC5200] mb-2 truncate">
            {segment.name}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            {segment.city}, {segment.state} • {segment.country}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 text-sm text-center">
          <SegmentStats segment={segment} />
        </div>
      </div>

      {/* Interactive map */}
      {/* This div now holds the dynamically imported SegmentMap component */}
      <div className="flex-1 flex justify-center items-center bg-gray-100 dark:bg-gray-700 rounded-lg min-h-[200px] h-full">
        <SegmentMap encoded={segment.map.polyline} />
      </div>
    </section>
  );
}
