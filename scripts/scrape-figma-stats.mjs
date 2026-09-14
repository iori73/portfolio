// Automated weekly stats scraper (see .github/workflows/update-figma-stats.yml).
//
// A plain HTTP fetch can't do this — Figma Community blocks non-browser
// requests (see scripts/fetch-figma-stats.mjs). A *headless* browser gets
// blocked too (confirmed empirically: bundled Playwright Chromium in
// headless mode gets a 403 from Figma's edge/bot protection, every time;
// the exact same browser in headed mode passes cleanly). So this runs
// Chromium in headed mode — the GitHub Action wraps it in `xvfb-run` to
// give it a virtual display on the display-less CI runner.
//
// This script is intentionally strict: if any tracked plugin's stats can't
// be found and parsed, it exits non-zero and writes nothing, rather than
// silently leaving pluginStats.json stale or filling in partial/guessed
// data. The GitHub Action opens an issue when that happens.

import { chromium } from 'playwright';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const STATS_PATH = join(__dirname, '..', 'components', 'work', 'figma-plugins', 'pluginStats.json');

// pluginData.ts id -> where to find it on Figma Community.
//
// perfect-markdown is deliberately NOT listed here yet. It currently lives on
// @iorikawano2, but is slated to move to @io_73 — rather than point at an
// account it isn't on yet (which would fail this script, loudly, on every
// single scheduled run until the move happens), it stays manually maintained
// in pluginStats.json in the meantime. Once the plugin has actually moved to
// @io_73, add it back here with its resourceId (re-verify the id — a
// re-publish under the new account could assign a new one; a plain ownership
// transfer should not).
const TARGETS = {
  'pptx-to-figma': { profile: 'https://www.figma.com/@io_73', resourceId: '1579722656902401183' },
  'bulk-screenshot-importer': { profile: 'https://www.figma.com/@io_73', resourceId: '1609935194251849962' },
  'pinterest-to-figma': { profile: 'https://www.figma.com/@io_73', resourceId: '1678794201557473584' },
};

// "148 likes" -> 148, "15.2k users" -> 15200, "1 like" -> 1
function parseCount(label) {
  const m = label.match(/^([\d.]+)(k)?\s/i);
  if (!m) return null;
  const n = parseFloat(m[1]);
  if (Number.isNaN(n)) return null;
  return Math.round(m[2] ? n * 1000 : n);
}

async function scrapeProfile(page, url) {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForSelector('[data-testid="community-resource-tile"]', { timeout: 20000 });
  return page.evaluate(() => {
    const tiles = Array.from(document.querySelectorAll('[data-testid="community-resource-tile"]'));
    return tiles.map((tile) => {
      const titleEl = tile.querySelector('a[href*="/community/"]');
      const labels = Array.from(tile.querySelectorAll('[role="img"][aria-label]')).map((e) =>
        e.getAttribute('aria-label'),
      );
      return { href: titleEl?.getAttribute('href') ?? '', labels };
    });
  });
}

async function main() {
  // headless: false is load-bearing — see the header comment above.
  const browser = await chromium.launch({
    headless: false,
    args: ['--disable-blink-features=AutomationControlled'],
  });
  const page = await browser.newPage();

  const profileCache = new Map();
  const results = {};
  const problems = [];

  try {
    for (const [pluginId, { profile, resourceId }] of Object.entries(TARGETS)) {
      if (!profileCache.has(profile)) {
        try {
          profileCache.set(profile, await scrapeProfile(page, profile));
        } catch (err) {
          profileCache.set(profile, null);
          problems.push(`${pluginId}: failed to load ${profile} (${err.message})`);
          continue;
        }
      }
      const tiles = profileCache.get(profile);
      if (!tiles) continue; // profile load already recorded as a problem above

      const tile = tiles.find((t) => t.href.includes(`/${resourceId}/`));
      if (!tile) {
        problems.push(`${pluginId}: resource ${resourceId} not found on ${profile}`);
        continue;
      }

      const likesLabel = tile.labels.find((l) => / likes?$/i.test(l));
      const usersLabel = tile.labels.find((l) => / users?$/i.test(l));
      const likes = likesLabel ? parseCount(likesLabel) : null;
      const users = usersLabel ? parseCount(usersLabel) : null;

      if (likes == null || users == null) {
        problems.push(`${pluginId}: couldn't parse likes/users from ${JSON.stringify(tile.labels)}`);
        continue;
      }
      results[pluginId] = { users, likes };
    }
  } finally {
    await browser.close();
  }

  if (problems.length > 0) {
    console.error('Figma stats scrape failed:\n' + problems.map((p) => `  - ${p}`).join('\n'));
    process.exit(1);
  }

  const existing = JSON.parse(await readFile(STATS_PATH, 'utf8'));
  const updated = { ...existing, ...results };
  await writeFile(STATS_PATH, JSON.stringify(updated, null, 2) + '\n');
  console.log('Updated pluginStats.json:\n' + JSON.stringify(updated, null, 2));
}

main().catch((err) => {
  console.error('Figma stats scrape crashed:', err);
  process.exit(1);
});
