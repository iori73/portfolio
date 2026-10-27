/**
 * 中初商店ケーススタディ用の「主要画面の一覧」画像の素材を撮る。
 * 各ページを、PC 幅 1440 で、上から指定の高さまで 1 枚ずつ撮る（縦長）。
 *
 *   node scripts/capture-nakahatsu-overview.mjs review   # 全高の確認用（dpr 1。映ってはいけないものを探す）
 *   node scripts/capture-nakahatsu-overview.mjs final    # 採用する高さで撮る（dpr 2）
 *
 *   出力: .capture/nakahatsu/ov/{review|final}/*.png（gitignore 済み）
 *
 * 設定は capture-nakahatsu-screens.mjs と同じ（環境変数か gitignore 済みの .nakahatsu-capture.env）。
 * 写してはいけないもの（final では、各ページの CAPS で上から切って避ける）:
 *   パスワードページ、Shopify のプレビューバー／管理バー、ストアの URL、
 *   ホームの Instagram 由来の写真の帯（CSS 1500px より下）、「Sample」透かしの写真、人物の写真。
 */
import { createRequire } from 'node:module';
import { existsSync, mkdirSync, readFileSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(join(ROOT, 'package.json'));
const { chromium } = require('playwright');
const MODE = process.argv[2] || 'review';
const OUT = join(ROOT, '.capture', 'nakahatsu', 'ov', MODE) + '/';
mkdirSync(OUT, { recursive: true });

for (const line of (existsSync(join(ROOT, '.nakahatsu-capture.env')) ? readFileSync(join(ROOT, '.nakahatsu-capture.env'), 'utf8') : '').split('\n')) {
  const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/);
  if (m && !(m[1] in process.env)) process.env[m[1]] = m[2];
}
const BASE = (process.env.NAKAHATSU_STORE_URL || '').replace(/\/$/, '');
const PASSWORD = process.env.NAKAHATSU_STORE_PASSWORD || '';
if (!BASE) throw new Error('NAKAHATSU_STORE_URL が未設定');

const MISO = '/products/%E5%A4%A9%E7%A5%90-%E7%B1%B3%E7%B3%80%E5%91%B3%E5%99%8C-%E7%B2%92-800g';
/** name: 出力名。cap: final で上から撮る CSS px の高さ（null = ページ全体）。review では全高。 */
const PAGES = [
  { name: 'home', path: '/', cap: 1500, home: true },
  { name: 'shop', path: '/collections/all', cap: null },
  { name: 'product', path: MISO, cap: null },
  { name: 'about', path: '/pages/about', cap: null },
  { name: 'faq', path: '/pages/faq', cap: null },
  { name: 'contact', path: '/pages/contact', cap: null },
  { name: 'news', path: '/blogs/news', cap: null },
  { name: 'cart', path: '/cart', cap: null },
  { name: 'shipping', path: '/policies/shipping-policy', cap: null },
  { name: 'login', path: '/account/login', cap: null },
];
/**
 * final で撮る範囲（CSS px、上端からの y0〜y1）。review の全高画像を目で見て決めた（2026-10-27）。
 *   - フッター（会社の電話・FAX・住所、地図）は含めない → 各ページの y1 はフッターの手前
 *   - ホームは 1500 まで（それより下に、人物写真と「Sample」透かしの写真がある）
 *   - About は、人物写真の区間（約 1800〜5600 と 7200 以降）を避けて 2 区間
 *   - ログイン（Shopify 側の画面）、空のカート、お知らせ一覧（短すぎる）は撮らない
 */
const FINAL = [
  { name: 'home', y0: 0, y1: 1500 },
  { name: 'shop', y0: 0, y1: 1200 },
  { name: 'product', y0: 0, y1: 1340 },
  { name: 'about-top', page: 'about', y0: 0, y1: 1560 },
  { name: 'about-tenyu', page: 'about', y0: 5640, y1: 7100 },
  { name: 'faq', y0: 0, y1: 1080 },
  { name: 'contact', y0: 0, y1: 1090 },
  { name: 'shipping', y0: 0, y1: 1920 },
];
let CAPS = {};
try { CAPS = JSON.parse(readFileSync(join(ROOT, '.capture', 'nakahatsu', 'ov', 'caps.json'), 'utf8')); } catch {}

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
const auth = await browser.newContext();
const ap = await auth.newPage();
await ap.goto(BASE + '/', { waitUntil: 'load' });
if (await ap.evaluate(() => !!document.querySelector('input[name="password"]'))) {
  await ap.evaluate((pw) => { const i = document.querySelector('input[name="password"]'); i.value = pw; i.form.submit(); }, PASSWORD);
  await ap.waitForLoadState('load');
  await ap.waitForTimeout(2500);
}
if (await ap.evaluate(() => !!document.querySelector('input[name="password"]'))) throw new Error('パスワードを通せなかった');
const storageState = await auth.storageState();
await auth.close();

const ctx = await browser.newContext({ storageState, viewport: { width: 1440, height: 900 }, deviceScaleFactor: MODE === 'final' ? 2 : 1 });
await ctx.route(/preview_bar|preview-bar|shopifycloud\/preview/, (r) => r.abort());

for (const p of PAGES) {
  const page = await ctx.newPage();
  page.setDefaultTimeout(30000);
  await page.goto(BASE + p.path, { waitUntil: 'load' });
  await page.waitForFunction(KURA_DONE, null, { timeout: 20000 }).catch(() => {});
  await page.waitForTimeout(1200);
  if (await page.evaluate(() => !!document.querySelector('input[name="password"]'))) throw new Error(`パスワードページ: ${p.path}`);
  await page.addStyleTag({ content: HIDE_CSS });
  if (p.home) {
    for (let i = 0; i < 6; i++) {
      await page.evaluate(() => document.querySelectorAll('.nkv2-hero__dot')[0]?.click());
      await page.waitForTimeout(1400);
      if (await page.evaluate(() => document.querySelectorAll('.nkv2-hero__slide')[0]?.classList.contains('is-active'))) break;
    }
  }
  // 遅延表示を出す
  await page.evaluate(async () => {
    const h = document.documentElement.scrollHeight;
    for (let y = 0; y < h; y += 500) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 90)); }
    scrollTo(0, 0);
  });
  await page.waitForTimeout(900);
  if (p.home) {
    for (let i = 0; i < 6; i++) {
      await page.evaluate(() => document.querySelectorAll('.nkv2-hero__dot')[0]?.click());
      await page.waitForTimeout(1400);
      if (await page.evaluate(() => document.querySelectorAll('.nkv2-hero__slide')[0]?.classList.contains('is-active'))) break;
    }
  }
  const total = await page.evaluate(() => Math.ceil(document.documentElement.scrollHeight));
  if (MODE === 'final') {
    for (const r of FINAL.filter((f) => (f.page || f.name) === p.name)) {
      const y1 = Math.min(total, r.y1);
      await page.screenshot({ path: OUT + r.name + '.png', fullPage: true, clip: { x: 0, y: r.y0, width: 1440, height: y1 - r.y0 } });
      console.log(r.name.padEnd(12), `y ${r.y0}-${y1} (total ${total})`);
    }
  } else {
    const h = p.home ? Math.min(total, 3000) : total;
    await page.screenshot({ path: OUT + p.name + '.png', fullPage: true, clip: { x: 0, y: 0, width: 1440, height: h } });
    console.log(p.name.padEnd(10), 'total', total, 'shot', h);
  }
  await page.close();
}
await browser.close();
