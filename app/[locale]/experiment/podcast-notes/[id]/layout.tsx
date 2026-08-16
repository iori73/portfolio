import type { Metadata } from 'next';
import { localeUrl } from '@/src/data/siteRoutes';

/**
 * 個別のエピソードノートは Notion のライブ内容から描画される派生コンテンツで、
 * sitemap にも載せていない。親（/experiment/podcast-notes）の canonical を
 * そのまま継ぐと、全エピソードが同じ URL を正規と主張してしまうので、
 * ここで自分のパスを canonical に出したうえで noindex にする。
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  return {
    robots: { index: false, follow: true },
    alternates: { canonical: localeUrl(`/experiment/podcast-notes/${id}`, locale) },
  };
}

export default function PodcastNoteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
