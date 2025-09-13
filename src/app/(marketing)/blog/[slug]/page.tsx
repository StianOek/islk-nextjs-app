import PostClient from "../PostClient";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export default function PostPage({ params }: PostPageProps) {
  return <PostClient slug={params.slug} />;
}
