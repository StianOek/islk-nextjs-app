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
import { FaArrowRight } from "react-icons/fa";

// Definerer typen for et blogginnlegg
interface Post extends SanityDocument {
  title: string;
  slug: Slug;
  publishedAt: string;
  image?: SanityImage;
  body: PortableTextBlock;
}

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt, image, body}`;

const options = { next: { revalidate: 30 } };

// Hjelpefunksjon for utdrag
const getExcerpt = (body: Post["body"]): string => {
  if (!body || !Array.isArray(body)) return "";
  const firstParagraph = body.find(
    (block) => block._type === "block" && block.children
  );
  return firstParagraph?.children?.[0]?.text.slice(0, 150) + "..." || "";
};

export default async function IndexPage() {
  const posts = await client.fetch<Post[]>(POSTS_QUERY, {}, options);

  return (
    <div className=" dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen">
      <main className="container mx-auto p-4 md:p-8">
        <header className="py-8 text-center md:py-12">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#FC5200] to-orange-400">
            BLOGG
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 ">
            Siste nytt fra klubben, tips og triks, og inspirasjon
          </p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Link
              href={`/blog/${post.slug.current}`}
              key={post._id}
              className="group rounded-xl shadow-lg backdrop-blur-md bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ease-out overflow-hidden"
              style={{
                animation: "fadeInUp 0.6s ease both",
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {post.image && (
                <div className="relative w-full h-52 overflow-hidden">
                  <Image
                    src={urlFor(post.image).url()}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                </div>
              )}
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-bold mb-2 group-hover:text-[#FC5200] transition-colors duration-300">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Publisert:{" "}
                  {new Date(post.publishedAt).toLocaleDateString("nb-NO")}
                </p>
                <p className="mt-4 text-gray-700 dark:text-gray-300 flex-grow leading-relaxed">
                  {getExcerpt(post.body)}
                </p>
                <span className="mt-6 inline-flex items-center text-[#FC5200] font-semibold group-hover:gap-2 transition-all duration-300">
                  Les mer{" "}
                  <FaArrowRight className="opacity-0 group-hover:opacity-100 transform translate-x-[-4px] group-hover:translate-x-0 transition-all duration-300" />
                </span>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </div>
  );
}
