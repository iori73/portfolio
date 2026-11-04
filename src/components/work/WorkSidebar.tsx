'use client';

import { useEffect, useState } from 'react';

export type SidebarItem = { id: string; label: string; subs?: { id: string; label: string }[] };

/**
 * 作品ページの側面メニュー（サイドバー）。全作品ページで同じ見た目・同じ動きにする（幅 200px、文字サイズ、強調、小見出しの出し方）。
 * - 項目の文言は、本文の見出しと同じ翻訳キーから出す（ページ側で `label` に渡す）。
 * - 開いている節（スクロール位置）の下にだけ、小見出し（subs）を出す。
 * - 各項目の `id` は、本文の節・見出しの `id` と同じにする（`scroll-mt-28` 以上を付ける）。
 * 置く場所は `WorkShell`（右の列）。単独では置かない。
 */
export default function WorkSidebar({ items, ariaLabel }: { items: SidebarItem[]; ariaLabel: string }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');
  const [activeSub, setActiveSub] = useState('');

  useEffect(() => {
    const tops = items.map((it) => it.id);
    const subs = items.flatMap((it) => it.subs?.map((s) => s.id) ?? []);
    const onScroll = () => {
      let cur = tops[0] ?? '';
      for (const id of tops) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 260) cur = id;
      }
      let sub = '';
      for (const id of subs) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 260) sub = id;
      }
      setActiveId(cur);
      setActiveSub(sub);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [items]);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <nav aria-label={ariaLabel} className="sticky top-28">
      <ul className="flex flex-col gap-3">
        {items.map((it) => (
          <li key={it.id}>
            {/* 切り替わりをやわらかくする: 太さは固定（切り替わりで文字幅・折り返しが動かないように）、
                濃さと 3px の横移動を 300ms で変える。「動きを減らす」設定では動かさない。 */}
            <button
              type="button"
              onClick={() => go(it.id)}
              aria-current={activeId === it.id ? 'true' : undefined}
              className={`text-left text-body-sm font-medium leading-snug text-ink transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${activeId === it.id ? 'translate-x-[3px] opacity-100' : 'opacity-50 hover:opacity-80'}`}
            >
              {it.label}
            </button>
            {/* 小見出しは、開いている節の下にだけ。grid の行の高さ 0fr→1fr で、すっと開閉する */}
            {it.subs?.length ? (
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${activeId === it.id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                inert={activeId !== it.id}
                aria-hidden={activeId !== it.id}
              >
                <div className="min-h-0 overflow-hidden">
                  <ul className="ml-1 mt-2 flex flex-col gap-2 border-l border-line-section pl-3">
                    {it.subs.map((s) => (
                      <li key={s.id}>
                        <button
                          type="button"
                          onClick={() => go(s.id)}
                          aria-current={activeSub === s.id ? 'true' : undefined}
                          className={`text-left text-caption leading-snug text-ink transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${activeSub === s.id ? 'translate-x-[3px] opacity-100' : 'opacity-50 hover:opacity-80'}`}
                        >
                          {s.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </nav>
  );
}
