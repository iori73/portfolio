'use client';

import React, { useEffect, useRef, useState } from 'react';
import { PodcastStats, Podcast, CATEGORY_COLORS, DEFAULT_CATEGORY_COLOR } from './types';

interface Props {
  stats: PodcastStats;
  podcasts: Podcast[];
  bodyFontClass: string;
  headingFontClass: string;
}

function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

function CategoryBar({ name, count, total }: { name: string; count: number; total: number }) {
  const color = CATEGORY_COLORS[name] || DEFAULT_CATEGORY_COLOR;
  const pct = (count / total) * 100;
  const barRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={barRef} className="flex items-center gap-3">
      <span className="font-space-grotesk text-body text-ink-tertiary w-[120px] md:w-[140px] text-right shrink-0">
        {name}
      </span>
      <div className="flex-1 h-3 bg-surface-muted rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: visible ? `${Math.max(pct, 2)}%` : '0%',
            backgroundColor: color,
          }}
        />
      </div>
      <span className="font-space-grotesk text-body text-ink-tertiary w-8 tabular-nums">
        {count}
      </span>
    </div>
  );
}

export default function InsightsSection({ stats, podcasts, bodyFontClass, headingFontClass }: Props) {
  const episodeCounter = useCountUp(stats.totalEpisodes);
  const podcastCounter = useCountUp(stats.totalPodcasts);
  const categoryCounter = useCountUp(stats.totalCategories);

  const sortedTags = Object.entries(stats.tagDistribution)
    .sort((a, b) => b[1] - a[1]);

  const topPodcasts = podcasts.slice(0, 8);

  return (
    <section className="py-16 md:py-24">
      {/* Stats counters */}
      <div className="grid grid-cols-3 gap-6 md:gap-12 mb-16 md:mb-24">
        <div ref={episodeCounter.ref} className="text-center">
          <div className="text-display text-ink tabular-nums">
            {episodeCounter.count}
          </div>
          <div className="font-space-grotesk text-body-lg text-ink-tertiary mt-1">
            episodes
          </div>
        </div>
        <div ref={podcastCounter.ref} className="text-center">
          <div className="text-display text-ink tabular-nums">
            {podcastCounter.count}
          </div>
          <div className="font-space-grotesk text-body-lg text-ink-tertiary mt-1">
            podcasts
          </div>
        </div>
        <div ref={categoryCounter.ref} className="text-center">
          <div className="text-display text-ink tabular-nums">
            {categoryCounter.count}
          </div>
          <div className="font-space-grotesk text-body-lg text-ink-tertiary mt-1">
            categories
          </div>
        </div>
      </div>

      {/* Category distribution */}
      <div className="mb-16 md:mb-24">
        <h3 className={`text-title-lg mb-8 ${headingFontClass}`}>
          Category Distribution
        </h3>
        <div className="space-y-3">
          {sortedTags.map(([name, count]) => (
            <CategoryBar key={name} name={name} count={count} total={stats.totalEpisodes} />
          ))}
        </div>
      </div>

      {/* Top podcasts */}
      <div>
        <h3 className={`text-title-lg mb-8 ${headingFontClass}`}>
          Top Podcasts
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {topPodcasts.map((pod) => (
            <div key={pod.name} className="flex flex-col items-center gap-3 group">
              {pod.cover ? (
                <img
                  src={pod.cover}
                  alt={pod.name}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-lg object-cover shadow-sm group-hover:shadow-md transition-shadow"
                />
              ) : (
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg bg-surface-muted flex items-center justify-center">
                  <span className="text-title text-ink-tertiary">
                    {pod.name.charAt(0)}
                  </span>
                </div>
              )}
              <div className="text-center">
                <p className={`text-body leading-tight text-ink-secondary line-clamp-2 ${bodyFontClass}`}>
                  {pod.name}
                </p>
                <p className="font-space-grotesk text-body text-ink-tertiary mt-1">
                  {pod.episodeCount} ep.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
