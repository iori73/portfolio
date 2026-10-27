/**
 * 「おいでまっし」の見出しの動き（円 → 四角）を、短い動画にする。
 *
 *   node scripts/record-nakahatsu-motion.mjs            # 録画して .capture/nakahatsu/motion/ に webm
 *   node scripts/record-nakahatsu-motion.mjs --probe    # 見出しの位置だけ調べる（録画しない）
 *
 * 設定は capture-nakahatsu-screens.mjs と同じ（環境変数か gitignore 済みの .nakahatsu-capture.env）。
 * 公開テーマを撮る。パスワードは別のコンテキストで通し、録画側には Cookie だけ渡すので、
 * パスワードページは映らない。Shopify のプレビューバー／管理バーも CSS で隠す。
 * 映ってはいけないもの（撮影後に全フレームを目で確認する）:
 *   Instagram 由来の写真の帯、「Sample」透かしの写真、人物の写真、ストアの URL。
 */
import { createRequire } from 'node:module';
import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(join(ROOT, 'package.json'));
const { chromium } = require('playwright');
const OUT = join(ROOT, '.capture', 'nakahatsu', 'motion');
mkdirSync(OUT, { recursive: true });

for (const line of (existsSync(join(ROOT, '.nakahatsu-capture.env')) ? readFileSync(join(ROOT, '.nakahatsu-capture.env'), 'utf8') : '').split('\n')) {
  const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/);
  if (m && !(m[1] in process.env)) process.env[m[1]] = m[2];
}
const BASE = (process.env.NAKAHATSU_STORE_URL || '').replace(/\/$/, '');
const PASSWORD = process.env.NAKAHATSU_STORE_PASSWORD || '';
if (!BASE) throw new Error('NAKAHATSU_STORE_URL が未設定');
const PROBE = process.argv.includes('--probe');

const HIDE_CSS = '#preview-bar-iframe,#admin-bar-iframe,#PBarNextFrameWrapper,[class*="floating-cart"],[id*="cookie" i],[class*="cookie" i]{display:none!important}';
const KURA_DONE = () => {
  const k = document.querySelector('.nkv2-kura');
  return !k || !k.classList.contains('is-play') || getComputedStyle(k).display === 'none';
};

function findChrome() {
  if (process.env.NAKAHATSU_CHROME) return process.env.NAKAHATSU_CHROME;
  const base = join(homedir(), 'Library/Caches/ms-playwright');
  if (!existsSync(base)) return undefined;
  const dirs = readdirSync(base).filter((d) => /^chromium-\d+$/.test(d)).sort((a, b) => +b.split('-')[1] - +a.split('-')[1]);
  for (const d of dirs) {
    const p = join(base, d, 'chrome-mac-arm64', 'Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing');
    if (existsSync(p)) return p;
  }
  return undefined;
}

const exe = findChrome();
const browser = await chromium.launch(exe ? { executablePath: exe, headless: true } : { headless: true });

// 1) パスワードを通して Cookie を取る（録画には使わない）
const auth = await browser.newContext();
const ap = await auth.newPage();
await ap.goto(BASE + '/', { waitUntil: 'load' });
if (await ap.evaluate(() => !!document.querySelector('input[name="password"]'))) {
  await ap.evaluate((pw) => { const i = document.querySelector('input[name="password"]'); i.value = pw; i.form.submit(); }, PASSWORD);
  await ap.waitForLoadState('load');
}
await ap.waitForTimeout(1500);
if (await ap.evaluate(() => !!document.querySelector('input[name="password"]'))) {
  throw new Error('パスワードを通せなかった（NAKAHATSU_STORE_PASSWORD を確認）');
}
const state = await auth.storageState();
await auth.close();

// 2) 録画
const ctx = await browser.newContext({
  storageState: state,
  viewport: { width: 1280, height: 720 },
  reducedMotion: 'no-preference',
  ...(PROBE ? {} : { recordVideo: { dir: OUT, size: { width: 1280, height: 720 } } }),
});
const page = await ctx.newPage();
await page.goto(BASE + '/', { waitUntil: 'load' });
await page.waitForFunction(KURA_DONE, null, { timeout: 20000 }).catch(() => {});
await page.addStyleTag({ content: HIDE_CSS });
await page.waitForTimeout(1200);

// 見出し「おいでまっし」を含む要素の位置（ページ上端からの CSS px）を調べる
const found = await page.evaluate(() => {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const n = walker.currentNode;
    if (!n.textContent.includes('おいでまっし')) continue;
    let el = n.parentElement;
    const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) continue;
    const sec = el.closest('section, [class*="nkv2-"]');
    return { tag: el.tagName, cls: el.className, secCls: sec ? sec.className : null, top: Math.round(r.top + scrollY), h: Math.round(document.documentElement.scrollHeight) };
  }
  return null;
});
console.log('found:', JSON.stringify(found));
if (PROBE && !found) {
  // 遅延表示の可能性があるので、全体をスクロールしてから本文を探す
  const info = await page.evaluate(async () => {
    const h = document.documentElement.scrollHeight;
    for (let y = 0; y < h; y += 400) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
    const t = document.body.innerText;
    const i = t.indexOf('おいで');
    return {
      h, i,
      snip: i >= 0 ? t.slice(Math.max(0, i - 20), i + 40) : null,
      secs: [...new Set([...document.querySelectorAll('[class*="nkv2-"]')].map((e) => e.className.split(' ')[0]))].slice(0, 40),
    };
  });
  console.log(JSON.stringify(info));
}
if (PROBE || !found) { await ctx.close(); await browser.close(); process.exit(found ? 0 : 1); }

// 見出しの少し手前から、ゆっくり下げる。動きの開始は人が読む速さに合わせる
// 動きの区間だけを、遅く送る。下に進みすぎると住所入りの地図が映るので、手前で止める。
// 録画は読み込みから始まるので、スクロール開始の時刻を控えて、あとで ffmpeg で前を切る。
const start = Math.max(0, found.top - 500);
await page.evaluate((y) => scrollTo(0, y), start);
await page.waitForTimeout(1200);
const t0 = Date.now();
for (let y = start; y <= found.top + 450; y += 5) {
  await page.evaluate((yy) => scrollTo(0, yy), y);
  await page.waitForTimeout(50);
}
const t1 = Date.now();
await page.waitForTimeout(800);
const video = page.video();
await ctx.close();
const path = await video.path();
renameSync(path, join(OUT, 'ochimasse.webm'));
await browser.close();
// 録画の開始は、ページを作った時刻。ctx 作成からの経過を概算で出す
writeFileSync(join(OUT, 'trim.json'), JSON.stringify({ scrollMs: t1 - t0 }));
console.log('saved:', join(OUT, 'ochimasse.webm'), 'scrollMs=', t1 - t0);
