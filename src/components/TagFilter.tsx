"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { PostList } from "@/components/PostList";
import type { Post } from "@/lib/types";

export function TagFilter({
  posts,
  allTags,
}: {
  posts: Post[];
  allTags: string[];
}) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? posts.filter((p) => p.frontmatter.tags?.includes(activeTag))
    : posts;

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="태그 필터">
        <button
          type="button"
          onClick={() => setActiveTag(null)}
          className="cursor-pointer"
        >
          <Badge
            variant={activeTag === null ? "default" : "secondary"}
            className="font-mono"
          >
            전체
          </Badge>
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setActiveTag(tag === activeTag ? null : tag)}
            className="cursor-pointer"
          >
            <Badge
              variant={activeTag === tag ? "default" : "secondary"}
              className="font-mono"
            >
              #{tag}
            </Badge>
          </button>
        ))}
      </div>
      <PostList posts={filtered} />
    </>
  );
}
