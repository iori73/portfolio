#!/usr/bin/env node
/**
 * レスポンシブ品質チェック（全ルート × 端末幅 × jp/en）。
 *
 * 使い方:
 *   pnpm dev                                   # 別のターミナルで
 *   pnpm qa:responsive                         # http://localhost:3000 を検査
 *   BASE=https://iori-kawano.vercel.app pnpm qa:responsive   # 本番を検査
 *   WIDTHS=320,390 ROUTES=/work/nakahatsu pnpm qa:responsive # 絞り込み
 *
 * 失敗（終了コード 1）にするもの:
 *   1. 横スクロール（WCAG 2.2 SC 1.4.10 Reflow。320 CSS px を下限にする）。原因の要素を列挙する
 *   2. コンソールエラー・未処理の例外・失敗したリクエスト（画像・フォント・CSP）
 *   3. viewport meta が拡大を禁止している（maximum-scale / user-scalable=no）
 * 警告（失敗にしない）:
 *   4. タップ目標が 24x24 CSS px 未満（WCAG 2.2 SC 2.5.8。文中のリンクは除く）
 *
 * ブラウザ: 既定は Playwright の Chromium。BROWSER=webkit で WebKit（iOS Safari に近い）、
 * CHANNEL=chrome でインストール済みの Chrome を使う。
 * 根拠と全体のチェックリストは docs/qa/PRODUCTION-QA.md。
 */
import { chromium, webkit, firefox } from 'playwright';

const BASE = (process.env.BASE || 'http://localhost:3000').replace(/\/$/, '');
const WIDTHS = (process.env.WIDTHS || '320,360,390,430,768,1024').split(',').map(Number);
const ROUTES = (
  process.env.ROUTES ||
  [
    '', '/about', '/blog', '/cv', '/experiment', '/experiment/podcast-notes',
    '/work/nakahatsu', '/work/figma-plugins', '/work/ukiyoe', '/work/google_ux_design_certificate_project',
  ].join(',')
).split(',');
const LOCALES = ['', '/jp'];
const HEIGHT_FOR = (w) => (w >= 768 ? 1024 : 800);

const engine = { chromium, webkit, firefox }[process.env.BROWSER || 'chromium'];
const browser = await engine.launch(process.env.CHANNEL ? { channel: process.env.CHANNEL } : {});

const failures = [];
const warnings = [];
let runs = 0;

