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
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
  icons: {
    icon: '/icon.svg',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={`${notoSansJP.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen">
{children}
        <Analytics />
        {/* figma capture - remove after use */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async></script>
      </body>
    </html>
  );
}
