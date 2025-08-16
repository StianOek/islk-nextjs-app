import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import Link from "next/link";
import { client } from "@/app/lib/sanity";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";

const POST_QUERY = `*[_type == "post" && slug.current == $slug]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const posts = await client.fetch<SanityDocument[]>(
    POST_QUERY,
    await params,
    options
  );
  const post = posts[0];

  if (!post) {
    return (
      <main className="container mx-auto min-h-screen max-w-3xl p-8">
        <p>Post not found.</p>
        <Link
          href="/"
          className="hover:underline flex items-center gap-2 mt-4 text-[#FC5200] font-semibold"
        >
          <FaArrowLeft /> Tilbake til blogg
        </Link>
      </main>
    );
  }

  const postImageUrl = post.image
    ? urlFor(post.image)?.width(1600).height(900).url()
    : null;

  return (
    <main className="bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen">
      {/* Hero med bilde */}
      {postImageUrl && (
        <div className="relative w-full h-[40vh] md:h-[60vh] overflow-hidden">
          <Image
            src={postImageUrl}
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
              {new Date(post.publishedAt).toLocaleDateString("nb-NO")}
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

        <div className="prose dark:prose-invert max-w-none prose-lg leading-relaxed">
          {Array.isArray(post.body) && <PortableText value={post.body} />}
        </div>
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

      {/* Keyframes for animasjoner */}
    </main>
  );
}
