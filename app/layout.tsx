// app/layout.tsx - Root layout (minimal)
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { Noto_Sans_JP, Space_Mono } from 'next/font/google';

// Define your fonts
const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
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

// Root layout - minimal setup
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${notoSansJP.variable} ${spaceMono.variable}`}>
      <body className="min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
