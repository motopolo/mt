export type CaseStudy = {
  slug: string;
  title: string;
  summary: string;
  overview: string;
  process: string;
  results: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: 'improving-core-web-vitals',
    title: 'Improving Core Web Vitals for a Content Site',
    summary: 'Reduced LCP by 45% and CLS to near zero using Next.js optimizations.',
    overview: 'The site suffered from slow loading and layout shifts.',
    process: 'Audited with Lighthouse, optimized images, enabled preloading, and removed render-blocking scripts.',
    results: 'Achieved green CWV thresholds on mobile and desktop, increasing engagement by 20%.'
  }
];