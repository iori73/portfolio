import type { Metadata } from 'next';
import { buildPageMetadata } from '@/src/lib/pageMetadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    path: '/experiment/bilingual-books',
    locale,
    title: { en: 'Bilingual Books', jp: 'Bilingual Books' },
    description: {
      en: 'A podcast that reads public-domain classics in Japanese and English, built as one pipeline from rights checks to scheduled release.',
      jp: '公開ドメインの古典を日本語と英語の対訳で聴くポッドキャストです。権利の確認から配信の予約までを、ひとつの仕組みにしました。',
    },
  });
}

export default function BilingualBooksLayout({ children }: { children: React.ReactNode }) {
  return children;
}
