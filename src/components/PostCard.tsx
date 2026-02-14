import Link from "next/link";
import { TagBadge } from "./TagBadge";
import type { Post } from "@/lib/types";

export function PostCard({ post }: { post: Post }) {
  const { slug, frontmatter } = post;

  return (
    <article className="py-6 -mx-3 px-3 rounded-lg hover:bg-muted/50">
      <Link href={`/blog/${slug}`} className="group">
        <h2 className="text-lg font-semibold group-hover:text-primary">
          {frontmatter.title}
        </h2>
      </Link>
      <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
        <time dateTime={frontmatter.date}>
          {new Date(frontmatter.date).toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
        {frontmatter.readingTime && <span>· {frontmatter.readingTime}</span>}
      </div>
      {frontmatter.description && (
        <p className="mt-2 text-muted-foreground leading-relaxed">
          {frontmatter.description}
        </p>
      )}
      {frontmatter.tags?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {frontmatter.tags.map((tag) => (
            <TagBadge key={tag} tag={tag} />
          ))}
        </div>
      )}
    </article>
  );
}
