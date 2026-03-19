'use client';

import React from 'react';
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
  clusters,
  allTags,
  allPodcasts,
  activeCluster,
  activeTag,
  activePodcast,
  onClusterChange,
  onTagChange,
  onPodcastChange,
}: Props) {
  return (
    <div className="sticky top-20 z-20 bg-surface/80 backdrop-blur-md py-4 border-b border-line-subtle -mx-6 px-6">
      <div className="flex flex-wrap gap-2 items-center">
        {/* Category/Tag filter */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => {
              onTagChange(null);
              onClusterChange(null);
            }}
            className={`px-3 py-1.5 rounded-lg text-label font-space-grotesk transition-colors ${
              activeTag === null && activeCluster === null
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
                className={`px-3 py-1.5 rounded-lg text-label font-space-grotesk transition-colors ${
                  isActive
                    ? 'text-white'
                    : 'bg-surface-muted text-ink-tertiary hover:text-ink-secondary'
                }`}
                style={isActive ? { backgroundColor: color } : undefined}
              >
                {tag}
              </button>
            );
          })}
        </div>

        {/* Podcast filter (dropdown on mobile, inline on desktop) */}
        <div className="ml-auto">
          <select
            value={activePodcast || ''}
            onChange={(e) => onPodcastChange(e.target.value || null)}
            className="px-3 py-2 rounded-lg text-label font-space-grotesk bg-surface-muted text-ink-secondary border-none outline-none cursor-pointer max-w-[200px]"
          >
            <option value="">All Podcasts</option>
            {allPodcasts.map((pod) => (
              <option key={pod} value={pod}>
                {pod}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
