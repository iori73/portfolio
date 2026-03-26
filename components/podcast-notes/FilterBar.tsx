'use client';

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Cluster, CATEGORY_COLORS, DEFAULT_CATEGORY_COLOR } from './types';

interface Props {
  clusters: Cluster[];
  allTags: string[];
  allPodcasts: string[];
  activeCluster: number | null;
  activeTag: string | null;
  activePodcast: string | null;
  onClusterChange: (id: number | null) => void;
  onTagChange: (tag: string | null) => void;
  onPodcastChange: (podcast: string | null) => void;
}

export default function FilterBar({
  allTags,
  allPodcasts,
  activeTag,
  activePodcast,
  onClusterChange,
  onTagChange,
  onPodcastChange,
}: Props) {
  const isAllActive = activeTag === null;

  return (
    <>
      {/* ── Desktop sidebar ── */}
      <div className="hidden md:flex flex-col gap-1 w-[180px] shrink-0 sticky top-[calc(var(--site-header-height)+2rem)] self-start">
        <p className="text-label text-ink-tertiary font-space-grotesk px-2 mb-1">Filter</p>

        {/* All */}
        <button
          onClick={() => { onTagChange(null); onClusterChange(null); }}
          className={`flex items-center gap-2 w-full px-2 py-1.5 rounded-lg text-body font-space-grotesk transition-colors ${
            isAllActive
              ? 'bg-surface-muted font-medium text-ink'
              : 'text-ink-tertiary hover:text-ink-secondary hover:bg-surface-muted'
          }`}
        >
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: isAllActive ? '#0A0A0A' : '#B2BEC3' }}
          />
          All
        </button>

        {/* Category tags */}
        {allTags.map((tag) => {
          const color = CATEGORY_COLORS[tag] || DEFAULT_CATEGORY_COLOR;
          const isActive = activeTag === tag;
          return (
            <button
              key={tag}
              onClick={() => onTagChange(isActive ? null : tag)}
              className={`flex items-center gap-2 w-full px-2 py-1.5 rounded-lg text-body font-space-grotesk transition-colors ${
                isActive
                  ? 'bg-surface-muted font-medium text-ink'
                  : 'text-ink-tertiary hover:text-ink-secondary hover:bg-surface-muted'
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: color }}
              />
              {tag}
            </button>
          );
        })}

        {/* Podcast select */}
        <p className="text-label text-ink-tertiary font-space-grotesk px-2 mt-4 mb-1">Podcast</p>
        <Select value={activePodcast || '__all__'} onValueChange={(v) => onPodcastChange(v === '__all__' ? null : v)}>
          <SelectTrigger className="w-full h-auto px-2 py-1.5 rounded-lg text-body font-space-grotesk bg-surface-muted text-ink-secondary border-none shadow-none focus:ring-0 focus:ring-offset-0">
            <SelectValue placeholder="All Podcasts" />
          </SelectTrigger>
          <SelectContent className="font-space-grotesk text-body border-line-subtle bg-surface shadow-sm">
            <SelectItem value="__all__" className="text-ink-secondary focus:bg-surface-muted focus:text-ink">All Podcasts</SelectItem>
            {allPodcasts.map((pod) => (
              <SelectItem key={pod} value={pod} className="text-ink-secondary focus:bg-surface-muted focus:text-ink">
                {pod}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

      </div>

      {/* ── Mobile horizontal bar ── */}
      <div className="md:hidden sticky top-[var(--site-header-height)] z-20 bg-surface border-b border-line-subtle py-3 -mx-6 px-6">
        <div className="flex items-center gap-2 mb-2">
          <div className="overflow-x-auto whitespace-nowrap flex gap-1.5 flex-1">
            <button
              onClick={() => { onTagChange(null); onClusterChange(null); }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-body font-space-grotesk transition-colors shrink-0 ${
                isAllActive
                  ? 'bg-ink text-white'
                  : 'bg-surface-muted text-ink-tertiary hover:text-ink-secondary'
              }`}
            >
              All
            </button>
            {allTags.map((tag) => {
              const color = CATEGORY_COLORS[tag] || DEFAULT_CATEGORY_COLOR;
              const isActive = activeTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => onTagChange(isActive ? null : tag)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-body font-space-grotesk transition-colors shrink-0 ${
                    isActive
                      ? 'text-white'
                      : 'bg-surface-muted text-ink-tertiary hover:text-ink-secondary'
                  }`}
                  style={isActive ? { backgroundColor: color } : undefined}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: isActive ? 'rgba(255,255,255,0.7)' : color }}
                  />
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
        <Select value={activePodcast || '__all__'} onValueChange={(v) => onPodcastChange(v === '__all__' ? null : v)}>
          <SelectTrigger className="h-auto px-3 py-1.5 rounded-lg text-body font-space-grotesk bg-surface-muted text-ink-secondary border-none shadow-none focus:ring-0 focus:ring-offset-0 max-w-[200px]">
            <SelectValue placeholder="All Podcasts" />
          </SelectTrigger>
          <SelectContent className="font-space-grotesk text-body border-line-subtle bg-surface shadow-sm">
            <SelectItem value="__all__" className="text-ink-secondary focus:bg-surface-muted focus:text-ink">All Podcasts</SelectItem>
            {allPodcasts.map((pod) => (
              <SelectItem key={pod} value={pod} className="text-ink-secondary focus:bg-surface-muted focus:text-ink">
                {pod}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
