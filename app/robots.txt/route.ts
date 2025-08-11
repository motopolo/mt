import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
  const content = `User-agent: *\nAllow: /\nSitemap: ${process.env.SITE_URL || 'https://shahukosamkar.vercel.app'}/sitemap.xml`;
  return new NextResponse(content, { headers: { 'Content-Type': 'text/plain' } });
}