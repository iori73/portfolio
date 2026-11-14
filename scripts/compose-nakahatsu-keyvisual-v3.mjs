/**
 * サムネのバリエーション（A改と同じ配置の規則で、画面と意味だけを変える）。
 *
 *   node scripts/capture-nakahatsu-screens.mjs more     # 先に別の画面を撮る
 *   node scripts/compose-nakahatsu-keyvisual-v3.mjs
 *
 * 出力: .capture/nakahatsu/ks/v3-{c,d,e}-jp.png（4000x2500）と Figma 用 JPEG。サイトにはまだ反映しない。
 *
 * 配置の規則は v2（A改）と同じ: 左=主役の PC + スマホ 3 枚（下端で切る）、右=PC 2 枚（下端で切る）。
 * 余白 96・間隔 24・角丸 28（2000x1250 基準）。影・グラデーションなし。各タイルに短いラベル。
 *
 *   C「選ぶ」          商品詳細（味噌）を主役に、商品一覧・醸造の説明。スマホは 醤油・味噌・一覧。
 *   D「安心して買える」  よくある質問を主役に、お問い合わせ・配送ポリシー。スマホは 質問・相談・お知らせ。
 *                      （課題「購入前に知りたい情報が一部にしかなかった」を、画面で見せる）
 *   E「言葉」          トップを 日・英・仏 で。縦書きの扱いが言語ごとに変わる。スマホも 3 言語。
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
const W = 2000, H = 1250, DSF = 2, R = 28, M = 96, G = 24;
const GROUND = '#E8E4DB';
const url = (f) => 'data:image/png;base64,' + readFileSync(KS + f).toString('base64');

const LEFT_W = 1080, RIGHT_X = M + LEFT_W + G, RIGHT_W = W - M - RIGHT_X;
const PHONE_W = (LEFT_W - 2 * G) / 3, PHONE_H = Math.round((PHONE_W * 844) / 390);
const LEAD_H = Math.round(LEFT_W / 1.6), PHONE_Y = M + LEAD_H + G;
const RT_H = 440, RB_Y = M + RT_H + G;

// slot: lead / rt / rb / p1 / p2 / p3
const SLOT = {
  lead: { x: M, y: M, w: LEFT_W, h: LEAD_H },
  rt: { x: RIGHT_X, y: M, w: RIGHT_W, h: RT_H },
  rb: { x: RIGHT_X, y: RB_Y, w: RIGHT_W, h: H - RB_Y },
  p1: { x: M, y: PHONE_Y, w: PHONE_W, h: PHONE_H },
  p2: { x: M + PHONE_W + G, y: PHONE_Y, w: PHONE_W, h: PHONE_H },
  p3: { x: M + 2 * (PHONE_W + G), y: PHONE_Y, w: PHONE_W, h: PHONE_H },
};

export const VARIANTS = {
  c: {
    lead: ['pc-product-miso', '商品詳細（味噌）'], rt: ['pc-shop', '商品一覧'], rb: ['pc-about-tenyu', '醸造のこと'],
    p1: ['sp-product', '醤油'], p2: ['sp-product-miso', '味噌'], p3: ['sp-shop', '一覧'],
  },
  d: {
    lead: ['pc-faq', 'よくある質問'], rt: ['pc-contact', 'お問い合わせ'], rb: ['pc-shipping', '配送ポリシー'],
    p1: ['sp-faq', '質問'], p2: ['sp-contact', '相談'], p3: ['sp-news', 'お知らせ'],
  },
  e: {
    lead: ['pc-home-top', '日本語'], rt: ['pc-home-top-en', 'English'], rb: ['pc-home-top-fr', 'Français'],
    p1: ['sp-home-top', 'JA'], p2: ['sp-home-top-en', 'EN'], p3: ['sp-home-top-fr', 'FR'],
  },
};

function html(v) {
  const t = Object.entries(v).map(([k, [f, chip]]) => {
    const s = SLOT[k];
    return `<div class="t" style="left:${s.x}px;top:${s.y}px;width:${s.w}px;height:${s.h}px"><div class="i"><img src="${url(f + '.png')}"></div><span class="c">${chip}</span></div>`;
  }).join('');
  return `<!doctype html><meta charset="utf-8"><style>
    html,body{margin:0;width:${W}px;height:${H}px;background:${GROUND};overflow:hidden;position:relative}
    .t{position:absolute;border-radius:${R}px;background:#fff}
    .i{position:absolute;inset:0;border-radius:${R}px;overflow:hidden}
    .i img{display:block;width:100%;height:100%;object-fit:cover;object-position:50% 0%}
    .c{position:absolute;left:24px;top:-20px;z-index:2;padding:7px 16px;border-radius:12px;background:rgba(255,255,255,.92);
       font:500 22px/1.2 "Hiragino Sans","Helvetica Neue",Arial,sans-serif;color:#3a3a3a;letter-spacing:.02em}
  </style>${t}`;
}

const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: DSF })).newPage();
for (const [k, v] of Object.entries(VARIANTS)) {
  await page.setContent(html(v), { waitUntil: 'load' });
  const png = await page.screenshot({ type: 'png' });
  await sharp(png).png().toFile(KS + `v3-${k}-jp.png`);
  await sharp(png).jpeg({ quality: 90 }).toFile(KS + `v3-${k}-jp.figma.jpg`);
  console.log(`v3-${k}-jp`);
}
await browser.close();
