"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";

interface Post {
  id: number;
  title: string;
  slug: string;
  published_at: string;
  image_url?: string;
  excerpt?: string;
  body: string; // Stored as HTML or plain text
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  console.log(post);
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${params.slug}`);
        if (!res.ok) throw new Error("Post not found");
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error(err);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="container mx-auto min-h-screen p-8 flex items-center justify-center">
        <p className="text-gray-500">Laster innlegget...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <main className="container mx-auto min-h-screen max-w-3xl p-8">
        <p>Post ikke funnet.</p>
        <Link
          href="/blog"
          className="hover:underline flex items-center gap-2 mt-4 text-[#FC5200] font-semibold"
        >
          <FaArrowLeft /> Tilbake til blogg
        </Link>
      </main>
    );
  }

  const formattedBody = post.body ? post.body.replace(/\n/g, "<br />") : "";

  return (
    <main className="bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen">
      {/* Hero med bilde */}
      {post.image_url && (
        <div className="relative w-full h-[40vh] md:h-[60vh] overflow-hidden">
          <Image
            src={post.image_url}
            alt={post.title}
            fill
            priority
            className="object-cover scale-105 animate-[zoomIn_12s_ease-out_forwards]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white max-w-3xl px-4">
            <h1 className="text-2xl md:text-5xl font-extrabold lg:mb-4 animate-fade-in-up">
              {post.title}
            </h1>

            <p className="text-gray-300 text-sm md:text-base">
              Publisert:{" "}
              {new Date(post.published_at).toLocaleDateString("nb-NO")}
            </p>
          </div>
        </div>
      )}

      {/* Innhold */}
      <article className="container mx-auto max-w-3xl px-4 md:px-8 py-12 animate-fade-in-up">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[#FC5200] font-semibold hover:gap-3 transition-all duration-300 mb-6"
        >
          <FaArrowLeft /> Tilbake til blogg
        </Link>

        {/* Post Content */}
        <div
          className="prose dark:prose-invert max-w-none prose-lg leading-relaxed"
          dangerouslySetInnerHTML={{ __html: formattedBody }}
        />
      </article>

      {/* Footer CTA */}
      <footer className="text-center py-12 bg-gradient-to-r from-[#FC5200] to-orange-500 text-white">
        <p className="text-xl font-semibold">Vil du lese mer?</p>
        <Link
          href="/blog"
          className="mt-4 inline-block px-6 py-3 bg-white text-[#FC5200] rounded-full font-bold shadow-lg hover:bg-gray-100 transition"
        >
          Se alle innlegg →
        </Link>
      </footer>
    </main>
  );
}
