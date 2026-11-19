import type { Metadata } from 'next';
import { buildPageMetadata } from '@/src/lib/pageMetadata';

/**
 * 中初商店ケーススタディの公開ページ（2026-11-07 から、旧 SY 型のページがこの URL）。
 * 以前の詳しい版は nakahatsu-detail に移して、本番では到達不能にしてある
 * （siteRoutes.ts の ARCHIVED_WORK_SLUGS）。
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({
    path: '/work/nakahatsu',
    locale,
    title: { en: 'Nakahatsu Shoten Website', jp: '中初商店 ウェブサイト制作' },
    description: {
      en: 'A Shopify storefront for a soy sauce and miso maker, in Japanese, English and French. Taken on personally: proposal, design, implementation and client coordination.',
      jp: '醤油・味噌メーカーの Shopify ストアを、日本語・英語・フランス語でつくる案件。個人で受託し、提案・デザイン・実装・先方との進行を担当。',
    },
    image: 'nakahatsu.jpg',
  });
}

export default function NakahatsuLayout({ children }: { children: React.ReactNode }) {
  return children;
}
