import Layout from '../../components/Layout';
import Button from '../../components/ui/Button';

export const metadata = { title: 'About' };

export default function AboutPage() {
  return (
    <Layout>
      <section className="mx-auto max-w-3xl py-12">
        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <img src="/profile.svg" alt="Profile photo of Shahu Kosamkar" className="h-32 w-32 rounded-full" />
          <div>
            <h1 className="text-3xl font-semibold" style={{ fontFamily: 'var(--font-poppins)' }}>About Me</h1>
            <p className="mt-3 text-neutral-700 dark:text-neutral-300">
              I am a web developer passionate about building performant, accessible, and delightful web experiences. I create content and continuously learn to become a well-rounded IT professional.
            </p>
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="mt-4 inline-block"><Button variant="secondary">Download Resume</Button></a>
          </div>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          <div>
            <h2 className="font-semibold">Education</h2>
            <ul className="mt-2 list-disc pl-5 text-sm text-neutral-600 dark:text-neutral-400">
              <li>BSc in Information Technology (In progress)</li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold">Experience</h2>
            <ul className="mt-2 list-disc pl-5 text-sm text-neutral-600 dark:text-neutral-400">
              <li>Freelance Web Development</li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold">Goals</h2>
            <ul className="mt-2 list-disc pl-5 text-sm text-neutral-600 dark:text-neutral-400">
              <li>Grow as a full-stack developer and create impactful products.</li>
            </ul>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="mb-4 text-xl font-semibold" style={{ fontFamily: 'var(--font-poppins)' }}>Skills</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'PHP'].map((s) => (
              <div key={s} className="rounded-md border border-neutral-200 p-3 text-center dark:border-neutral-800">{s}</div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}