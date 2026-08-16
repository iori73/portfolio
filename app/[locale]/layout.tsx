// app/[locale]/layout.tsx - Locale-specific layout
import Header from '@/src/compositions/Header';
import Footer from '@/src/compositions/Footer';
import { MenuProvider } from '@/src/contexts/MenuContext';
import { TransitionProvider } from '@/src/contexts/TransitionContext';
import TransitionOverlay from '@/src/components/TransitionOverlay';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import { buildPageMetadata } from '@/src/lib/pageMetadata';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/**
 * トップページのメタデータ。canonical はここで出すが、**子ルートは必ず自分の
 * layout.tsx で上書きすること**。上書きしないと、そのページがトップの canonical を
 * 継いで「トップと同じページ」と主張してしまう。
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    path: '',
    locale,
    title: { en: 'Iori Kawano — UI/UX Designer', jp: '河野いおり — UI/UX デザイナー' },
    description: {
      en: 'Portfolio of Iori Kawano, a UI/UX designer who thinks in systems and ships in code. Bilingual design and development case studies.',
      jp: 'システムで考え、コードまで届けるUI/UXデザイナー、河野いおりのポートフォリオ。日英のデザイン・開発ケーススタディ。',
    },
    isLocaleRoot: true,
  });
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering for this locale segment (next-intl). Without this,
  // getMessages() reads request headers and forces every route to render
  // dynamically — which makes each tab click a server round-trip.
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <TransitionProvider>
        <MenuProvider>
          <Header />
          <main className="max-w-6xl mx-auto px-6">{children}</main>
          <Footer />
          <TransitionOverlay />
        </MenuProvider>
      </TransitionProvider>
    </NextIntlClientProvider>
  );
}

