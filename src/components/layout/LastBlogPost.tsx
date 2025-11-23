"use client";

import React from "react";
import useFetch from "@/hooks/useFetch";
import Image from "next/image";
import Link from "next/link";
import { FiCalendar, FiArrowRight } from "react-icons/fi";

export interface Post {
  id: number;
  title: string;
  slug: string;
  published_at: string;
  image_url?: string;
  excerpt?: string;
  body: string;
}

export default function LastBlogPost(): React.ReactElement {
  const { data: posts, loading } = useFetch<Post[]>("/api/posts");

  return (
    <section className="py-24 sm:py-32 bg-gradient-to-b from-white via-gray-50 to-white dark:from-[#1A1A1A] dark:via-[#2D2D2D] dark:to-[#1A1A1A] transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="inline-block px-4 py-2 bg-[#FF6B35]/10 dark:bg-[#FF6B35]/20 rounded-full mb-4">
              <span className="text-sm font-semibold text-[#FF6B35] tracking-wide uppercase">
                Blogg
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white">
              Siste innlegg
            </h2>
          </div>
          
          <Link
            href="/blog"
            className="hidden sm:flex items-center gap-2 px-6 py-3 bg-[#FF6B35]/10 dark:bg-[#FF6B35]/20 text-[#FF6B35] rounded-xl font-semibold hover:bg-[#FF6B35] hover:text-white transition-all duration-300 cursor-pointer"
          >
            Se alle
            <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* State: Loading */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-[#FF6B35] border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-600 dark:text-gray-400">Laster innlegg...</p>
            </div>
          </div>
        ) : posts && posts.length > 0 ? (
          <>
            <div className="grid gap-8 md:grid-cols-2">
              {posts.slice(0, 2).map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-[#FF6B35] overflow-hidden flex flex-col"
                >
                  {/* Featured Image */}
                  {post.image_url && (
                    <div className="relative h-56 w-full overflow-hidden">
                      <Image
                        width={600}
                        height={400}
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-grow">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <FiCalendar className="w-4 h-4" />
                      <span>
                        {new Date(post.published_at).toLocaleDateString("nb-NO", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-[#FF6B35] transition-colors duration-300 mb-3 line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3 flex-grow">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Read More */}
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                      <span className="inline-flex items-center gap-2 text-[#FF6B35] font-semibold group-hover:gap-3 transition-all duration-300">
                        Les mer
                        <FiArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile "Se alle" button */}
            <div className="sm:hidden mt-8 text-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF6B35] text-white rounded-xl font-semibold hover:bg-[#E85A2A] transition-all duration-300 shadow-lg cursor-pointer"
              >
                Se alle innlegg
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-12 border border-gray-100 dark:border-gray-700 max-w-2xl mx-auto">
              <div className="text-5xl mb-6">📝</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ingen bloggposter enda
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Vi jobber med å lage innhold. Kom tilbake snart!
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
