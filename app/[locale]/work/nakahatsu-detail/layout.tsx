import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/**
 * アーカイブ扱いの、中初商店ケーススタディの旧・詳しい版（2026-11-07 まで /work/nakahatsu だった）。
 * **本番では到達不能にしてある。** 公開ページは、いまの /work/nakahatsu（旧 SY 型）。
 *
 * ソースは残してある。見せる判断に戻ったらこの layout.tsx を消して、
 * src/data/siteRoutes.ts の ARCHIVED_WORK_SLUGS から外す。
 *
 * デプロイしたビルドで確認したいとき: ENABLE_ARCHIVED_WORK=1
 * ローカル（NODE_ENV !== production）では常に見られる。
 */
export default function ArchivedNakahatsuDetailLayout({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV === 'production' && process.env.ENABLE_ARCHIVED_WORK !== '1') {
    notFound();
  }

  return <>{children}</>;
}
