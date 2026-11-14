'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * 作品ページの動画。無音で繰り返す動画には、必ず止められるボタンを付ける（利用者が動きを止められるようにする。WCAG 2.2.2）。
 * - ボタンは動画の左下。一時停止 / 再生を切り替える。キーボードでも押せる。
 * - 「動きを減らす」設定の人には、自動で再生しない（最初から止まっていて、ボタンで再生できる）。
 * - `startWhenVisible` が true のときは、画面に半分以上入ったときに先頭から再生を始める。
 * 新しい作品で動画を置くときは、`<video>` を直接置かず、これを使う。
 */
export default function ControlledVideo({
  src,
  poster,
  label,
  pauseLabel,
  playLabel,
  width,
  height,
  startWhenVisible = false,
}: {
  src: string;
  poster: string;
  label: string;
  pauseLabel: string;
  playLabel: string;
  width: number;
  height: number;
  startWhenVisible?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener('play', onPlay);
    v.addEventListener('pause', onPause);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      v.pause();
      return () => {
        v.removeEventListener('play', onPlay);
        v.removeEventListener('pause', onPause);
      };
    }
    let io: IntersectionObserver | undefined;
    if (startWhenVisible) {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            v.currentTime = 0;
            v.play().catch(() => {});
            io?.disconnect();
          }
        },
        { threshold: 0.5 },
      );
      io.observe(v);
    } else {
      v.play().catch(() => {});
    }
    return () => {
      io?.disconnect();
      v.removeEventListener('play', onPlay);
      v.removeEventListener('pause', onPause);
    };
  }, [startWhenVisible]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  };

  return (
    <div className="relative">
      <video
        ref={ref}
        aria-label={label}
        className="w-full rounded-media bg-black"
        src={src}
        poster={poster}
        width={width}
        height={height}
        muted
        loop
        playsInline
        preload="metadata"
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? pauseLabel : playLabel}
        aria-pressed={!playing}
        className="absolute bottom-3 left-3 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {playing ? (
          <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        ) : (
          <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
          </svg>
        )}
      </button>
    </div>
  );
}
