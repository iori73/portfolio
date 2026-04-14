/**
 * Podcast Notes Detail API: Fetches a single episode's structured content from Notion.
 *
 * Returns metadata + parsed sections (Summary, Key Points, Chapters).
 * Transcript is flagged but not returned (too large).
 *
 * Environment: NOTION_API_KEY
 */

import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import {
  normalizeCategoryName,
} from '@/components/podcast-notes/types';
import type { Chapter } from '@/components/podcast-notes/types';
import { rateLimit } from '@/src/lib/rate-limit';

const NOTION_API_KEY = process.env.NOTION_API_KEY;

function extractRichText(richText: { plain_text?: string }[] | undefined): string {
  if (!richText || !Array.isArray(richText)) return '';
  return richText.map((t) => t.plain_text || '').join('');
}

interface ParsedContent {
  summary: string;
  keyLearnings: string[];
  chapters: Chapter[];
  hasTranscript: boolean;
}

function parseBlocks(blocks: Record<string, unknown>[]): ParsedContent {
  let currentSection: string | null = null;
  let currentSubSection: string | null = null;
  const summaryParts: string[] = [];
  const keyLearnings: string[] = [];
  const chapters: Chapter[] = [];
  let hasTranscript = false;

  const SECTION_NAMES = ['basic information', 'summary', 'chapters', 'timestamps', 'transcript'];
  const SKIP_SECTIONS = ['basic information'];
  const SUMMARY_SECTIONS = ['summary'];
  const CHAPTER_SECTIONS = ['chapters', 'timestamps'];
  const TRANSCRIPT_SECTIONS = ['transcript'];
  const KEY_POINT_LABELS = ['主要ポイント', 'key points', 'key learnings'];

  for (const block of blocks) {
    const type = block.type as string;
    const content = block[type] as { rich_text?: { plain_text?: string }[] } | undefined;
    const text = content?.rich_text ? extractRichText(content.rich_text) : '';

    if (type === 'heading_2' || type === 'heading_3') {
      const headerLower = text.toLowerCase().trim();
      if (SECTION_NAMES.some((s) => headerLower.includes(s))) {
        if (SKIP_SECTIONS.some((s) => headerLower.includes(s))) {
          currentSection = 'skip';
        } else if (SUMMARY_SECTIONS.some((s) => headerLower.includes(s))) {
          currentSection = 'summary';
        } else if (CHAPTER_SECTIONS.some((s) => headerLower.includes(s))) {
          currentSection = 'chapters';
        } else if (TRANSCRIPT_SECTIONS.some((s) => headerLower.includes(s))) {
          currentSection = 'transcript';
          hasTranscript = true;
        }
        currentSubSection = null;
        continue;
      }
      if (currentSection === 'summary') {
        const subLower = text.toLowerCase().trim();
        if (KEY_POINT_LABELS.some((kp) => subLower.includes(kp))) {
          currentSubSection = 'keypoints';
        } else {
          currentSubSection = 'text';
        }
        continue;
      }
    }

    if (!text) continue;

    if (currentSection === 'skip') {
      continue;
    } else if (currentSection === 'summary') {
      if (currentSubSection === 'keypoints' || type === 'bulleted_list_item') {
        const cleaned = text.replace(/^[•\-・→]\s*/, '').trim();
        if (cleaned.length > 5 && cleaned.length < 500) {
          keyLearnings.push(cleaned);
        }
      } else {
        const stripped = text.replace(/^(要約|冒頭の内容|中盤の内容)\s*[:：]\s*/, '').trim();
        if (stripped) {
          summaryParts.push(stripped);
        }
      }
    } else if (currentSection === 'chapters') {
      const match = text.match(/^(\d{1,2}:\d{2}(?::\d{2})?)\s+(.+)/);
      if (match) {
        chapters.push({
          timestamp: match[1],
          title: match[2].substring(0, 100),
        });
      }
    } else if (currentSection === 'transcript') {
      hasTranscript = true;
    }
  }

  return {
    summary: summaryParts.join(' ').trim(),
    keyLearnings: keyLearnings.slice(0, 8),
    chapters,
    hasTranscript,
  };
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  const { success } = rateLimit(ip, { limit: 20, windowMs: 60_000 });
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const { id } = await params;

  // Validate ID format (Notion page IDs are UUIDs with or without dashes)
  const uuidPattern = /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i;
  if (!id || !uuidPattern.test(id)) {
    return NextResponse.json({ error: 'Invalid episode ID' }, { status: 400 });
  }

  if (!NOTION_API_KEY) {
    return NextResponse.json(
      { error: 'Notion API not configured' },
      { status: 503 }
    );
  }

  const notion = new Client({ auth: NOTION_API_KEY });

  try {
    // Fetch page properties
    const page = await notion.pages.retrieve({ page_id: id }) as Record<string, unknown>;
    const props = page.properties as Record<string, Record<string, unknown>>;

    const rawCategory = (props.Category as { select?: { name?: string } })?.select?.name ?? null;
    const category = rawCategory ? normalizeCategoryName(rawCategory) : null;
    const nameProp = props.Name as { title?: { plain_text?: string }[] } | undefined;
    const podcastProp = props.Podcast as { select?: { name?: string } } | undefined;
    const releaseProp = props['Release Date'] as { date?: { start?: string } } | undefined;
    const urlProp = props.URL as { url?: string } | undefined;
    const durationProp = props['1. Duration'] as { number?: number } | undefined;
    const cover = page.cover as { external?: { url?: string }; file?: { url?: string } } | undefined;

    const metadata = {
      id: page.id as string,
      title: extractRichText(nameProp?.title) || '(Untitled)',
      podcast: podcastProp?.select?.name || 'Unknown',
      podcastCover: cover?.external?.url || cover?.file?.url || '',
      category,
      tags: [category].filter(Boolean) as string[],
      date: releaseProp?.date?.start || '',
      url: urlProp?.url || '',
      durationMinutes: durationProp?.number ?? 0,
    };

    // Fetch page blocks
    const blocks: Record<string, unknown>[] = [];
    let cursor: string | undefined;
    let hasMore = true;
    while (hasMore) {
      const response = await notion.blocks.children.list({
        block_id: id,
        start_cursor: cursor,
        page_size: 100,
      });
      blocks.push(...(response.results as Record<string, unknown>[]));
      hasMore = response.has_more;
      cursor = response.next_cursor ?? undefined;
    }

    const parsed = parseBlocks(blocks);

    return NextResponse.json(
      { ...metadata, ...parsed },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (err) {
    console.error('Podcast detail API error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch episode' },
      { status: 502 }
    );
  }
}