for (const locale of LOCALES) {
  for (const route of ROUTES) {
    const path = `${locale}${route}` || '/';
    for (const w of WIDTHS) {
      const ctx = await browser.newContext({
        viewport: { width: w, height: HEIGHT_FOR(w) },
        deviceScaleFactor: 2,
        isMobile: w < 768,
        hasTouch: w < 1024,
      });
      const page = await ctx.newPage();
      const problems = [];
      // Vercel の解析スクリプトは Vercel 上にしか無い（localhost では 404 / ブロックされる）。サイトの不具合ではないので除く
      const local = new URL(BASE).hostname === 'localhost';
      const vendorOnly = (u) => {
        if (!local) return false;
        const x = new URL(u);
        return x.hostname === 'va.vercel-scripts.com' || x.pathname.startsWith('/_vercel/');
      };
      page.on('console', (m) => {
        if (m.type() !== 'error') return;
        const t = m.text();
        if (t.startsWith('Failed to load resource')) return; // URL が無いので、下の response / requestfailed で拾う
        if (local && t.includes('/_vercel/')) return;
        problems.push(`console: ${t.slice(0, 160)}`);
      });
      page.on('pageerror', (e) => problems.push(`pageerror: ${String(e.message).slice(0, 160)}`));
      page.on('requestfailed', (r) => {
        const err = r.failure()?.errorText ?? '';
        // 動画の再生中断（ERR_ABORTED）は正常
        if (err.includes('ERR_ABORTED') && r.resourceType() === 'media') return;
        if (vendorOnly(r.url())) return;
        problems.push(`requestfailed: ${r.url().slice(0, 120)} ${err}`);
      });
      page.on('response', (r) => {
        if (r.status() >= 400 && !vendorOnly(r.url())) problems.push(`http ${r.status()}: ${r.url().slice(0, 120)}`);
      });

      try {
        const res = await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 60000 });
        if (!res || res.status() >= 400) problems.push(`page status ${res?.status()}`);
        // 遅延読み込みの画像・動画を起こすため、最後までスクロールして戻る
        await page.evaluate(async () => {
          for (let y = 0; y < document.body.scrollHeight; y += 700) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 50));
          }
          window.scrollTo(0, 0);
        });
        await page.waitForTimeout(200);

        const r = await page.evaluate(() => {
          const vw = document.documentElement.clientWidth;
          const sw = document.documentElement.scrollWidth;
          const culprits = [];
          if (sw > vw) {
            const header = document.querySelector('header');
            for (const el of document.querySelectorAll('body *')) {
              if (header && header.contains(el)) continue;
              const cs = getComputedStyle(el);
              if (cs.position === 'fixed') continue;
              const b = el.getBoundingClientRect();
              if (b.width === 0 || b.height === 0) continue;
              if (b.right > vw + 1 || b.left < -1) {
                let clipped = false;
                for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
                  const o = getComputedStyle(p).overflowX;
                  if (['hidden', 'auto', 'scroll', 'clip'].includes(o)) {
                    const pb = p.getBoundingClientRect();
                    if (pb.right <= vw + 1 && pb.left >= -1) { clipped = true; break; }
                  }
                }
                if (!clipped) {
                  culprits.push(`${el.tagName.toLowerCase()}.${String(el.className).split(/\s+/).slice(0, 3).join('.')} (${Math.round(b.left)}→${Math.round(b.right)})`);
                }
              }
            }
          }
          const meta = document.querySelector('meta[name=viewport]')?.getAttribute('content') || '';
          const small = [];
          for (const el of document.querySelectorAll('a[href], button, [role=button], input, select, textarea, summary')) {
            const b = el.getBoundingClientRect();
            if (b.width === 0 || b.height === 0) continue;
            const cs = getComputedStyle(el);
            if (cs.visibility === 'hidden' || cs.display === 'none') continue;
            // 文中のインラインリンクは WCAG 2.5.8 の例外
            if (el.tagName === 'A' && cs.display === 'inline' && el.closest('p, li')) continue;
            if (b.width < 24 || b.height < 24) {
              small.push(`${el.tagName.toLowerCase()} "${(el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 24)}" ${Math.round(b.width)}x${Math.round(b.height)}`);
            }
          }
          // 壊れた画像（読み込み完了なのに幅 0）
          const broken = [...document.images]
            .filter((im) => im.complete && im.naturalWidth === 0 && im.getBoundingClientRect().width > 0)
            .map((im) => (im.currentSrc || im.src).slice(-60));
          // 文字が枠で切れている（overflow が hidden/clip で、中身が枠より高い）。line-clamp は意図的なので除く
          const clipped = [];
          for (const el of document.querySelectorAll('body *')) {
            const cs = getComputedStyle(el);
            if (!['hidden', 'clip'].includes(cs.overflowY)) continue;
            if (cs.webkitLineClamp && cs.webkitLineClamp !== 'none') continue;
            if (el.classList.contains('sr-only')) continue; // 読み上げ専用（意図的に 1px）
            if (el.scrollHeight > el.clientHeight + 2 && el.clientHeight > 0 && (el.textContent || '').trim().length > 0) {
              clipped.push(`${el.tagName.toLowerCase()}.${String(el.className).split(/\s+/).slice(0, 2).join('.')} ${el.clientHeight}<${el.scrollHeight}`);
            }
          }
          return { vw, sw, culprits: culprits.slice(0, 6), meta, small: small.slice(0, 5), nSmall: small.length, broken, clipped: clipped.slice(0, 4), nClipped: clipped.length };
        });

        if (r.sw > r.vw) problems.push(`横スクロール: scrollWidth ${r.sw} > ${r.vw}。原因: ${r.culprits.join(' | ') || '(特定できず)'}`);
        if (/maximum-scale|user-scalable\s*=\s*(no|0)/i.test(r.meta)) problems.push(`viewport meta が拡大を禁止: ${r.meta}`);
        if (r.broken.length) problems.push(`壊れた画像: ${r.broken.join(', ')}`);
        if (r.nClipped) warnings.push(`${path} @${w}: 文字が枠で切れている可能性 ${r.nClipped}件 例: ${r.clipped.join(', ')}`);
        if (r.nSmall) warnings.push(`${path} @${w}: タップ目標 24px 未満 ${r.nSmall}件 例: ${r.small.join(', ')}`);
      } catch (e) {
        problems.push(`検査中の例外: ${String(e.message).slice(0, 160)}`);
      }

      runs++;
      if (problems.length) failures.push({ path, w, problems: [...new Set(problems)] });
      await ctx.close();
    }
  }
}
await browser.close();

console.log(`\n検査 ${runs} 件（${process.env.BROWSER || 'chromium'}、${BASE}）`);
if (warnings.length) {
  console.log(`\n警告 ${warnings.length} 件（失敗にはしない）:`);
  for (const w of [...new Set(warnings)].slice(0, 30)) console.log('  -', w);
}
if (failures.length) {
  console.log(`\n失敗 ${failures.length} 件:`);
  for (const f of failures) {
    console.log(`  ${f.path} @${f.w}px`);
    for (const p of f.problems) console.log(`    - ${p}`);
  }
  process.exit(1);
}
console.log('\n失敗 0 件');
