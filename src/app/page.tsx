import Link from "next/link";
import { Code, Lightbulb, Pencil } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import { PostList } from "@/components/PostList";
import { SITE_DESCRIPTION } from "@/lib/constants";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 5);

  return (
    <div>
      <section className="relative py-12 sm:py-16 overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--foreground) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <p className="text-sm font-mono text-primary mb-3">$ whoami</p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          안녕하세요
        </h1>
        <p className="mt-4 text-muted-foreground leading-relaxed max-w-lg">
          {SITE_DESCRIPTION}
        </p>
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Code className="h-4 w-4 text-primary" />
            개발 노트
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Lightbulb className="h-4 w-4 text-primary" />
            학습 기록
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Pencil className="h-4 w-4 text-primary" />
            실험
          </span>
        </div>
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
