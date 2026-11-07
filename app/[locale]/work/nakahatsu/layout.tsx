import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { buildPageMetadata } from '@/src/lib/pageMetadata';
import { ARCHIVED_WORK_SLUGS } from '@/src/data/siteRoutes';

// Held back until the client's written OK arrives (see ARCHIVED_WORK_SLUGS).
const isArchived = (ARCHIVED_WORK_SLUGS as readonly string[]).includes('nakahatsu');

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
  const meta = buildPageMetadata({
    path: '/work/nakahatsu',
    locale,
    title: { en: 'Nakahatsu Shoten Website', jp: '中初商店 ウェブサイト制作' },
    description: {
      en: 'A Shopify storefront for a soy sauce and miso maker, in Japanese, English and French. Taken on personally: proposal, design, implementation and client coordination.',
      jp: '醤油・味噌メーカーの Shopify ストアを、日本語・英語・フランス語でつくる案件。個人で受託し、提案・デザイン・実装・先方との進行を担当。',
    },
    image: 'nakahatsu.jpg',
  });
  return isArchived ? { ...meta, robots: { index: false, follow: false } } : meta;
}

export default function NakahatsuLayout({ children }: { children: React.ReactNode }) {
  // Same gate as the other archived work pages: 404 in production unless
  // ENABLE_ARCHIVED_WORK=1; always visible locally.
  if (isArchived && process.env.NODE_ENV === 'production' && process.env.ENABLE_ARCHIVED_WORK !== '1') {
    notFound();
  }
  return children;
}
