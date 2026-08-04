'use client';

import { useEffect } from 'react';

/**
 * seremoni のスクロール表現は、パララックスもスプリングも使わず
 * 「opacity + わずかな translateY を ease-out で、delay .2s ずつずらす」だけ。
 * それを最小構成で再現する。IntersectionObserver で .is-in を付けるのみ。
 */
export default function Reveal() {
  useEffect(() => {
    const targets = document.querySelectorAll('.pv-reveal');
    if (!targets.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      targets.forEach((el) => el.classList.add('is-in'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
