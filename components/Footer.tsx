import Container from './ui/Container';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-200 py-10 text-sm dark:border-neutral-800">
      <Container className="flex flex-col items-center justify-between gap-4 text-neutral-600 sm:flex-row dark:text-neutral-400">
        <p>© {new Date().getFullYear()} Shahu Kosamkar. All rights reserved.</p>
        <nav aria-label="Social links" className="flex gap-4">
          <a href="https://github.com/shahukosamkar" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-primary">GitHub</a>
          <a href="https://www.linkedin.com/in/shahukosamkar" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-primary">LinkedIn</a>
          <a href="https://x.com/shahukosamkar" target="_blank" rel="noreferrer" aria-label="Twitter/X" className="hover:text-primary">X</a>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-primary">Instagram</a>
        </nav>
      </Container>
    </footer>
  );
}