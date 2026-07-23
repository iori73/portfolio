/**
 * Official podcast cover resolution via the iTunes Search API (free, no API key).
 *
 * The notes data only stores per-episode artwork, so a show's "cover" ends up being
 * an arbitrary episode image. This resolves the canonical show artwork by podcast name
 * and caches the result to public/data/podcast-covers.json.
 *
 * Matches are VALIDATED against the returned collection (show) name so a top hit for
 * an unrelated show is rejected (a wrong official cover is worse than the fallback).
 * On a miss, a cleaned name (decorative suffixes stripped) is retried once.
 *
 * The cache is the source of truth for corrections: a name that already has an entry
 * (even an empty string = "known miss") is never re-queried unless `refresh` is set.
 * To fix a match by hand, edit that file — the value is respected on the next run.
 */

const fs = require('fs');
const path = require('path');

const CACHE_PATH = path.join(__dirname, '..', '..', 'public', 'data', 'podcast-covers.json');

function loadCache(cachePath = CACHE_PATH) {
  try {
    return JSON.parse(fs.readFileSync(cachePath, 'utf8'));
  } catch {
    return {};
  }
}

function saveCache(cache, cachePath = CACHE_PATH) {
  try {
    fs.mkdirSync(path.dirname(cachePath), { recursive: true });
    fs.writeFileSync(cachePath, JSON.stringify(cache, null, 2) + '\n');
  } catch (e) {
    console.warn('[itunes-cover] cache write failed:', e.message);
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Fold case/width/punctuation/whitespace so JP and EN names compare cleanly.
function normalize(s) {
  return String(s || '')
    .toLowerCase()
    .normalize('NFKC')
    .replace(/[\s\p{P}\p{S}]/gu, '');
}

// Strip decorative suffixes/subtitles for a looser retry (e.g. 'デデデータ!!〜"あきない"…' → 'デデデータ').
function cleanName(name) {
  return String(name || '')
    .split(/[!！?？|｜〜~：:・\-—(（]/)[0]
    .trim();
}

// Is the iTunes result actually the same show? Guards against unrelated top hits.
function isMatch(query, collectionName) {
  const q = normalize(query);
  const c = normalize(collectionName);
  if (!q || !c) return false;
  if (c.includes(q) || q.includes(c)) return true;
  // Token overlap for multi-word (mostly English) names.
  const tokens = String(query)
    .toLowerCase()
    .split(/[\s\-—|｜:：・()（）]+/)
    .filter((w) => w.length >= 3);
  if (tokens.length === 0) return false;
  const hits = tokens.filter((w) => c.includes(normalize(w))).length;
  return hits / tokens.length >= 0.5;
}

// Query iTunes for a term; return { url, collectionName } for the best validated
// hit or null. Retries on 429/network with backoff (iTunes throttles ~20 req/min).
async function searchItunes(term, { retries = 3 } = {}) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=podcast&limit=5`;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'portfolio-podcast-notes/1.0' } });
      if (res.status === 429 || res.status >= 500) {
        await sleep(2500 * (attempt + 1)); // back off and retry
        continue;
      }
      if (!res.ok) return null;
      const json = await res.json();
      const results = json.results || [];
      // Prefer the first result that passes validation against the original term.
      const hit = results.find((r) => isMatch(term, r.collectionName || r.trackName || '')) || null;
      if (!hit) return null;
      const art = hit.artworkUrl600 || hit.artworkUrl100 || '';
      if (!art) return null;
      return { url: art.replace(/\/\d+x\d+bb\./, '/600x600bb.'), collectionName: hit.collectionName || '' };
    } catch {
      await sleep(1500 * (attempt + 1));
    }
  }
  return null;
}

// Resolve one podcast: try the full name, then a cleaned name. Validated both times.
async function resolveOne(name) {
  let hit = await searchItunes(name);
  if (!hit) {
    const cleaned = cleanName(name);
    if (cleaned && cleaned !== name) {
      await sleep(150);
      hit = await searchItunes(cleaned);
      // Re-validate the cleaned hit against the cleaned query.
      if (hit && !isMatch(cleaned, hit.collectionName)) hit = null;
    }
  }
  return hit;
}

/**
 * Resolve official covers for a list of `{ name, cover }` podcasts, mutating `cover`
 * in place when a validated match is found. Misses keep the existing cover.
 * @returns {Promise<{cache: Record<string,string>, report: Array<{name:string, matched:string|null, url:string}>}>}
 */
async function resolveOfficialCovers(
  podcasts,
  { cachePath = CACHE_PATH, throttleMs = 1500, refresh = false, log = console.log } = {},
) {
  const cache = loadCache(cachePath);
  const report = [];
  let queried = 0;
  for (const pod of podcasts) {
    if (!pod || !pod.name) continue;
    if (pod.name === 'Unknown') {
      cache[pod.name] = ''; // placeholder for episodes with no podcast — never resolve
      continue;
    }
    if (!refresh && Object.prototype.hasOwnProperty.call(cache, pod.name)) {
      if (cache[pod.name]) pod.cover = cache[pod.name];
      continue;
    }
    const hit = await resolveOne(pod.name);
    cache[pod.name] = hit ? hit.url : ''; // remember misses too
    if (hit) pod.cover = hit.url;
    report.push({ name: pod.name, matched: hit ? hit.collectionName : null, url: hit ? hit.url : '' });
    queried++;
    if (throttleMs) await sleep(throttleMs);
  }
  saveCache(cache, cachePath);
  if (log) {
    const ok = report.filter((r) => r.matched).length;
    log(`[itunes-cover] ${queried} queried · ${ok} matched · cache size ${Object.keys(cache).length}`);
  }
  return { cache, report };
}

module.exports = { resolveOfficialCovers, searchItunes, resolveOne, isMatch, cleanName, loadCache, CACHE_PATH };
