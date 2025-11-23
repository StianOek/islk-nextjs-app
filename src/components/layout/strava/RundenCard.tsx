"use client";

import { StravaSegment } from "@/types/strava_types";
import { SegmentMap } from "./SegmentMap";
import { FaStrava } from "react-icons/fa";
import SegmentStats from "./SegmentsStats";
import { useState } from "react";

interface RundenCardProps {
  segment: StravaSegment;
}

export default function RundenCard({ segment }: RundenCardProps) {
  const [showMapModal, setShowMapModal] = useState(false);

  return (
    <>
      <section className="w-full bg-gradient-to-br from-[#FF6B35] to-[#F7931E] dark:from-[#E85A2A] dark:to-[#FF6B35] rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-8 lg:p-10">
          <div className="flex flex-col gap-8">
            {/* Info */}
            <div className="flex flex-col justify-between text-white">
              <div>
                {/* Badge */}
                <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-4">
                  <span className="text-sm font-semibold uppercase tracking-wide">
                    ⭐ Utvalgt Segment
                  </span>
                </div>

                <h2 className="text-4xl lg:text-5xl font-bold mb-3">
                  {segment.name}
                </h2>
                <p className="text-white/90 text-lg mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {segment.city}, {segment.state}
                </p>
              </div>

              {/* Stats with white background */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                <SegmentStats segment={segment} isLight />
              </div>

              {/* Local Legend */}
              {segment.local_legend && (
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 mb-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={segment.local_legend.profile}
                      alt={segment.local_legend.title}
                      className="w-16 h-16 rounded-full border-3 border-white shadow-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm font-semibold uppercase tracking-wide">
                          Local Legend
                        </span>
                      </div>
                      <p className="text-lg font-bold">
                        {segment.local_legend.title}
                      </p>
                      <p className="text-sm text-white/80">
                        {segment.local_legend.effort_description}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
                <button
                  onClick={() => setShowMapModal(true)}
                  className="flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#FF6B35] rounded-xl font-semibold hover:bg-white/90 transition-all duration-300 shadow-lg cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Se kart
                </button>
                
                <a
                  href={`https://www.strava.com/segments/${segment.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 border-2 border-white/30 cursor-pointer"
                >
                  <FaStrava className="w-5 h-5" />
                  Åpne i Strava
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Modal */}
      {showMapModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowMapModal(false)}
        >
          <div
            className="relative bg-white dark:bg-gray-900 rounded-2xl sm:rounded-3xl shadow-2xl max-w-5xl w-full mx-auto overflow-hidden animate-fade-in max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] p-4 sm:p-6 text-white flex-shrink-0">
              <button
                onClick={() => setShowMapModal(false)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white/80 hover:text-white transition p-2 hover:bg-white/10 rounded-full cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h3 className="text-xl sm:text-2xl font-bold pr-10 sm:pr-12 line-clamp-2">
                {segment.name}
              </h3>
              <p className="text-white/90 mt-1 text-sm sm:text-base">
                {segment.city}, {segment.state}
              </p>
            </div>

            {/* Content - Scrollable */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1">
              {/* Map */}
              <div className="bg-gray-100 dark:bg-gray-800 rounded-xl sm:rounded-2xl overflow-hidden" style={{ height: "min(500px, 50vh)" }}>
                <SegmentMap encoded={segment.map.polyline} />
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4 sm:mt-6">
                <div className="text-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg sm:rounded-xl">
                  <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                    {(segment.distance / 1000).toFixed(2)}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">km</p>
                </div>
                <div className="text-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg sm:rounded-xl">
                  <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                    {segment.average_grade.toFixed(1)}%
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Stigning</p>
                </div>
                <div className="text-center p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg sm:rounded-xl">
                  <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                    {segment.total_elevation_gain.toFixed(0)}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">m høyde</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
