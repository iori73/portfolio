/**
 * 中初商店ケーススタディの図版を、クライアントの Shopify ストアの「いまの公開テーマ」から撮り直す。
 *
 *   node scripts/capture-nakahatsu-figures.mjs            # 撮影 + 合成（public/work/nakahatsu/*.webp を上書き）
 *   node scripts/capture-nakahatsu-figures.mjs --compose  # 撮影済みの生画像（.capture/nakahatsu/）から合成だけ
 *   node scripts/capture-nakahatsu-figures.mjs --capture  # 撮影だけ
 *
 * 設定（コミットしない。環境変数か、gitignore 済みの .nakahatsu-capture.env）:
 *   NAKAHATSU_STORE_URL        撮影対象。例: https://nakahatsu.jp（公開後）／開発ストアの URL
 *   NAKAHATSU_STORE_PASSWORD   パスワードページがある間だけ。公開後は不要
 *   NAKAHATSU_OLD_SCREENSHOTS  旧サイトの撮影済み画像のフォルダ（top-desktop.png / shop-top-desktop.png）
 *   NAKAHATSU_CHROME           Chrome 実行ファイル（省略時は Playwright 既定 → ms-playwright の最新を探す）
 *
 * 図に写してはいけないもの（このスクリプトが機械的に守る）:
 *   - Shopify のプレビューバー／管理バー、パスワードページ（検出したら止まる）
 *   - ホームの About にある写真の帯（Instagram 由来で未承認）。ホームは CSS 1500px より下を写さない
 *     （帯の実測位置も DOM から取り、そこに掛かる切り出しは止める）
 *   - 「Sample」透かし入りの写真（素材・製法のカード、私たちとお客様）と、人物の写真（おいでまっし）
 * 撮影後は必ず全画像を目で確認すること。
 */
import { createRequire } from 'node:module';
import { existsSync, mkdirSync, readFileSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(join(ROOT, 'package.json'));
const sharp = require('sharp');

const RAW = join(ROOT, '.capture', 'nakahatsu') + '/';
const OUT = join(ROOT, 'public', 'work', 'nakahatsu') + '/';
mkdirSync(RAW, { recursive: true });

// ---------------------------------------------------------------------------
// 設定の読み込み
// ---------------------------------------------------------------------------
function loadEnvFile() {
  const f = join(ROOT, '.nakahatsu-capture.env');
  if (!existsSync(f)) return;
  for (const line of readFileSync(f, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2];
  }
}
loadEnvFile();

const args = new Set(process.argv.slice(2));
const DO_CAPTURE = !args.has('--compose');
const DO_COMPOSE = !args.has('--capture');
const BASE = (process.env.NAKAHATSU_STORE_URL || '').replace(/\/$/, '');
const PASSWORD = process.env.NAKAHATSU_STORE_PASSWORD || '';
const OLD_DIR = process.env.NAKAHATSU_OLD_SCREENSHOTS || join(homedir(), 'Documents/nakahatsu/assets/screenshots') + '/';

// ---------------------------------------------------------------------------
// 安全弁
// ---------------------------------------------------------------------------
const HOME_SAFE_MAX_CSS = 1500; // 1440/768/390 の実測で、About の写真の帯は 1518px から
const assertSafe = (cssBottom, what) => {
  if (cssBottom > HOME_SAFE_MAX_CSS) throw new Error(`${what}: 切り出しが ${Math.round(cssBottom)}css に届く（上限 ${HOME_SAFE_MAX_CSS}）`);
};

// ---------------------------------------------------------------------------
// 1. 撮影
// ---------------------------------------------------------------------------
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

async function openPage(ctx, path) {
  const page = await ctx.newPage();
  page.setDefaultTimeout(30000);
  await page.goto(BASE + path, { waitUntil: 'load' });
  // イントロ演出（.nkv2-kura。約 5 秒）が終わるまで待つ。待たないと黒画面にエンブレムだけが写る
  await page.waitForFunction(KURA_DONE, null, { timeout: 20000 }).catch(() => {});
  await page.waitForTimeout(1200);
  // 管理バー・プレビューバーが写っていないこと、パスワードページでないことを確認
  const bad = await page.evaluate(() => ({
    password: !!document.querySelector('input[name="password"]'),
    bar: !!document.querySelector('#preview-bar-iframe, #admin-bar-iframe, #PBarNextFrameWrapper, iframe[title*="Preview"]'),
  }));
  if (bad.password) throw new Error(`パスワードページに入った（${path}）。NAKAHATSU_STORE_PASSWORD を確認`);
  if (bad.bar) await page.addStyleTag({ content: '#preview-bar-iframe,#admin-bar-iframe,#PBarNextFrameWrapper{display:none!important}' });
  return page;
}

/** ヒーローを 1 枚目のスライドに固定する（自動送りで撮影ごとに違う写真にならないように）。 */
async function pinHeroSlide(page, index = 0) {
  for (let i = 0; i < 6; i++) {
    await page.evaluate((n) => document.querySelectorAll('.nkv2-hero__dot')[n]?.click(), index);
    await page.waitForTimeout(1600);
    const ok = await page.evaluate((n) => document.querySelectorAll('.nkv2-hero__slide')[n]?.classList.contains('is-active'), index);
    if (ok) return;
  }
  throw new Error('ヒーローのスライドを固定できなかった');
}

/** 画面の外（遅延読み込みの画像など）を一度なめて読み込ませる。 */
async function warm(page) {
  await page.evaluate(async () => {
    const h = document.documentElement.scrollHeight;
    for (let y = 0; y < h; y += 500) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 90)); }
    scrollTo(0, 0);
  });
  await page.waitForTimeout(700);
}

