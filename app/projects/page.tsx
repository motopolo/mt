import Layout from '../../components/Layout';
import Card from '../../components/ui/Card';
import Tag from '../../components/ui/Tag';
import Link from 'next/link';
import { projects } from '../../data/projects';

export const metadata = { title: 'Projects' };

export default function ProjectsPage() {
  return (
    <Layout>
      <section className="py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <Link href={`/projects/${p.slug}`} key={p.slug}>
              <Card>
                <img src={p.image} alt="" className="mb-4 h-40 w-full rounded-md object-cover" />
                <h3 className="text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{p.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}