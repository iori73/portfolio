import type { ReactNode } from 'react';

/**
 * 作品ページの本文の枠。本文（最大 1088px）と、右の側面メニュー（224px、1280px 以上の画面だけ）を、
 * 全作品ページで同じ寸法・同じ間隔（40px）で並べる。親の `main`（max-w-6xl）より外へ広げて、画面の中央に置く。
 * 新しい作品ページは、本文をこの枠で包み、`sidebar` に `WorkSidebar` を渡す。
 * 寸法: 本文 1088 + 間隔 40 + サイドバー 224 = 1352px（これより狭い画面では本文が縮む）。
 * サイドバーの文字は 18px（本文の見出し・本文に近い大きさ）にしたので、200px から 224px に広げた（2026-11-04）。
 */
export default function WorkShell({ sidebar, children }: { sidebar?: ReactNode; children: ReactNode }) {
  return (
    <div className="relative left-1/2 w-[min(calc(100vw-3rem),1352px)] -translate-x-1/2 xl:flex xl:gap-10">
      <div className="mx-auto w-full min-w-0 max-w-[1088px] xl:mx-0 xl:flex-1">{children}</div>
      {sidebar ? <aside className="hidden w-[224px] shrink-0 pt-12 xl:block">{sidebar}</aside> : null}
    </div>
  );
}
