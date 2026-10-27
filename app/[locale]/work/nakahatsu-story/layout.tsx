import type { Metadata } from 'next';
import { buildPageMetadata } from '@/src/lib/pageMetadata';

/**
 * 詳しい版（/work/nakahatsu）の別バージョン。内容が重なるので、検索に出さない
 * （noindex）。canonical は詳しい版に向ける。
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    ...buildPageMetadata({
      path: '/work/nakahatsu',
      locale,
      title: { en: 'Nakahatsu Shoten Website (short version)', jp: '中初商店 ウェブサイト制作（読みやすい版）' },
      description: {
        en: 'A short version of the Nakahatsu Shoten case study: the decisions, one figure each.',
        jp: '中初商店ケーススタディの読みやすい版。判断ごとに図を1枚。',
      },
      image: 'nakahatsu.jpg',
    }),
    robots: { index: false, follow: false },
  };
}

export default function NakahatsuStoryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
