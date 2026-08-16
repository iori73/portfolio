import type { Metadata } from 'next';

/** 404 キャッチオール。存在しない URL を検索結果に出さない。 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function CatchAllLayout({ children }: { children: React.ReactNode }) {
  return children;
}
