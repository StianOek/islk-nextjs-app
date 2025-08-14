"use client";

import { StravaSegment } from "@/app/types/strava_types";
import { SegmentMap } from "./SegmentMap";

import { FaStrava } from "react-icons/fa";
import SegmentStats from "./SegmentsStats";

interface SegmentsGridProps {
  segments: StravaSegment[];
}

export default function SegmentsGrid({ segments }: SegmentsGridProps) {
  if (!segments.length) return null;

  return (
    <section className="w-full flex flex-col gap-6">
      {segments.map((segment) => (
        <article
          key={segment.id}
          className="w-full bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow flex flex-col md:flex-row gap-6"
        >
          {/* Left side: Info and Stats */}
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-[#FC5200] text-2xl mb-2 break-words">
                {segment.name}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm break-words">
                {segment.city}, {segment.state}
              </p>
              <SegmentStats segment={segment} />
            </div>

            {/* Link to Strava */}
            <a
              href={`https://www.strava.com/segments/${segment.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6"
            >
              <button className="mt-6 flex items-center justify-center w-full sm:justify-start sm:w-auto px-4 py-2 bg-[#fc5200] text-white rounded-full  shadow-lg hover:bg-[#fc5400d3] transition duration-300 cursor-pointer">
                <FaStrava className="mr-2 h-5 w-5" />
                Segment
              </button>
            </a>
          </div>

          {/* Right side: Map */}
          <div className="flex-1 flex justify-center items-center bg-gray-100 dark:bg-gray-700 rounded-lg min-h-[200px] h-full">
            <SegmentMap encoded={segment.map.polyline} />
          </div>
        </article>
      ))}
    </section>
  );
}
