import { NextResponse } from 'next/server';
import { getAllPosts } from '../../lib/mdx';
import { Feed } from 'feed';

export const dynamic = 'force-static';

export async function GET() {
  const siteUrl = process.env.SITE_URL || 'https://shahukosamkar.vercel.app';
  const feed = new Feed({
    title: 'Shahu Kosamkar Blog',
    id: siteUrl,
    link: siteUrl,
    copyright: `${new Date().getFullYear()} Shahu Kosamkar`,
  });

  const posts = getAllPosts();
  posts.forEach((p) => {
    feed.addItem({
      title: p.frontmatter.title,
      date: new Date(p.frontmatter.date),
      description: p.frontmatter.excerpt,
      id: `${siteUrl}/blog/${p.slug}`,
      link: `${siteUrl}/blog/${p.slug}`,
    });
  });

  return new NextResponse(feed.rss2(), {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
}