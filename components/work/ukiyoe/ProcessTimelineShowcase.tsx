'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const RECOGNITION_DELAY_MS = 300;
const LINE_DURATION_MS = 800;
const ICON_DELAY_MS = 100;

export default function ProcessTimelineShowcase() {
  const connectorRef = useRef<HTMLDivElement>(null);
  const hasTriggered = useRef(false);
  const [lineActive, setLineActive] = useState(false);
  const [iconVisible, setIconVisible] = useState(false);

  const triggerAnimation = useCallback(() => {
    if (hasTriggered.current) return;
    hasTriggered.current = true;

    setTimeout(() => {
      setLineActive(true);
      setTimeout(() => setIconVisible(true), LINE_DURATION_MS + ICON_DELAY_MS);
    }, RECOGNITION_DELAY_MS);
  }, []);

  useEffect(() => {
    const el = connectorRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setLineActive(true);
      setIconVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) triggerAnimation();
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggerAnimation]);

  return (
    <div>
      <Image
        src="/work/ukiyoe/process-timeline/process-timeline-top.png"
        alt="Isometric view of the timeline page with stacked period cards"
        width={1200}
        height={675}
        className="w-full h-auto"
      />

      {/* Animated connector */}
      <div
        ref={connectorRef}
        className="flex flex-col items-center py-6 md:py-16"
      >
        {/* Vertical line */}
        <div
          className="w-px bg-ink h-[72px] md:h-[120px]"
          style={{
            transformOrigin: 'top',
            transform: lineActive ? 'scaleY(1)' : 'scaleY(0)',
            transition: lineActive
              ? `transform ${LINE_DURATION_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`
              : 'none',
          }}
        />

        {/* 2x2 grid icon */}
        <div
          className="mt-3 grid grid-cols-2 gap-[2px] md:gap-[3px]"
          style={{
            opacity: iconVisible ? 1 : 0,
            transition: iconVisible ? 'opacity 400ms ease-out' : 'none',
          }}
        >
          <span className="w-[10px] h-[10px] border-[1.5px] border-ink/60 md:w-[14px] md:h-[14px] md:border-[2.5px] md:border-ink" />
          <span className="w-[10px] h-[10px] border-[1.5px] border-ink/60 md:w-[14px] md:h-[14px] md:border-[2.5px] md:border-ink" />
          <span className="w-[10px] h-[10px] border-[1.5px] border-ink/60 md:w-[14px] md:h-[14px] md:border-[2.5px] md:border-ink" />
          <span className="w-[10px] h-[10px] border-[1.5px] border-ink/60 md:w-[14px] md:h-[14px] md:border-[2.5px] md:border-ink" />
        </div>
      </div>

      <Image
        src="/work/ukiyoe/process-timeline/process-timeline-bottom.png"
        alt="Gallery view of the timeline page with artworks organized by period"
        width={1200}
        height={675}
        className="w-full h-auto"
      />
    </div>
  );
}
