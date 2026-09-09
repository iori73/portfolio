'use client';

import { useMemo, useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { plugins, formatUsers, PluginData } from './pluginData';

// Fanned hero deck, driven entirely by pluginData.ts — adding a plugin there
// is the only step needed; this component never needs a manual edit.
//
// Above MAX_VISIBLE plugins, showing everyone at once gets visually cramped
// (rotation/spacing grows with the card count), so instead we show a
// MAX_VISIBLE-wide window that auto-rotates through the full list. Below that
// count (today: 4), every plugin is shown, statically, exactly as before.
const MAX_VISIBLE = 5;
const ROTATE_INTERVAL_MS = 4500;

const CARD_W = 200;
const CARD_H = Math.round(CARD_W * (537 / 432)); // 249

const IMG_MARGIN = Math.round(16 * (CARD_W / 432));
const IMG_W = CARD_W - IMG_MARGIN * 2;
const IMG_H = Math.round(IMG_W / 2);

// Card spacing (center-to-center). Cards are CARD_W wide, so a STEP of 150
// leaves a ~150px un-overlapped strip per card — wide and even enough that
// the cursor target for each card is easy to predict.
const STEP = 150;

function CardContent({ plugin }: { plugin: PluginData }) {
  const likes = plugin.likes != null ? String(plugin.likes) : '—';
  const users = plugin.users != null ? formatUsers(plugin.users) : '—';
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
        {plugin.thumbnail ? (
          <Image
            src={plugin.thumbnail}
            alt={plugin.name}
            fill
            sizes="400px"
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
            <span className="flex items-center gap-[2px] font-space-grotesk text-[9px] text-ink-tertiary whitespace-nowrap">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
                <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              {users}
            </span>
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

// Cap for hero usage (detail-page hero + its transition-overlay clone). Deliberately
// NOT Infinity: on a wide viewport the full-bleed hero container is much wider than
// the deck's natural size, and letting the cluster fill it edge-to-edge produced 3
// oversized, heavily-shadowed cards with no breathing room — at odds with this site's
// airy, HIG-influenced restraint (contrast the Ukiyoe hero, a single bleeding photo,
// not a cluster of drop-shadowed objects). Capping growth keeps the deck modest and
// centered, with real margin on wide screens. Both render sites MUST use this same
// constant — the overlay clones the deck mid-transition, and any mismatch with the
// real hero underneath would cause a visible size "snap" the instant it fades in.
export const PLUGIN_DECK_HERO_MAX_SCALE = 1.5;

interface PluginCardDeckThumbProps {
  // Caps how far the cluster scales up to fill a larger container (e.g. a
  // full-bleed hero). Home keeps the default of 1 (shrink-to-fit only, never
  // enlarge); pass PLUGIN_DECK_HERO_MAX_SCALE for hero usage.
  maxScale?: number;
}

export default function PluginCardDeckThumb({ maxScale = 1 }: PluginCardDeckThumbProps) {
  const [active, setActive] = useState<number | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const visibleCount = Math.min(plugins.length, MAX_VISIBLE);
  const rotates = plugins.length > MAX_VISIBLE;

  // Rotating window into `plugins`: when the library is bigger than
  // MAX_VISIBLE, `windowStart` slides forward on a timer so every plugin
  // eventually gets its turn in the deck without any layout ever needing to
  // grow past MAX_VISIBLE cards. Paused while a card is hovered so the deck
  // doesn't shift under the cursor mid-interaction.
  const [windowStart, setWindowStart] = useState(0);
  useEffect(() => {
    if (!rotates || active !== null) return;
    const id = setInterval(() => {
      setWindowStart((s) => (s + 1) % plugins.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [rotates, active]);

  const deck = useMemo(
    () => Array.from({ length: visibleCount }, (_, k) => plugins[(windowStart + k) % plugins.length]),
    [visibleCount, windowStart],
  );

  // Symmetric fan positions, generalized for any card count: index distance
  // from the fractional center drives rotation/x-offset (same 7deg / STEP
  // per step as the original hand-tuned 3-card layout); the nearest-to-center
  // card is elevated as the hero, matching the original design language.
  const center = (visibleCount - 1) / 2;
  const heroIndex = Math.round(center);
  const maxAbsD = Math.max(...deck.map((_, i) => Math.abs(i - center)), 0);

  // Design size of the fixed-layout cluster. The outermost card centers sit at
  // ±maxAbsD*STEP, plus half a card and breathing room for rotation / hover scale.
  const CLUSTER_W = 2 * (maxAbsD * STEP + CARD_W / 2) + 80;
  const CLUSTER_H = CARD_H + 90;

  // Only enable the hover-to-scale interaction on devices that actually hover
  // (fine pointer). On touch, a tap would fire onMouseEnter → scale the card
  // mid-transition, moving it under the finger, which makes the browser SUPPRESS
  // the click — so the parent <Link> never navigates. Disabling pointer events
  // on the (decorative) deck for touch lets the tap fall straight through.
  const [canHover, setCanHover] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  // The cluster is laid out at a fixed design width (CLUSTER_W). On viewports
  // narrower than that (smaller desktops, tablets, mobile) we scale the whole
  // cluster down to fit instead of clipping the outer cards.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () =>
      setScale(Math.min(maxScale, el.clientWidth / CLUSTER_W, el.clientHeight / CLUSTER_H));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [maxScale, CLUSTER_W, CLUSTER_H]);

  return (
    <div
      ref={wrapRef}
      className="w-full h-full flex items-center justify-center overflow-hidden"
      onMouseLeave={canHover ? () => setActive(null) : undefined}
    >
      {/* Fixed-size cluster container, scaled to fit narrow viewports.
          On touch (no hover), pointer-events are disabled so a tap falls
          through to the parent <Link> instead of triggering the hover-scale. */}
      <div
        className="relative"
        style={{
          width: CLUSTER_W,
          height: CLUSTER_H,
          transform: `scale(${scale})`,
          transformOrigin: 'center',
          pointerEvents: canHover ? undefined : 'none',
        }}
      >

        {/* All visible cards. Hover enlarges a card IN PLACE (pure scale — the card
            never moves), so onMouseEnter/onMouseLeave fire exactly when the
            cursor enters/leaves the card and the hover clears the moment the
            cursor is off it, with no flicker. */}
        {deck.map((plugin, i) => {
          const d = i - center;
          const baseR = d * 7;
          const baseTx = d * STEP;
          const isActive = active === i;
          const anyActive = active !== null;

          const isHero = i === heroIndex;
          // Position and rotation stay constant per card; only scale/z/shadow
          // change on hover. Keeping geometry fixed prevents the card from
          // moving out from under the cursor (which would cause hover flicker).
          const ty = 6 + (isHero ? -16 : 0);
          const cardScale = isActive ? 1.08 : isHero && !anyActive ? 1.04 : anyActive ? 0.94 : 1;
          const z = isActive ? 10 : isHero ? 5 : 1;

          return (
            <div
              key={plugin.id}
              className="absolute rounded-2xl bg-white overflow-hidden cursor-pointer"
              style={{
                width: CARD_W,
                height: CARD_H,
                left: `calc(50% - ${CARD_W / 2}px)`,
                top: `calc(50% - ${CARD_H / 2}px)`,
                transform: `translate(${baseTx}px, ${ty}px) rotate(${baseR}deg) scale(${cardScale})`,
                zIndex: z,
                boxShadow: isActive
                  ? '0 16px 48px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.10)'
                  : isHero && !anyActive
                  ? '0 8px 24px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.07)'
                  : '0 2px 10px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)',
                transition: 'transform 0.45s cubic-bezier(0.34, 1.2, 0.64, 1), box-shadow 0.35s ease, z-index 0s',
              }}
              onMouseEnter={canHover ? () => setActive(i) : undefined}
              onMouseLeave={canHover ? () => setActive(null) : undefined}
            >
              <CardContent plugin={plugin} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
