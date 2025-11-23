"use client";

import { ClubActivity } from "@/types/strava_types";
import { useRef, useEffect, useState } from "react";

interface ClubActivitiesGridProps {
  activities: ClubActivity[];
}

function formatTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
}

export default function ClubActivitiesGrid({
  activities,
}: ClubActivitiesGridProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY !== 0 && scrollRef.current) {
      e.preventDefault();
      scrollRef.current.scrollLeft += e.deltaY;
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    scrollRef.current.style.cursor = 'grabbing';
    scrollRef.current.style.userSelect = 'none';
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
      scrollRef.current.style.userSelect = 'auto';
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
      scrollRef.current.style.userSelect = 'auto';
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Multiply by 2 for faster scrolling
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      const newScrollLeft = direction === 'left' 
        ? scrollRef.current.scrollLeft - scrollAmount
        : scrollRef.current.scrollLeft + scrollAmount;
      
      scrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    checkScroll();
    const scrollElement = scrollRef.current;
    
    if (scrollElement) {
      scrollElement.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
      
      // Initial check after a short delay to ensure content is loaded
      const timer = setTimeout(checkScroll, 100);
      
      return () => {
        scrollElement.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
        clearTimeout(timer);
      };
    }
  }, [activities]);

  if (!activities.length) {
    return (
      <div className="flex items-center justify-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
        <p className="text-gray-500 dark:text-gray-400 text-sm italic">
          Ingen aktiviteter funnet
        </p>
      </div>
    );
  }

  return (
    <section className="w-full" aria-label="Recent Club Activities">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          Siste aktiviteter
        </h3>
        
        {/* Desktop scroll buttons */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`p-2 rounded-lg transition-all duration-200 ${
              canScrollLeft
                ? 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                : 'bg-gray-50 dark:bg-gray-900 text-gray-300 dark:text-gray-600 cursor-not-allowed'
            }`}
            aria-label="Scroll left"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`p-2 rounded-lg transition-all duration-200 ${
              canScrollRight
                ? 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                : 'bg-gray-50 dark:bg-gray-900 text-gray-300 dark:text-gray-600 cursor-not-allowed'
            }`}
            aria-label="Scroll right"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scroll container with gradient indicators */}
      <div className="relative -mx-4 px-4 md:mx-0 md:px-0">
        {/* Left gradient indicator */}
        {canScrollLeft && (
          <div className="hidden md:block absolute left-0 top-0 bottom-4 w-20 bg-gradient-to-r from-white dark:from-[#1A1A1A] to-transparent z-10 pointer-events-none" />
        )}

        {/* Right gradient indicator with animated arrow */}
        {canScrollRight && (
          <div className="hidden md:flex absolute right-0 top-0 bottom-4 w-20 bg-gradient-to-l from-white dark:from-[#1A1A1A] to-transparent z-10 pointer-events-none items-center justify-end pr-3">
            <div className="bg-[#FF6B35]/20 dark:bg-[#FF6B35]/30 rounded-full p-2 animate-pulse">
              <svg className="w-4 h-4 text-[#FF6B35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        )}

        {/* Horizontal scroll container */}
        <div
          ref={scrollRef}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth cursor-grab active:cursor-grabbing"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
            touchAction: "pan-x",
          }}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {activities.map((act, i) => (
            <article
              key={`${act.name}-${i}`}
              className="flex-shrink-0 snap-start bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 w-72 p-6 flex flex-col gap-4 border border-gray-100 dark:border-gray-700 hover:border-[#FF6B35] group select-none"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2 flex-1 group-hover:text-[#FF6B35] transition-colors">
                  {act.name}
                </h4>
                <span className="flex-shrink-0 text-xs uppercase tracking-wide text-[#FF6B35] bg-[#FF6B35]/10 px-2.5 py-1 rounded-full font-semibold">
                  {act.sport_type}
                </span>
              </div>

              {/* Athlete */}
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[#FF6B35] to-[#F7931E] rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {act.athlete.firstname.charAt(0)}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  {act.athlete.firstname} {act.athlete.lastname}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <svg className="w-4 h-4 text-[#FF6B35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {(act.distance / 1000).toFixed(1)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
                    km
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <svg className="w-4 h-4 text-[#FF6B35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {formatTime(act.moving_time)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
                    Tid
                  </p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <svg className="w-4 h-4 text-[#FF6B35]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  </div>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {act.total_elevation_gain.toFixed(0)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
                    m
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile scroll hint */}
        {canScrollRight && (
          <div className="md:hidden flex justify-center mt-2">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              <span>Sveip for å se mer</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
