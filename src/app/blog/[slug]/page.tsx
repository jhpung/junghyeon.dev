import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug, mdxOptions } from "@/lib/posts";
import { mdxComponents } from "@/components/MDXComponents";
import { TagBadge } from "@/components/TagBadge";
import { AUTHOR_NAME, SITE_NAME, SITE_URL } from "@/lib/constants";
import { extractToc } from "@/lib/toc";
import { TableOfContents } from "@/components/TableOfContents";
import { Comments } from "@/components/Comments";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CopyButton } from "@/components/CopyButton";
import Image from "next/image";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = getPostBySlug(slug);
    const ogImages = post.frontmatter.image
      ? [{ url: post.frontmatter.image }]
      : undefined;
    return {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      authors: [{ name: AUTHOR_NAME }],
      keywords: post.frontmatter.tags,
      alternates: {
        canonical: `${SITE_URL}/blog/${slug}`,
      },
      openGraph: {
        title: post.frontmatter.title,
        description: post.frontmatter.description,
        type: "article",
        publishedTime: post.frontmatter.date,
        url: `${SITE_URL}/blog/${slug}`,
        siteName: SITE_NAME,
        authors: [AUTHOR_NAME],
        tags: post.frontmatter.tags,
        ...(ogImages && { images: ogImages }),
      },
      twitter: {
        card: ogImages ? "summary_large_image" : "summary",
        title: post.frontmatter.title,
        description: post.frontmatter.description,
        ...(ogImages && { images: ogImages }),
      },
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const toc = extractToc(post.raw);

  const { content } = await compileMDX({
    source: post.raw,
    components: mdxComponents,
    options: {
      mdxOptions: mdxOptions as Record<string, unknown>,
    },
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.frontmatter.title,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date,
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
      url: SITE_URL,
    },
    url: `${SITE_URL}/blog/${slug}`,
    ...(post.frontmatter.image && {
      image: `${SITE_URL}${post.frontmatter.image}`,
    }),
    ...(post.frontmatter.tags?.length && {
      keywords: post.frontmatter.tags.join(", "),
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollProgress />
      <article>
        <header className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {post.frontmatter.title}
          </h1>
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <time dateTime={post.frontmatter.date}>
              {new Date(post.frontmatter.date).toLocaleDateString("ko-KR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            {post.frontmatter.readingTime && (
              <>
                <span aria-hidden="true">·</span>
                <span>{post.frontmatter.readingTime}</span>
              </>
            )}
          </div>
          {post.frontmatter.tags?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.frontmatter.tags.map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>
          )}
        </header>

        {post.frontmatter.image && (
          <div className="mb-8 -mx-4 sm:mx-0">
            <Image
              src={post.frontmatter.image}
              alt={post.frontmatter.title}
              width={720}
              height={400}
              className="w-full rounded-lg"
              priority
            />
          </div>
        )}

        <TableOfContents items={toc} />

        <div className="prose prose-gray dark:prose-invert max-w-none">
          {content}
        </div>

        <CopyButton />

        {(() => {
          const allPosts = getAllPosts();
          const currentIndex = allPosts.findIndex((p) => p.slug === slug);
          const newer = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
          const older =
            currentIndex < allPosts.length - 1
              ? allPosts[currentIndex + 1]
              : null;

          if (!newer && !older) return null;

          return (
            <nav
              aria-label="이전/다음 글"
              className="mt-12 grid grid-cols-2 gap-4"
            >
              {older ? (
                <Link
                  href={`/blog/${older.slug}`}
                  className="group flex flex-col gap-1 py-3 transition-colors"
                >
                  <span className="text-xs text-muted-foreground">이전 글</span>
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors line-clamp-2">
                    {older.frontmatter.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
              {newer ? (
                <Link
                  href={`/blog/${newer.slug}`}
                  className="group flex flex-col gap-1 py-3 text-right transition-colors"
                >
                  <span className="text-xs text-muted-foreground">다음 글</span>
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors line-clamp-2">
                    {newer.frontmatter.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </nav>
          );
        })()}

        <hr className="my-12" />
        <Comments />
      </article>
    </>
  );
}