/**
 * ページ先頭から y1(CSS px) までを、ビューポート撮影をつなげて 1 枚にする。
 * fullPage 撮影はレイアウトのビューポート高を変えるので使わない
 * （SP のヒーローは 100svh で、縦書きコピーが消える）。
 * 2 枚目以降は固定ヘッダーに隠れない行（上 HEADER_PX を除く）だけを使う。
 */
async function stitch(page, y1, dpr, vh, outFile) {
  const HEADER_PX = 110;
  const parts = [];
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(500);
  let covered = Math.min(vh, y1);
  parts.push(await page.screenshot());
  let top = 0;
  const heights = [covered];
  while (covered < y1) {
    const sy = covered - HEADER_PX;
    await page.evaluate((y) => scrollTo(0, y), sy);
    await page.waitForTimeout(700);
    const real = await page.evaluate(() => scrollY);
    const shot = await page.screenshot();
    const skip = covered - real; // 画像内でこれより上は撮影済み
    const take = Math.min(vh - skip, y1 - covered);
    parts.push(await sharp(shot).extract({ left: 0, top: Math.round(skip * dpr), width: (await sharp(shot).metadata()).width, height: Math.round(take * dpr) }).toBuffer());
    heights.push(take);
    covered += take;
  }
  const first = parts[0];
  const w = (await sharp(first).metadata()).width;
  const firstCrop = await sharp(first).extract({ left: 0, top: 0, width: w, height: Math.round(heights[0] * dpr) }).toBuffer();
  const comp = [{ input: firstCrop, left: 0, top: 0 }];
  top = Math.round(heights[0] * dpr);
  for (let i = 1; i < parts.length; i++) {
    comp.push({ input: parts[i], left: 0, top });
    top += Math.round(heights[i] * dpr);
  }
  await sharp({ create: { width: w, height: top, channels: 3, background: '#ffffff' } }).composite(comp).png().toFile(RAW + outFile);
}

