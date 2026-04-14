'use client';

import { useState } from 'react';
import Image from 'next/image';

const DECK = [
  {
    name: 'PPTX to Figma',
    type: 'Plugin',
    cover: '/work/figma-plugins/pptx-cover.png',
    likes: '34',
    users: '3.6k',
    description:
      'Converts PowerPoint (.pptx) files into fully editable Figma designs, preserving your layout, styles, and structure.',
  },
  {
    name: 'Perfect Markdown',
    type: 'Widget',
    cover: '/work/figma-plugins/pm-cover.png',
    likes: '3',
    users: '279',
    description:
      'Renders Markdown inside Figma and FigJam with full syntax support — tables, code blocks, task lists, and light/dark themes.',
  },
  {
    name: 'Bulk Screenshot Importer',
    type: 'Plugin',
    cover: '/work/figma-plugins/si-cover-cropped.png',
    likes: '0',
    users: '9',
    description:
      'Imports screenshots with folder structure preserved as Sections. Smart Import uses AI to detect scroll sequences.',
  },
];

// Total visual cards: 3 real + 3 dummy blank cards behind
const TOTAL_CARDS = 6;

// Card dimensions scaled from Figma: 432×537 → 240×299
const CARD_W = 240;
const CARD_H = Math.round(CARD_W * (537 / 432)); // 299
const IMG_MARGIN = Math.round(16 * (CARD_W / 432)); // 9px
const IMG_W = CARD_W - IMG_MARGIN * 2;
const IMG_H = Math.round(IMG_W / 2);

function CardContent({ plugin }: { plugin: typeof DECK[number] }) {
  return (
    <>
      {/* Header */}
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

      {/* Cover image */}
      <div
        className="relative overflow-hidden"
        style={{ marginLeft: IMG_MARGIN, marginRight: IMG_MARGIN, height: IMG_H }}
      >
        <Image
          src={plugin.cover}
          alt={plugin.name}
          fill
          sizes={`${IMG_W}px`}
          className="object-cover object-top"
        />
      </div>

      <div style={{ height: IMG_MARGIN }} />

      {/* Content */}
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
  const [hovered, setHovered] = useState(false);

  // Build array: indices 0..TOTAL_CARDS-1, where 0 = front (real), last = back (dummy)
  const cards = Array.from({ length: TOTAL_CARDS }, (_, i) => i);

  return (
    <div
      className="w-full h-full relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {cards.map((i) => {
        // Front card (i=0) always on top; in fan, center cards in front
        const zIndex = TOTAL_CARDS - i;
        const isReal = i < DECK.length;
        const plugin = DECK[i % DECK.length];

        // Sensu (扇子) fan: all cards share the same pivot at bottom-center
        // Symmetric spread — cards fan left and right from center
        const half = (TOTAL_CARDS - 1) / 2;
        const fanAngle = hovered ? (i - half) * 8 : 0;
        const stackOffset = hovered ? 0 : i * 2;

        return (
          <div
            key={i}
            className="absolute rounded-2xl bg-white overflow-hidden"
            style={{
              width: CARD_W,
              height: CARD_H,
              bottom: 24,
              left: `calc(50% - ${CARD_W / 2}px)`,
              transform: `translate(${stackOffset}px, ${stackOffset}px) rotate(${fanAngle}deg)`,
              transformOrigin: 'bottom center',
              transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              zIndex,
              boxShadow: i === 0
                ? '0 4px 16px rgba(0,0,0,0.10), 0 8px 32px rgba(0,0,0,0.08)'
                : '0 1px 4px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            {isReal ? (
              <CardContent plugin={plugin} />
            ) : (
              // Dummy cards: just white with subtle border
              <div className="w-full h-full bg-white" />
            )}
          </div>
        );
      })}
    </div>
  );
}
