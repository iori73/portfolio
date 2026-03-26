'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useBodyFont, useHeadingFont } from '@/src/hooks/useFonts';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import FilterBar from '@/components/podcast-notes/FilterBar';
import NoteCard from '@/components/podcast-notes/NoteCard';
import type { PodcastData } from '@/components/podcast-notes/types';
import BackToTopButton from '@/src/compositions/BackToTopButton';

export default function AllEpisodesPage() {
  const t = useTranslations('podcastNotesPage');
  const locale = useLocale();
  const { getBodyFontClass } = useBodyFont();
  const { getHeadingFontClass } = useHeadingFont();

  const [data, setData] = useState<PodcastData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activePodcast, setActivePodcast] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/podcast-notes')
      .then((res) => {
        if (res.ok) return res.json() as Promise<PodcastData>;
        return Promise.reject(new Error(res.status.toString()));
      })
      .then((json: PodcastData) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        fetch('/data/podcast-notes.json')
          .then((r) => r.json())
          .then((json: PodcastData) => {
            setData(json);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      });
  }, []);

  const allTags = useMemo(() => {
    if (!data) return [];
    return Object.entries(data.stats.tagDistribution)
      .sort((a, b) => b[1] - a[1])
      .map(([tag]) => tag);
  }, [data]);

  const allPodcasts = useMemo(() => {
    if (!data) return [];
    return data.podcasts.map((p) => p.name);
  }, [data]);

  const filteredEpisodes = useMemo(() => {
    if (!data) return [];
    let eps = data.episodes;
    if (activeTag) {
      eps = eps.filter((e) => e.category === activeTag || e.tags.includes(activeTag));
    }
    if (activePodcast) {
      eps = eps.filter((e) => e.podcast === activePodcast);
    }
    return eps.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  }, [data, activeTag, activePodcast]);

  const handleTagChange = useCallback((tag: string | null) => {
    setActiveTag(tag);
  }, []);

  const handlePodcastChange = useCallback((podcast: string | null) => {
    setActivePodcast(podcast);
  }, []);

  if (loading) {
    return (
      <div className="font-sans my-24 md:mt-28 md:mb-16 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-ink-tertiary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className={`text-body-lg text-ink-tertiary ${getBodyFontClass()}`}>
            Loading podcast data...
          </p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="font-sans my-24 md:mt-28 md:mb-16 text-center">
        <p className={`text-body-lg text-ink-secondary ${getBodyFontClass()}`}>
          No data available. Run the data pipeline first.
        </p>
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
            <BreadcrumbPage className="text-ink-secondary">
              {t('allEpisodesTitle')}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className={`text-display text-ink mb-2 ${getHeadingFontClass()}`}>
        {t('allEpisodesTitle')}
      </h1>
      <p className={`text-body-lg text-ink-tertiary mb-8 ${getBodyFontClass()}`}>
        {filteredEpisodes.length} {t('episodesShown')}
      </p>

      <div className="flex flex-col md:flex-row gap-8">
        <FilterBar
          clusters={data.clusters}
          allTags={allTags}
          allPodcasts={allPodcasts}
          activeCluster={null}
          activeTag={activeTag}
          activePodcast={activePodcast}
          onClusterChange={() => {}}
          onTagChange={handleTagChange}
          onPodcastChange={handlePodcastChange}
        />

        <div className="flex-1 min-w-0">
          <div className="flex flex-col gap-3">
            {filteredEpisodes.map((ep) => (
              <NoteCard
                key={ep.id}
                episode={ep}
                isHighlighted={false}
                bodyFontClass={getBodyFontClass()}
                headingFontClass={getHeadingFontClass()}
              />
            ))}
          </div>

          {filteredEpisodes.length === 0 && (
            <div className="text-center py-12">
              <p className={`text-body-lg text-ink-tertiary ${getBodyFontClass()}`}>
                {t('noResults')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
