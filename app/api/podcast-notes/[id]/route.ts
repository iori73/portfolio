/**
 * Podcast Notes Detail API: Fetches a single episode's structured content from Notion.
 *
 * Returns metadata + parsed sections (Summary, Key Points, Chapters) — all AI-generated —
 * plus `ownNotes`: the sections the author wrote by hand.
 * Transcript is flagged but not returned (too large).
 *
 * Environment: NOTION_API_KEY
 */

import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import {
  normalizeCategoryName,
} from '@/components/podcast-notes/types';
import type { Chapter, NoteBlock, OwnNoteSection } from '@/components/podcast-notes/types';
import { rateLimit } from '@/src/lib/rate-limit';

const NOTION_API_KEY = process.env.NOTION_API_KEY;

// ownNotes の取り込み上限。Notion 側でいくら書かれてもレスポンスと serverless 実行時間が
// 膨らまないようにする。子ブロック取得のリクエスト数も含めて上限を持たせる。
const MAX_OWN_SECTIONS = 10;
const MAX_BLOCKS_PER_SECTION = 40;
const MAX_BLOCK_TEXT = 2000;
const MAX_CHILD_REQUESTS = 20;

function extractRichText(richText: { plain_text?: string }[] | undefined): string {
  if (!richText || !Array.isArray(richText)) return '';
  return richText.map((t) => t.plain_text || '').join('');
}

interface ParsedContent {
  summary: string;
  keyLearnings: string[];
  chapters: Chapter[];
  hasTranscript: boolean;
  ownNotes: OwnNoteSection[];
}

/** Notion のブロック type → 表示用の NoteBlock type。対象外は null（＝取り込まない）。 */
function noteBlockType(notionType: string): NoteBlock['type'] | null {
  switch (notionType) {
    case 'paragraph':
      return 'paragraph';
    case 'bulleted_list_item':
      return 'bulleted';
    case 'numbered_list_item':
      return 'numbered';
    case 'quote':
      return 'quote';
    case 'callout':
    case 'toggle':
      return 'callout';
    case 'code':
      return 'code';
    default:
      return null;
  }
}

/**
 * 既知セクション（Summary / Chapters / Transcript …）以外の見出し配下を「本人が書いたメモ」として拾う。
 *
 * 見出し名を決め打ちで足していく方式にしないのがポイント。Notion 側の見出し文言が変わっても
 * 落ちないよう、「知らない見出しは全部自分のメモ」という構造ベースで判定する。
 *
 * @param fetchChildren ブロックの子を1階層取得する。呼び出し回数は MAX_CHILD_REQUESTS で制限。
 */
async function parseBlocks(
  blocks: Record<string, unknown>[],
  fetchChildren: (blockId: string) => Promise<Record<string, unknown>[]>
): Promise<ParsedContent> {
  let currentSection: string | null = null;
  let currentSubSection: string | null = null;
  const summaryParts: string[] = [];
  const keyLearnings: string[] = [];
  const chapters: Chapter[] = [];
  const ownNotes: OwnNoteSection[] = [];
  let hasTranscript = false;
  let childRequests = 0;

  const SECTION_NAMES = ['basic information', 'summary', 'chapters', 'timestamps', 'transcript'];
  const SKIP_SECTIONS = ['basic information'];
  const SUMMARY_SECTIONS = ['summary'];
  const CHAPTER_SECTIONS = ['chapters', 'timestamps'];
  const TRANSCRIPT_SECTIONS = ['transcript'];
  const KEY_POINT_LABELS = ['主要ポイント', 'key points', 'key learnings', 'key takeaways', 'takeaways'];

  /** callout / toggle の中身（用語リストなど）を深さ2まで取る。 */
  async function collectChildren(blockId: string, depth: number): Promise<NoteBlock[] | undefined> {
    if (depth <= 0 || childRequests >= MAX_CHILD_REQUESTS) return undefined;
    childRequests++;
    let children: Record<string, unknown>[];
    try {
      children = await fetchChildren(blockId);
    } catch {
      return undefined;
    }

    const out: NoteBlock[] = [];
    for (const child of children) {
      if (out.length >= MAX_BLOCKS_PER_SECTION) break;
      const block = await toNoteBlock(child, depth - 1);
      if (block) out.push(block);
    }
    return out.length > 0 ? out : undefined;
  }

  async function toNoteBlock(
    block: Record<string, unknown>,
    childDepth: number
  ): Promise<NoteBlock | null> {
    const type = block.type as string;
    const mapped = noteBlockType(type);
    if (!mapped) return null;

    const content = block[type] as
      | { rich_text?: { plain_text?: string }[]; icon?: { emoji?: string } }
      | undefined;
    const text = extractRichText(content?.rich_text).trim().slice(0, MAX_BLOCK_TEXT);
    const children = block.has_children ? await collectChildren(block.id as string, childDepth) : undefined;

    // テキストが空でも子があれば構造として意味があるので残す。
    if (!text && !children) return null;

    return {
      type: mapped,
      text,
      ...(content?.icon?.emoji ? { icon: content.icon.emoji } : {}),
      ...(children ? { children } : {}),
    };
  }

  for (const block of blocks) {
    const type = block.type as string;
    const content = block[type] as { rich_text?: { plain_text?: string }[] } | undefined;
    const text = content?.rich_text ? extractRichText(content.rich_text) : '';

    // Section boundaries can be headings OR toggle blocks (the "Transcript"
    // section is a collapsible toggle, whose label would otherwise leak into
    // the summary text).
    if (type === 'heading_1' || type === 'heading_2' || type === 'heading_3' || type === 'toggle') {
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

      // 「主要ポイント」等は Summary の小見出し。ここを own-note に取り違えると
      // keyLearnings が空になるので、レベルに関係なく必ず Summary 側に残す。
      const isKeyPointHeading = KEY_POINT_LABELS.some((kp) => headerLower.includes(kp));
      if (currentSection === 'summary' && (isKeyPointHeading || type === 'toggle')) {
        currentSubSection = isKeyPointHeading ? 'keypoints' : 'text';
        continue;
      }

      // 未知の見出し＝本人が書いたセクションの開始。
      // toggle は見出しではなく本文の一部として扱う（own セクション内なら中身ごと拾う）。
      if (type !== 'toggle' && text.trim()) {
        currentSection = 'own';
        currentSubSection = null;
        if (ownNotes.length < MAX_OWN_SECTIONS) {
          ownNotes.push({ heading: text.trim().slice(0, 200), blocks: [] });
        }
        continue;
      }

      if (currentSection === 'summary') {
        currentSubSection = 'text';
        continue;
      }
    }

    if (currentSection === 'own') {
      const section = ownNotes[ownNotes.length - 1];
      // MAX_OWN_SECTIONS を超えた分は heading を push していないので捨てる。
      if (!section || section.blocks.length >= MAX_BLOCKS_PER_SECTION) continue;
      const noteBlock = await toNoteBlock(block, 2);
      if (noteBlock) section.blocks.push(noteBlock);
      continue;
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
    // 中身が空になったセクション（見出しだけ）は出さない
    ownNotes: ownNotes.filter((s) => s.blocks.length > 0),
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

    const parsed = await parseBlocks(blocks, async (blockId) => {
      const res = await notion.blocks.children.list({ block_id: blockId, page_size: 100 });
      return res.results as Record<string, unknown>[];
    });

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
      { error: 'Not found' },
      { status: 404 }
    );
  }
}
