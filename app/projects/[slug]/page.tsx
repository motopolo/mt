import Layout from '../../../components/Layout';
import Tag from '../../../components/ui/Tag';
import { projects } from '../../../data/projects';
import Link from 'next/link';

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  return {
    title: project?.title || 'Project',
    description: project?.summary,
  };
}

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return <Layout>Project not found</Layout>;

  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <Layout>
      <article className="prose prose-neutral max-w-none dark:prose-invert">
        <img src={project.image} alt="" className="mb-6 w-full rounded-xl" />
        <h1 className="!mb-2">{project.title}</h1>
        <p className="!mt-0 text-neutral-600 dark:text-neutral-300">{project.summary}</p>

        <h2>Problem</h2>
        <p>{project.problem}</p>
        <h2>Solution</h2>
        <p>{project.solution}</p>
        <h2>Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        {project.code && (
          <>
            <h2>Code Snippet</h2>
            <pre><code>{project.code}</code></pre>
          </>
        )}

        <div className="mt-6 flex gap-4">
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" className="text-primary">GitHub</a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="text-primary">Live Demo</a>
          )}
        </div>

        <h2 className="mt-10">Related Projects</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <Link key={p.slug} href={`/projects/${p.slug}`} className="block rounded-md border p-4 hover:border-primary dark:border-neutral-800">
              <p className="font-semibold">{p.title}</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{p.summary}</p>
            </Link>
          ))}
        </div>
      </article>
    </Layout>
  );
}