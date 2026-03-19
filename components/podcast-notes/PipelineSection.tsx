'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Props {
  bodyFontClass: string;
  headingFontClass: string;
}

const STEPS = [
  {
    icon: '🎧',
    label: 'Spotify',
    description: 'Share episode URL',
  },
  {
    icon: '🤖',
    label: 'Cursor LLM',
    description: 'Process & structure notes',
  },
  {
    icon: '📝',
    label: 'Notion DB',
    description: 'Store structured data',
  },
  {
    icon: '🧮',
    label: 'Embeddings',
    description: 'Vectorize with OpenAI',
  },
  {
    icon: '🗺️',
    label: 'UMAP',
    description: 'Reduce to 2D map',
  },
  {
    icon: '✨',
    label: 'This Page',
    description: 'Visualize & explore',
  },
];

export default function PipelineSection({ bodyFontClass, headingFontClass }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 border-t border-line-subtle">
      <h3 className={`text-title-lg mb-4 ${headingFontClass}`}>
        How It Works
      </h3>
      <p className={`text-body-lg text-ink-secondary mb-12 max-w-2xl ${bodyFontClass}`}>
        An automated pipeline that transforms podcast listening into a searchable, visual knowledge base.
      </p>

      <div className="flex flex-wrap justify-center gap-4 md:gap-2">
        {STEPS.map((step, i) => (
          <React.Fragment key={step.label}>
            <div
              className={`flex flex-col items-center text-center transition-all duration-500 w-[calc(50%-8px)] md:w-auto md:flex-1 ${
                visible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-surface-muted flex items-center justify-center text-2xl mb-3">
                {step.icon}
              </div>
              <span className="font-space-grotesk text-label font-semibold text-ink mb-1">
                {step.label}
              </span>
              <span className={`text-caption text-ink-tertiary ${bodyFontClass}`}>
                {step.description}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="hidden md:flex items-start pt-5 text-ink-tertiary text-body shrink-0">
                →
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
