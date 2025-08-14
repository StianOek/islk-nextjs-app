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
      {/* Info section */}
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
        <SegmentStats segment={segment} />
      </div>

      {/* Interactive Map */}
      <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-4 w-[300px] h-[200px]">
        {/*
         * We pass the encoded polyline to the dynamically imported map component.
         * The map will only render after the component has been hydrated on the client.
         */}
        <SegmentMap encoded={segment.map.polyline} />
      </div>
    </section>
  );
}
