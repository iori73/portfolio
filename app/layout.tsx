// /Users/i_kawano/Documents/portfolio/app/layout.tsx

// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Header from '@/src/compositions/Header';
import Footer from '@/src/compositions/Footer';

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
  icons: {
    icon: '/icon.svg',
    // apple: '/apple-touch-icon.png', // iOS向けアイコンがある場合など
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[white] text-[#051404]">
        <Header />
        <main className="max-w-6xl mx-auto px-6 my-24 md:mt-28 md:mb-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
