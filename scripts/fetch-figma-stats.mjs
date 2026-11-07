// Manual stats helper — fallback / cross-check only.
//
// All four plugins are kept current automatically by
// scripts/scrape-figma-stats.mjs, run daily by
// .github/workflows/update-figma-stats.yml. This script is only a
// fallback / cross-check for when the scraper is down.
//
// components/work/figma-plugins/pluginStats.json is the single source that
// the home deck, the detail page cards, and the hero stat tiles all read
// from.
//
// Manual routine (only if the scraper is down):
//   1. npm run stats        (prints the profile URLs + current stored values)
//   2. Open the profile, read the latest installs (users) and ♡ (likes)
//   3. Edit pluginStats.json with the new numbers, commit, push → Vercel deploys
//
// Profiles:
//   https://www.figma.com/@io_73          (PPTX to Figma, Bulk Screenshot Importer, Pinterest to Figma)
//   https://www.figma.com/@iorikawano2    (Perfect Markdown)

import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATS_PATH = join(__dirname, '..', 'components', 'work', 'figma-plugins', 'pluginStats.json');

const PROFILES = {
  'pptx-to-figma': 'https://www.figma.com/@io_73',
  'bulk-screenshot-importer': 'https://www.figma.com/@io_73',
  'perfect-markdown': 'https://www.figma.com/@iorikawano2',
  'pinterest-to-figma': 'https://www.figma.com/@io_73',
};

const stats = JSON.parse(await readFile(STATS_PATH, 'utf8'));

console.log('\nCurrent plugin stats (edit pluginStats.json to update):\n');
for (const [id, value] of Object.entries(stats)) {
  console.log(`  ${id}`);
  console.log(`    users=${value.users}  likes=${value.likes}`);
  console.log(`    ${PROFILES[id] ?? '(profile unknown)'}\n`);
}
console.log(`File: ${STATS_PATH}\n`);
