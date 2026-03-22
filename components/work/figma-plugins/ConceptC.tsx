'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import PluginCard from './PluginCard';
import { plugins } from './pluginData';

function HeroGraphicSVG() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 800 400"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <clipPath id="checkerClip">
          <rect x="60" y="280" width="56" height="56" rx="4" />
        </clipPath>
      </defs>

      {/* Large organic blob — top right */}
      <path
        d="M620,40 C680,20 750,50 760,110 C770,170 730,200 680,210 C630,220 590,190 580,140 C570,90 570,60 620,40Z"
        fill="#A259FF"
        opacity="0.18"
      />

      {/* Concentric rings — right center */}
      <circle cx="660" cy="160" r="90" fill="none" stroke="#F24E1E" strokeWidth="14" opacity="0.15" />
      <circle cx="660" cy="160" r="65" fill="none" stroke="#A259FF" strokeWidth="12" opacity="0.12" />
      <circle cx="660" cy="160" r="42" fill="none" stroke="#1ABCFE" strokeWidth="10" opacity="0.15" />
      <circle cx="660" cy="160" r="18" fill="#0ACF83" opacity="0.2" />

      {/* Second blob — bottom right */}
      <path
        d="M580,300 C620,270 700,280 720,320 C740,360 700,400 650,400 C600,400 560,370 560,340 C560,310 560,310 580,300Z"
        fill="#0ACF83"
        opacity="0.14"
      />

      {/* Small blob — middle */}
      <path
        d="M420,60 C450,45 480,55 485,80 C490,105 465,120 440,115 C415,110 395,80 420,60Z"
        fill="#1ABCFE"
        opacity="0.15"
      />

      {/* Dashed curved path weaving across — organic/hand-drawn feel */}
      <path
        d="M30,350 C100,300 180,340 260,290 C340,240 400,280 480,230 C560,180 620,250 720,200"
        fill="none"
        stroke="#FF7262"
        strokeWidth="3"
        strokeDasharray="12 8"
        opacity="0.2"
        strokeLinecap="round"
      />
      <path
        d="M40,360 C110,310 190,350 270,300 C350,250 410,290 490,240 C570,190 630,260 730,210"
        fill="none"
        stroke="#0ACF83"
        strokeWidth="3"
        strokeDasharray="12 8"
        opacity="0.15"
        strokeLinecap="round"
      />

      {/* Checkerboard block — bottom left */}
      <g clipPath="url(#checkerClip)" opacity="0.2">
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={60 + col * 14}
              y={280 + row * 14}
              width="14"
              height="14"
              fill={
                (row + col) % 2 === 0
                  ? '#FF7262'
                  : '#A259FF'
              }
            />
          ))
        )}
      </g>

      {/* Flower icon shape */}
      <g transform="translate(520, 90)" opacity="0.2">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <ellipse
            key={angle}
            cx="0"
            cy="-10"
            rx="4"
            ry="8"
            fill="#A259FF"
            transform={`rotate(${angle})`}
          />
        ))}
        <circle cx="0" cy="0" r="4" fill="#FF7262" />
      </g>

      {/* Star/asterisk shape */}
      <g transform="translate(740, 80)" opacity="0.18">
        {[0, 60, 120].map((angle) => (
          <rect
            key={angle}
            x="-2"
            y="-12"
            width="4"
            height="24"
            rx="2"
            fill="#0ACF83"
            transform={`rotate(${angle})`}
          />
        ))}
      </g>

      {/* Cross/plus shape */}
      <g transform="translate(350, 50)" opacity="0.16">
        <rect x="-3" y="-12" width="6" height="24" rx="3" fill="#1ABCFE" />
        <rect x="-12" y="-3" width="24" height="6" rx="3" fill="#1ABCFE" />
      </g>

      {/* Clover/four-leaf shape */}
      <g transform="translate(480, 340)" opacity="0.15">
        <circle cx="-6" cy="-6" r="7" fill="#0ACF83" />
        <circle cx="6" cy="-6" r="7" fill="#0ACF83" />
        <circle cx="-6" cy="6" r="7" fill="#0ACF83" />
        <circle cx="6" cy="6" r="7" fill="#0ACF83" />
      </g>

      {/* Figma selection handles — green dots */}
      <g opacity="0.25">
        <circle cx="550" cy="50" r="3" fill="#0ACF83" />
        <circle cx="580" cy="50" r="3" fill="#0ACF83" />
        <circle cx="550" cy="78" r="3" fill="#0ACF83" />
        <circle cx="580" cy="78" r="3" fill="#0ACF83" />
        <rect x="550" y="50" width="30" height="28" fill="none" stroke="#0ACF83" strokeWidth="1" opacity="0.4" />
      </g>

      {/* Hand-drawn squiggle — organic touch */}
      <path
        d="M100,200 C110,190 115,205 125,195 C135,185 140,200 150,192 C160,184 165,198 175,190"
        fill="none"
        stroke="#A259FF"
        strokeWidth="2"
        opacity="0.15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Small rounded square — like Figma icon tile */}
      <rect x="700" y="300" width="28" height="28" rx="6" fill="#1ABCFE" opacity="0.12" />
      <rect x="706" y="306" width="16" height="16" rx="4" fill="#A259FF" opacity="0.15" />

      {/* Dots cluster — bottom center */}
      <g opacity="0.12">
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <circle
              key={`dot-${row}-${col}`}
              cx={380 + col * 14}
              cy={370 + row * 14}
              r="4"
              fill="#0ACF83"
            />
          ))
        )}
      </g>
    </svg>
  );
}

