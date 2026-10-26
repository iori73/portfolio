/**
 * サムネ改善版（タイルの配置に「意味」を持たせた版）。
 *
 *   node scripts/compose-nakahatsu-keyvisual-v2.mjs
 *
 * 出力: .capture/nakahatsu/ks/v2-{jp,en}.png（4000x2500）と Figma 用 JPEG。サイトにはまだ反映しない（案の段階）。
 *
 * なぜこの配置か（Mobbin で学んだこと + この案件で伝えたいこと）:
 *   - 伝えたいこと: 「1つのストアが、ブランドの物語から商品まで、3 言語で読める」。
 *   - 主役を1枚だけ大きく（Lovart）。残りは同じ型で小さく。
 *   - 同じ型のカードを等間隔に並べ、各カードに何の画面かを短く添える（Notion / Arc のキャプション）。
 *   - 下端と右端で画面を切って「続きがある」ことを示す（Chronicle）。
 *   - 余白・間隔・角丸は 1 つの規則（12 列のグリッドに乗せる）。影・グラデーションなし。
 * 配置の意味:
 *   左上=ブランド（トップ）。右上=物語（About）。右下=ショップ。左下=同じ商品ページを 日・英・仏 の3枚で。
 */
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(join(ROOT, 'package.json'));
const { chromium } = require('playwright');
const sharp = require('sharp');
const KS = join(ROOT, '.capture', 'nakahatsu', 'ks') + '/';
const W = 2000, H = 1250, DSF = 2;
const GROUND = '#E8E4DB';
const R = 28; // 角丸
const M = 96, G = 24; // 余白・間隔（グリッドの単位）
const url = (f) => 'data:image/png;base64,' + readFileSync(KS + f).toString('base64');

// 12 列のグリッド: 左の塊が 7 列（1080）、右の塊が 5 列（704）。
const LEFT_W = 1080, RIGHT_X = M + LEFT_W + G, RIGHT_W = W - M - RIGHT_X;
const PHONE_W = (LEFT_W - 2 * G) / 3;
const LEAD_H = Math.round(LEFT_W / 1.6); // PC 画面は 8:5
const PHONE_H = Math.round((PHONE_W * 844) / 390); // SP 画面の比率（下端はフレームで切れる）

function tiles(lang) {
  const en = lang === 'en' ? '-en' : '';
  const L = lang === 'en' ? { brand: 'Brand', story: 'Story', shop: 'Shop' } : { brand: 'ブランド', story: '物語', shop: 'ショップ' };
  const phoneY = M + LEAD_H + G;
  return [
    { f: 'pc-home-top' + en, x: M, y: M, w: LEFT_W, h: LEAD_H, chip: L.brand },
    { f: 'pc-about-tenyu', x: RIGHT_X, y: M, w: RIGHT_W, h: 440, pos: '50% 10%', chip: L.story },
    { f: 'pc-shop', x: RIGHT_X, y: M + 440 + G, w: RIGHT_W, h: H - (M + 440 + G), chip: L.shop },
    { f: 'sp-product', x: M, y: phoneY, w: PHONE_W, h: PHONE_H, chip: 'JA' },
    { f: 'sp-product-en', x: M + PHONE_W + G, y: phoneY, w: PHONE_W, h: PHONE_H, chip: 'EN' },
    { f: 'sp-product-fr', x: M + 2 * (PHONE_W + G), y: phoneY, w: PHONE_W, h: PHONE_H, chip: 'FR' },
  ];
}

function html(lang) {
  const t = tiles(lang).map((s) => `<div class="t" style="left:${s.x}px;top:${s.y}px;width:${s.w}px;height:${s.h}px">
      <div class="i"><img src="${url(s.f + '.png')}" style="object-position:${s.pos || '50% 0%'}"></div><span class="c">${s.chip}</span></div>`).join('');
  return `<!doctype html><meta charset="utf-8"><style>
    html,body{margin:0;width:${W}px;height:${H}px;background:${GROUND};overflow:hidden;position:relative}
    .t{position:absolute;border-radius:${R}px;background:#fff}
    .t .i{position:absolute;inset:0;border-radius:${R}px;overflow:hidden}
    .t img{display:block;width:100%;height:100%;object-fit:cover}
    .c{position:absolute;left:24px;top:-20px;z-index:2;padding:7px 16px;border-radius:12px;background:rgba(255,255,255,.92);
       font:500 22px/1.2 "Hiragino Sans","Helvetica Neue",Arial,sans-serif;color:#3a3a3a;letter-spacing:.02em}
  </style>${t}`;
}

const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: DSF })).newPage();
for (const lang of ['jp', 'en']) {
  await page.setContent(html(lang), { waitUntil: 'load' });
  const png = await page.screenshot({ type: 'png' });
  await sharp(png).png().toFile(KS + `v2-${lang}.png`);
  await sharp(png).jpeg({ quality: 90 }).toFile(KS + `v2-${lang}.figma.jpg`);
  console.log(`v2-${lang}`);
}
await browser.close();
