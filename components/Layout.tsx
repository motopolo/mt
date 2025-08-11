import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import Container from './ui/Container';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main id="content">
        <Container>{children}</Container>
      </main>
      <Footer />
    </>
  );
}