/**
 * 主要画面の一覧画像（中初商店ケーススタディ用）を組む。
 *
 *   node scripts/compose-nakahatsu-overview.mjs
 *   入力: .capture/nakahatsu/ov/final/*.png（capture-nakahatsu-overview.mjs final で撮ったもの。dpr 2）
 *   出力: .capture/nakahatsu/ov/overview-jp.png（2400x1500 = 8:5、地は透明）
 *
 * 構図: 3 列。列ごとに開始位置をずらし、画面の下端はキャンバスの外へはみ出させる（切れた画面が
 * 続いているように見せる）。影は弱く、枠線は 1px。ほかの図版と同じく地は透明（器の色が透ける）。
 */
import { createRequire } from 'node:module';
import { writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(join(ROOT, 'package.json'));
const { chromium } = require('playwright');
const LANG = process.env.NAKAHATSU_LANG_PREFIX || '';
const SRC = join(ROOT, '.capture', 'nakahatsu', 'ov', 'final' + (LANG ? '-' + LANG.replace('/', '') : '')) + '/';
const OUT = join(ROOT, '.capture', 'nakahatsu', 'ov', LANG ? 'overview-en.png' : 'overview-jp.png');

const W = 2400, H = 1500, COL_W = 640, GAP = 48;
const X0 = (W - (COL_W * 3 + GAP * 2)) / 2;
// 列 = [開始 y, 画面の並び]
const COLS = [
  [60, ['home', 'shop', 'contact']],
  [200, ['about-top', 'shipping']],
  [100, ['product', 'about-tenyu', 'faq']],
];
const col = (c, i) => `<div style="position:absolute;left:${X0 + i * (COL_W + GAP)}px;top:${c[0]}px;width:${COL_W}px;display:flex;flex-direction:column;gap:${GAP}px">` +
  c[1].map((n) => `<img src="file://${SRC}${n}.png" style="width:${COL_W}px;display:block;border-radius:14px;border:1px solid rgba(0,0,0,.08);box-shadow:0 10px 36px rgba(40,30,20,.14)">`).join('') + '</div>';
const html = `<!doctype html><meta charset="utf-8"><body style="margin:0;width:${W}px;height:${H}px;position:relative;overflow:hidden;background:transparent">${COLS.map(col).join('')}</body>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
// about:blank からはローカル画像を読めないので、HTML をファイルに書き出して開く
const HTML_PATH = join(ROOT, '.capture', 'nakahatsu', 'ov', 'overview.html');
writeFileSync(HTML_PATH, html);
await page.goto('file://' + HTML_PATH, { waitUntil: 'load' });
await page.waitForFunction(() => [...document.images].every((i) => i.complete && i.naturalWidth > 0));
await page.screenshot({ path: OUT, omitBackground: true });
await browser.close();
console.log('saved', OUT);
