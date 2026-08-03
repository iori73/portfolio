// A4 page primitive with an in-DOM running footer.
//
// Chromium does NOT support @page margin boxes (@top-center etc.) or
// counter(page) in generated content, and page.pdf()'s footerTemplate renders
// in an isolated document with no access to our CSS or fonts. So the footer is
// baked into the DOM and page numbers are passed in.
//
// That is only correct if no page auto-splits — scripts/generate-portfolio-pdf.mjs
// asserts (real PDF page count === number of .pdf-page elements) to catch it.
//
// Layout rule for children: use block + margin, not flex, for anything that can
// span a page break. Chromium frequently ignores `break-inside: avoid` on flex
// items, and `gap` does not collapse at a break — it leaves stray whitespace at
// the top of the next page.

import type { ReactNode } from 'react';

export type PdfPageProps = {
  /** 1-based page number shown in the footer. */
  n: number;
  /** Total pages in the document. */
  total: number;
  lang: 'en' | 'jp';
  /** Short left-hand label, e.g. the section name. */
  kicker?: string;
  /** Let the page grow past one sheet instead of clipping (résumé). */
  flow?: boolean;
  /** Anchor target so the contents page can link here. */
  id?: string;
  /** Document name in the running footer. Defaults to the portfolio deck. */
  docName?: string;
  children: ReactNode;
};

export function PdfPage({ n, total, lang, kicker, flow, id, docName, children }: PdfPageProps) {
  return (
    <section id={id} data-page={n} className={`pdf-page${flow ? ' pdf-flow' : ''}`}>
      {children}
      <div className="pdf-page__footer font-space-grotesk">
        <span>{kicker ?? ''}</span>
        <span>Iori Kawano — {docName ?? (lang === 'jp' ? 'ポートフォリオ' : 'Portfolio')}</span>
        <span>
          {n} / {total}
        </span>
      </div>
    </section>
  );
}

export default PdfPage;
