// app/preview/layout.tsx — アートディレクション検証用の隔離シェル。
//
// app/[locale]/ の兄弟として置くことで、サイトの chrome（Header / Footer /
// TransitionOverlay / max-w-6xl ラッパー）を一切継承しない。本番のページ・
// トークンには影響しないので、このディレクトリごと削除すれば元通りになる。
//
// middleware.ts の matcher で `preview` を除外しているため、next-intl による
// /en/preview へのリライトは発生しない（print ツリーと同じ扱い）。
import type { Metadata } from 'next';
import './preview.css';

export const metadata: Metadata = {
  title: 'Art Direction Preview',
  robots: { index: false, follow: false },
};

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
