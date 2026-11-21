'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

/**
 * タップで拡大できる画像（スマートフォン専用。768px 以上では普通の画像のまま）。Notion の画像の拡大に合わせた動き:
 * - 開く: サムネイルの位置と大きさから、画面いっぱいへ広がる（0.32 秒）。背景は白くなる。
 * - 閉じる: 画像の外側・画像・右上の「×」・Esc キーのどれでも閉じる。サムネイルの位置へ縮みながら戻る。
 * - 縦に長い画像は、幅を画面に合わせ、画面の中で縦にスクロールして見られる（縮めて全体を見せない）。
 * - 「動きを減らす」設定では、動かさずに切り替える。開いている間、後ろのページはスクロールしない。
 * 画面全体で使う作品ページの図（前後の比較など）で、小さくて読めない画像に使う。
 */

const EASE = 'cubic-bezier(0.2, 0.8, 0.2, 1)';
const DURATION = 320;

type Props = {
  src: string;
  width: number;
  height: number;
  alt: string;
  openLabel: string;
  closeLabel: string;
  className?: string;
};

function Lightbox({
  src, width, height, alt, closeLabel, fromRect, thumbEl, onClosed,
}: Props & { fromRect: DOMRect; thumbEl: HTMLElement; onClosed: () => void }) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);

  const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 開く: サムネイルの位置から、いまの位置へ（FLIP）
  useLayoutEffect(() => {
    const img = imgRef.current;
    const backdrop = backdropRef.current;
    if (!img || !backdrop) return;
    closeRef.current?.focus({ preventScroll: true });
    if (reduce()) return;
    const to = img.getBoundingClientRect();
    const dx = fromRect.left - to.left;
    const dy = fromRect.top - to.top;
    const s = fromRect.width / to.width;
    img.animate(
      [
        { transformOrigin: 'top left', transform: `translate(${dx}px, ${dy}px) scale(${s})` },
        { transformOrigin: 'top left', transform: 'none' },
      ],
      { duration: DURATION, easing: EASE },
    );
    backdrop.animate([{ opacity: 0 }, { opacity: 1 }], { duration: DURATION, easing: 'ease-out' });
    closeRef.current?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: DURATION, easing: 'ease-out' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const close = () => {
    if (closing.current) return;
    closing.current = true;
    const img = imgRef.current;
    const backdrop = backdropRef.current;
    if (!img || !backdrop || reduce()) {
      onClosed();
      return;
    }
    const cur = img.getBoundingClientRect();
    const target = thumbEl.getBoundingClientRect();
    const dx = target.left - cur.left;
    const dy = target.top - cur.top;
    const s = target.width / cur.width;
    const a = img.animate(
      [
        { transformOrigin: 'top left', transform: 'none' },
        { transformOrigin: 'top left', transform: `translate(${dx}px, ${dy}px) scale(${s})` },
      ],
      { duration: DURATION, easing: EASE, fill: 'forwards' },
    );
    backdrop.animate([{ opacity: 1 }, { opacity: 0 }], { duration: DURATION, easing: 'ease-in', fill: 'forwards' });
    closeRef.current?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: DURATION / 2, fill: 'forwards' });
    a.onfinish = onClosed;
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      // フォーカスできるのは「×」だけ。Tab でも外へ出さない
      if (e.key === 'Tab') {
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label={alt} className="fixed inset-0 z-[100]">
      <div ref={backdropRef} className="absolute inset-0 bg-white" />
      <div
        className="absolute inset-0 overflow-y-auto overscroll-contain"
        onClick={close}
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div className="flex min-h-full items-center justify-center px-4 py-16">
          <Image
            ref={imgRef}
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="100vw"
            quality={90}
            className="h-auto w-full max-w-[960px] cursor-zoom-out select-none"
            draggable={false}
          />
        </div>
      </div>
      <button
        ref={closeRef}
        type="button"
        onClick={close}
        aria-label={closeLabel}
        className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        style={{ top: 'max(0.75rem, env(safe-area-inset-top))' }}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>,
    document.body,
  );
}

export default function ZoomImage({ src, width, height, alt, openLabel, closeLabel, className = '' }: Props) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const thumbRef = useRef<HTMLImageElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);

  const open = () => {
    // 768px 以上は、画像が十分に大きいので拡大しない
    if (window.matchMedia('(min-width: 768px)').matches) return;
    const thumb = thumbRef.current;
    if (!thumb) return;
    setRect(thumb.getBoundingClientRect());
    thumb.style.visibility = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  };

  const closed = () => {
    if (thumbRef.current) thumbRef.current.style.visibility = '';
    document.documentElement.style.overflow = '';
    setRect(null);
    btnRef.current?.focus({ preventScroll: true });
  };

  // ページを離れるときに、スクロールの固定が残らないように
  useEffect(() => () => { document.documentElement.style.overflow = ''; }, []);

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        onClick={open}
        aria-label={`${openLabel}: ${alt}`}
        aria-haspopup="dialog"
        className="block w-full min-w-0 cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink md:cursor-default"
      >
        <Image
          ref={thumbRef}
          src={src}
          alt=""
          width={width}
          height={height}
          className={`h-auto w-full ${className}`}
        />
      </button>
      {rect && thumbRef.current ? (
        <Lightbox
          src={src}
          width={width}
          height={height}
          alt={alt}
          openLabel={openLabel}
          closeLabel={closeLabel}
          fromRect={rect}
          thumbEl={thumbRef.current}
          onClosed={closed}
        />
      ) : null}
    </>
  );
}
