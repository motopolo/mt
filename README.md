## Shahu Kosamkar — Portfolio

A modern personal portfolio built with Next.js (App Router), TypeScript, Tailwind CSS, MDX, and Framer Motion.

### Tech Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS (dark mode via class)
- MDX for blog (frontmatter + syntax highlighting)
- Framer Motion animations
- Google Fonts: Inter (body), Poppins (headings)

### Getting Started
1. Install deps
```
npm install
```
2. Run dev server
```
npm run dev
```
3. Lint & format
```
npm run lint
npm run format
```
4. Tests
```
npm test
```

### Environment
Create `.env.local` with:
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
SITE_URL=https://your-site-url
```

### MDX Blog
- Add posts in `posts/*.mdx` with frontmatter: `title`, `date`, `tags`, `excerpt`.
- RSS feed at `/rss.xml`.

### Sitemap & robots
- Generated with `next-sitemap` during `npm run build` into `public/`.

### Deployment (Vercel)
- Push this repo to GitHub.
- Import the repo on Vercel.
- Set env vars (`NEXT_PUBLIC_GA_ID`, `SITE_URL`).
- Build command: `npm run build` (default). Output: `.next`.

### Notes
- Replace `public/resume.pdf` with your actual resume PDF.
- Replace images in `public/` and update data in `data/`.
