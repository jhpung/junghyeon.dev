import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { PostList } from "@/components/PostList";

export const metadata: Metadata = {
  title: "블로그",
  description: "모든 블로그 글 목록",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">블로그</h1>
      <PostList posts={posts} />
    </div>
  );
}
