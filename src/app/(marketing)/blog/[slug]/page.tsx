import { use } from "react";
import PostClient from "../PostClient";

export default function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  return <PostClient slug={slug} />;
}
