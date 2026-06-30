// Manual weekly stats helper.
//
// Figma Community blocks automated fetching (Cloudflare returns 202 + empty
// body to non-browser requests), so likes/users are maintained by hand in
// components/work/figma-plugins/pluginStats.json — the single source that the
// home deck, the detail page cards, and the hero stat tiles all read from.
//
// Weekly routine:
//   1. npm run stats        (prints the profile URLs + current stored values)
//   2. Open the two profiles, read the latest installs (users) and ♡ (likes)
//   3. Edit pluginStats.json with the new numbers, commit, push → Vercel deploys
//
// Profiles:
//   https://www.figma.com/@io_73          (PPTX to Figma, Bulk Screenshot Importer)
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
};

const stats = JSON.parse(await readFile(STATS_PATH, 'utf8'));

console.log('\nCurrent plugin stats (edit pluginStats.json to update):\n');
for (const [id, value] of Object.entries(stats)) {
  console.log(`  ${id}`);
  console.log(`    users=${value.users}  likes=${value.likes}`);
  console.log(`    ${PROFILES[id] ?? '(profile unknown)'}\n`);
}
console.log(`File: ${STATS_PATH}\n`);
