import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import type { Post, PostFrontmatter } from "./types";

const postsDirectory = path.join(process.cwd(), "content/posts");

export function getPostBySlug(slug: string): Post {
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  return {
    slug,
    frontmatter: {
      ...(data as PostFrontmatter),
      readingTime: stats.text,
    },
    raw: content,
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) return [];

  const slugs = fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));

  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post) => {
      if (process.env.NODE_ENV === "production") {
        return post.frontmatter.published !== false;
      }
      return true;
    })
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );

  return posts;
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();
  posts.forEach((post) => {
    post.frontmatter.tags?.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

export const mdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    [
      rehypePrettyCode,
      {
        theme: {
          dark: "github-dark",
          light: "github-light",
        },
      },
    ],
    [
      rehypeAutolinkHeadings,
      {
        behavior: "wrap",
        properties: {
          className: ["anchor"],
        },
      },
    ],
  ],
};
