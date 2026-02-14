import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug, mdxOptions } from "@/lib/posts";
import { mdxComponents } from "@/components/MDXComponents";
import { TagBadge } from "@/components/TagBadge";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { extractToc } from "@/lib/toc";
import { TableOfContents } from "@/components/TableOfContents";
import { Comments } from "@/components/Comments";

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
    return {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      openGraph: {
        title: post.frontmatter.title,
        description: post.frontmatter.description,
        type: "article",
        publishedTime: post.frontmatter.date,
        url: `${SITE_URL}/blog/${slug}`,
        siteName: SITE_NAME,
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

  return (
    <>
      <TableOfContents items={toc} />
      <article>
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
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
              <span>· {post.frontmatter.readingTime}</span>
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

        <div className="prose prose-gray dark:prose-invert max-w-none">
          {content}
        </div>

        <hr className="my-12" />
        <Comments />
      </article>
    </>
  );
}
