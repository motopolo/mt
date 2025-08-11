import Layout from '../../../components/Layout';
import { caseStudies } from '../../../data/caseStudies';

export async function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const cs = caseStudies.find((c) => c.slug === params.slug);
  return {
    title: cs?.title || 'Case Study',
    description: cs?.summary,
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const cs = caseStudies.find((c) => c.slug === params.slug);
  if (!cs) return <Layout>Case study not found</Layout>;
  return (
    <Layout>
      <article className="prose prose-neutral max-w-none dark:prose-invert">
        <h1>{cs.title}</h1>
        <p className="text-neutral-600 dark:text-neutral-300">{cs.summary}</p>
        <h2>Overview</h2>
        <p>{cs.overview}</p>
        <h2>Process</h2>
        <p>{cs.process}</p>
        <h2>Results</h2>
        <p>{cs.results}</p>
      </article>
    </Layout>
  );
}