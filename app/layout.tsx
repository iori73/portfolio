// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Header from '@/src/compositions/Header';
import Footer from '@/src/compositions/Footer';
import { Noto_Sans_JP, Space_Mono } from 'next/font/google';
import { MenuProvider } from '@/src/contexts/MenuContext';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getLocale } from 'next-intl/server';

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
    // apple: '/apple-touch-icon.png', // iOS向けアイコンがある場合など
  },
};

// Root layout for next-intl
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${notoSansJP.variable} ${spaceMono.variable}`}>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <MenuProvider>
            <Header />
            <main className="max-w-6xl mx-auto px-6">{children}</main>
            <Footer />
          </MenuProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

