// app/layout.tsx - Root layout (minimal)
import type { Metadata } from 'next';
import './globals.css';
import { Noto_Sans_JP, Space_Grotesk } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { getLocale } from 'next-intl/server';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://iori-kawano.vercel.app'),
  title: {
    default: 'Iori Kawano — UI/UX Designer',
    template: '%s — Iori Kawano',
  },
  description:
    'Portfolio of Iori Kawano, a UI/UX designer who thinks in systems and ships in code. Bilingual (EN/JP) design and development case studies.',
  icons: {
    icon: '/icon.svg',
  },
  openGraph: {
    title: 'Iori Kawano — UI/UX Designer',
    description:
      'Portfolio of Iori Kawano, a UI/UX designer who thinks in systems and ships in code.',
    url: 'https://iori-kawano.vercel.app',
    siteName: 'Iori Kawano',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Iori Kawano — UI/UX Designer',
    description:
      'Portfolio of Iori Kawano, a UI/UX designer who thinks in systems and ships in code.',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={`${notoSansJP.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen">
{children}
        <Analytics />
      </body>
    </html>
  );
}
