"use client";

import { StravaClub } from "@/app/types/strava_types";
import Image from "next/image";

interface ClubCardProps {
  club: StravaClub;
}

export default function ClubCard({ club }: ClubCardProps) {
  return (
    <section
      className="relative w-full rounded-2xl shadow-md"
      aria-label="Strava Club"
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
        <Image
          width={1000}
          height={1000}
          src={club.profile}
          alt={`${club.name} profile`}
          className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover shadow-sm p-1"
          loading="lazy"
        />
        <div className="flex-1 text-center md:text-left space-y-3 w-full">
          <h2 className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-600">
            {club.name}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 w-full text-gray-500 dark:text-gray-400 text-sm font-medium max-w-md mx-auto md:mx-0 mt-2">
            <p>
              <span className="font-semibold text-gray-800 dark:text-gray-300">
                Sted:
              </span>{" "}
              {club.city}, {club.state}, {club.country}
            </p>
            <p>
              <span className="font-semibold text-gray-800 dark:text-gray-300">
                Medlemmer:
              </span>{" "}
              {club.member_count.toLocaleString()}
            </p>
            <p>
              <span className="font-semibold text-gray-800 dark:text-gray-300">
                Idrettstype:
              </span>{" "}
              {club.sport_type}
            </p>
            <p>
              <span className="font-semibold text-gray-800 dark:text-gray-300">
                Aktivitetstyper:
              </span>{" "}
              {club.activity_types.join(", ")}
            </p>
          </div>
          <div className="py-4 hidden lg:block">
            <p>{club.description}</p>
          </div>
          <a
            href={`https://www.strava.com/clubs/${club.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-6 py-2 rounded-full border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-bold transition-colors duration-300"
          >
            Besøk klubben på Strava
          </a>
        </div>
      </div>
    </section>
  );
}
