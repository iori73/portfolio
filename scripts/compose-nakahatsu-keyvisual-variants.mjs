/**
 * サムネ案（河野さんの参考: Goldwin の画面タイル配置 / ZettaJoule の1台のモニター）。
 *
 *   node scripts/compose-nakahatsu-keyvisual-variants.mjs
 *
 * 出力: .capture/nakahatsu/ks/variant-{a,b}-{jp,en}.png（4000x2500、8:5）と、Figma 用の JPEG。
 * 採用が決まったら compose-nakahatsu-keyvisual.mjs に取り込む（それまで本番のサムネは変えない）。
 *
 * A: 有機的なタイル配置。PC と SP のいろいろな画面を、角丸のカードで、フレームの端で切れるように敷き詰める。
 *    影・グラデーションなし。地は平らな単色（Goldwin の参考どおり、淡い青みの灰）。
 * B: 1台のモニターを大きく。地は、淡い2色のなだらかな面（ZettaJoule の空の雰囲気を、彩度を落として）。
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
const url = (f) => 'data:image/png;base64,' + readFileSync(KS + f).toString('base64');

// 画面ごとに、素材のどこを見せるか（object-position）。tile: x, y, w, h は CSS px。端をはみ出して切れてよい。
function tiles(lang) {
  const en = lang === 'en' ? '-en' : '';
  return [
    // 左 2 列: SP の縦長カード（端で切れる）
    { f: 'sp-shop' + (en ? '-en' : ''), x: -70, y: -140, w: 300, h: 650 },
    { f: 'sp-about-vertical', x: -70, y: 538, w: 300, h: 650 },
    { f: 'sp-home-top' + en, x: 258, y: 60, w: 300, h: 650 },
    { f: 'sp-product' + en, x: 258, y: 738, w: 300, h: 650 },
    // 中央: PC の主役
    { f: 'pc-home-top' + en, x: 586, y: 110, w: 1220, h: 762 },
    // 下段: PC の別画面 2 枚
    { f: 'pc-about-tenyu', x: 586, y: 900, w: 596, h: 372, pos: '50% 8%' },
    { f: 'pc-shop', x: 1210, y: 900, w: 596, h: 372, pos: '50% 0%' },
    // 右端: 切れた PC の続き
    { f: 'pc-shop', x: 1834, y: 110, w: 380, h: 762, pos: '0% 0%' },
  ];
}

function htmlA(lang) {
  const t = tiles(lang).map((s) => `<div class="t" style="left:${s.x}px;top:${s.y}px;width:${s.w}px;height:${s.h}px"><img src="${url(s.f + '.png')}" style="object-position:${s.pos || '50% 0%'}"></div>`).join('');
  return `<!doctype html><meta charset="utf-8"><style>
    html,body{margin:0;width:${W}px;height:${H}px;background:#DADBE2;overflow:hidden;position:relative}
    .t{position:absolute;border-radius:28px;overflow:hidden;background:#fff}
    .t img{display:block;width:100%;height:100%;object-fit:cover}
  </style>${t}`;
}

function htmlB(lang) {
  const en = lang === 'en' ? '-en' : '';
  const sw = 1500, sh = Math.round((sw * 900) / 1440), bz = 14;
  const ow = sw + bz * 2, oh = sh + bz * 2, left = Math.round((W - ow) / 2), top = 150;
  return `<!doctype html><meta charset="utf-8"><style>
    html,body{margin:0;width:${W}px;height:${H}px;overflow:hidden;position:relative;
      background:linear-gradient(180deg,#C7CEDA 0%,#D9DCE2 48%,#EEE6DA 100%)}
    .m{position:absolute;left:${left}px;top:${top}px;width:${ow}px;height:${oh}px;box-sizing:border-box;padding:${bz}px;background:#1B1B1B;border-radius:24px}
    .m img{display:block;width:100%;height:100%;object-fit:cover;object-position:top;border-radius:10px}
    .neck{position:absolute;left:${W / 2 - 110}px;top:${top + oh}px;width:220px;height:240px;background:#B9BCC3;border-radius:0 0 8px 8px}
    .base{position:absolute;left:${W / 2 - 260}px;top:${top + oh + 230}px;width:520px;height:26px;background:#A9ACB4;border-radius:13px}
  </style><div class="neck"></div><div class="base"></div><div class="m"><img src="${url('pc-home-top' + en + '.png')}"></div>`;
}

const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: DSF })).newPage();
for (const [v, fn] of [['a', htmlA], ['b', htmlB]]) {
  for (const lang of ['jp', 'en']) {
    await page.setContent(fn(lang), { waitUntil: 'load' });
    const png = await page.screenshot({ type: 'png' });
    await sharp(png).png().toFile(KS + `variant-${v}-${lang}.png`);
    await sharp(png).jpeg({ quality: 90 }).toFile(KS + `variant-${v}-${lang}.figma.jpg`);
    console.log(`variant-${v}-${lang}`);
  }
}
await browser.close();
