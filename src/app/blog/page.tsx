import Link from "next/link";
import Image from "next/image";
import {
  SanityDocument,
  Slug,
  Image as SanityImage,
  PortableTextBlock,
} from "sanity";
import { client } from "../lib/sanity";
import { urlFor } from "../lib/sanity.image";

// Definerer typen for et blogginnlegg for å sikre type-sikkerhet
interface Post extends SanityDocument {
  title: string;
  slug: Slug;
  publishedAt: string;
  image?: SanityImage; // Sanity Image type
  body: PortableTextBlock; // Sanity Portable Text
}

// Spørringen for å hente de siste blogginnleggene
const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, image, body}`;

const options = { next: { revalidate: 30 } };

// Hjelpefunksjon for å hente et utdrag fra innleggets innhold
const getExcerpt = (body: Post["body"]): string => {
  if (!body || !Array.isArray(body)) return "";
  const firstParagraph = body.find(
    (block) => block._type === "block" && block.children
  );
  // Henter de første 150 tegnene av det første avsnittet
  return firstParagraph?.children?.[0]?.text.slice(0, 150) + "..." || "";
};

export default async function IndexPage() {
  const posts = await client.fetch<Post[]>(POSTS_QUERY, {}, options);

  return (
    <div className="text-gray-900 dark:text-gray-100">
      <main className="container mx-auto p-4 md:p-8 animate-fade-in-up">
        <header className="py-8 text-center md:py-12">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#FC5200] to-orange-400">
            BLOGG
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 md:text-xl font-light">
            Siste nytt fra klubben, tips og triks, og inspirasjon
          </p>
        </header>
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Link
              href={`/blog/${post.slug.current}`}
              key={post._id}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {post.image && (
                <div className="relative w-full h-48 rounded-t-xl overflow-hidden">
                  <Image
                    src={urlFor(post.image).url()}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-6 flex-grow flex flex-col">
                <h2 className="text-xl font-bold mb-2 group-hover:text-[#FC5200] transition-colors duration-300">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Publisert:{" "}
                  {new Date(post.publishedAt).toLocaleDateString("nb-NO")}
                </p>
                <p className="mt-4 text-gray-700 dark:text-gray-300 flex-grow">
                  {getExcerpt(post.body)}
                </p>
                <span className="mt-4 text-[#FC5200] font-semibold group-hover:underline">
                  Les mer →
                </span>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}
