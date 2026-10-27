/**
 * 中初商店ケーススタディのキービジュアル（PC + SP のデバイスフレーム）用に、
 * クライアントの Shopify ストア（公開テーマ）の画面を、ビューポート 1 枚ぶんずつ撮る。
 *
 *   node scripts/capture-nakahatsu-screens.mjs
 *   出力: .capture/nakahatsu/ks/*.png（gitignore 済み。dpr 2）
 *
 * 設定は capture-nakahatsu-figures.mjs と同じ（環境変数か gitignore 済みの .nakahatsu-capture.env）:
 *   NAKAHATSU_STORE_URL / NAKAHATSU_STORE_PASSWORD / NAKAHATSU_CHROME
 * 公開テーマを撮る（preview_theme_id は付けない）。
 *
 * 写してはいけないもの（機械的に守る）:
 *   - パスワードページ、Shopify のプレビューバー／管理バー
 *   - ホームの Instagram 由来の写真の帯（CSS 1500px より下は撮らない）
 *   - 「Sample」透かしの写真、人物の写真 → 撮影後に必ず全画像を目で確認する
 */
import { createRequire } from 'node:module';
import { existsSync, mkdirSync, readFileSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(join(ROOT, 'package.json'));
const OUT = join(ROOT, '.capture', 'nakahatsu', 'ks') + '/';
mkdirSync(OUT, { recursive: true });

for (const line of (existsSync(join(ROOT, '.nakahatsu-capture.env')) ? readFileSync(join(ROOT, '.nakahatsu-capture.env'), 'utf8') : '').split('\n')) {
  const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/);
  if (m && !(m[1] in process.env)) process.env[m[1]] = m[2];
}
const BASE = (process.env.NAKAHATSU_STORE_URL || '').replace(/\/$/, '');
const PASSWORD = process.env.NAKAHATSU_STORE_PASSWORD || '';
if (!BASE) throw new Error('NAKAHATSU_STORE_URL が未設定');

const HOME_SAFE_MAX_CSS = 1500;

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

const KURA_DONE = () => {
  const k = document.querySelector('.nkv2-kura');
  return !k || !k.classList.contains('is-play') || getComputedStyle(k).display === 'none';
};

const HIDE_CSS = '#preview-bar-iframe,#admin-bar-iframe,#PBarNextFrameWrapper,[class*="floating-cart"],[id*="cookie" i],[class*="cookie" i]{display:none!important}';

async function openPage(ctx, path) {
  const page = await ctx.newPage();
  page.setDefaultTimeout(30000);
  await page.goto(BASE + path, { waitUntil: 'load' });
  await page.waitForFunction(KURA_DONE, null, { timeout: 20000 }).catch(() => {});
  await page.waitForTimeout(1500);
  const bad = await page.evaluate(() => ({ password: !!document.querySelector('input[name="password"]') }));
  if (bad.password) throw new Error(`パスワードページに入った（${path}）`);
  await page.addStyleTag({ content: HIDE_CSS });
  return page;
}

async function pinHeroSlide(page, index = 0) {
  for (let i = 0; i < 6; i++) {
    await page.evaluate((n) => document.querySelectorAll('.nkv2-hero__dot')[n]?.click(), index);
    await page.waitForTimeout(1600);
    if (await page.evaluate((n) => document.querySelectorAll('.nkv2-hero__slide')[n]?.classList.contains('is-active'), index)) return;
  }
  throw new Error('ヒーローのスライドを固定できなかった');
}

async function warm(page) {
  await page.evaluate(async () => {
    const h = document.documentElement.scrollHeight;
    for (let y = 0; y < h; y += 500) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 90)); }
    scrollTo(0, 0);
  });
  await page.waitForTimeout(700);
}

async function imagesLoaded(page) {
  await page.evaluate(async () => {
    await Promise.all([...document.images].filter((i) => { const r = i.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; })
      .map((i) => (i.complete ? 1 : new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 5000); }))));
  });
  await page.waitForTimeout(500);
}

/** y: CSS px（絶対）。selector を渡すと、その要素の上端 - offset へスクロール。 */
async function shot(ctx, { path, name, y = 0, selector, offset = 0, home = false }) {
  const page = await openPage(ctx, path);
  if (home) { await pinHeroSlide(page); await warm(page); await pinHeroSlide(page); }
  else await warm(page);
  const target = selector
    ? await page.evaluate(([s, o]) => document.querySelector(s).getBoundingClientRect().top + scrollY - o, [selector, offset])
    : y;
  const vh = page.viewportSize().height;
  if (home && target + vh > HOME_SAFE_MAX_CSS) throw new Error(`${name}: ホームの撮影範囲が ${Math.round(target + vh)}css に届く（上限 ${HOME_SAFE_MAX_CSS}）`);
  await page.evaluate((v) => scrollTo(0, v), target);
  await page.waitForTimeout(1500);
  await imagesLoaded(page);
  await page.screenshot({ path: OUT + name + '.png' });
  console.log(name.padEnd(22), `scrollY ${Math.round(target)}css`);
  await page.close();
}

