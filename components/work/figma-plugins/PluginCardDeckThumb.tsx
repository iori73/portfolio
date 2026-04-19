'use client';

import { useState } from 'react';
import Image from 'next/image';

const DECK = [
  {
    name: 'Screenshot Reorganizer',
    type: 'Plugin',
    cover: null,
    accentColor: '#FF7262',
    likes: '—',
    users: '—',
    description:
      'Reorganizes imported screenshot frames on the Figma canvas — sorting, aligning, and grouping them into a clean grid layout.',
  },
  {
    name: 'Perfect Markdown',
    type: 'Widget',
    cover: '/work/figma-plugins/pm-cover.png',
    accentColor: '#A259FF',
    likes: '3',
    users: '279',
    description:
      'Renders Markdown inside Figma and FigJam with full syntax support — tables, code blocks, task lists, and light/dark themes.',
  },
  {
    name: 'PPTX to Figma',
    type: 'Plugin',
    cover: '/work/figma-plugins/pptx-cover.png',
    accentColor: '#1ABCFE',
    likes: '34',
    users: '3.6k',
    description:
      'Converts PowerPoint (.pptx) files into fully editable Figma designs, preserving your layout, styles, and structure.',
  },
  {
    name: 'Bulk Screenshot Importer',
    type: 'Plugin',
    cover: '/work/figma-plugins/si-cover-cropped.png',
    accentColor: '#0ACF83',
    likes: '0',
    users: '9',
    description:
      'Imports screenshots with folder structure preserved as Sections. Smart Import uses AI to detect scroll sequences.',
  },
  {
    name: 'Arrow Connect',
    type: 'Plugin',
    cover: null,
    accentColor: '#F24E1E',
    likes: '—',
    users: '—',
    description:
      'Draws directional connector arrows between selected frames or components. Useful for flow diagrams and user journeys.',
  },
];

const CARD_W = 200;
const CARD_H = Math.round(CARD_W * (537 / 432)); // 249

const IMG_MARGIN = Math.round(16 * (CARD_W / 432));
const IMG_W = CARD_W - IMG_MARGIN * 2;
const IMG_H = Math.round(IMG_W / 2);

// Default organic positions: [rotDeg, tx, ty] for each card
// Intentionally asymmetric — uneven gaps, rotation flips, noisy y
const BASE: [number, number, number][] = [
  [-11, -118,  7],  // Screenshot Reorganizer — far left, wider gap
  [  8,  -56,  3],  // Perfect Markdown — rotation flips vs neighbour
  [  2,    0,  0],  // PPTX to Figma — center (hero)
  [ -9,   46,  5],  // Bulk Screenshot Importer — tighter gap, lean opposite
  [ 16,  106,  6],  // Arrow Connect — wider again, big lean
];

function CardContent({ plugin }: { plugin: (typeof DECK)[number] }) {
  return (
    <>
      <div
        className="flex items-center justify-between"
        style={{ paddingLeft: IMG_MARGIN, paddingRight: IMG_MARGIN, height: 18, marginTop: IMG_MARGIN }}
      >
        <div className="flex items-center gap-1">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#aaa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-space-grotesk text-[9px] leading-none text-ink-tertiary">{plugin.type}</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-[18px] h-[18px] rounded-md bg-[#F2F2F2] flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" stroke="#aaa" strokeWidth="2" />
              <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="#aaa" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="w-[18px] h-[18px] rounded-md bg-[#F2F2F2] flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <div style={{ height: IMG_MARGIN }} />

      <div
        className="relative overflow-hidden rounded-sm"
        style={{ marginLeft: IMG_MARGIN, marginRight: IMG_MARGIN, height: IMG_H }}
      >
        {plugin.cover ? (
          <Image
            src={plugin.cover}
            alt={plugin.name}
            fill
            sizes={`${IMG_W}px`}
            className="object-cover object-top"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: plugin.accentColor + '22' }}
          >
            <span className="font-space-grotesk text-[9px] font-medium" style={{ color: plugin.accentColor }}>
              Coming Soon
            </span>
          </div>
        )}
      </div>

      <div style={{ height: IMG_MARGIN }} />

      <div style={{ paddingLeft: IMG_MARGIN, paddingRight: IMG_MARGIN, paddingBottom: IMG_MARGIN }}>
        <div className="flex items-start gap-2 mb-1.5">
          <p className="font-space-grotesk text-[13px] font-semibold text-ink leading-snug flex-1">
            {plugin.name}
          </p>
          <div className="flex items-center gap-2 flex-shrink-0 pt-0.5">
            <span className="font-space-grotesk text-[9px] text-ink-tertiary whitespace-nowrap">♡ {plugin.likes}</span>
            <span className="font-space-grotesk text-[9px] text-ink-tertiary whitespace-nowrap">↓ {plugin.users}</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 mb-2">
          <div className="w-[14px] h-[14px] rounded-full bg-yellow-400 flex items-center justify-center text-[7px] font-bold text-gray-800 flex-shrink-0">
            I
          </div>
          <span className="font-space-grotesk text-[9px] text-ink-tertiary">@io_73</span>
        </div>
        <p className="font-space-grotesk text-[9px] text-ink-secondary leading-relaxed line-clamp-3">
          {plugin.description}
        </p>
      </div>
    </>
  );
}

export default function PluginCardDeckThumb() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      onMouseLeave={() => setActive(null)}
    >
      {/* Fixed-size cluster container */}
      <div className="relative" style={{ width: CARD_W + 260, height: CARD_H + 40 }}>

        {/* All 5 cards */}
        {DECK.map((plugin, i) => {
          const [baseR, baseTx, baseTy] = BASE[i];
          const isActive = active === i;
          const anyActive = active !== null;

          // i=2 (PPTX) is the hero card — elevated by default even without hover
          const isHero = i === 2;
          const r = isActive ? 0 : baseR;
          const tx = isActive ? 0 : baseTx;
          const ty = isActive ? -14 : isHero && !anyActive ? baseTy - 10 : baseTy;
          const scale = isActive ? 1.08 : isHero && !anyActive ? 1.04 : anyActive ? 0.93 : 1;
          const z = isActive ? 10 : (isHero ? 5 : i === 1 || i === 3 ? 3 : 1);

          return (
            <div
              key={plugin.name}
              className="absolute rounded-2xl bg-white overflow-hidden cursor-pointer"
              style={{
                width: CARD_W,
                height: CARD_H,
                left: `calc(50% - ${CARD_W / 2}px)`,
                top: `calc(50% - ${CARD_H / 2}px)`,
                transform: `translate(${tx}px, ${ty}px) rotate(${r}deg) scale(${scale})`,
                zIndex: z,
                boxShadow: isActive
                  ? '0 16px 48px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.10)'
                  : isHero && !anyActive
                  ? '0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.07)'
                  : '0 2px 10px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)',
                transition: 'transform 0.65s cubic-bezier(0.34, 1.2, 0.64, 1), box-shadow 0.45s ease, z-index 0s',
              }}
              onMouseEnter={() => setActive(i)}
            >
              <CardContent plugin={plugin} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
