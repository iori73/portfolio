'use client';

import React, { useState } from 'react';
import { ChevronDown, ExternalLink, Clock, ArrowRight } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { Episode, CATEGORY_COLORS, DEFAULT_CATEGORY_COLOR } from './types';

function formatDuration(minutes: number): string {
  const m = Math.round(minutes);
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  const rem = m % 60;
  return rem > 0 ? `${h}h ${rem}m` : `${h}h`;
}

interface Props {
  episode: Episode;
  isHighlighted: boolean;
  bodyFontClass: string;
  headingFontClass: string;
}

export default function NoteCard({ episode, isHighlighted, bodyFontClass, headingFontClass }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showChapters, setShowChapters] = useState(false);
  const color = CATEGORY_COLORS[episode.category || 'Others'] || DEFAULT_CATEGORY_COLOR;
  const locale = useLocale();
  const t = useTranslations('podcastNotesPage');

  const chapters = episode.chapters || [];

  return (
    <div
      id={`note-${episode.id}`}
      className={`rounded-xl border transition-all duration-300 ${
        isHighlighted
          ? 'border-line-section shadow-md ring-1'
          : 'border-line-subtle hover:border-line-section hover:shadow-sm'
      }`}
      style={isHighlighted ? { ringColor: color + '40' } : undefined}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-4 md:p-5"
      >
        <div className="flex items-start gap-3">
          {/* Podcast cover */}
          {episode.podcastCover ? (
            <img
              src={episode.podcastCover}
              alt={episode.podcast}
              className="w-12 h-12 md:w-14 md:h-14 rounded-md object-cover shrink-0"
            />
          ) : (
            <div
              className="w-12 h-12 md:w-14 md:h-14 rounded-md shrink-0 flex items-center justify-center"
              style={{ backgroundColor: color + '20' }}
            >
              <span className="text-body-lg" style={{ color }}>
                {episode.podcast.charAt(0)}
              </span>
            </div>
          )}

          <div className="flex-1 min-w-0">
            {/* Title */}
            <h4 className={`text-title-sm text-ink line-clamp-2 ${headingFontClass}`}>
              {episode.title}
            </h4>

            {/* Meta */}
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className="font-space-grotesk text-body text-ink-tertiary">
                {episode.podcast}
              </span>
              {episode.date && (
                <>
                  <span className="text-ink-tertiary">·</span>
                  <span className="font-space-grotesk text-body-sm text-ink-tertiary">
                    {episode.date}
                  </span>
                </>
              )}
              {episode.category && (
                <span
                  className="font-space-grotesk text-label px-3 py-1 rounded-lg"
                  style={{ backgroundColor: color + '15', color }}
                >
                  {episode.category}
                </span>
              )}
            </div>
          </div>

          {/* Expand indicator */}
          <ChevronDown
            className={`w-4 h-4 text-ink-tertiary shrink-0 mt-1 transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-4 md:px-5 pb-4 md:pb-5 border-t border-line-subtle pt-4 max-h-[600px] overflow-y-auto">
          {/* Meta row: duration + tags */}
          {(episode.durationMinutes > 0 || episode.tags.length > 0) && (
            <div className="flex items-center gap-2 flex-wrap mb-4">
              {episode.durationMinutes > 0 && (
                <span className="inline-flex items-center gap-1 font-space-grotesk text-body-sm text-ink-tertiary">
                  <Clock className="w-3.5 h-3.5" />
                  {formatDuration(episode.durationMinutes)}
                </span>
              )}
              {episode.durationMinutes > 0 && episode.tags.length > 0 && (
                <span className="text-ink-tertiary">·</span>
              )}
              {episode.tags.map((tag) => {
                const tagColor = CATEGORY_COLORS[tag] || DEFAULT_CATEGORY_COLOR;
                return (
                  <span
                    key={tag}
                    className="font-space-grotesk text-label px-3 py-1 rounded-lg"
                    style={{ backgroundColor: tagColor + '15', color: tagColor }}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          )}

          {/* Summary */}
          {episode.summary && (
            <p className={`text-body-lg text-ink-secondary mb-4 leading-relaxed ${bodyFontClass}`}>
              {episode.summary}
            </p>
          )}

          {/* Key learnings */}
          {episode.keyLearnings.length > 0 && (
            <div className="mb-4">
              <h5 className="font-space-grotesk text-label text-ink-tertiary font-semibold mb-2 uppercase tracking-wider">
                Key Learnings
              </h5>
              <ul className="space-y-1.5">
                {episode.keyLearnings.map((learning, i) => (
                  <li
                    key={i}
                    className={`text-body text-ink-secondary pl-4 relative ${bodyFontClass}`}
                  >
                    <span
                      className="absolute left-0 top-[9px] w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    {learning}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Chapters */}
          {chapters.length > 0 && (
            <div className="mb-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowChapters(!showChapters);
                }}
                className="flex items-center gap-1.5 mb-2"
              >
                <h5 className="font-space-grotesk text-label text-ink-tertiary font-semibold uppercase tracking-wider">
                  {chapters.length} Chapters
                </h5>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-ink-tertiary transition-transform duration-200 ${
                    showChapters ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {showChapters && (
                <div className="space-y-0">
                  {chapters.map((chapter, i) => (
                    <div
                      key={i}
                      className={`flex items-baseline gap-3 py-2 ${
                        i < chapters.length - 1 ? 'border-b border-line-subtle' : ''
                      }`}
                    >
                      <span className="font-space-grotesk text-body-sm text-ink-tertiary shrink-0 w-12 tabular-nums">
                        {chapter.timestamp}
                      </span>
                      <span className={`text-body-sm text-ink-secondary ${bodyFontClass}`}>
                        {chapter.title}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Action links */}
          <div className="flex items-center gap-4 flex-wrap">
            <Link
              href={`/${locale}/experiment/podcast-notes/${episode.id}`}
              className="inline-flex items-center gap-1.5 py-2 text-body-sm font-space-grotesk text-ink-tertiary hover:text-ink-secondary transition-colors"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              {t('viewFullEpisode')}
            </Link>
            {episode.url && (
              <a
                href={episode.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 py-2 text-body-sm font-space-grotesk text-ink-tertiary hover:text-ink-secondary transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Listen on Spotify
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
