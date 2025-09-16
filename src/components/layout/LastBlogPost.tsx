"use client";

import React from "react";
import useFetch from "@/hooks/useFetch";
import Image from "next/image";

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
    <section className="py-16 bg-gradient-to-b from-[#f2f2f2] via-[#fffded] to-[#F2F2F2] dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
            Siste bloggposter
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Hold deg oppdatert med våre siste innlegg.
          </p>
        </div>

        {/* State: Loading */}
        {loading ? (
          <p className="text-center text-gray-500">Laster innlegg...</p>
        ) : posts && posts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
            {posts.slice(0, 2).map((post) => (
              <a
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group block bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Featured Image */}
                {post.image_url && (
                  <div className="h-48 w-full overflow-hidden rounded-t-2xl">
                    <Image
                      width={1000}
                      height={1000}
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-orange-600 transition-colors duration-300">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="mt-3 text-gray-600 dark:text-gray-400 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                  <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(post.published_at).toLocaleDateString("no-NO", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            Ingen bloggposter tilgjengelig ennå.
          </p>
        )}
      </div>
    </section>
  );
}
