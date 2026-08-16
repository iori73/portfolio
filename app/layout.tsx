// app/layout.tsx - Root layout (minimal)
import type { Metadata } from 'next';
import './globals.css';
import { Noto_Sans_JP, Space_Grotesk } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { getLocale } from 'next-intl/server';
import { toLangTag } from '@/src/lib/locale';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  // Only the weights actually used (JP body=Light/300, Regular/400, headings=Medium/500,
  // nav active=SemiBold/600). Dropping the unused 100/200/700/800/900 cuts font payload.
  weight: ['300', '400', '500', '600'],
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
    // 各ページは src/lib/pageMetadata.ts が自分のカードで上書きする。
    // ここは layout を持たないルートが出てきたときの取りこぼし防止。
    images: [{ url: '/og/default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Iori Kawano — UI/UX Designer',
    description:
      'Portfolio of Iori Kawano, a UI/UX designer who thinks in systems and ships in code.',
    images: ['/og/default.png'],
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();

  return (
    // lang は BCP 47 の言語タグ。URL セグメントの `jp` は国コードなのでそのままは出せない。
    <html lang={toLangTag(locale)} className={`${notoSansJP.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen">
{children}
        <Analytics />
      </body>
    </html>
  );
}
