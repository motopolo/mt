import Layout from '../../components/Layout';
import Link from 'next/link';
import { getAllPosts } from '../../lib/mdx';
import { formatDate } from '../../lib/utils';

export const metadata = { title: 'Blog' };

export default function BlogPage() {
  const posts = getAllPosts();
  return (
    <Layout>
      <section className="py-12">
        <ul className="space-y-6">
          {posts.map((p) => (
            <li key={p.slug} className="border-b pb-6 last:border-0 dark:border-neutral-800">
              <Link href={`/blog/${p.slug}`} className="group block">
                <h2 className="text-xl font-semibold group-hover:text-primary">{p.frontmatter.title}</h2>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{formatDate(p.frontmatter.date)}</p>
                {p.frontmatter.excerpt && (
                  <p className="mt-2 text-neutral-700 dark:text-neutral-300">{p.frontmatter.excerpt}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}