'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useBodyFont, useHeadingFont } from '@/src/hooks/useFonts';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

import KnowledgeConstellation from '@/components/podcast-notes/KnowledgeConstellation';
import InsightsSection from '@/components/podcast-notes/InsightsSection';
import FilterBar from '@/components/podcast-notes/FilterBar';
import NoteCard from '@/components/podcast-notes/NoteCard';
import PipelineSection from '@/components/podcast-notes/PipelineSection';
import type { PodcastData } from '@/components/podcast-notes/types';

const INITIAL_DISPLAY_COUNT = 8;

export default function PodcastNotesPage() {
  const t = useTranslations('podcastNotesPage');
  const locale = useLocale();
  const { getBodyFontClass } = useBodyFont();
  const { getHeadingFontClass } = useHeadingFont();

  const [data, setData] = useState<PodcastData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeCluster, setActiveCluster] = useState<number | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activePodcast, setActivePodcast] = useState<string | null>(null);
  const [hoveredEpisode, setHoveredEpisode] = useState<string | null>(null);
  const [highlightedEpisode, setHighlightedEpisode] = useState<string | null>(null);

  useEffect(() => {
    // API（Notion 直参照）を優先し、未設定・エラー時は static JSON にフォールバック
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

    if (activeCluster !== null) {
      eps = eps.filter((e) => e.cluster === activeCluster);
    }
    if (activeTag) {
      eps = eps.filter((e) => e.category === activeTag || e.tags.includes(activeTag));
    }
    if (activePodcast) {
      eps = eps.filter((e) => e.podcast === activePodcast);
    }

    return eps.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  }, [data, activeCluster, activeTag, activePodcast]);

  const handleEpisodeClick = useCallback((episodeId: string) => {
    setHighlightedEpisode(episodeId);
    requestAnimationFrame(() => {
      const el = document.getElementById(`note-${episodeId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }, []);

  const handleClusterClick = useCallback((clusterId: number | null) => {
    setActiveCluster(clusterId);
    setActiveTag(null);
    setActivePodcast(null);
  }, []);

  const handleTagChange = useCallback((tag: string | null) => {
    setActiveTag(tag);
    setActiveCluster(null);
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
        <code className="font-space-grotesk text-body text-ink-tertiary mt-2 block">
          node scripts/generate-podcast-data.js
        </code>
      </div>
    );
  }

  return (
    <div className="font-sans my-24 md:mt-28 md:mb-16">
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
            <BreadcrumbPage className="text-ink-secondary">
              {t('title')}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* ─── Section 1: Knowledge Constellation (Hero) ─── */}
      <section className="relative -mx-6 md:mx-0 mb-16 md:mb-24 rounded-none md:rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a2e 50%, #16213e 100%)',
        }}
      >
        <div className="px-6 pt-8 md:pt-12">
          <h1 className={`text-display text-white mb-2 ${getHeadingFontClass()}`}>
            {t('title')}
          </h1>
          <p className={`text-body-lg text-white/60 max-w-2xl mb-6 ${getBodyFontClass()}`}>
            {t('subtitle')}
          </p>
        </div>

        <div className="h-[400px] md:h-[600px]">
          <KnowledgeConstellation
            episodes={data.episodes}
            clusters={data.clusters}
            activeCluster={activeCluster}
            activeTag={activeTag}
            hoveredEpisode={hoveredEpisode}
            onClusterClick={handleClusterClick}
            onTagChange={handleTagChange}
            onEpisodeHover={setHoveredEpisode}
            onEpisodeClick={handleEpisodeClick}
          />
        </div>
      </section>

      {/* ─── Section 2: Insights ─── */}
      <InsightsSection
        stats={data.stats}
        podcasts={data.podcasts}
        bodyFontClass={getBodyFontClass()}
        headingFontClass={getHeadingFontClass()}
      />

      {/* ─── Section 3: Browse Notes ─── */}
      <section id="podcast-notes-browse" className="py-8 scroll-mt-24 md:scroll-mt-28">
        <h3 className={`text-title-lg mb-1 ${getHeadingFontClass()}`}>
          {t('browseNotes')}
        </h3>
        <p className={`text-body-lg text-ink-tertiary mb-6 ${getBodyFontClass()}`}>
          {filteredEpisodes.length} {t('episodesShown')}
        </p>

        {/* two-column layout: sidebar (desktop) + card list */}
        <div className="flex flex-col md:flex-row gap-8">
          <FilterBar
            clusters={data.clusters}
            allTags={allTags}
            allPodcasts={allPodcasts}
            activeCluster={activeCluster}
            activeTag={activeTag}
            activePodcast={activePodcast}
            onClusterChange={handleClusterClick}
            onTagChange={handleTagChange}
            onPodcastChange={handlePodcastChange}
          />

          <div className="flex-1 min-w-0 space-y-3">
            {filteredEpisodes.slice(0, INITIAL_DISPLAY_COUNT).map((ep) => (
              <NoteCard
                key={ep.id}
                episode={ep}
                isHighlighted={highlightedEpisode === ep.id}
                bodyFontClass={getBodyFontClass()}
                headingFontClass={getHeadingFontClass()}
              />
            ))}

            {filteredEpisodes.length > INITIAL_DISPLAY_COUNT && (
              <Link
                href={`/${locale}/experiment/podcast-notes/all`}
                className={`w-full py-3 rounded-xl border border-line-subtle hover:border-line-section text-body-lg text-ink-tertiary hover:text-ink-secondary transition-colors flex items-center justify-center gap-1.5 ${getBodyFontClass()}`}
              >
                {t('showAll', { count: filteredEpisodes.length })}
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
            )}

            {filteredEpisodes.length === 0 && (
              <div className="text-center py-12">
                <p className={`text-body-lg text-ink-tertiary ${getBodyFontClass()}`}>
                  {t('noResults')}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── Section 4: Pipeline ─── */}
      <PipelineSection
        bodyFontClass={getBodyFontClass()}
        headingFontClass={getHeadingFontClass()}
      />
    </div>
  );
}
