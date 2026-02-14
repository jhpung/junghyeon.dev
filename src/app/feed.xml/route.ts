import { Feed } from "feed";
import { getAllPosts } from "@/lib/posts";
import {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  AUTHOR_NAME,
} from "@/lib/constants";

export async function GET() {
  const posts = getAllPosts();

  const feed = new Feed({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    id: SITE_URL,
    link: SITE_URL,
    language: "ko",
    copyright: `© ${new Date().getFullYear()} ${AUTHOR_NAME}`,
    author: {
      name: AUTHOR_NAME,
      link: SITE_URL,
    },
  });

  posts.forEach((post) => {
    feed.addItem({
      title: post.frontmatter.title,
      id: `${SITE_URL}/blog/${post.slug}`,
      link: `${SITE_URL}/blog/${post.slug}`,
      description: post.frontmatter.description,
      date: new Date(post.frontmatter.date),
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
