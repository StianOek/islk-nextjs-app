"use client";

import { StravaClub } from "@/types/strava_types";
import Image from "next/image";
import { FaStrava } from "react-icons/fa";

interface ClubCardProps {
  club: StravaClub;
}

export default function ClubCard({ club }: ClubCardProps) {
  return (
    <section
      className="relative w-full bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700"
      aria-label="Strava Club"
    >
      {/* Cover photo background */}
      {club.cover_photo && (
        <div className="absolute inset-0 opacity-5">
          <Image
            src={club.cover_photo}
            alt=""
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="relative p-8 lg:p-10">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="relative">
              <Image
                width={120}
                height={120}
                src={club.profile}
                alt={`${club.name} profile`}
                className="w-28 h-28 lg:w-32 lg:h-32 rounded-2xl object-cover shadow-lg border-4 border-white dark:border-gray-700"
                loading="lazy"
              />
              {club.verified && (
                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#FF6B35] rounded-full flex items-center justify-center border-4 border-white dark:border-gray-800 shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Club Info */}
          <div className="flex-1 text-center lg:text-left space-y-6 w-full">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {club.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                {club.city}, {club.state}
              </p>
            </div>

            {/* Description */}
            {club.description && (
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed max-w-3xl">
                {club.description}
              </p>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {club.member_count.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Medlemmer
                </p>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {club.activity_types.length}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Aktiviteter
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
                  {club.sport_type}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Sport
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {club.private ? "Privat" : "Offentlig"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Type
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <a
                href={`https://www.strava.com/clubs/${club.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#FF6B35] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:bg-[#E85A2A] transition-all duration-300 cursor-pointer"
              >
                <FaStrava className="w-5 h-5" />
                Besøk klubben på Strava
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
