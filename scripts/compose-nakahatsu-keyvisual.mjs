/**
 * 中初商店のサムネ（トップのカード）とヒーロー（詳細ページ）を組む。
 *
 *   （先に素材を撮る）
 *   node scripts/capture-nakahatsu-screens.mjs
 *   node scripts/compose-nakahatsu-keyvisual.mjs
 *
 * 出力: public/work/nakahatsu/thumbnail-{en,jp}.webp（2000x1250 = 8:5）
 *   カードとヒーローの両方に同じ画像を使う（比率は WorkCard / TransitionOverlay と同じ 8:5）。
 *
 * 組み方の理由（docs/design/nakahatsu-keyvisual-rationale.md）:
 *   - 地は平らな単色。グラデーション・影・傾きなし（河野さんの NG: 影・グラデーションの多用）。
 *   - PC と SP は別の画面（PC=トップのヒーロー、SP=商品ページ）。同じ画面を並べると、見せ方の幅がなく貧しく見える。
 *   - PC が主役、SP は右にずらして下端をそろえる。重ねない。
 *   - 枠はブランドのない中立の黒い縁だけ（ハードウェアのロゴ・ノッチ・影なし）。
 *   - 画像に文字を焼き込まない。文字は画面の中の、先方サイトの言語の文字だけ。
 *   - 余白を多く残す（面積の半分ほど）。
 * 素材に開発ストアの URL・パスワード・プレビューバー・Instagram の写真帯が写っていないことは、
 * capture-nakahatsu-screens.mjs が保証する。ここでは素材をそのまま使う。
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
const OUT = join(ROOT, 'public', 'work', 'nakahatsu') + '/';

const W = 2000;
const H = 1250;
const GROUND = '#E8E4DB'; // 平らな単色。ページの地（冷たい灰）と、先方の写真の暗さの両方から離す
const BEZEL = '#262626'; // 黒に近いが、純黒ではない。縁を細く、ページの静けさを壊さない

const PC = { screenW: 1240, bezel: 12, x: 140 }; // 左右の余白が等しくなる位置
const SP = { screenW: 330, bezel: 11, gap: 90 };

const dataUrl = (f) => 'data:image/png;base64,' + readFileSync(KS + f).toString('base64');

// SP の画面は、本文が行の途中で切れないよう、区切り線の下を白（ページの地）で埋める。
// SP_KEEP_CSS は、素材（390 幅）の上から何 css px を残すか。商品ページの区切り線の少し下。
const SP_KEEP_CSS = 783;
async function spScreen(f) {
  const img = sharp(KS + f);
  const { width, height } = await img.metadata();
  const keep = Math.min(height, SP_KEEP_CSS * 2);
  const top = await img.extract({ left: 0, top: 0, width, height: keep }).png().toBuffer();
  const out = await sharp({ create: { width, height, channels: 3, background: '#ffffff' } })
    .composite([{ input: top, left: 0, top: 0 }])
    .png()
    .toBuffer();
  return 'data:image/png;base64,' + out.toString('base64');
}

function html(pcFile, spSrc) {
  const pcH = Math.round((PC.screenW * 900) / 1440);
  const pcOuterW = PC.screenW + PC.bezel * 2;
  const pcOuterH = pcH + PC.bezel * 2;
  const pcTop = Math.round((H - pcOuterH) / 2);
  const pcBottom = pcTop + pcOuterH;

  const spH = Math.round((SP.screenW * 844) / 390);
  const spOuterW = SP.screenW + SP.bezel * 2;
  const spOuterH = spH + SP.bezel * 2;
  const spLeft = PC.x + pcOuterW + SP.gap;
  const spTop = pcBottom - spOuterH; // 下端をそろえる

  return `<!doctype html><meta charset="utf-8"><style>
    html,body{margin:0;width:${W}px;height:${H}px;background:${GROUND}}
    .dev{position:absolute;background:${BEZEL};overflow:hidden}
    .dev img{display:block;width:100%;height:100%;object-fit:cover;object-position:top}
    .pc{left:${PC.x}px;top:${pcTop}px;width:${pcOuterW}px;height:${pcOuterH}px;border-radius:22px;padding:${PC.bezel}px;box-sizing:border-box}
    .pc img{border-radius:8px}
    .sp{left:${spLeft}px;top:${spTop}px;width:${spOuterW}px;height:${spOuterH}px;border-radius:54px;padding:${SP.bezel}px;box-sizing:border-box}
    .sp img{border-radius:40px}
  </style>
  <div class="dev pc"><img src="${dataUrl(pcFile)}"></div>
  <div class="dev sp"><img src="${spSrc}"></div>`;
}

const jobs = [
  { out: 'thumbnail-jp.webp', pc: 'pc-home-top.png', sp: 'sp-product.png' },
  { out: 'thumbnail-en.webp', pc: 'pc-home-top-en.png', sp: 'sp-product-en.png' },
];

const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 })).newPage();
for (const j of jobs) {
  await page.setContent(html(j.pc, await spScreen(j.sp)), { waitUntil: 'load' });
  const png = await page.screenshot({ type: 'png' });
  await sharp(png).webp({ quality: 88 }).toFile(OUT + j.out);
  console.log(j.out.padEnd(22), `${W}x${H}`, 'from', j.pc, '+', j.sp);
}
await browser.close();
