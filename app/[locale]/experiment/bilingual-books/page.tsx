'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { MoveUpRight } from 'lucide-react';
import { useBodyFont, useHeadingFont } from '@/src/hooks/useFonts';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import ProcessDiagram from '@/components/bilingual-books/ProcessDiagram';
import {
  BB_IMG,
  BB_LISTEN,
  BB_OVERVIEW,
  BB_SEASONS,
  BB_STEPS,
  BB_SUBTITLE,
  BB_TAGS,
  BB_TITLE,
  type Bi,
} from '@/src/data/bilingualBooks';

const UI: Record<string, Bi> = {
  overview: { en: 'Overview', jp: '概要' },
  process: { en: 'How it is made', jp: '作り方' },
  processLead: {
    en: 'Five steps, repeated for every book. Each one is written down so the next season starts from the same place.',
    jp: '本ごとに同じ5つの工程をくり返す。どの工程も手順を書き残し、次のシーズンが同じところから始められるようにした。',
  },
  seasons: { en: 'Seasons', jp: 'シーズン' },
  episodes: { en: 'Episodes', jp: '話数' },
  original: { en: 'Original', jp: '原著' },
  status: { en: 'Status', jp: '状態' },
  listen: { en: 'Listen and read', jp: '聴く・読む' },
  readerLinks: { en: 'Reading sites (Japanese and English side by side, with read-aloud)', jp: '読書サイト（日英交互の表示と読み上げ）' },
};

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-pill border border-line-section text-body text-ink hover:bg-surface-muted transition-colors"
    >
      {children}
      <MoveUpRight className="size-4 shrink-0 text-ink-tertiary" aria-hidden />
    </a>
  );
}

export default function BilingualBooksPage() {
  const locale = useLocale();
  const lang: keyof Bi = locale === 'jp' ? 'jp' : 'en';
  const { getBodyFontClass } = useBodyFont();
  const { getHeadingFontClass } = useHeadingFont();
  const body = getBodyFontClass();
  const heading = getHeadingFontClass();

  return (
    <div className="font-sans my-24 md:mt-28 md:mb-16">
      <Breadcrumb className="mb-8">
        <BreadcrumbList className="text-body font-space-grotesk">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/${locale}/experiment`} className="text-ink-tertiary hover:text-ink-secondary transition-colors">
                Experiment
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-ink-secondary">{BB_TITLE[lang]}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 md:mb-24">
        <div className="lg:col-span-5">
          <img
            src={`${BB_IMG}/show-cover.webp`}
            alt={lang === 'jp' ? 'Bilingual Books の番組カバー' : 'Bilingual Books show cover'}
            width={1200}
            height={1200}
            className="w-full max-w-[240px] md:max-w-md mx-auto rounded-media border border-line-subtle"
          />
        </div>
        <div className="lg:col-span-7 flex flex-col gap-6">
          <h1 className={`text-headline ${heading}`}>{BB_TITLE[lang]}</h1>
          <p className={`text-body-lg text-ink-secondary ${body}`}>{BB_SUBTITLE[lang]}</p>
          <ul className="flex gap-2 items-start flex-wrap">
            {BB_TAGS.map((tag) => (
              <li
                key={tag}
                className="font-space-grotesk text-label leading-[1.3] px-3 py-1 rounded-lg bg-surface-muted text-ink-tertiary"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Overview */}
      <section className="py-12 md:py-16 border-t border-line-subtle">
        <h2 className={`text-title-lg mb-6 ${heading}`}>{UI.overview[lang]}</h2>
        <div className="max-w-3xl flex flex-col gap-4">
          {BB_OVERVIEW.map((p, i) => (
            <p key={i} className={`text-body-lg ${body}`}>
              {p[lang]}
            </p>
          ))}
        </div>
      </section>

      {/* How it is made */}
      <section className="py-12 md:py-16 border-t border-line-subtle">
        <h2 className={`text-title-lg mb-4 ${heading}`}>{UI.process[lang]}</h2>
        <p className={`text-body-lg text-ink-secondary mb-12 max-w-3xl ${body}`}>{UI.processLead[lang]}</p>
        <ProcessDiagram steps={BB_STEPS} lang={lang} />
        <ol className="mt-12 md:mt-16 flex flex-col gap-10 max-w-3xl">
          {BB_STEPS.map((step, i) => (
            <li key={step.icon} className="grid grid-cols-[2.5rem_1fr] gap-x-2">
              <span className="font-space-grotesk text-title-sm text-ink-tertiary">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className={`text-title mb-2 ${heading}`}>{step.title[lang]}</h3>
                <p className={`text-body-lg ${body}`}>{step.body[lang]}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Seasons */}
      <section className="py-12 md:py-16 border-t border-line-subtle">
        <h2 className={`text-title-lg mb-8 ${heading}`}>{UI.seasons[lang]}</h2>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BB_SEASONS.map((s) => (
            <li key={s.season} className="grid grid-cols-[96px_1fr] gap-x-4 gap-y-3 md:flex md:flex-col md:gap-4">
              <img
                src={s.cover}
                alt={lang === 'jp' ? `${s.title.jp} 第1話のカバー` : `${s.title.en}, episode 1 cover`}
                width={600}
                height={600}
                loading="lazy"
                className="row-span-2 w-full aspect-square object-cover rounded-media"
              />
              <div>
                <span className="font-space-grotesk text-label text-ink-tertiary">{s.season}</span>
                <h3 className={`text-title-sm ${heading}`}>{s.title[lang]}</h3>
                <p className={`text-body text-ink-secondary ${body}`}>{s.author[lang]}</p>
              </div>
              <dl className={`grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-body-sm ${body}`}>
                <dt className="text-ink-tertiary">{UI.original[lang]}</dt>
                <dd>{s.original[lang]}</dd>
                <dt className="text-ink-tertiary">{UI.episodes[lang]}</dt>
                <dd>{s.episodes[lang]}</dd>
                <dt className="text-ink-tertiary">{UI.status[lang]}</dt>
                <dd>{s.status[lang]}</dd>
              </dl>
            </li>
          ))}
        </ul>
      </section>

      {/* Listen and read */}
      <section className="py-12 md:py-16 border-t border-line-subtle">
        <h2 className={`text-title-lg mb-6 ${heading}`}>{UI.listen[lang]}</h2>
        <div className="flex flex-wrap gap-3">
          {BB_LISTEN.map((l) => (
            <ExternalLink key={l.href} href={l.href}>
              {l.note ? `${l.label} (${l.note[lang]})` : l.label}
            </ExternalLink>
          ))}
        </div>
        <p className={`mt-8 mb-3 text-body text-ink-tertiary ${body}`}>{UI.readerLinks[lang]}</p>
        <div className="flex flex-wrap gap-3">
          {BB_SEASONS.filter((s) => s.reader).map((s) => (
            <ExternalLink key={s.season} href={s.reader!}>
              {s.title[lang]}
            </ExternalLink>
          ))}
        </div>
      </section>
    </div>
  );
}
