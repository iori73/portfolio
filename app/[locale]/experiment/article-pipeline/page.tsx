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
import ProcessDiagram from '@/components/article-pipeline/ProcessDiagram';
import type { Bi } from '@/src/data/bilingualBooks';
import {
  AP_LEARNINGS,
  AP_LINKS,
  AP_OVERVIEW,
  AP_ROLES,
  AP_STEPS,
  AP_SUBTITLE,
  AP_TAGS,
  AP_TITLE,
} from '@/src/data/articlePipeline';

const UI: Record<string, Bi> = {
  overview: { en: 'Overview', jp: '概要' },
  process: { en: 'How it works', jp: '仕組み' },
  processLead: {
    en: 'Six steps for every article. Each role has written instructions, so the next article starts from the same place.',
    jp: '記事ごとに同じ6つの工程を通す。どの役にも手順書があり、次の記事が同じところから始められる。',
  },
  roles: { en: 'Who decides what', jp: '誰が何を決めるか' },
  ai: { en: 'AI', jp: 'AI' },
  me: { en: 'Me', jp: '私' },
  learnings: { en: 'What I learned', jp: 'わかったこと' },
  read: { en: 'Read the articles', jp: '記事を読む' },
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

export default function ArticlePipelinePage() {
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
            <BreadcrumbPage className="text-ink-secondary">{AP_TITLE[lang]}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Hero */}
      <section className="flex flex-col gap-6 mb-16 md:mb-24">
        <h1 className={`text-headline ${heading}`}>{AP_TITLE[lang]}</h1>
        <p className={`text-body-lg text-ink-secondary ${body}`}>{AP_SUBTITLE[lang]}</p>
        <ul className="flex gap-2 items-start flex-wrap">
          {AP_TAGS.map((tag) => (
            <li
              key={tag}
              className="font-space-grotesk text-label leading-[1.3] px-3 py-1 rounded-lg bg-surface-muted text-ink-tertiary"
            >
              {tag}
            </li>
          ))}
        </ul>
      </section>

      {/* Overview */}
      <section className="py-12 md:py-16 border-t border-line-subtle">
        <h2 className={`text-title-lg mb-6 ${heading}`}>{UI.overview[lang]}</h2>
        <div className="flex flex-col gap-4">
          {AP_OVERVIEW.map((p, i) => (
            <p key={i} className={`text-body-lg ${body}`}>
              {p[lang]}
            </p>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 md:py-16 border-t border-line-subtle">
        <h2 className={`text-title-lg mb-4 ${heading}`}>{UI.process[lang]}</h2>
        <p className={`text-body-lg text-ink-secondary mb-12 ${body}`}>{UI.processLead[lang]}</p>
        <ProcessDiagram steps={AP_STEPS} lang={lang} />
        <ol className="mt-12 md:mt-16 flex flex-col gap-10">
          {AP_STEPS.map((step, i) => (
            <li key={step.icon} className="grid grid-cols-[2.5rem_1fr] gap-x-2">
              <span className="font-space-grotesk text-title-sm text-ink-tertiary">{String(i + 1).padStart(2, '0')}</span>
              <div className="min-w-0">
                <h3 className={`text-title mb-2 ${heading}`}>{step.title[lang]}</h3>
                <p className={`text-body-lg ${body}`}>{step.body[lang]}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Who decides what */}
      <section className="py-12 md:py-16 border-t border-line-subtle">
        <h2 className={`text-title-lg mb-8 ${heading}`}>{UI.roles[lang]}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(['ai', 'me'] as const).map((who) => (
            <div key={who} className="min-w-0 rounded-media bg-surface-muted p-6 md:p-8">
              <h3 className={`text-title mb-4 ${heading}`}>{UI[who][lang]}</h3>
              <ul className={`flex flex-col gap-2 text-body-lg list-disc pl-5 ${body}`}>
                {AP_ROLES[who].map((r) => (
                  <li key={r.en}>{r[lang]}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* What I learned */}
      <section className="py-12 md:py-16 border-t border-line-subtle">
        <h2 className={`text-title-lg mb-8 ${heading}`}>{UI.learnings[lang]}</h2>
        <ul className="flex flex-col gap-10">
          {AP_LEARNINGS.map((l) => (
            <li key={l.title.en} className="min-w-0">
              <h3 className={`text-title mb-2 ${heading}`}>{l.title[lang]}</h3>
              <p className={`text-body-lg ${body}`}>{l.body[lang]}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Read the articles */}
      <section className="py-12 md:py-16 border-t border-line-subtle">
        <h2 className={`text-title-lg mb-6 ${heading}`}>{UI.read[lang]}</h2>
        <div className="flex flex-wrap gap-3">
          {AP_LINKS.map((l) => (
            <ExternalLink key={l.href} href={l.href}>
              {l.label}
            </ExternalLink>
          ))}
        </div>
      </section>
    </div>
  );
}
