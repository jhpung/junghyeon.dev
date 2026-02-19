export interface PostFrontmatter {
  title: string;
  date: string;
  description: string;
  tags: string[];
  published: boolean;
  image?: string;
  readingTime?: string;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  raw: string;
}
