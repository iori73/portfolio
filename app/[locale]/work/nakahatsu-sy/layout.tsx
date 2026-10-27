import type { Metadata } from 'next';
import { buildPageMetadata } from '@/src/lib/pageMetadata';

/**
 * 詳しい版（/work/nakahatsu）の別バージョン（SY型）。内容が重なるので、検索に出さない
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
      title: { en: 'Nakahatsu Shoten Website (SY-style)', jp: '中初商店 ウェブサイト（SY型）' },
      description: {
        en: 'A short version of the Nakahatsu Shoten case study: overview, the process in numbered steps, status and credits.',
        jp: '中初商店ケーススタディの短い版。概要、番号付きのプロセス、現在の状態、担当の区別。',
      },
      image: 'nakahatsu.jpg',
    }),
    robots: { index: false, follow: false },
  };
}

export default function NakahatsuSyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
