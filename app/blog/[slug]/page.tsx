import Layout from '../../../components/Layout';
import { getAllPosts, getPostBySlug, renderMarkdownToHtml } from '../../../lib/mdx';
import { formatDate } from '../../../lib/utils';

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const { frontmatter } = getPostBySlug(params.slug);
  return { title: frontmatter.title, description: frontmatter.excerpt };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  const html = await renderMarkdownToHtml(post.content);
  return (
    <Layout>
      <article className="prose prose-neutral mx-auto max-w-3xl dark:prose-invert">
        <h1>{post.frontmatter.title}</h1>
        <p className="-mt-4 text-sm text-neutral-600 dark:text-neutral-400">{formatDate(post.frontmatter.date)}</p>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </Layout>
  );
}