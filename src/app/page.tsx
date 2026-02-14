import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { PostList } from "@/components/PostList";
import { SITE_DESCRIPTION } from "@/lib/constants";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 5);

  return (
    <div>
      <section className="py-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">안녕하세요</h1>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          {SITE_DESCRIPTION}
        </p>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <section className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">최근 글</h2>
          <Link
            href="/blog"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            모든 글 보기 &rarr;
          </Link>
        </div>
        <PostList posts={posts} />
      </section>
    </div>
  );
}
