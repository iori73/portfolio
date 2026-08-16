'use client';

import { useLocale } from 'next-intl';
import { usePageTransition } from '@/src/contexts/TransitionContext';
import { localePath, workPath } from '@/src/data/siteRoutes';
import type { MouseEvent, RefObject } from 'react';

type TransitionContent = Parameters<ReturnType<typeof usePageTransition>['startTransition']>[0];

/**
 * トップページの Work カードを、本物のリンクとして扱うための小道具。
 *
 * 元は `<div role="link" tabIndex={0}>` に onClick / onKeyDown を付けていた。
 * 見た目と左クリックは同じでも、`<a href>` が無いので
 * ・検索エンジンがたどれない
 * ・右クリック「新しいタブで開く」・中クリック・リンクのコピーが効かない
 * ・ステータスバーに行き先が出ない
 * という状態だった。実際、詳細ページはこれと sitemap 不在が重なって
 * 検索から事実上発見できなかった。
 *
 * href を持たせたうえで、**修飾キーと中クリックのときは preventDefault しない**
 * のが肝。ここを止めるとブラウザ本来の「新しいタブで開く」が壊れたままになる。
 * 素のクリックのときだけ FLIP トランジションに渡す。
 */
export function useWorkCardLink() {
  const locale = useLocale();
  const { startTransition } = usePageTransition();

  const href = (slug: string) => localePath(workPath(slug), locale);

  const onClick = (
    slug: string,
    imageRef: RefObject<HTMLDivElement | null>,
    content: TransitionContent,
  ) => (e: MouseEvent<HTMLAnchorElement>) => {
    // 新しいタブ / 新しいウィンドウ / ダウンロードの意図は、ブラウザに任せる。
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

    const rect = imageRef.current?.getBoundingClientRect();
    // 測れないときも既定の遷移は殺さない。アニメーションが無いだけで移動はする。
    if (!rect) return;

    e.preventDefault();
    startTransition(content, rect, workPath(slug));
  };

  return { href, onClick };
}
