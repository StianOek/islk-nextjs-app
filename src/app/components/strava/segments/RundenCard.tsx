"use client";

import { StravaSegment } from "@/app/types/strava_types";
import {
  decodePolyline,
  formatKm,
  formatMeters,
} from "@/app/utils/strava_polyline";

interface RundenCardProps {
  segment: StravaSegment;
}

export default function RundenCard({ segment }: RundenCardProps) {
  const points = decodePolyline(segment.map.polyline);

  // Convert to SVG coordinates
  const padding = 10;
  const width = 300;
  const height = 200;

  const lats = points.map((p) => p[0]);
  const lngs = points.map((p) => p[1]);

  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);

  const scaleX = (lng: number) =>
    ((lng - minLng) / (maxLng - minLng)) * (width - padding * 2) + padding;
  const scaleY = (lat: number) =>
    height -
    (((lat - minLat) / (maxLat - minLat)) * (height - padding * 2) + padding);

  const svgPath = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${scaleX(p[1])} ${scaleY(p[0])}`)
    .join(" ");

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
          <Stat label="Distanse" value={formatKm(segment.distance)} />
          <Stat
            label="Gj.snittlig stigning"
            value={`${segment.average_grade}%`}
          />
          <Stat
            label="Høydestigning"
            value={formatMeters(segment.total_elevation_gain)}
          />
          <Stat
            label="Maks høyde"
            value={formatMeters(segment.elevation_high)}
          />
          <Stat
            label="Antall turer"
            value={segment.effort_count.toLocaleString()}
            className="col-span-2"
          />
        </div>
      </div>

      {/* SVG map */}
      <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="stroke-[#FC5200] dark:stroke-[#FC5200] fill-none"
        >
          <path
            d={svgPath}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={`bg-gray-100 dark:bg-gray-700 rounded-lg p-3 font-semibold text-gray-800 dark:text-gray-300 ${className}`}
    >
      <p className="text-lg">{value}</p>
      <p className="uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {label}
      </p>
    </div>
  );
}
