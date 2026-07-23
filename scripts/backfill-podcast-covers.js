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
const { resolveOfficialCovers } = require('./lib/itunes-cover');

const DATA_PATH = path.join(__dirname, '..', 'public', 'data', 'podcast-notes.json');
const REFRESH = process.argv.includes('--refresh');

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

  // Audit print: show each newly-queried name → matched show title (or MISS).
  if (report.length) {
    console.log('\n--- match report (query → matched iTunes title) ---');
    for (const r of report) {
      console.log(r.matched ? `  ✓ ${r.name}  →  ${r.matched}` : `  ✗ MISS  ${r.name}`);
    }
  }

  // Match the generate script's exact format (2-space, no trailing newline).
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
  const resolved = data.podcasts.filter((p) => cache[p.name]).length;
  console.log(`\nDone. ${resolved}/${data.podcasts.length} podcasts now use official covers.`);
})();
