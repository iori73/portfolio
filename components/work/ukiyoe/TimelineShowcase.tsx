'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const PERIODS = [
  { year: '1670', active: true },
  { year: '1700', active: false },
  { year: '1720', active: false },
  { year: '1740', active: false },
  { year: '1750', active: false },
  { year: '1765', active: false },
  { year: '1770', active: false },
  { year: '1790', active: false },
  { year: '1800', active: false },
];

const RECOGNITION_DELAY_MS = 1200;
const ZOOM_DURATION_MS = 2000;

function TimelineControls({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col items-end gap-4 ${className}`} aria-hidden="true">
      <div className="flex flex-col items-end gap-2">
        {PERIODS.map((period, index) => {
          const opacity = period.active ? 1 : Math.max(0.1, 1 - index * 0.1);

          return (
            <div
              key={period.year}
              className={`flex ${period.active ? 'items-start' : 'items-center'} justify-end`}
            >
              <span
                className={`mr-1.5 md:mr-2 tracking-wider whitespace-nowrap transition-none ${
                  period.active
                    ? 'text-sm md:text-lg text-white font-serif'
                    : 'text-[10px] md:text-xs text-white/35 font-serif'
                }`}
              >
                {period.year}
              </span>
              <div
                className={`rounded-full ${
                  period.active
                    ? 'w-2.5 h-16 md:w-4 md:h-[103px] bg-white'
                    : 'w-2.5 h-2.5 md:w-4 md:h-4 bg-white'
                }`}
                style={!period.active ? { opacity } : undefined}
              />
            </div>
          );
        })}
      </div>

      {/* Separator */}
      <div className="w-2.5 md:w-4 h-px bg-white/30" />

      {/* Gallery icon */}
      <div className="grid grid-cols-2 grid-rows-2 gap-px w-2.5 h-2.5 md:w-4 md:h-4 opacity-50">
        <span className="border-2 border-white" />
        <span className="border-2 border-white" />
        <span className="border-2 border-white" />
        <span className="border-2 border-white" />
      </div>
    </div>
  );
}

export default function TimelineShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animateZoom, setAnimateZoom] = useState(false);
  const [phase2, setPhase2] = useState(false);
  const hasTriggered = useRef(false);

  const triggerAnimation = useCallback(() => {
    if (hasTriggered.current) return;
    hasTriggered.current = true;

    setTimeout(() => {
      setAnimateZoom(true);
      setTimeout(() => setPhase2(true), ZOOM_DURATION_MS);
    }, RECOGNITION_DELAY_MS);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setAnimateZoom(true);
      setPhase2(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          triggerAnimation();
        }
      },
      { threshold: 0.65 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggerAnimation]);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[3/2] rounded-lg overflow-hidden bg-[#2d2d2d]"
    >
      {/* Layer 1: Timeline screenshot background */}
      <div
        className={`absolute inset-0 will-change-transform ${
          animateZoom ? 'animate-showcase-zoom' : ''
        }`}
      >
        <Image
          src="/work/ukiyoe/timeline-showcase-bg.png"
          alt="Timeline page showing ukiyoe artworks organized by historical period"
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, 883px"
          priority={false}
        />
      </div>

      {/* Layer 2: Dango photo — fades in during Phase 2 */}
      <div
        className={`absolute top-0 right-0 h-full transition-opacity ease-out ${
          phase2 ? 'opacity-100 duration-1000' : 'opacity-0 duration-300'
        }`}
        style={{ width: '28%' }}
      >
        <Image
          src="/work/ukiyoe/dango-photo.png"
          alt="Kushi-dango — three-color mochi representing the project's navigation motif"
          fill
          className="object-cover object-center"
          sizes="350px"
        />
      </div>

      {/* Layer 3: Controls overlay — hidden during Phase 1, appears + zooms in Phase 2 */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 z-10 transition-all duration-700 ease-out ${
          phase2 ? 'opacity-100 scale-[1.08]' : 'opacity-0 scale-100'
        }`}
        style={{ right: '32%' }}
      >
        <TimelineControls />
      </div>

      <style jsx>{`
        @keyframes showcase-zoom {
          from {
            transform: scale(1) translateX(0);
          }
          to {
            transform: scale(1.3) translateX(-15%);
          }
        }
        .animate-showcase-zoom {
          animation: showcase-zoom 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-showcase-zoom {
            animation: none;
            transform: scale(1.3) translateX(-15%);
          }
        }
      `}</style>
    </div>
  );
}
