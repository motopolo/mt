import Layout from '../../components/Layout';
import Card from '../../components/ui/Card';
import { testimonials } from '../../data/testimonials';

export const metadata = { title: 'Testimonials' };

export default function TestimonialsPage() {
  return (
    <Layout>
      <section className="py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
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
      </section>
    </Layout>
  );
}