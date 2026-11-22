'use client';

import { useEffect, useMemo, useState } from 'react';
import { useMenu } from '@/src/contexts/MenuContext';
import type { SidebarItem } from '@/src/components/work/WorkSidebar';

/**
 * スマートフォン・タブレット用の目次（サイドバーが出ない 1280px 未満）。Notion のモバイルの目次に合わせた形:
 * - 閉じているとき: 画面の右端に、小さな丸が縦に並ぶ（いまの節だけ濃い）。少しスクロールすると現れる。
 * - 丸の部分をタップすると、目次の一覧（カード）が開く。いまの節が強調される。項目をタップすると、その位置へ移動して閉じる。
 * - 一覧の外・Esc キー・同じ丸をもう一度タップで閉じる。「動きを減らす」設定では、動かさずに切り替える。
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

  // Figma（WorkMobileToc）どおり: 見出しは Medium、小見出しは Regular。いまの節だけ ink、ほかは ink-tertiary。背景は塗らない。
  // いまの節は、角丸の塗り（#d2d2d780。「上へ戻る」ボタンと同じ色）＋ ink の文字（macOS のメニュー風）。塗りはカードの端から 8px 内側に置く。
  const row = (on: boolean, level: 0 | 1) =>
    `toc-row flex w-full items-center text-left text-body-sm leading-5 tracking-[-0.15px] transition-colors motion-reduce:transition-none ${level === 0 ? 'py-2 px-2 font-medium' : 'min-h-8 pl-4 pr-2'} ${on ? 'bg-[#d2d2d780] text-ink' : 'text-ink-tertiary'}`;

  if (isMenuOpen) return null;
  const visible = shown || open;

  return (
    <div className="xl:hidden">
      {open ? <button type="button" aria-hidden="true" tabIndex={-1} onClick={() => setOpen(false)} className="fixed inset-0 z-40 cursor-default" /> : null}

      {/* 閉じているとき: 右端に 8px の丸が縦に並ぶ（Figma 425:3386）。いまの節だけ #666（ロゴと同じ利休白茶）、ほかは ink 15%。
          丸の間は 8px、左右 14px・上下 16px。タップできる範囲は左へ広げてある（見た目は変えない）。 */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={openLabel}
        aria-expanded={open}
        aria-controls="work-mobile-toc"
        className={`fixed right-0 top-1/2 z-40 flex -translate-y-1/2 flex-col items-center justify-center gap-2 py-4 pl-6 pr-[14px] transition-opacity duration-300 motion-reduce:transition-none ${visible && !open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        tabIndex={visible && !open ? 0 : -1}
      >
        {flat.map((f) => (
          <span
            key={f.id}
            aria-hidden="true"
            className={`block size-2 rounded-full transition-colors duration-300 motion-reduce:transition-none ${active === f.id ? 'bg-[#666]' : 'bg-black/15'}`}
          />
        ))}
      </button>

      {/* 開いているとき: 目次のカード（Figma 425:2751）。角丸 8px・枠 1px（黒 10%）・影。幅は文字に合わせる。
          見出し: 上下 8px・左右 16px。小見出し: 高さ 32px・左 24px。上下の端は 16px。 */}
      <nav
        id="work-mobile-toc"
        aria-label={ariaLabel}
        hidden={!open}
        className="toc-card fixed right-4 top-1/2 z-50 max-h-[70vh] w-max max-w-[min(calc(100vw-2rem),320px)] -translate-y-1/2 origin-right overflow-y-auto overscroll-contain rounded-[8px] border border-black/10 bg-white/90 backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.14)] motion-safe:animate-[toc-in_160ms_ease-out]"
      >
        <ul className="flex flex-col px-2 py-2">
          {items.map((it) => (
            <li key={it.id}>
              <button type="button" onClick={() => go(it.id)} aria-current={active === it.id ? 'true' : undefined} className={row(active === it.id, 0)}>
                {it.short ?? it.label}
              </button>
              {it.subs?.length ? (
                <ul className="flex flex-col">
                  {it.subs.map((sub) => (
                    <li key={sub.id}>
                      <button type="button" onClick={() => go(sub.id)} aria-current={active === sub.id ? 'true' : undefined} className={row(active === sub.id, 1)}>
                        {sub.short ?? sub.label}
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