async function capture() {
  if (!BASE) throw new Error('NAKAHATSU_STORE_URL が未設定（環境変数か .nakahatsu-capture.env）');
  const { chromium } = require('playwright');
  const exe = findChrome();
  const browser = await chromium.launch(exe ? { executablePath: exe, headless: true } : { headless: true });

  // パスワードページを通る（公開後は存在しないので飛ばす）
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

  const ctxFor = (w, h) => browser.newContext({
    storageState, viewport: { width: w, height: h }, deviceScaleFactor: 2,
    // Shopify のプレビューバー注入をネットワークで止める（DOM から消しても再注入されるため）
  }).then(async (c) => { await c.route(/preview_bar|preview-bar|shopifycloud\/preview/, (r) => r.abort()); return c; });

  // --- ホーム（PC 1440x900）: JA / EN / FR のヒーロー（1 枚目のスライド）+ お知らせ + About の見出しと本文まで
  for (const [lang, prefix] of [['ja', ''], ['en', '/en'], ['fr', '/fr']]) {
    const ctx = await ctxFor(1440, 900);
    const page = await openPage(ctx, prefix + '/');
    await pinHeroSlide(page);
    await warm(page);
    await pinHeroSlide(page);
    // 上限: About の写真の帯の手前（実測）か 1500css の小さい方
    const band = await page.evaluate(() => {
      const img = [...document.querySelectorAll('.nkv2-about img')].find((i) => i.getBoundingClientRect().height > 100);
      return img ? img.getBoundingClientRect().top + scrollY : null;
    });
    const limit = Math.min(HOME_SAFE_MAX_CSS, band ? band - 24 : HOME_SAFE_MAX_CSS);
    console.log(`home ${lang} 1440: 写真の帯 ${band && Math.round(band)}css → 切り出し上限 ${Math.round(limit)}css`);
    await page.screenshot({ path: RAW + `hero-${lang}-1440.png` }); // 1440x900（thumbnail / bilingual 用）
    if (lang === 'en') await stitch(page, Math.min(limit, 1474), 2, 900, 'home-en-1440-top.png'); // before-after（EN）の After 用
    if (lang === 'ja') {
      await stitch(page, Math.min(limit, 1474), 2, 900, 'home-ja-1440-top.png'); // before-after の After 用
      // 商品グリッド（見出し + 2 行）
      await page.evaluate(() => scrollTo(0, 0));
      const pg = await page.evaluate(() => document.querySelector('.nkv2-pg').getBoundingClientRect().top + scrollY);
      await page.evaluate((y) => scrollTo(0, y), pg - 10 + 0);
      await page.waitForTimeout(1500);
      await page.evaluate(async () => {
        await Promise.all([...document.querySelectorAll('.nkv2-pg img')].map((i) => i.complete ? 1 : new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 5000); })));
      });
      await page.waitForTimeout(500);
      await page.addStyleTag({ content: '[class*="floating-cart"]{display:none!important}' }); // 右下の固定タブは中身と無関係
      await page.screenshot({ path: RAW + 'products-ja-1440.png' });
      console.log('products section top', Math.round(pg));
    }
    await ctx.close();
  }

  // --- ホーム（768 / 390）: ヒーロー + お知らせ（レスポンシブの図）
  for (const [w, h] of [[1440, 900], [768, 1024], [390, 844]]) {
    const ctx = await ctxFor(w, h);
    const page = await openPage(ctx, '/');
    await pinHeroSlide(page);
    await warm(page);
    await pinHeroSlide(page);
    const newsBottom = await page.evaluate(() => {
      const n = document.querySelector('[id$="__news"]');
      const sec = n && (n.closest('.shopify-section') || n);
      return sec.getBoundingClientRect().bottom + scrollY;
    });
    assertSafe(newsBottom, `responsive ${w}`);
    console.log(`responsive ${w}: hero+news = ${Math.round(newsBottom)}css`);
    await stitch(page, newsBottom, 2, h, `home-ja-${w}-hero-news.png`);
    await ctx.close();
  }

  // --- About: 天祐醤油・味噌（PC 1440、JA）
  {
    const ctx = await ctxFor(1440, 900);
    const page = await openPage(ctx, '/pages/about');
    await warm(page);
    const y = await page.evaluate(() => document.querySelector('.nkv2-pa__section--tenyu-pair').getBoundingClientRect().top + scrollY);
    await page.evaluate((v) => scrollTo(0, v - 70), y);
    await page.waitForTimeout(1800);
    await page.evaluate(async () => {
      await Promise.all([...document.querySelectorAll('.nkv2-pa__section--tenyu-pair img')].map((i) => i.complete ? 1 : new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 5000); })));
    });
    await page.waitForTimeout(500);
    await page.addStyleTag({ content: '[class*="floating-cart"]{display:none!important}' });
    await page.screenshot({ path: RAW + 'about-tenyu-ja-1440.png' });
    await ctx.close();
  }
  await browser.close();
}

// ---------------------------------------------------------------------------
// 2. 合成
// ---------------------------------------------------------------------------
const BG = '#F5F5F7';
const INK = '#3a3a40';
const INK_MUTED = '#6b6b73';
const D = 2; // 生画像は dpr 2

