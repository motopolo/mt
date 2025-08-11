import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.SITE_URL || 'https://shahukosamkar.vercel.app';
  const routes = ['', '/about', '/projects', '/blog', '/testimonials', '/contact', '/resume'].map((p) => ({ url: `${base}${p || '/'}` }));
  return routes;
}