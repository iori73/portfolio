// Manual stats helper — fallback / cross-check only.
//
// pptx-to-figma, bulk-screenshot-importer, and pinterest-to-figma are now
// kept current automatically by scripts/scrape-figma-stats.mjs, run weekly
// by .github/workflows/update-figma-stats.yml. This script is still useful
// for anything that scraper doesn't cover — right now that's just
// perfect-markdown (still on @iorikawano2 pending a move to @io_73; add it
// to scrape-figma-stats.mjs's TARGETS once that move happens).
//
// components/work/figma-plugins/pluginStats.json is the single source that
// the home deck, the detail page cards, and the hero stat tiles all read
// from — manual edits here should stay limited to whatever the automated
// scraper isn't handling.
//
// Weekly routine (for perfect-markdown only, until it moves to @io_73):
//   1. npm run stats        (prints the profile URLs + current stored values)
//   2. Open the profile, read the latest installs (users) and ♡ (likes)
//   3. Edit pluginStats.json with the new numbers, commit, push → Vercel deploys
//
// Profiles:
//   https://www.figma.com/@io_73          (PPTX to Figma, Bulk Screenshot Importer, Pinterest to Figma — automated)
//   https://www.figma.com/@iorikawano2    (Perfect Markdown — still manual)

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATS_PATH = join(__dirname, '..', 'components', 'work', 'figma-plugins', 'pluginStats.json');

const PROFILES = {
  'pptx-to-figma': 'https://www.figma.com/@io_73',
  'bulk-screenshot-importer': 'https://www.figma.com/@io_73',
  'perfect-markdown': 'https://www.figma.com/@iorikawano2',
};

const stats = JSON.parse(await readFile(STATS_PATH, 'utf8'));

console.log('\nCurrent plugin stats (edit pluginStats.json to update):\n');
for (const [id, value] of Object.entries(stats)) {
  console.log(`  ${id}`);
  console.log(`    users=${value.users}  likes=${value.likes}`);
  console.log(`    ${PROFILES[id] ?? '(profile unknown)'}\n`);
}
console.log(`File: ${STATS_PATH}\n`);