async function panel(file, { x = 0, y = 0, w, h }, outW, outH) {
  return sharp(RAW + file)
    .extract({ left: Math.round(x * D), top: Math.round(y * D), width: Math.round(w * D), height: Math.round(h * D) })
    .resize(outW, outH, { fit: 'fill' }).png().toBuffer();
}
async function panelAbs(path, { x = 0, y = 0, w, h }, outW, outH) {
  return sharp(path).extract({ left: Math.round(x), top: Math.round(y), width: Math.round(w), height: Math.round(h) })
    .resize(outW, outH, { fit: 'fill' }).png().toBuffer();
}
const svgText = (text, w, size, weight, fill) => Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${size + 10}"><text x="0" y="${size}" font-family="Hiragino Sans, Noto Sans JP, Helvetica Neue, Helvetica, Arial, sans-serif" font-size="${size}" font-weight="${weight}" letter-spacing="0.3" fill="${fill}">${text}</text></svg>`);
const label = (t, w, s = 26) => svgText(t, w, s, 500, INK);
const sublabel = (t, w, s = 20) => svgText(t, w, s, 400, INK_MUTED);
const canvas = (w, h) => sharp({ create: { width: w, height: h, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } });
// 角を丸める（rounded-media = 8px 相当。1200 幅の図では 10px）
const round = (buf, w, h, r = 10) => sharp(buf)
  .composite([{ input: Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="${r}" ry="${r}"/></svg>`), blend: 'dest-in' }])
  .png().toBuffer();
async function write(name, pipeline) {
  await pipeline.webp({ quality: 82 }).toFile(OUT + name);
  const m = await sharp(OUT + name).metadata();
  console.log(name.padEnd(24), `${m.width}x${m.height}`);
}

async function compose() {
  // thumbnail-{jp,en}.webp（カードとヒーロー。8:5）は scripts/compose-nakahatsu-keyvisual.mjs が作る。
  // 先方サイトのファーストビューの切り取りをそのまま出さず、PC と SP の画面を平らな地に置いた表紙にしてある。

  // before-after: 旧 WordPress + 旧 EC-CUBE | 新ストア（ヒーロー + お知らせ + About の見出し）
  {
    const W = 1200, H = 675, PAD = 32, GAP = 32, LABEL_H = 68;
    const colW = (W - PAD * 2 - GAP) / 2;
    const panelH = H - PAD - LABEL_H - PAD;
    const leftH = (panelH - 14) / 2;
    const asp = colW / leftH;
    for (const f of ['top-desktop.png', 'shop-top-desktop.png']) if (!existsSync(OLD_DIR + f)) throw new Error(`旧サイトの画像が無い: ${OLD_DIR + f}（NAKAHATSU_OLD_SCREENSHOTS）`);
    const wp = await panelAbs(OLD_DIR + 'top-desktop.png', { w: 1440, h: 1440 / asp }, Math.round(colW), Math.round(leftH));
    const ec = await panelAbs(OLD_DIR + 'shop-top-desktop.png', { w: 1440, h: 1440 / asp }, Math.round(colW), Math.round(leftH));
    const nowH = 1440 / (colW / panelH);
    assertSafe(nowH, 'before-after / after');
    const rx = Math.round(PAD + colW + GAP);
    // 説明文は本文とキャプションに任せる。画像には、言語別の短いラベルだけ。
    for (const [lang, before, after] of [['en', 'Before', 'After'], ['jp', 'リニューアル前', 'リニューアル後']]) {
      const now = await round(await panel(`home-${lang === 'jp' ? 'ja' : 'en'}-1440-top.png`, { w: 1440, h: nowH }, Math.round(colW), Math.round(panelH)), Math.round(colW), Math.round(panelH));
      await write(`before-after-${lang}.webp`, canvas(W, H).composite([
        { input: label(before, colW), left: PAD, top: PAD },
        { input: await round(wp, Math.round(colW), Math.round(leftH)), left: PAD, top: PAD + LABEL_H },
        { input: await round(ec, Math.round(colW), Math.round(leftH)), left: PAD, top: Math.round(PAD + LABEL_H + leftH + 14) },
        { input: label(after, colW), left: rx, top: PAD },
        { input: now, left: rx, top: PAD + LABEL_H },
      ]));
    }
  }

  // bilingual: 同じヒーローの JA / EN を左右に並べる（16:9。FR は hero-fr-1440.png に撮ってある）
  // ラベルは各言語の自称。どちらの言語のページでも、そのまま読める。
  {
    const W = 1200, H = 675, PAD = 32, GAP = 28, LABEL_H = 44;
    const colW = Math.round((W - PAD * 2 - GAP) / 2);
    const panelH = Math.round(900 * (colW / 1440));
    const top = Math.round((H - (LABEL_H + panelH)) / 2);
    const ja = await panel('hero-ja-1440.png', { w: 1440, h: 900 }, colW, panelH);
    const en = await panel('hero-en-1440.png', { w: 1440, h: 900 }, colW, panelH);
    const rx = PAD + colW + GAP;
    await write('bilingual.webp', canvas(W, H).composite([
      { input: label('日本語', colW), left: PAD, top },
      { input: await round(ja, colW, panelH), left: PAD, top: top + LABEL_H },
      { input: label('English', colW), left: rx, top },
      { input: await round(en, colW, panelH), left: rx, top: top + LABEL_H },
    ]));
  }

  // responsive: 1440 と 390 を同じ縮尺で（ヒーロー + お知らせ）。768 は載せない（3枚だと 390 の画面が小さすぎて読めない）
  {
    const W = 1200, H = 675, PAD = 32, GAP = 48, LABEL_H = 52;
    const widths = [1440, 390];
    const k = (W - PAD * 2 - GAP * 2) / widths.reduce((a, b) => a + b, 0);
    const parts = [];
    let x = PAD;
    for (const w of widths) {
      const file = `home-ja-${w}-hero-news.png`;
      const m = await sharp(RAW + file).metadata();
      // 最初の1画面だけ（PC は 900css、SP は 844css）。下端で文字が切れない高さ。縮尺は両方そろえる
      const cssH = Math.min(m.height / D, w === 390 ? 844 : 900);
      const outW = Math.round(w * k), outH = Math.round(cssH * k);
      const img = await round(
        await sharp(RAW + file).extract({ left: 0, top: 0, width: m.width, height: Math.round(cssH * D) })
          .resize(outW, outH, { fit: 'fill' }).png().toBuffer(), outW, outH);
      if (outH > H - PAD - LABEL_H - 4) throw new Error(`responsive ${w}: 縦が足りない（${outH}）`);
      parts.push({ input: label(w + 'px', outW, 24), left: Math.round(x), top: PAD + 2 });
      parts.push({ input: img, left: Math.round(x), top: PAD + LABEL_H });
      x += outW + GAP;
    }
    await write('responsive.webp', canvas(W, H).composite(parts));
  }

  // products: 商品グリッド（見出し + 2 行）。1440x810 を 1200x675 に
  await write('products.webp', sharp(RAW + 'products-ja-1440.png')
    .extract({ left: 0, top: 80 * D, width: 1440 * D, height: 810 * D }).resize(1200, 675));

  // about-tenyu（新規）: About の天祐醤油・味噌（PC、JA）
  // 天祐味噌のブロック（写真 + 縦書きの本文 + 縦書きの見出し）を、切れ目なく大きく。
  {
    const x = 700, y = 180, w = 700, h = 480; // css px（隣の醤油の見出しを入れない位置から）
    const outH = 675, outW = Math.round((w / h) * outH);
    const block = await round(
      await sharp(RAW + 'about-tenyu-ja-1440.png')
        .extract({ left: x * D, top: y * D, width: w * D, height: h * D }).resize(outW, outH).png().toBuffer(),
      outW, outH, 12);
    await write('about-tenyu.webp', canvas(1200, 675).composite([{ input: block, left: Math.round((1200 - outW) / 2), top: 0 }]));
  }

  // challenges: 旧サイトの画面3枚（支払い方法 / 送料・引き渡し時期 / 会員登録エラー）。
  // 素材は 2026-10-26 に旧図版から切り出した .capture/nakahatsu/challenge-{a,b,c}.png（元は旧サイトの
  // tradelaw / entry のスクリーンショット）。説明の英文は画像に焼き込まない。
  {
    const need = ['a', 'b', 'c'].map((k) => RAW + `challenge-${k}.png`);
    if (need.every((f) => existsSync(f))) {
      const W = 1200, H = 675, GAP = 24, s = 0.923;
      const aw = Math.round(548 * s), ah = Math.round(331 * s);
      const cw = Math.round(1136 * s), ch = Math.round(322 * s);
      const x0 = Math.round((W - cw) / 2);
      const top = Math.round((H - (ah + GAP + ch)) / 2);
      const rs = async (f, w, h) => round(await sharp(f).resize(w, h, { fit: 'fill' }).png().toBuffer(), w, h, 14);
      await write('challenges.webp', canvas(W, H).composite([
        { input: await rs(need[0], aw, ah), left: x0, top },
        { input: await rs(need[1], aw, ah), left: x0 + cw - aw, top },
        { input: await rs(need[2], cw, ch), left: x0, top: top + ah + GAP },
      ]));
    } else {
      console.log('challenges.webp: 素材（challenge-{a,b,c}.png）が無いので触らない');
    }
  }
}

if (DO_CAPTURE) await capture();
if (DO_COMPOSE) await compose();
console.log('done');
