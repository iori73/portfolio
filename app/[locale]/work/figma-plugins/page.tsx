'use client';

import React from 'react';
import BackToTopButton from '@/src/compositions/BackToTopButton';
import { useBodyFont, useHeadingFont } from '@/src/hooks/useFonts';
import ConceptC from '@/components/work/figma-plugins/ConceptC';

export default function FigmaPluginsPage() {
  const { getBodyFontClass } = useBodyFont();
  const { getHeadingFontClass } = useHeadingFont();

  return (
    <div className={`my-24 md:mt-28 md:mb-16 ${getBodyFontClass()}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <span className="font-space-grotesk text-label text-ink-tertiary">
            Work
          </span>
          <h1 className={`text-headline text-ink mt-2 ${getHeadingFontClass()}`}>
            Figma Plugins Gallery
          </h1>
          <p className="text-body-lg text-ink-secondary mt-3 max-w-2xl">
            18 plugins and widgets that extend Figma&apos;s capabilities — each one
            grown from a real workflow problem, shaped through conversation with AI.
          </p>
        </div>

        <ConceptC />
      </div>

      <BackToTopButton />
    </div>
  );
}
