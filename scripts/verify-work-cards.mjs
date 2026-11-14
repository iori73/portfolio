/**
 * トップの Work カードが、数値で一致しているかを測る。
 *
 *   node scripts/verify-work-cards.mjs [http://localhost:3007] [/ または /jp]
 *
 * 見た目の「なんとなく同じ」で済ませない。比率・外枠・角丸・地色・タグの文字サイズを
 * 1440 / 768 / 390px で全カードから取り、1枚でも違えば非ゼロで終わる。
 * 判断の根拠: NN/g「using a consistent visual treatment of items that will be compared」。
 */
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { chromium } = createRequire(join(ROOT, 'package.json'))('playwright');

const BASE = process.argv[2] || 'http://localhost:3007';
const PATH = process.argv[3] || '/';
const WIDTHS = [1440, 768, 390];

const browser = await chromium.launch();
let bad = 0;
for (const w of WIDTHS) {
  const page = await (await browser.newContext({ viewport: { width: w, height: 900 } })).newPage();
  await page.goto(BASE + PATH, { waitUntil: 'networkidle' });
  const rows = await page.evaluate(() =>
    [...document.querySelectorAll('[data-work-card]')].map((a) => {
      const frame = a.querySelector('[data-work-thumb-frame]');
      const thumb = a.querySelector('[data-work-thumb]');
      const tag = a.querySelector('h3 + div span');
      const f = frame.getBoundingClientRect();
      const t = thumb.getBoundingClientRect();
      const fs = getComputedStyle(frame);
      const ts = getComputedStyle(thumb);
      return {
        href: a.getAttribute('href'),
        thumbRatio: +(t.width / t.height).toFixed(2),
        frameWidth: Math.round(f.width),
        framePad: fs.paddingTop,
        frameRadius: fs.borderTopLeftRadius,
        frameBg: fs.backgroundColor,
        thumbRadius: ts.borderTopLeftRadius,
        tagFont: getComputedStyle(tag).fontSize,
        tagRadius: getComputedStyle(tag).borderTopLeftRadius,
      };
    }),
  );
  const keys = ['thumbRatio', 'frameWidth', 'framePad', 'frameRadius', 'frameBg', 'thumbRadius', 'tagFont', 'tagRadius'];
  console.log(`\n${w}px  (${rows.length} cards)`);
  for (const k of keys) {
    const vals = rows.map((r) => r[k]);
    const same = new Set(vals).size === 1;
    if (!same) bad++;
    console.log(`  ${same ? 'OK ' : 'NG '} ${k.padEnd(12)} ${vals.join(' | ')}`);
  }
}
await browser.close();
console.log(bad ? `\n不一致 ${bad} 件` : '\n全カードが一致');
process.exit(bad ? 1 : 0);
