import { PostCard } from "./PostCard";
import type { Post } from "@/lib/types";

export function PostList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <p className="text-muted-foreground py-8">
        아직 작성된 글이 없습니다.
      </p>
    );
  }

  return (
    <div className="divide-y divide-border/60">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
