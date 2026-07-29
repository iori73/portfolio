'use client';

import Image from 'next/image';
import type { PluginData } from './pluginData';

type Tier = 'full' | 'lg' | 'md' | 'sm';

// Below this, bento variety would be arbitrary/forced — you can't make "1 large +
// a couple small" read as intentional with only 3-4 items. Below the threshold,
// every tile gets 'full' tier, which stacks into a clean single-column list. This
// is the one knob that turns "uniform mode" into "bento mode" — same function,
// same render path, no forked component.
const BENTO_MIN_ITEMS = 5;

// Percentile rank of `value` within `values`, in [0, 1] (mid-rank for ties).
// Scale-invariant: blending "users" (~10,000s) and "likes" (~100s) needs no ad
// hoc weighting and no min-max normalization (unstable at low N).
function percentileRank(values: number[], value: number): number {
  if (values.length <= 1) return 0.5;
  let below = 0;
  let equal = 0;
  for (const v of values) {
    if (v < value) below++;
    else if (v === value) equal++;
  }
  return (below + equal / 2) / values.length;
}

function scorePlugins(items: PluginData[]): number[] {
  const users = items.map((p) => p.users ?? 0);
  const likes = items.map((p) => p.likes ?? 0);
  return items.map((_, i) => {
    const usersPct = percentileRank(users, users[i]);
    const likesPct = percentileRank(likes, likes[i]);
    return (usersPct + likesPct) / 2;
  });
}

interface Tile {
  plugin: PluginData;
  tier: Tier;
}

function layoutBento(items: PluginData[]): Tile[] {
  if (items.length === 0) return [];

  if (items.length < BENTO_MIN_ITEMS) {
    return items.map((plugin) => ({ plugin, tier: 'full' as const }));
  }

  const scores = scorePlugins(items);
  const ranked = items
    .map((plugin, i) => ({ plugin, score: scores[i] }))
    .sort((a, b) => b.score - a.score);

  const n = ranked.length;
  const lgCount = Math.max(1, Math.round(n * 0.15));
  const mdCount = Math.max(1, Math.round(n * 0.35));

  return ranked.map(({ plugin }, i) => ({
    plugin,
    tier: (i < lgCount ? 'lg' : i < lgCount + mdCount ? 'md' : 'sm') as Tier,
  }));
}

const TIER_CLASSES: Record<Tier, string> = {
  full: 'col-span-4 row-span-2',
  lg: 'col-span-2 row-span-2',
  md: 'col-span-2 row-span-1',
  sm: 'col-span-1 row-span-1',
};

const TIER_SIZES: Record<Tier, string> = {
  full: '(min-width: 768px) 420px, 100vw',
  lg: '(min-width: 768px) 210px, 50vw',
  md: '(min-width: 768px) 210px, 50vw',
  sm: '(min-width: 768px) 105px, 25vw',
};

interface PluginBentoGridProps {
  plugins: PluginData[];
}

export default function PluginBentoGrid({ plugins }: PluginBentoGridProps) {
  const tiles = layoutBento(plugins);

  if (tiles.length === 0) return null;

  return (
    <div className="w-full max-w-[420px] md:w-[420px] flex-shrink-0 mx-auto md:mx-0">
      <div className="grid grid-cols-4 grid-flow-row-dense auto-rows-[64px] md:auto-rows-[80px] gap-3 md:gap-4">
        {tiles.map(({ plugin, tier }) => (
          <div
            key={plugin.id}
            className={`relative rounded-xl overflow-hidden bg-surface-muted ${TIER_CLASSES[tier]}`}
          >
            {plugin.thumbnail ? (
              <Image
                src={plugin.thumbnail}
                alt={plugin.name}
                fill
                sizes={TIER_SIZES[tier]}
                className="object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center text-body-sm font-semibold"
                style={{ backgroundColor: `${plugin.accentColor}14`, color: plugin.accentColor }}
              >
                {plugin.name.charAt(0)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
