import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/**
 * アーカイブ扱いのケーススタディ。**本番では到達不能にしてある。**
 *
 * noindex だけでは URL を知っている人には読めてしまうので、/preview と print
 * ツリーで使っているのと同じ env ゲートでツリーごと 404 にする。
 * ソースは残してあるので、見せる判断に戻ったらこの layout.tsx を消して
 * src/data/siteRoutes.ts の ARCHIVED_WORK_SLUGS から INDEXED_WORK_SLUGS へ移すだけでよい。
 *
 * デプロイしたビルドで確認したいとき: ENABLE_ARCHIVED_WORK=1
 * ローカル（NODE_ENV !== production）では常に見られる。
 */
export default function ArchivedWorkLayout({ children }: { children: React.ReactNode }) {
  if (process.env.NODE_ENV === 'production' && process.env.ENABLE_ARCHIVED_WORK !== '1') {
    notFound();
  }

  return <>{children}</>;
}
