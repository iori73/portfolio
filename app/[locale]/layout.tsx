// app/[locale]/layout.tsx - Locale-specific layout
import Header from '@/src/compositions/Header';
import Footer from '@/src/compositions/Footer';
import { MenuProvider } from '@/src/contexts/MenuContext';
import { TransitionProvider } from '@/src/contexts/TransitionContext';
import TransitionOverlay from '@/src/components/TransitionOverlay';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
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

