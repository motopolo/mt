"use client";
import Link from 'next/link';
import Layout from '../components/Layout';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Container from '../components/ui/Container';
import Tag from '../components/ui/Tag';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import { testimonials } from '../data/testimonials';

export default function HomePage() {
  const recent = projects.slice(0, 3);
  const tPreview = testimonials.slice(0, 2);

  return (
    <Layout>
      <section className="py-16">
        <Container>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
            <h1 className="font-sans text-4xl font-extrabold tracking-tight sm:text-5xl" style={{ fontFamily: 'var(--font-poppins)' }}>
              Shahu Kosamkar
            </h1>
            <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-300">Web Developer • Content Creator • Future IT Professional</p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link href="/projects"><Button>See My Work</Button></Link>
              <a href="/resume.pdf" target="_blank" rel="noreferrer"><Button variant="secondary">Download Resume</Button></a>
            </div>
          </motion.div>
        </Container>
      </section>

      <section className="py-8">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
            {['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'PHP'].map((s) => (
              <Tag key={s} color="accent">{s}</Tag>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-poppins)' }}>Recent Projects</h2>
            <Link href="/projects" className="text-primary">View all</Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((p) => (
              <Link href={`/projects/${p.slug}`} key={p.slug}>
                <Card className="h-full">
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
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold" style={{ fontFamily: 'var(--font-poppins)' }}>Testimonials</h2>
            <Link href="/testimonials" className="text-primary">View all</Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {tPreview.map((t) => (
              <Card key={t.name}>
                <div className="flex items-center gap-4">
                  <img src={t.photo} alt="" className="h-12 w-12 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-xs text-neutral-500">{t.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-neutral-700 dark:text-neutral-300">“{t.text}”</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </Layout>
  );
}