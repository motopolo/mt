import Layout from '../../components/Layout';

export const metadata = { title: 'Resume' };

export default function ResumePage() {
  return (
    <Layout>
      <section className="py-12">
        <div className="mb-4 flex justify-end">
          <a href="/resume.pdf" download className="rounded-md bg-secondary px-4 py-2 font-semibold text-white hover:bg-amber-600">Download</a>
        </div>
        <div className="aspect-[1/1.414] w-full overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
          <iframe src="/resume.pdf" title="Resume PDF" className="h-full w-full" />
        </div>
      </section>
    </Layout>
  );
}