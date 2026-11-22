'use client';

import { useEffect, useMemo, useState } from 'react';
import { useMenu } from '@/src/contexts/MenuContext';
import type { SidebarItem } from '@/src/components/work/WorkSidebar';

/**
 * スマートフォン・タブレット用の目次（サイドバーが出ない 1280px 未満）。Notion のモバイルの目次に合わせた形:
 * - 閉じているとき: 画面の右端に、細い横線が縦に並ぶ（いまの節だけ濃く・長い）。少しスクロールすると現れる。
 * - 線の部分をタップすると、目次の一覧（カード）が開く。いまの節が強調される。項目をタップすると、その位置へ移動して閉じる。
 * - 一覧の外・Esc キー・同じ線をもう一度タップで閉じる。「動きを減らす」設定では、動かさずに切り替える。
 * 項目は WorkSidebar と同じ（`sidebarItems`）。PC のサイドバーと文言・順序がずれないようにする。
 */
export default function WorkMobileToc({ items, ariaLabel, openLabel }: { items: SidebarItem[]; ariaLabel: string; openLabel: string }) {
  const { isMenuOpen } = useMenu();
  const flat = useMemo(
    () => items.flatMap((it) => [{ id: it.id, label: it.label, level: 0 }, ...(it.subs ?? []).map((s) => ({ id: s.id, label: s.label, level: 1 }))]),
    [items],
  );
  const [active, setActive] = useState(flat[0]?.id ?? '');
  const [shown, setShown] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShown(window.scrollY > 160);
      let cur = flat[0]?.id ?? '';
      for (const f of flat) {
        const el = document.getElementById(f.id);
        if (el && el.getBoundingClientRect().top <= 180) cur = f.id;
      }
      setActive(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [flat]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const row = (on: boolean, level: 0 | 1) =>
    `flex w-full items-center px-3 text-left text-body-sm transition-colors motion-reduce:transition-none ${level === 0 ? 'min-h-11 font-medium' : 'min-h-10 pl-6'} ${on ? 'bg-black/5 text-ink' : level === 0 ? 'text-ink' : 'text-ink-secondary'}`;

  if (isMenuOpen) return null;
  const visible = shown || open;

  return (
    <div className="xl:hidden">
      {open ? <button type="button" aria-hidden="true" tabIndex={-1} onClick={() => setOpen(false)} className="fixed inset-0 z-40 cursor-default" /> : null}

      {/* 閉じているとき: 右端の細い線。タップできる範囲は幅 28px（線より広い） */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={openLabel}
        aria-expanded={open}
        aria-controls="work-mobile-toc"
        className={`fixed right-0 top-1/2 z-40 flex -translate-y-1/2 flex-col items-end justify-center gap-2 py-4 pl-3 pr-4 transition-opacity duration-300 motion-reduce:transition-none ${visible && !open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        tabIndex={visible && !open ? 0 : -1}
      >
        {flat.map((f) => (
          <span
            key={f.id}
            aria-hidden="true"
            className={`block h-0.5 transition-[width,height,background-color] duration-300 motion-reduce:transition-none ${f.level === 0 ? 'w-2' : 'w-1.5'} ${active === f.id ? '!h-[3px] !w-2 bg-ink' : 'bg-black/20'}`}
          />
        ))}
      </button>

      {/* 開いているとき: 目次のカード。幅は文字に合わせる（余白を持て余さない）。
          近接: 小見出しは親の見出しの直下に詰め（2px）、グループの間だけ広く（12px）取る。
          余白は 8px 刻み。タップの高さは見出し 44px・小見出し 40px。いまの節は、色と薄い背景の両方で示す。 */}
      <nav
        id="work-mobile-toc"
        aria-label={ariaLabel}
        hidden={!open}
        className="fixed right-4 top-1/2 z-50 max-h-[70vh] w-max min-w-[200px] max-w-[min(calc(100vw-2rem),320px)] -translate-y-1/2 origin-right overflow-y-auto overscroll-contain border border-black/10 bg-white p-2 shadow-[0_12px_40px_rgba(0,0,0,0.14)] motion-safe:animate-[toc-in_160ms_ease-out]"
      >
        <ul className="flex flex-col gap-3">
          {items.map((it) => (
            <li key={it.id}>
              <button type="button" onClick={() => go(it.id)} aria-current={active === it.id ? 'true' : undefined} className={row(active === it.id, 0)}>
                {it.label}
              </button>
              {it.subs?.length ? (
                <ul className="mt-0.5 flex flex-col gap-0.5">
                  {it.subs.map((sub) => (
                    <li key={sub.id}>
                      <button type="button" onClick={() => go(sub.id)} aria-current={active === sub.id ? 'true' : undefined} className={row(active === sub.id, 1)}>
                        {sub.label}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
