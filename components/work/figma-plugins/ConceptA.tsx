'use client';

import React from 'react';
import PluginCard from './PluginCard';
import { plugins } from './pluginData';

function OrganicStemsSVG() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 800 400"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Stem 1: grows from bottom-left grid point */}
      <path
        d="M120,380 C120,320 100,280 110,240 C120,200 140,180 135,140 C130,100 120,80 130,50"
        fill="none"
        stroke="#A259FF"
        strokeWidth="1.5"
        opacity="0.4"
      />
      <circle cx="130" cy="50" r="8" fill="#A259FF" opacity="0.15" />
      <circle cx="130" cy="50" r="4" fill="#A259FF" opacity="0.3" />
      <circle cx="130" cy="50" r="1.5" fill="#A259FF" opacity="0.6" />
      {/* Branches from stem 1 */}
      <path
        d="M115,200 C100,185 80,180 65,175"
        fill="none"
        stroke="#0ACF83"
        strokeWidth="1"
        opacity="0.3"
      />
      <circle cx="65" cy="175" r="5" fill="#0ACF83" opacity="0.15" />
      <circle cx="65" cy="175" r="2" fill="#0ACF83" opacity="0.35" />

      {/* Stem 2: grows from center-bottom */}
      <path
        d="M400,400 C400,350 410,310 395,270 C380,230 390,200 400,160 C410,120 405,90 400,60"
        fill="none"
        stroke="#A259FF"
        strokeWidth="1.5"
        opacity="0.3"
      />
      <circle cx="400" cy="60" r="12" fill="#A259FF" opacity="0.08" />
      <circle cx="400" cy="60" r="6" fill="#A259FF" opacity="0.15" />
      <circle cx="400" cy="60" r="2.5" fill="#A259FF" opacity="0.4" />
      {/* Branches from stem 2 */}
      <path
        d="M395,270 C370,260 350,255 330,260"
        fill="none"
        stroke="#0ACF83"
        strokeWidth="1"
        opacity="0.25"
      />
      <circle cx="330" cy="260" r="4" fill="#0ACF83" opacity="0.2" />
      <path
        d="M405,180 C430,170 455,175 470,165"
        fill="none"
        stroke="#0ACF83"
        strokeWidth="1"
        opacity="0.25"
      />
      <circle cx="470" cy="165" r="6" fill="#0ACF83" opacity="0.12" />
      <circle cx="470" cy="165" r="2.5" fill="#0ACF83" opacity="0.3" />

      {/* Stem 3: grows from right side */}
      <path
        d="M680,380 C685,330 670,290 680,250 C690,210 675,170 680,130 C685,90 690,70 685,40"
        fill="none"
        stroke="#A259FF"
        strokeWidth="1.5"
        opacity="0.35"
      />
      <circle cx="685" cy="40" r="10" fill="#A259FF" opacity="0.1" />
      <circle cx="685" cy="40" r="5" fill="#A259FF" opacity="0.2" />
      <circle cx="685" cy="40" r="2" fill="#A259FF" opacity="0.5" />
      {/* Branches from stem 3 */}
      <path
        d="M675,250 C650,240 630,245 615,238"
        fill="none"
        stroke="#0ACF83"
        strokeWidth="1"
        opacity="0.3"
      />
      <circle cx="615" cy="238" r="3.5" fill="#0ACF83" opacity="0.25" />
      <path
        d="M685,150 C710,140 730,145 750,138"
        fill="none"
        stroke="#A259FF"
        strokeWidth="1"
        opacity="0.2"
      />
      <circle cx="750" cy="138" r="5" fill="#A259FF" opacity="0.15" />

      {/* Small floating spores / seeds */}
      <circle cx="200" cy="100" r="1.5" fill="#A259FF" opacity="0.25" />
      <circle cx="550" cy="80" r="1" fill="#0ACF83" opacity="0.3" />
      <circle cx="300" cy="140" r="1.5" fill="#0ACF83" opacity="0.2" />
      <circle cx="600" cy="120" r="1" fill="#A259FF" opacity="0.2" />
      <circle cx="250" cy="60" r="2" fill="#A259FF" opacity="0.15" />
      <circle cx="500" cy="50" r="1.5" fill="#0ACF83" opacity="0.2" />
    </svg>
  );
}

export default function ConceptA() {
  return (
    <section id="concept-a" className="scroll-mt-20">
      <div className="mb-6 border-b border-line-section pb-4">
        <span className="font-space-grotesk text-label text-ink-tertiary">Concept A</span>
        <h2 className="text-title-lg text-ink mt-1">Growth from Grid</h2>
        <p className="text-body-sm text-ink-tertiary mt-1">
          Systematic soil — ideas bloom as seeds on Figma&apos;s canvas
        </p>
      </div>

      {/* Hero area */}
      <div
        className="relative rounded-2xl overflow-hidden px-8 py-16 md:px-16 md:py-24"
        style={{
          backgroundImage:
            'radial-gradient(circle, #A259FF20 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          backgroundColor: '#faf9fc',
        }}
      >
        <OrganicStemsSVG />

        <div className="relative z-10 max-w-xl">
          <p className="font-space-grotesk text-label tracking-wider uppercase" style={{ color: '#A259FF' }}>
            Figma Plugins & Widgets
          </p>
          <h3 className="text-headline text-ink mt-3">
            Tools born from dialogue with AI
          </h3>
          <p className="text-body-lg text-ink-secondary mt-4 leading-relaxed">
            18 plugins and widgets that extend Figma&apos;s capabilities — each one
            grown from a real workflow problem, shaped through conversation with
            AI, and rooted in the systematic grid of design systems.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <span className="inline-block h-px w-8" style={{ backgroundColor: '#A259FF' }} />
            <span className="font-space-grotesk text-caption text-ink-tertiary">
              5 Personal &middot; 13 Enterprise DS
            </span>
          </div>
        </div>
      </div>

      {/* Plugin cards grid */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {plugins.map((plugin) => (
          <PluginCard key={plugin.id} plugin={plugin} variant="conceptA" />
        ))}
      </div>
    </section>
  );
}
