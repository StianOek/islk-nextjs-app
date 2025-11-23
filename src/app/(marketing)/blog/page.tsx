"use client";

import Link from "next/link";
import Image from "next/image";
import { FiEye, FiCalendar } from "react-icons/fi";
import useFetch from "@/hooks/useFetch";
import { Post } from "@/types/posts";

// Helper for excerpt
const getExcerpt = (body: string, excerpt?: string): string => {
  if (excerpt && excerpt.trim() !== "") return excerpt;
  if (!body) return "";
  return body.slice(0, 150) + "...";
};

export default function IndexPage() {
  const { data: posts, loading } = useFetch<Post[]>("/api/posts");

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#FF6B35] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 dark:text-gray-400">Laster innlegg...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-32">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-[#FF6B35]/10 dark:bg-[#FF6B35]/20 rounded-full mb-6">
            <span className="text-sm font-semibold text-[#FF6B35] tracking-wide uppercase">
              Blogg
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-8">
            <span className="text-gray-900 dark:text-white">Siste nytt</span>
            <br />
            <span className="text-[#FF6B35] bg-gradient-to-r from-[#FF6B35] to-[#F7931E] bg-clip-text text-transparent">
              fra klubben
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Tips, historier og inspirasjon fra Ihlen Sosiale Løpeklubb
          </p>
        </header>

        {/* Posts Grid */}
        {!posts || posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-12 border border-gray-100 dark:border-gray-700 max-w-2xl mx-auto">
              <div className="text-5xl mb-6">📝</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ingen innlegg enda
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Vi jobber med å lage innhold. Kom tilbake snart!
              </p>
            </div>
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                href={`/blog/${post.slug}`}
                key={post.id}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-[#FF6B35] overflow-hidden flex flex-col"
              >
                {/* Image */}
                {post.image_url && (
                  <div className="relative w-full h-56 overflow-hidden">
                    <Image
                      src={post.image_url}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-1.5">
                      <FiCalendar className="w-4 h-4" />
                      <span>
                        {new Date(post.published_at).toLocaleDateString("nb-NO", {
                          day: "numeric",
                          month: "short",
                          year: "numeric"
                        })}
                      </span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1.5">
                      <FiEye className="w-4 h-4" />
                      <span>{post.view_count || 0}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#FF6B35] transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed flex-grow line-clamp-3">
                    {getExcerpt(post.body, post.excerpt)}
                  </p>

                  {/* Read More */}
                  <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <span className="inline-flex items-center gap-2 text-[#FF6B35] font-semibold group-hover:gap-3 transition-all duration-300">
                      Les mer
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
