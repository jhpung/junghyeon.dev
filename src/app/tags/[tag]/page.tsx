import type { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { PostList } from "@/components/PostList";

interface PageProps {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  return {
    title: `#${decoded}`,
    description: `"${decoded}" 태그가 포함된 글 목록`,
  };
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params;
  const decoded = decodeURIComponent(tag);
  const posts = getAllPosts().filter((post) =>
    post.frontmatter.tags?.includes(decoded)
  );

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8">#{decoded}</h1>
      <PostList posts={posts} />
    </div>
  );
}
