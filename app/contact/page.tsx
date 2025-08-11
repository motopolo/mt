import Layout from '../../components/Layout';

export const metadata = { title: 'Contact' };

export default function ContactPage() {
  return (
    <Layout>
      <section className="mx-auto max-w-xl py-12">
        <div className="rounded-xl border border-neutral-200 p-8 text-center shadow-sm transition hover:shadow-md dark:border-neutral-800">
          <p className="text-lg">Want to collaborate or just say hi?</p>
          <a
            href="mailto:shahukosamkar@example.com"
            className="mt-4 inline-block rounded-md bg-primary px-4 py-2 font-semibold text-white hover:bg-indigo-600"
          >
            Email me: shahukosamkar@example.com
          </a>
        </div>
      </section>
    </Layout>
  );
}