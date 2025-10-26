// // /Users/i_kawano/Documents/portfolio/app/layout.tsx

// // app/layout.tsx
// import type { Metadata } from 'next';
// import './globals.css';
// import Header from '@/src/compositions/Header';
// import Footer from '@/src/compositions/Footer';
// import Head from 'next/head';
// import { Inter, Merriweather_Sans, Noto_Sans_JP, Space_Mono } from 'next/font/google';

// // Define your fonts
// const merriweather = Merriweather_Sans({
//   subsets: ['latin'],
//   variable: '--font-merriweather',
//   weight: ['300', '400', '500', '600', '700', '800'],
//   style: ['normal', 'italic'],
//   display: 'swap',
// });

// const notoSansJP = Noto_Sans_JP({
//   subsets: ['latin'],
//   variable: '--font-noto-sans-jp',
//   weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
//   display: 'swap',
// });

// const spaceMono = Space_Mono({
//   subsets: ['latin'],
//   variable: '--font-space-mono',
//   weight: ['400', '700'],
//   style: ['normal', 'italic'],
//   display: 'swap',
// });

// export const metadata: Metadata = {
//   title: 'v0 App',
//   description: 'Created with v0',
//   generator: 'v0.dev',
//   icons: {
//     icon: '/icon.svg',
//     // apple: '/apple-touch-icon.png', // iOS向けアイコンがある場合など
//   },
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <Head>
//         {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
//         <link
//           href="https://fonts.googleapis.com/css2?family=Merriweather+Sans:ital,wght@0,300..800;1,300..800&family=Noto+Sans+JP:wght@100..900&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
//           rel="stylesheet"
//         /> */}
//       </Head>
//       <body className="min-h-screen bg-[white] text-[#051404]">
//         <Header />
//         <main className="max-w-6xl mx-auto px-6 my-24 md:mt-28 md:mb-16">{children}</main>
//         <Footer />
//       </body>
//     </html>
//   );
// }

// /Users/i_kawano/Documents/portfolio/app/layout.tsx

// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Header from '@/src/compositions/Header';
import Footer from '@/src/compositions/Footer';
import { Merriweather_Sans, Noto_Sans_JP, Space_Mono, Roboto } from 'next/font/google';
import { LanguageProvider } from '@/src/lib/i18n';

// Define your fonts
const merriweather = Merriweather_Sans({
  subsets: ['latin'],
  variable: '--font-merriweather',
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
});

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

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['400', '500', '700'],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${merriweather.variable} ${notoSansJP.variable} ${spaceMono.variable}`}>
      <body className="min-h-screen">
        <LanguageProvider>
          <Header />
          <main className="max-w-6xl mx-auto px-6">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
