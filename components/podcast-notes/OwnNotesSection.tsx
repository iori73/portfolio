'use client';

import React from 'react';
import type { NoteBlock, OwnNoteSection } from './types';

/**
 * 本人が Notion に手で書いたセクションを描画する。
 *
 * AI 生成の Summary / Key Points と並ぶので、どちらが自分の言葉かが読み手に分かることが
 * このコンポーネントの目的。装飾は既存トークンのみで、AI セクション側には出所ラベルを添える。
 */

function NoteBlocks({
  blocks,
  bodyFontClass,
  depth = 0,
}: {
  blocks: NoteBlock[];
  bodyFontClass: string;
  depth?: number;
}) {
  return (
    <div className="flex flex-col gap-3">
      {blocks.map((block, i) => (
        <NoteBlockView key={i} block={block} bodyFontClass={bodyFontClass} depth={depth} />
      ))}
    </div>
  );
}

function NoteBlockView({
  block,
  bodyFontClass,
  depth,
}: {
  block: NoteBlock;
  bodyFontClass: string;
  depth: number;
}) {
  const bodyClass = `text-body text-ink-secondary leading-[1.7] ${bodyFontClass}`;

  switch (block.type) {
    case 'callout':
      return (
        <div className="rounded-card bg-surface-muted p-4 flex gap-3">
          {block.icon && (
            <span className="shrink-0 text-body-lg leading-[1.4]" aria-hidden="true">
              {block.icon}
            </span>
          )}
          <div className="flex-1 min-w-0 flex flex-col gap-3">
            {block.text && <p className={bodyClass}>{block.text}</p>}
            {block.children && (
              <NoteBlocks blocks={block.children} bodyFontClass={bodyFontClass} depth={depth + 1} />
            )}
          </div>
        </div>
      );

    case 'quote':
      return (
        <blockquote className="border-l-2 border-line-section pl-4">
          <p className={bodyClass}>{block.text}</p>
          {block.children && (
            <div className="mt-3">
              <NoteBlocks blocks={block.children} bodyFontClass={bodyFontClass} depth={depth + 1} />
            </div>
          )}
        </blockquote>
      );

    case 'code':
      return (
        <pre className="rounded-card bg-surface-muted p-4 overflow-x-auto">
          <code className="font-space-grotesk text-body-sm text-ink-secondary whitespace-pre">
            {block.text}
          </code>
        </pre>
      );

    case 'bulleted':
    case 'numbered':
      return (
        <div>
          {/* NoteCard の Key Learnings と同じ絶対配置ドット。numbered も同じ見た目に寄せる */}
          <p className={`${bodyClass} pl-4 relative`}>
            <span
              className="absolute left-0 top-[0.65em] w-1.5 h-1.5 rounded-full bg-ink-tertiary"
              aria-hidden="true"
            />
            {block.text}
          </p>
          {block.children && (
            <div className="mt-3 pl-4">
              <NoteBlocks blocks={block.children} bodyFontClass={bodyFontClass} depth={depth + 1} />
            </div>
          )}
        </div>
      );

    case 'paragraph':
    default:
      return (
        <div>
          {block.text && <p className={bodyClass}>{block.text}</p>}
          {block.children && (
            <div className="mt-3">
              <NoteBlocks blocks={block.children} bodyFontClass={bodyFontClass} depth={depth + 1} />
            </div>
          )}
        </div>
      );
  }
}

export default function OwnNotesSection({
  sections,
  label,
  bodyFontClass,
  headingFontClass,
}: {
  sections: OwnNoteSection[];
  /** 「自分のメモ」等のセクション見出し */
  label: string;
  bodyFontClass: string;
  headingFontClass: string;
}) {
  if (!sections || sections.length === 0) return null;

  return (
    <section className="mb-8">
      <h2 className={`text-title-lg text-ink mb-4 ${headingFontClass}`}>{label}</h2>
      <div className="flex flex-col gap-8">
        {sections.map((section, i) => (
          <div key={i} className="flex flex-col gap-3">
            <h3 className="font-space-grotesk text-label font-semibold text-ink uppercase tracking-caps">
              {section.heading}
            </h3>
            <NoteBlocks blocks={section.blocks} bodyFontClass={bodyFontClass} />
          </div>
        ))}
      </div>
    </section>
  );
}