function formatUsers(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  return String(n);
}

export default function ConceptC() {
  const t = useTranslations('figmaPlugins');

  const personalPlugins = plugins.filter((p) => p.category === 'personal');
  const dsPlugins = plugins.filter((p) => p.category === 'client-ds');
  const totalUsers = plugins.reduce((sum, p) => sum + (p.users ?? 0), 0);

  const stats = [
    { value: String(plugins.length), label: 'Total tools', color: '#A259FF' },
    { value: `${formatUsers(totalUsers)}+`, label: 'Users', color: '#1ABCFE' },
    { value: String(dsPlugins.length), label: 'DS Suite', color: '#0ACF83' },
  ];

  return (
    <section>
      {/* Hero area */}
      <div className="relative rounded-2xl overflow-hidden px-8 py-16 md:px-16 md:py-24 bg-surface-muted">
        <HeroGraphicSVG />

        <div className="relative z-10 max-w-xl">
          <p className="font-space-grotesk text-label tracking-wider uppercase" style={{ color: '#A259FF' }}>
            {t('heroTagline')}
          </p>
          <h2 className="text-display font-bold text-ink mt-3">
            {t('heroTitle')}
          </h2>
          <p className="text-body-lg text-ink-secondary mt-4 leading-relaxed max-w-md">
            {t('heroDescription')}
          </p>

          <div className="mt-8 flex flex-wrap gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-2">
                <span
                  className="text-title-lg font-bold"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </span>
                <span className="font-space-grotesk text-caption text-ink-tertiary">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Personal plugins */}
      <div className="mt-12">
        <h3 className="font-space-grotesk text-label tracking-wider uppercase text-ink-tertiary mb-6">
          Personal — {personalPlugins.length} tools
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {personalPlugins.map((plugin) => (
            <PluginCard key={plugin.id} plugin={plugin} />
          ))}
        </div>
      </div>

      {/* Enterprise DS plugins */}
      <div className="mt-16">
        <h3 className="font-space-grotesk text-label tracking-wider uppercase text-ink-tertiary mb-6">
          {t('enterpriseDS')} — {dsPlugins.length} tools
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dsPlugins.map((plugin) => (
            <PluginCard key={plugin.id} plugin={plugin} />
          ))}
        </div>
      </div>
    </section>
  );
}
