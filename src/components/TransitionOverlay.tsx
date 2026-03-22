'use client';

import { useEffect, useRef, useLayoutEffect, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePageTransition } from '@/src/contexts/TransitionContext';

export default function TransitionOverlay() {
  const { state, setPhase } = usePageTransition();
  const router = useRouter();
  const imageRef = useRef<HTMLDivElement>(null);
  const hasNavigated = useRef(false);

  const hero = useMemo(() => {
    if (state.phase === 'idle' || typeof window === 'undefined') return null;
    const vw = window.innerWidth;
    const isMd = vw >= 768;
    return {
      top: isMd ? 112 : 96,
      left: 0,
      width: vw,
      height: vw * (5 / 8),
    };
  }, [state.phase]);

  useLayoutEffect(() => {
    if (state.phase !== 'expanding' || !imageRef.current || !state.sourceRect || !hero) return;
    hasNavigated.current = false;

    const card = state.sourceRect;
    const el = imageRef.current;

    // FLIP: position the image at its final (hero) rect,
    // then apply an inverse transform so it appears at the card rect.
    const scaleX = card.width / hero.width;
    const scaleY = card.height / hero.height;
    const cardCenterX = card.left + card.width / 2;
    const cardCenterY = card.top + card.height / 2;
    const heroCenterX = hero.left + hero.width / 2;
    const heroCenterY = hero.top + hero.height / 2;
    const translateX = cardCenterX - heroCenterX;
    const translateY = cardCenterY - heroCenterY;

    el.style.transition = 'none';
    el.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
    el.style.borderRadius = '12px';

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition = '';
        el.style.transform = 'translate(0, 0) scale(1, 1)';
        el.style.borderRadius = '0px';
      });
    });
  }, [state.phase, state.sourceRect, hero]);

  useEffect(() => {
    if (state.phase !== 'expanding') return;
    const el = imageRef.current;
    if (!el) return;

    const onEnd = (e: TransitionEvent) => {
      if (e.propertyName !== 'transform') return;
      if (hasNavigated.current) return;
      hasNavigated.current = true;
      setPhase('navigating');
      router.push(state.targetUrl);
    };

    el.addEventListener('transitionend', onEnd);
    const fallback = setTimeout(() => {
      if (hasNavigated.current) return;
      hasNavigated.current = true;
      setPhase('navigating');
      router.push(state.targetUrl);
    }, 900);

    return () => {
      el.removeEventListener('transitionend', onEnd);
      clearTimeout(fallback);
    };
  }, [state.phase, state.targetUrl, router, setPhase]);

  useEffect(() => {
    if (state.phase !== 'fading') return;
    const timeout = setTimeout(() => setPhase('idle'), 450);
    return () => clearTimeout(timeout);
  }, [state.phase, setPhase]);

  if (state.phase === 'idle') return null;

  const isFading = state.phase === 'fading';

  return (
    <div
      className="page-transition-overlay"
      style={{ opacity: isFading ? 0 : 1 }}
      aria-hidden="true"
    >
      <div className="page-transition-bg" />

      {state.imageSrc && hero && (
        <div
          ref={imageRef}
          className="page-transition-image"
          style={{
            top: hero.top,
            left: hero.left,
            width: hero.width,
            height: hero.height,
          }}
        >
          <Image
            src={state.imageSrc}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
      )}
    </div>
  );
}
