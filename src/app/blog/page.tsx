import type { Metadata } from "next";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { TagFilter } from "@/components/TagFilter";

export const metadata: Metadata = {
  title: "블로그",
  description: "모든 블로그 글 목록",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const allTags = getAllTags();

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">
        블로그
      </h1>
      <TagFilter posts={posts} allTags={allTags} />
    </div>
  );
}
