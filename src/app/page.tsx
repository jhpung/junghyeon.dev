import Link from "next/link";
import { Code, Coffee, Lightbulb, Pencil } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import { PostList } from "@/components/PostList";
import { SITE_DESCRIPTION } from "@/lib/constants";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 5);

  return (
    <div>
      <section className="relative py-6 sm:py-8 overflow-hidden">
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
          6년차 소프트웨어 엔지니어 풍중현입니다.
        </h1>
        <p className="mt-4 text-muted-foreground leading-relaxed max-w-lg">
          {SITE_DESCRIPTION}
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          {[
            { href: "/blog", icon: Code, label: "개발 노트" },
            { href: "/blog", icon: Lightbulb, label: "학습 기록" },
            { href: "/blog", icon: Pencil, label: "실험" },
            { href: "/blog", icon: Coffee, label: "일상" },
          ].map(({ href, icon: Icon, label }) => (
            <Link
              key={label}
              href={href}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground hover:bg-primary/5"
            >
              <Icon className="h-3.5 w-3.5 text-primary" />
              {label}
            </Link>
          ))}
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
