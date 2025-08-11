/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';

export type PostFrontmatter = {
  title: string;
  date: string;
  tags?: string[];
  excerpt?: string;
};

export type Post = {
  slug: string;
  content: string;
  frontmatter: PostFrontmatter;
};

export const POSTS_PATH = path.join(process.cwd(), 'posts');

export function getPostSlugs(): string[] {
  return fs
    .readdirSync(POSTS_PATH)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(POSTS_PATH, `${slug}.mdx`);
  const file = fs.readFileSync(fullPath, 'utf8');
  const { content, data } = matter(file);
  return {
    slug,
    content,
    frontmatter: data as PostFrontmatter,
  };
}

export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .sort((a, b) => (a.frontmatter.date > b.frontmatter.date ? -1 : 1));
}

export async function renderMarkdownToHtml(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse as any)
    .use(remarkGfm as any)
    .use(remarkRehype as any)
    .use(rehypeHighlight as any)
    .use(rehypeStringify as any)
    .process(markdown);
  return String(file);
}