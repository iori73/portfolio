'use client';

import React, { useState } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { Episode, CATEGORY_COLORS, DEFAULT_CATEGORY_COLOR } from './types';

interface Props {
  episode: Episode;
  isHighlighted: boolean;
  bodyFontClass: string;
}

export default function NoteCard({ episode, isHighlighted, bodyFontClass }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const color = CATEGORY_COLORS[episode.category || 'Others'] || DEFAULT_CATEGORY_COLOR;

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
            <h4 className={`text-title-sm text-ink leading-snug line-clamp-2 ${bodyFontClass}`}>
              {episode.title}
            </h4>

            {/* Meta */}
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className="font-space-grotesk text-label text-ink-tertiary">
                {episode.podcast}
              </span>
              {episode.date && (
                <>
                  <span className="text-ink-tertiary">·</span>
                  <span className="font-space-grotesk text-label text-ink-tertiary">
                    {episode.date}
                  </span>
                </>
              )}
              {episode.category && (
                <span
                  className="font-space-grotesk text-label px-2 py-0.5 rounded-md"
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
        <div className="px-4 md:px-5 pb-4 md:pb-5 border-t border-line-subtle pt-4">
          {/* Summary */}
          {episode.summary && (
            <p className={`text-body text-ink-secondary mb-4 leading-relaxed ${bodyFontClass}`}>
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

          {/* External link */}
          {episode.url && (
            <a
              href={episode.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-label font-space-grotesk text-ink-tertiary hover:text-ink-secondary transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Listen on Spotify
            </a>
          )}
        </div>
      )}
    </div>
  );
}
