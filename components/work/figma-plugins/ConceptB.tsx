'use client';

import React from 'react';
import PluginCard from './PluginCard';
import { plugins } from './pluginData';

function HandDrawnOverlaySVG() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 800 400"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Scribble lines — rough, hand-drawn feel */}
      <path
        d="M80,60 C100,55 130,65 160,58 C190,51 210,62 240,57 C270,52 290,60 320,56"
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.12"
      />
      <path
        d="M100,80 C130,74 150,82 180,76 C210,70 230,80 260,75 C290,70 310,78 340,73"
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.1"
      />
      <path
        d="M60,100 C90,96 120,105 150,98 C180,91 200,100 230,96 C260,92 290,102 310,95"
        fill="none"
        stroke="#1a1a1a"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.08"
      />

      {/* Annotation circles */}
      <ellipse
        cx="600" cy="80" rx="50" ry="35"
        fill="none"
        stroke="#FF7262"
        strokeWidth="1.5"
        strokeDasharray="6 4"
        opacity="0.3"
        transform="rotate(-5 600 80)"
      />
      <ellipse
        cx="160" cy="300" rx="40" ry="30"
        fill="none"
        stroke="#FF7262"
        strokeWidth="1.5"
        opacity="0.2"
        transform="rotate(8 160 300)"
      />

      {/* Annotation arrows */}
      <path
        d="M650,80 C670,70 690,65 710,60"
        fill="none"
        stroke="#FF7262"
        strokeWidth="1.2"
        opacity="0.25"
        strokeLinecap="round"
      />
      <path
        d="M705,55 L710,60 L703,63"
        fill="none"
        stroke="#FF7262"
        strokeWidth="1.2"
        opacity="0.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Small x marks */}
      <g opacity="0.12" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round">
        <line x1="500" y1="150" x2="508" y2="158" />
        <line x1="508" y1="150" x2="500" y2="158" />
      </g>
      <g opacity="0.1" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round">
        <line x1="350" y1="280" x2="358" y2="288" />
        <line x1="358" y1="280" x2="350" y2="288" />
      </g>

      {/* Underline scribble */}
      <path
        d="M450,340 C470,338 510,343 550,337 C590,331 620,340 650,336"
        fill="none"
        stroke="#FF7262"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.15"
      />
    </svg>
  );
}

function MeltingBarsSVG() {
  return (
    <svg
      className="absolute bottom-0 left-0 w-full pointer-events-none"
      viewBox="0 0 800 60"
      preserveAspectRatio="none"
      style={{ height: '60px' }}
    >
      {/* Melting bars inspired by Chainsmokers "World War Joy" */}
      <rect x="60" y="0" width="80" height="30" rx="2" fill="#FF7262" opacity="0.12" />
      <path
        d="M60,30 L60,35 C60,42 68,48 75,48 C82,48 85,38 90,38 C95,38 100,44 105,44 C110,44 115,35 120,35 C125,35 130,42 135,42 C138,42 140,36 140,30 Z"
        fill="#FF7262"
        opacity="0.12"
      />

      <rect x="200" y="0" width="100" height="30" rx="2" fill="#FF7262" opacity="0.1" />
      <path
        d="M200,30 L200,38 C200,45 210,50 220,50 C230,50 235,40 245,40 C255,40 260,48 270,48 C280,48 285,38 290,38 C295,38 298,42 300,30 Z"
        fill="#FF7262"
        opacity="0.1"
      />

      <rect x="380" y="0" width="120" height="30" rx="2" fill="#FF7262" opacity="0.08" />
      <path
        d="M380,30 L380,36 C380,43 392,46 400,46 C408,46 415,38 425,38 C435,38 440,44 450,44 C460,44 470,36 480,36 C490,36 495,42 500,30 Z"
        fill="#FF7262"
        opacity="0.08"
      />

      <rect x="570" y="0" width="90" height="30" rx="2" fill="#FF7262" opacity="0.14" />
      <path
        d="M570,30 L570,40 C570,47 580,52 590,52 C600,52 608,42 618,42 C628,42 635,48 645,48 C652,48 658,40 660,30 Z"
        fill="#FF7262"
        opacity="0.14"
      />
    </svg>
  );
}

export default function ConceptB() {
  return (
    <section id="concept-b" className="scroll-mt-20">
      <div className="mb-6 border-b border-line-section pb-4">
        <span className="font-space-grotesk text-label text-ink-tertiary">Concept B</span>
        <h2 className="text-title-lg text-ink mt-1">Signal &amp; Noise</h2>
        <p className="text-body-sm text-ink-tertiary mt-1">
          Human traces layered on an orderly system
        </p>
      </div>

      {/* Hero area */}
      <div
        className="relative rounded-2xl overflow-hidden px-8 py-16 md:px-16 md:py-24"
        style={{
          backgroundColor: '#E8E4E0',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
        }}
      >
        {/* Structural lines (Figma-like grid) */}
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.06 }}>
          <div className="absolute top-16 left-12 right-12 h-px bg-black" />
          <div className="absolute top-32 left-12 right-12 h-px bg-black" />
          <div className="absolute bottom-24 left-12 right-12 h-px bg-black" />
          <div className="absolute top-12 left-16 bottom-12 w-px bg-black" />
          <div className="absolute top-12 right-16 bottom-12 w-px bg-black" />
          <div className="absolute top-12 left-1/2 bottom-12 w-px bg-black" />
        </div>

        <HandDrawnOverlaySVG />
        <MeltingBarsSVG />

        <div className="relative z-10 max-w-xl">
          <p className="font-space-grotesk text-label tracking-wider uppercase" style={{ color: '#FF7262' }}>
            Figma Plugins & Widgets
          </p>
          <h3 className="text-headline text-ink mt-3">
            Tools born from dialogue with AI
          </h3>
          <p className="text-body-lg text-ink-secondary mt-4 leading-relaxed">
            Human ideas scribbled onto structured systems. 18 plugins built
            through vibe-coding — where the signal of creative intent meets
            the noise of messy, iterative exploration.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <span
              className="inline-block h-2 w-8 rounded-full"
              style={{ backgroundColor: '#FF7262', opacity: 0.5 }}
            />
            <span className="font-space-grotesk text-caption text-ink-tertiary">
              5 Personal &middot; 13 Enterprise DS
            </span>
          </div>
        </div>
      </div>

      {/* Plugin cards grid */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {plugins.map((plugin) => (
          <PluginCard key={plugin.id} plugin={plugin} variant="conceptB" />
        ))}
      </div>
    </section>
  );
}
