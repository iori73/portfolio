#!/usr/bin/env node
/**
 * Render the print route to PDF with headless Chromium.
 *
 *   pnpm generate:pdf                  # every document, both locales
 *   pnpm generate:pdf -- --locale jp
 *   pnpm generate:pdf -- --doc resume
 *   pnpm generate:pdf -- --offline-fonts
 *
 * The script owns its server. "Assume one is already running" is the main cause
 * of a pipeline that worked yesterday and emits blank pages today.
 *
 * It refuses to ship a silently-degraded PDF: fonts, page overflow, real page
 * count, image resolution and client-name leakage are all asserted.
 */

import { spawn } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'public', 'downloads');

/**
 * Names that must never reach a document we email to strangers. The site and
 * cvData use industry labels instead; this is the cheap last line of defence.
 */
const CLIENT_DENYLIST = [
  'パナソニック', 'Panasonic',
  '花王', 'KANEBO', 'Kanebo', 'LUNASOL', 'SENSAI', 'TWANY', 'ALBLANC',
  'JPデジタル', 'JP Digital',
  'ネクストステージ', 'NEXT STAGE', 'NextStage', 'ACRO5',
  'yumemi.co.jp', 'eNPS',
];

const A4 = { width: 794, height: 1123 }; // CSS px at 96dpi

/**
 * The documents this script emits. `portfolio` is the deck sent when someone
 * asks for work samples; `resume` is the sheet attached to an application.
 * They share cvData but not a layout, so they are separate print routes.
 */
const DOCS = [
  { slug: 'portfolio', file: 'Portfolio' },
  { slug: 'resume', file: 'Resume' },
];

function parseArgs(argv) {
  const args = { locale: 'all', doc: 'all', port: 3210, dev: false, offlineFonts: false, keepServer: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--locale') args.locale = argv[++i];
    else if (a === '--doc') args.doc = argv[++i];
    else if (a === '--port') args.port = Number(argv[++i]);
    else if (a === '--dev') args.dev = true;
    else if (a === '--offline-fonts') args.offlineFonts = true;
    else if (a === '--keep-server') args.keepServer = true;
  }
  return args;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function probe(url, timeoutMs = 1500) {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), timeoutMs);
    const res = await fetch(url, { signal: ctrl.signal });
    clearTimeout(timer);
    return res.status;
  } catch {
    return 0;
  }
}