const { chromium } = require('playwright');
const exe = findChrome();
const browser = await chromium.launch(exe ? { executablePath: exe, headless: true } : { headless: true });

const a = await browser.newContext();
const ap = await a.newPage();
await ap.goto(BASE + '/', { waitUntil: 'load' });
if (await ap.evaluate(() => !!document.querySelector('input[name="password"]'))) {
  if (!PASSWORD) throw new Error('パスワードページがあるが NAKAHATSU_STORE_PASSWORD が未設定');
  await ap.evaluate((pw) => { const i = document.querySelector('input[name="password"]'); i.value = pw; i.form.submit(); }, PASSWORD);
  await ap.waitForLoadState('load');
  await ap.waitForTimeout(2500);
}
const storageState = await a.storageState();
await a.close();

const ctxFor = async (w, h, mobile = false) => {
  const c = await browser.newContext({ storageState, viewport: { width: w, height: h }, deviceScaleFactor: 2, isMobile: mobile, hasTouch: mobile });
  await c.route(/preview_bar|preview-bar|shopifycloud\/preview/, (r) => r.abort());
  return c;
};

const MODE = process.argv[2] || 'default'; // default | discover | more

if (MODE === 'discover') {
  // どんなページがあるかを、ホームのリンクから一覧する（撮影はしない）
  const c = await ctxFor(1440, 900);
  const page = await openPage(c, '/');
  const links = await page.evaluate(() => [...new Set([...document.querySelectorAll('a[href^="/"]')].map((a) => a.getAttribute('href').split('?')[0]))].sort());
  console.log(links.join('\n'));
  await browser.close();
  process.exit(0);
}

// PC 1440x900
if (MODE === 'default') {
  const c = await ctxFor(1440, 900);
  await shot(c, { path: '/', name: 'pc-home-top', home: true });
  await shot(c, { path: '/en/', name: 'pc-home-top-en', home: true });
  await shot(c, { path: '/pages/about', name: 'pc-about-tenyu', selector: '.nkv2-pa__section--tenyu-pair', offset: 70 });
  await shot(c, { path: '/collections/all', name: 'pc-shop' });
  await c.close();
}
// SP 390x844
if (MODE === 'default') {
  const c = await ctxFor(390, 844, true);
  await shot(c, { path: '/', name: 'sp-home-top', home: true });
  await shot(c, { path: '/en/', name: 'sp-home-top-en', home: true });
  await shot(c, { path: '/collections/all', name: 'sp-shop' });
  await shot(c, { path: '/pages/about', name: 'sp-about-vertical', selector: '.nkv2-pa__section--tenyu-pair', offset: 70 });
  const p = await c.newPage();
  await p.goto(BASE + '/collections/all', { waitUntil: 'load' });
  const href = await p.evaluate(() => document.querySelector('a[href*="/products/"]')?.getAttribute('href'));
  await p.close();
  await shot(c, { path: href, name: 'sp-product' });
  // 英語版（EN サムネ用。日本語の商品名が混ざらないように）
  await shot(c, { path: '/en/collections/all', name: 'sp-shop-en' });
  await shot(c, { path: '/en' + href, name: 'sp-product-en' });
  await shot(c, { path: '/fr' + href, name: 'sp-product-fr' }); // 3 言語の並び（日・英・仏）用
  await c.close();
}
// 別バリエーション用の画面（node scripts/capture-nakahatsu-screens.mjs more）
if (MODE === 'more') {
  const MISO = '/products/%E5%A4%A9%E7%A5%90-%E7%B1%B3%E7%B3%80%E5%91%B3%E5%99%8C-%E7%B2%92-800g';
  const pc = await ctxFor(1440, 900);
  await shot(pc, { path: '/fr/', name: 'pc-home-top-fr', home: true });
  await shot(pc, { path: '/pages/faq', name: 'pc-faq' });
  await shot(pc, { path: '/pages/contact', name: 'pc-contact' });
  await shot(pc, { path: '/blogs/news', name: 'pc-news' });
  await shot(pc, { path: '/blogs/news/renewal-announcement-2026', name: 'pc-news-article' });
  await shot(pc, { path: MISO, name: 'pc-product-miso' });
  await shot(pc, { path: '/policies/shipping-policy', name: 'pc-shipping' });
  await shot(pc, { path: '/cart', name: 'pc-cart' });
  await pc.close();
  const sp = await ctxFor(390, 844, true);
  await shot(sp, { path: '/fr/', name: 'sp-home-top-fr', home: true });
  await shot(sp, { path: '/pages/faq', name: 'sp-faq' });
  await shot(sp, { path: '/pages/contact', name: 'sp-contact' });
  await shot(sp, { path: '/blogs/news', name: 'sp-news' });
  await shot(sp, { path: MISO, name: 'sp-product-miso' });
  await shot(sp, { path: '/cart', name: 'sp-cart' });
  await sp.close();
}
await browser.close();
console.log('done');
