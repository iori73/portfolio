'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useBodyFont, useHeadingFont } from '@/src/hooks/useFonts';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Clock } from 'lucide-react';
import { useParams } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import NoteCard from '@/components/podcast-notes/NoteCard';
import BackToTopButton from '@/src/compositions/BackToTopButton';
import type { Episode, Chapter, PodcastData } from '@/components/podcast-notes/types';
import { CATEGORY_COLORS, DEFAULT_CATEGORY_COLOR } from '@/components/podcast-notes/types';

interface EpisodeDetail {
  id: string;
  title: string;
  podcast: string;
  podcastCover: string;
  category: string | null;
  tags: string[];
  date: string;
  url: string;
  durationMinutes: number;
  summary: string;
  keyLearnings: string[];
  chapters: Chapter[];
  hasTranscript: boolean;
}

function formatDuration(minutes: number): string {
  const m = Math.round(minutes);
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  const rem = m % 60;
  return rem > 0 ? `${h}h ${rem}m` : `${h}h`;
}

export default function EpisodeDetailPage() {
  const t = useTranslations('podcastNotesPage');
  const locale = useLocale();
  const params = useParams();
  const episodeId = params.id as string;
  const { getBodyFontClass } = useBodyFont();
  const { getHeadingFontClass } = useHeadingFont();
  const bodyFontClass = getBodyFontClass();
  const headingFontClass = getHeadingFontClass();

  const [detail, setDetail] = useState<EpisodeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedEpisodes, setRelatedEpisodes] = useState<Episode[]>([]);

  // Fetch episode detail from API, fallback to static JSON
  useEffect(() => {
    let cancelled = false;

    async function fetchDetail() {
      // Try API first
      try {
        const res = await fetch(`/api/podcast-notes/${episodeId}`);
        if (res.ok) {
          const data = await res.json();
          if (!cancelled) {
            setDetail(data);
            setLoading(false);
          }
          return;
        }
      } catch {}

      // Fallback to static JSON
      try {
        const res = await fetch('/data/podcast-notes.json');
        const data: PodcastData = await res.json();
        const ep = data.episodes.find((e) => e.id === episodeId);
        if (ep && !cancelled) {
          setDetail({
            ...ep,
            chapters: ep.chapters || [],
            hasTranscript: ep.hasTranscript || false,
          });
        }
      } catch {}

      if (!cancelled) setLoading(false);
    }

    fetchDetail();
    return () => { cancelled = true; };
  }, [episodeId]);

  // Fetch related episodes from static JSON
  useEffect(() => {
    if (!detail) return;

    async function fetchRelated() {
      try {
        const res = await fetch('/data/podcast-notes.json');
        const data: PodcastData = await res.json();
        // Find episodes from same podcast or category, excluding current
        const related = data.episodes
          .filter((e) => e.id !== detail!.id)
          .filter((e) => e.podcast === detail!.podcast || e.category === detail!.category)
          .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
          .slice(0, 3);
        setRelatedEpisodes(related);
      } catch {}
    }

    fetchRelated();
  }, [detail]);

  const color = useMemo(
    () => CATEGORY_COLORS[detail?.category || 'Others'] || DEFAULT_CATEGORY_COLOR,
    [detail?.category]
  );

  if (loading) {
    return (
      <div className="font-sans my-24 md:mt-28 md:mb-16 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-ink-tertiary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className={`text-body-lg text-ink-tertiary ${bodyFontClass}`}>
            {t('loadingEpisode')}
          </p>
        </div>
      </div>
    );
  }

  if (!detail) {
    return (
      <div className="font-sans my-24 md:mt-28 md:mb-16 text-center">
        <p className={`text-body-lg text-ink-secondary mb-4 ${bodyFontClass}`}>
          {t('episodeNotFound')}
        </p>
        <Link
          href={`/${locale}/experiment/podcast-notes/all`}
          className="text-body-sm font-space-grotesk text-ink-tertiary hover:text-ink-secondary transition-colors"
        >
          {t('backToAllEpisodes')}
        </Link>
      </div>
    );
  }

  return (
    <div className="font-sans my-24 md:mt-28 md:mb-16">
      <BackToTopButton />

      {/* Breadcrumb */}
      <Breadcrumb className="mb-8">
        <BreadcrumbList className="text-body font-space-grotesk">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/${locale}/experiment`} className="text-ink-tertiary hover:text-ink-secondary transition-colors">
                {t('breadcrumbExperiment')}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/${locale}/experiment/podcast-notes`} className="text-ink-tertiary hover:text-ink-secondary transition-colors">
                {t('title')}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-ink-secondary line-clamp-1">
              {detail.title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Back link */}
      <Link
        href={`/${locale}/experiment/podcast-notes/all`}
        className="inline-flex items-center gap-1.5 text-body-sm font-space-grotesk text-ink-tertiary hover:text-ink-secondary transition-colors mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        {t('backToAllEpisodes')}
      </Link>

      {/* Hero section */}
      <div className="flex items-start gap-4 md:gap-6 mb-6">
        {detail.podcastCover ? (
          <img
            src={detail.podcastCover}
            alt={detail.podcast}
            className="w-20 h-20 md:w-[120px] md:h-[120px] rounded-md object-cover shrink-0"
          />
        ) : (
          <div
            className="w-20 h-20 md:w-[120px] md:h-[120px] rounded-md shrink-0 flex items-center justify-center"
            style={{ backgroundColor: color + '20' }}
          >
            <span className="text-title-lg" style={{ color }}>
              {detail.podcast.charAt(0)}
            </span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h1 className={`text-title-lg md:text-headline text-ink mb-2 ${headingFontClass}`}>
            {detail.title}
          </h1>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-space-grotesk text-body-sm text-ink-tertiary">
              {detail.podcast}
            </span>
            {detail.date && (
              <>
                <span className="text-ink-tertiary">·</span>
                <span className="font-space-grotesk text-body-sm text-ink-tertiary">
                  {detail.date}
                </span>
              </>
            )}
            {detail.durationMinutes > 0 && (
              <>
                <span className="text-ink-tertiary">·</span>
                <span className="inline-flex items-center gap-1 font-space-grotesk text-body-sm text-ink-tertiary">
                  <Clock className="w-3.5 h-3.5" />
                  {formatDuration(detail.durationMinutes)}
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-3 mt-3 flex-wrap">
            {detail.category && (
              <span
                className="font-space-grotesk text-label px-3 py-1 rounded-lg"
                style={{ backgroundColor: color + '15', color }}
              >
                {detail.category}
              </span>
            )}
            {detail.url && (
              <a
                href={detail.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-body-sm font-space-grotesk text-ink-tertiary hover:text-ink-secondary transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Listen on Spotify
              </a>
            )}
          </div>
        </div>
      </div>

      <hr className="border-line-section mb-8" />

      {/* Summary */}
      {detail.summary && (
        <section className="mb-8">
          <h2 className={`text-title-lg text-ink mb-4 ${headingFontClass}`}>
            {t('summarySection')}
          </h2>
          <p className={`text-body-lg text-ink-secondary leading-relaxed ${bodyFontClass}`}>
            {detail.summary}
          </p>
        </section>
      )}

      {/* Key Points */}
      {detail.keyLearnings.length > 0 && (
        <section className="mb-8">
          <h2 className={`text-title-lg text-ink mb-4 ${headingFontClass}`}>
            {t('keyPointsSection')}
          </h2>
          <ul className="space-y-3">
            {detail.keyLearnings.map((point, i) => (
              <li
                key={i}
                className={`text-body-lg text-ink-secondary pl-5 relative ${bodyFontClass}`}
              >
                <span
                  className="absolute left-0 top-[10px] w-2 h-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
                {point}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Chapters */}
      {detail.chapters.length > 0 && (
        <section className="mb-8">
          <h2 className={`text-title-lg text-ink mb-4 ${headingFontClass}`}>
            {t('chaptersSection')}
          </h2>
          <div className="space-y-0">
            {detail.chapters.map((chapter, i) => (
              <div
                key={i}
                className={`flex items-baseline gap-4 py-3 ${
                  i < detail.chapters.length - 1 ? 'border-b border-line-subtle' : ''
                }`}
              >
                <span className="font-space-grotesk text-body-sm text-ink-tertiary shrink-0 w-14 tabular-nums">
                  {chapter.timestamp}
                </span>
                <span className={`text-body text-ink-secondary ${bodyFontClass}`}>
                  {chapter.title}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Episodes */}
      {relatedEpisodes.length > 0 && (
        <section className="mt-12">
          <hr className="border-line-section mb-8" />
          <h2 className={`text-title-lg text-ink mb-6 ${headingFontClass}`}>
            {t('relatedEpisodesSection')}
          </h2>
          <div className="flex flex-col gap-3">
            {relatedEpisodes.map((ep) => (
              <NoteCard
                key={ep.id}
                episode={ep}
                isHighlighted={false}
                bodyFontClass={bodyFontClass}
                headingFontClass={headingFontClass}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
