import type { Metadata } from 'next';
import './globals.css';
import '../styles/globals.css';
import { Inter, Poppins } from 'next/font/google';
import Analytics from '../components/Analytics';
import Providers from '../components/Providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'], variable: '--font-poppins' });

export const metadata: Metadata = {
  metadataBase: new URL('https://shahukosamkar.vercel.app'),
  title: {
    default: 'Shahu Kosamkar',
    template: '%s | Shahu Kosamkar',
  },
  description: 'Web Developer • Content Creator • Future IT Professional',
  openGraph: {
    title: 'Shahu Kosamkar',
    description: 'Web Developer • Content Creator • Future IT Professional',
    url: 'https://shahukosamkar.vercel.app',
    siteName: 'Shahu Kosamkar',
    images: [{ url: '/logo.svg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shahu Kosamkar',
    description: 'Web Developer • Content Creator • Future IT Professional',
    images: ['/logo.svg'],
  },
  icons: { icon: '/logo.svg' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}