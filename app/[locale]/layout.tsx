// app/[locale]/layout.tsx - Locale-specific layout
import Header from '@/src/compositions/Header';
import Footer from '@/src/compositions/Footer';
import { MenuProvider } from '@/src/contexts/MenuContext';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
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