/** Reuse a live server if one answers, otherwise spawn one we control. */
async function ensureServer({ port, dev }) {
  const base = `http://127.0.0.1:${port}`; // not "localhost" — IPv6 resolution is flaky
  const probeUrl = `${base}/print/en/portfolio`;

  if ((await probe(probeUrl)) === 200) {
    console.log(`▸ reusing existing server on :${port}`);
    return { base, stop: async () => {} };
  }

  if (!dev && !existsSync(path.join(ROOT, '.next', 'BUILD_ID'))) {
    throw new Error('No production build found. Run `pnpm build` first, or pass --dev.');
  }

  console.log(`▸ starting ${dev ? 'next dev' : 'next start'} on :${port}`);
  const child = spawn('pnpm', ['exec', 'next', dev ? 'dev' : 'start', '-p', String(port)], {
    cwd: ROOT,
    env: { ...process.env, ENABLE_PRINT_ROUTES: '1' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  child.stderr.on('data', (d) => process.stderr.write(`  [server] ${d}`));

  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline) {
    if ((await probe(probeUrl)) === 200) {
      return {
        base,
        stop: async () => {
          child.kill('SIGTERM');
          await sleep(300);
        },
      };
    }
    if (child.exitCode !== null) throw new Error(`server exited with code ${child.exitCode}`);
    await sleep(500);
  }
  child.kill('SIGTERM');
  throw new Error('server did not become ready within 60s');
}

/** Count real pages in the emitted PDF without adding a dependency. */
function countPdfPages(buf) {
  const matches = buf.toString('latin1').match(/\/Type\s*\/Page[^s]/g);
  return matches ? matches.length : 0;
}

async function renderDoc({ browser, base, locale, doc, offlineFonts }) {
  const url = `${base}/print/${locale}/${doc.slug}`;
  const outPath = path.join(OUT_DIR, `Iori-Kawano-${doc.file}-${locale.toUpperCase()}.pdf`);
  const problems = [];

  const context = await browser.newContext({ viewport: A4, deviceScaleFactor: 2 });
  const page = await context.newPage();

  if (offlineFonts) {
    await page.route(/fonts\.g(oogleapis|static)\.com/, (r) => r.abort());
  }

  // Emulate print BEFORE measuring, so what we assert is what gets rendered.
  await page.emulateMedia({ media: 'print' });
  await page.goto(url, { waitUntil: 'networkidle' });

  // Wait for fonts and images; a decode failure is a hard error, not a warning.
  const decodeErrors = await page.evaluate(async () => {
    await document.fonts.ready;
    const errs = [];
    await Promise.all(
      [...document.images].map((img) =>
        img.decode().catch(() => errs.push(img.currentSrc || img.src)),
      ),
    );
    return errs;
  });
  if (decodeErrors.length) problems.push(`images failed to decode:\n    ${decodeErrors.join('\n    ')}`);

  // Fallback glyphs are invisible in a diff but obvious to a hiring manager.
  // Check the fonts the document ACTUALLY uses: sample representative elements,
  // read their computed font, and confirm that exact face is loaded. Checking a
  // hardcoded list would false-positive on the JP font in the EN document, where
  // it is legitimately unused.
  const fontReport = await page.evaluate(() => {
    const samples = [
      ['heading', 'h1, h2'],
      ['body', '.pdf-doc p'],
      ['grotesk', '.pdf-page__footer'],
    ];
    return samples.map(([name, sel]) => {
      const el = document.querySelector(sel);
      if (!el) return { name, sel, missing: true };
      const cs = getComputedStyle(el);
      const family = cs.fontFamily.split(',')[0].trim();
      const spec = `${cs.fontWeight} ${cs.fontSize} ${family}`;
      let ok = false;
      try {
        ok = document.fonts.check(spec);
      } catch (e) {
        return { name, sel, spec, error: String(e) };
      }
      return { name, sel, spec, ok };
    });
  });
  for (const f of fontReport) {
    if (f.missing) problems.push(`font sample element not found: ${f.name} (${f.sel})`);
    else if (f.error) problems.push(`font check failed for ${f.name}: ${f.spec} → ${f.error}`);
    else if (!f.ok) problems.push(`font not loaded for ${f.name}: computed as ${f.spec}`);
  }

  // Fixed pages must not overflow — this is what makes baked footer numbers safe.
  const overflow = await page.$$eval('.pdf-page:not(.pdf-flow)', (els) =>
    els
      .filter((el) => el.scrollHeight > el.clientHeight + 1)
      .map((el) => ({ page: el.dataset.page, overBy: el.scrollHeight - el.clientHeight })),
  );
  for (const o of overflow) problems.push(`page ${o.page} overflows by ${o.overBy}px`);

  // Recruiters read on screen, so target 2x the placed width rather than 300dpi.
  const weakImages = await page.$$eval('img', (els) =>
    els
      .map((el) => ({
        src: (el.currentSrc || el.src).split('/').pop(),
        natural: el.naturalWidth,
        placed: Math.round(el.getBoundingClientRect().width),
      }))
      .filter((i) => i.placed > 0 && i.natural / i.placed < 2),
  );

  const text = await page.evaluate(() => document.body.innerText);
  const leaks = CLIENT_DENYLIST.filter((n) => text.includes(n));
  if (leaks.length) problems.push(`CONFIDENTIAL NAME IN OUTPUT: ${leaks.join(', ')}`);

  const declaredPages = await page.$$eval('.pdf-page', (els) => els.length);

  await mkdir(OUT_DIR, { recursive: true });
  const pdfOpts = {
    path: outPath,
    printBackground: true,
    preferCSSPageSize: true, // honour @page { size: A4; margin: 0 }
    displayHeaderFooter: false,
    scale: 1,
  };
  try {
    await page.pdf({ ...pdfOpts, tagged: true, outline: true });
  } catch {
    // tagged/outline need Playwright >= 1.42
    await page.pdf(pdfOpts);
  }

  const buf = await readFile(outPath);
  const realPages = countPdfPages(buf);
  if (realPages !== declaredPages) {
    problems.push(
      `page count mismatch: PDF has ${realPages}, document declares ${declaredPages} — footer numbers are wrong`,
    );
  }

  await context.close();

  return {
    locale,
    doc: doc.slug,
    outPath,
    realPages,
    declaredPages,
    sizeMB: (buf.length / 1024 / 1024).toFixed(2),
    problems,
    weakImages,
  };
}

/**
 * Prefer Playwright's pinned Chromium (reproducible). Fall back to the locally
 * installed Google Chrome so a missing browser download doesn't block the build.
 * PDF_CHANNEL=chrome forces the fallback.
 */
async function launchBrowser() {
  if (process.env.PDF_CHANNEL) {
    console.log(`▸ launching channel: ${process.env.PDF_CHANNEL}`);
    return chromium.launch({ channel: process.env.PDF_CHANNEL });
  }
  try {
    return await chromium.launch();
  } catch (err) {
    if (!/Executable doesn't exist/.test(String(err))) throw err;
    console.log("▸ bundled Chromium missing — falling back to installed Chrome");
    console.log('  (run `pnpm exec playwright install chromium` for a pinned, reproducible build)');
    return chromium.launch({ channel: 'chrome' });
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const locales = args.locale === 'all' ? ['en', 'jp'] : [args.locale];
  const docs = args.doc === 'all' ? DOCS : DOCS.filter((d) => d.slug === args.doc);
  if (!docs.length) throw new Error(`unknown --doc: ${args.doc}`);

  const server = await ensureServer(args);
  const results = [];
  let browser;

  try {
    // Launch inside the try so a failure here still stops the server we spawned.
    browser = await launchBrowser();
    for (const doc of docs) {
      for (const locale of locales) {
        console.log(`▸ rendering ${doc.slug} / ${locale}`);
        results.push(
          await renderDoc({ browser, base: server.base, locale, doc, offlineFonts: args.offlineFonts }),
        );
      }
    }
  } finally {
    if (browser) await browser.close();
    if (!args.keepServer) await server.stop();
  }

  let failed = false;
  for (const r of results) {
    console.log(`\n${r.doc} ${r.locale.toUpperCase()} → ${path.relative(ROOT, r.outPath)}`);
    console.log(`  ${r.realPages} pages · ${r.sizeMB} MB`);

    if (r.weakImages.length) {
      console.log('  ⚠ below 2x placed width (soft on screen):');
      for (const i of r.weakImages) console.log(`     ${i.src} — ${i.natural}px natural vs ${i.placed}px placed`);
    }
    if (r.problems.length) {
      failed = true;
      console.log('  ✗ problems:');
      for (const p of r.problems) console.log(`     ${p}`);
    } else {
      console.log('  ✓ fonts, pagination, page count and anonymisation all check out');
    }
  }

  if (failed) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
