'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { plugins, formatUsers } from './pluginData';

// Published plugins only, ordered left → center → right (center is the hero).
// likes/users are NOT stored here — they are pulled from pluginData (the single
// source, refreshed by the build-time Figma fetch) via `id`.
const DECK = [
  {
    id: 'perfect-markdown',
    name: 'Perfect Markdown',
    type: 'Widget',
    cover: '/work/figma-plugins/pm-cover.png',
    accentColor: '#A259FF',
    description:
      'Renders Markdown inside Figma and FigJam with full syntax support — tables, code blocks, task lists, and light/dark themes.',
  },
  {
    id: 'pptx-to-figma',
    name: 'PPTX to Figma',
    type: 'Plugin',
    cover: '/work/figma-plugins/pptx-cover.png',
    accentColor: '#1ABCFE',
    description:
      'Converts PowerPoint (.pptx) files into fully editable Figma designs, preserving your layout, styles, and structure.',
  },
  {
    id: 'bulk-screenshot-importer',
    name: 'Bulk Screenshot Importer',
    type: 'Plugin',
    cover: '/work/figma-plugins/si-cover-cropped.png',
    accentColor: '#0ACF83',
    description:
      'Imports screenshots with folder structure preserved as Sections. Smart Import uses AI to detect scroll sequences.',
  },
];

// Lookup of real likes/users by plugin id (from pluginData / build-time fetch).
const STATS_BY_ID = Object.fromEntries(plugins.map((p) => [p.id, p]));

const CARD_W = 200;
const CARD_H = Math.round(CARD_W * (537 / 432)); // 249

const IMG_MARGIN = Math.round(16 * (CARD_W / 432));
const IMG_W = CARD_W - IMG_MARGIN * 2;
const IMG_H = Math.round(IMG_W / 2);

// Card spacing (center-to-center). Cards are CARD_W wide, so a STEP of 150
// leaves a ~150px un-overlapped strip per card — wide and even enough that
// the cursor target for each card is easy to predict.
const STEP = 150;

// Default fan positions: [rotDeg, tx, ty] for each card.
// Symmetric, evenly spaced fan — outer cards lean + sit slightly lower so the
// arc reads naturally, but gaps are uniform so hover targets stay predictable.
const BASE: [number, number, number][] = [
  [-7, -1 * STEP, 6],  // Perfect Markdown — left
  [ 0,        0,  0],  // PPTX to Figma — center (hero)
  [ 7,  1 * STEP, 6],  // Bulk Screenshot Importer — right
];

// Design size of the fixed-layout cluster. The outer card centers sit at
// ±1*STEP, plus half a card and breathing room for rotation / hover scale.
const CLUSTER_W = 2 * (STEP + CARD_W / 2) + 80; // 580
const CLUSTER_H = CARD_H + 90;

function CardContent({ plugin }: { plugin: (typeof DECK)[number] }) {
  const stat = STATS_BY_ID[plugin.id];
  const likes = stat?.likes != null ? String(stat.likes) : '—';
  const users = stat?.users != null ? formatUsers(stat.users) : '—';
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
            <span className="font-space-grotesk text-[9px] text-ink-tertiary whitespace-nowrap">♡ {likes}</span>
            <span className="font-space-grotesk text-[9px] text-ink-tertiary whitespace-nowrap">↓ {users}</span>
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
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  // The cluster is laid out at a fixed design width (CLUSTER_W). On viewports
  // narrower than that (smaller desktops, tablets, mobile) we scale the whole
  // cluster down to fit instead of clipping the outer cards.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setScale(Math.min(1, el.clientWidth / CLUSTER_W));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="w-full h-full flex items-center justify-center overflow-hidden"
      onMouseLeave={() => setActive(null)}
    >
      {/* Fixed-size cluster container, scaled to fit narrow viewports */}
      <div
        className="relative"
        style={{
          width: CLUSTER_W,
          height: CLUSTER_H,
          transform: `scale(${scale})`,
          transformOrigin: 'center',
        }}
      >

        {/* All 3 cards */}
        {DECK.map((plugin, i) => {
          const [baseR, baseTx, baseTy] = BASE[i];
          const isActive = active === i;
          const anyActive = active !== null;

          // i=1 (PPTX) is the hero card — elevated by default even without hover
          const isHero = i === 1;
          const r = isActive ? 0 : baseR;
          const tx = isActive ? 0 : baseTx;
          const ty = isActive ? -14 : isHero && !anyActive ? baseTy - 10 : baseTy;
          const scale = isActive ? 1.08 : isHero && !anyActive ? 1.04 : anyActive ? 0.93 : 1;
          const z = isActive ? 10 : isHero ? 5 : 1;

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
