"use client";

import { StravaSegment } from "@/app/types/strava_types";

import SegmentStats from "./SegmentsStats";
import { SegmentMap } from "./SegmentMap";
import { FaStrava } from "react-icons/fa";

interface RundenCardProps {
  segment: StravaSegment;
}

export default function RundenCard({ segment }: RundenCardProps) {
  return (
    <section className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row px-6 py-10 gap-6">
      {/* Info */}
      <div className="flex-1 flex flex-col justify-between ">
        <div>
          <h2 className="text-3xl font-bold text-orange-600 mb-2 truncate">
            {segment.name}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            {segment.city}, {segment.state} • {segment.country}
          </p>
        </div>

        {/* Stats */}
        <SegmentStats segment={segment} />

        {/* Link to Strava */}
        <a
          href={`https://www.strava.com/segments/${segment.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 md:mt-0 "
        >
          <button className="mt-6 flex items-center justify-center w-full sm:justify-start sm:w-auto px-4 py-2 bg-orange-600 text-white rounded-full  shadow-lg hover:bg-orange-700 transition duration-300 cursor-pointer">
            <FaStrava className="mr-2 h-5 w-5" />
            Segment
          </button>
        </a>
      </div>

      {/* Interactive map */}
      {/* This div now holds the dynamically imported SegmentMap component */}
      <div className="flex-1 flex justify-center items-center bg-gray-100 dark:bg-gray-700 rounded-lg min-h-[200px] h-full">
        <SegmentMap encoded={segment.map.polyline} />
      </div>
    </section>
  );
}
