/**
 * One-off backfill: resolve official show covers for the existing
 * public/data/podcast-notes.json without re-fetching from Notion.
 *
 * Updates podcasts[].cover in place via the iTunes resolver (cached to
 * public/data/podcast-covers.json). Per-episode artwork (episodes[].podcastCover)
 * is intentionally left unchanged.
 *
 * Usage:
 *   node scripts/backfill-podcast-covers.js            (resolve only uncached names)
 *   node scripts/backfill-podcast-covers.js --refresh  (re-resolve & re-validate all)
 */

const fs = require('fs');
const path = require('path');
const { resolveOfficialCovers, CACHE_PATH } = require('./lib/itunes-cover');

const DATA_PATH = path.join(__dirname, '..', 'public', 'data', 'podcast-notes.json');
const REFRESH = process.argv.includes('--refresh');

// A show whose episodes overwhelmingly share one Spotify cover → that cover IS the
// show's official art (from the exact podcast the notes came from). Prefer it over
// the iTunes guess, which can match a different same-named show (e.g. "Today I learned").
const MODE_SHARE_THRESHOLD = 0.7;

function dominantSpotifyCover(episodes, podcastName) {
  const counts = new Map();
  let total = 0;
  for (const e of episodes) {
    if (e.podcast !== podcastName || !e.podcastCover) continue;
    counts.set(e.podcastCover, (counts.get(e.podcastCover) || 0) + 1);
    total++;
  }
  if (!total) return null;
  let best = null;
  let bestN = 0;
  for (const [cover, n] of counts) if (n > bestN) [best, bestN] = [cover, n];
  return bestN / total >= MODE_SHARE_THRESHOLD ? best : null;
}

(async () => {
  const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
  if (!Array.isArray(data.podcasts)) {
    console.error('No podcasts[] array in podcast-notes.json');
    process.exit(1);
  }
  // Reset each podcast's cover to its true episode-art fallback first, so a miss
  // never retains a stale/wrong cover from an earlier run. Resolver overwrites hits.
  const firstEpisodeCover = new Map();
  for (const ep of data.episodes || []) {
    if (ep.podcast && !firstEpisodeCover.has(ep.podcast) && ep.podcastCover) {
      firstEpisodeCover.set(ep.podcast, ep.podcastCover);
    }
  }
  for (const pod of data.podcasts) {
    if (firstEpisodeCover.has(pod.name)) pod.cover = firstEpisodeCover.get(pod.name);
  }

  console.log(`Resolving official covers for ${data.podcasts.length} podcasts${REFRESH ? ' (refresh)' : ''}...`);
  const { cache, report } = await resolveOfficialCovers(data.podcasts, { refresh: REFRESH });

  // Post-step: prefer a show's dominant Spotify cover over iTunes when it exists.
  // This is authoritative (the exact show) and immune to same-name iTunes mismatches.
  // Applied AFTER iTunes so it wins even on --refresh; persisted to the cache too.
  let spotifyPreferred = 0;
  for (const pod of data.podcasts) {
    const dom = dominantSpotifyCover(data.episodes || [], pod.name);
    if (dom) {
      pod.cover = dom;
      cache[pod.name] = dom;
      spotifyPreferred++;
    }
  }
  fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2) + '\n');

  // Audit print: show each newly-queried name → matched show title (or MISS).
  if (report.length) {
    console.log('\n--- match report (query → matched iTunes title) ---');
    for (const r of report) {
      console.log(r.matched ? `  ✓ ${r.name}  →  ${r.matched}` : `  ✗ MISS  ${r.name}`);
    }
  }

  // Match the generate script's exact format (2-space, no trailing newline).
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  const withCover = data.podcasts.filter((p) => p.cover).length;
  console.log(
    `\nDone. ${withCover}/${data.podcasts.length} podcasts have a cover ` +
      `(${spotifyPreferred} from dominant Spotify show art, rest iTunes/fallback).`,
  );
})();
