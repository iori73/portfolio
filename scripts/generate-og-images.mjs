/**
 * OG 画像を書き出す。`node scripts/generate-og-images.mjs`
 *
 * 1200x630。WebP は主要プラットフォームでの扱いが安定しないので、OG 用だけは
 * PNG（単色地）と JPEG（写真）で持つ。写真を PNG のままにすると1枚1MBを超えて、
 * カードの読み込みが目に見えて遅くなる。素材は既存の作品画像を使い回すので、
 * 元画像を差し替えたらこのスクリプトを流し直す。
 */
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const W = 1200;
const H = 630;
const SURFACE = '#ebe8de';
const INK = '#0A0A0A';
const INK_SECONDARY = '#333333';
const INK_TERTIARY = '#635d54';

const OUT = 'public/og';
mkdirSync(OUT, { recursive: true });

const FONT = 'Helvetica Neue, Helvetica, Arial, sans-serif';

/** 作品画像をそのまま 1200x630 に収める（中央でカバー）。写真なので JPEG。 */
async function fromArtwork(src, out) {
  await sharp(src)
    .resize(W, H, { fit: 'cover', position: 'attention' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(`${OUT}/${out}`);
  console.log(out.padEnd(24), 'from', src);
}

/** 素材が横長でないものは、面の上に置いて余白で持たせる。 */
async function onSurface(src, out, inset = 120) {
  const art = await sharp(src)
    .resize(W - inset * 2, H - inset, { fit: 'inside', withoutEnlargement: false })
    .toBuffer();
  const meta = await sharp(art).metadata();
  await sharp({ create: { width: W, height: H, channels: 3, background: SURFACE } })
    .composite([{ input: art, left: Math.round((W - meta.width) / 2), top: Math.round((H - meta.height) / 2) }])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(`${OUT}/${out}`);
  console.log(out.padEnd(24), 'from', src);
}

/** サイト共通のフォールバック。名前と肩書きだけ。 */
async function defaultCard() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <rect width="${W}" height="${H}" fill="${SURFACE}"/>
    <text x="96" y="300" font-family="${FONT}" font-size="76" font-weight="500" fill="${INK}">Iori Kawano</text>
    <text x="96" y="366" font-family="${FONT}" font-size="34" font-weight="400" fill="${INK_SECONDARY}">UI/UX Designer</text>
    <text x="96" y="424" font-family="${FONT}" font-size="26" font-weight="400" fill="${INK_TERTIARY}">Design and development case studies, in English and Japanese</text>
    <rect x="96" y="470" width="120" height="3" fill="${INK}"/>
  </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(`${OUT}/default.png`);
  console.log('default.png'.padEnd(24), 'generated');
}

await defaultCard();
await fromArtwork('public/work/ukiyoe/thumbnail-en.webp', 'ukiyoe.jpg');
await onSurface('public/work/figma-plugins/pptx-cover.webp', 'figma-plugins.jpg');
await fromArtwork('public/work/google_ux_design_certificate_project/01.webp', 'google-ux.jpg');
console.log('done');
