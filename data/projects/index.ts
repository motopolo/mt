export type Project = {
  slug: string;
  title: string;
  summary: string;
  image: string;
  tech: string[];
  problem: string;
  solution: string;
  code?: string;
  github?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    slug: 'portfolio-website',
    title: 'Personal Portfolio',
    summary: 'A modern, responsive portfolio built with Next.js and Tailwind CSS.',
    image: '/og-placeholder.png',
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    problem: 'Create a fast, SEO-friendly portfolio.',
    solution: 'Used ISR, semantic HTML, and optimized components.',
    code: `export default function Hello(){ return <div>Hello world</div>; }`,
    github: 'https://github.com/',
    demo: 'https://example.com'
  },
  {
    slug: 'blog-platform',
    title: 'MDX Blog Platform',
    summary: 'A content-driven blog using MDX and Next.js App Router.',
    image: '/og-placeholder.png',
    tech: ['Next.js', 'MDX', 'TypeScript'],
    problem: 'Author posts in Markdown with components.',
    solution: 'MDX with syntax highlighting and frontmatter.',
  },
  {
    slug: 'ecommerce-ui',
    title: 'E-commerce UI Kit',
    summary: 'Reusable UI components for e-commerce apps.',
    image: '/og-placeholder.png',
    tech: ['React', 'Tailwind'],
    problem: 'Build fast without repeating UI work.',
    solution: 'Abstracted common patterns into components.',
  },
  {
    slug: 'node-api',
    title: 'Node.js API',
    summary: 'A REST API boilerplate with authentication.',
    image: '/og-placeholder.png',
    tech: ['Node.js', 'Express', 'JWT'],
    problem: 'Securely expose data.',
    solution: 'Token-based auth and validation layers.',
  },
  {
    slug: 'realtime-chat',
    title: 'Realtime Chat App',
    summary: 'A chat application with WebSocket-based updates.',
    image: '/og-placeholder.png',
    tech: ['React', 'Socket.io', 'Node.js'],
    problem: 'Realtime messaging at scale.',
    solution: 'WebSockets and efficient message handling.',
  },
  {
    slug: 'design-system',
    title: 'Design System',
    summary: 'A token-driven themeable design system.',
    image: '/og-placeholder.png',
    tech: ['React', 'Tailwind', 'Storybook'],
    problem: 'Consistent UI across apps.',
    solution: 'Documented components and tokens.',
  },
  {
    slug: 'analytics-dashboard',
    title: 'Analytics Dashboard',
    summary: 'Data visualization dashboard with charts.',
    image: '/og-placeholder.png',
    tech: ['Next.js', 'D3', 'Tailwind'],
    problem: 'Show insights clearly.',
    solution: 'Built charts and filters with accessibility in mind.',
  }
];