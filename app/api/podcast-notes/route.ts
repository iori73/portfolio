/**
 * Podcast Notes API: 表示時に Notion DB からメタデータを取得し、最新の一覧を返す。
 * 埋め込み・UMAP は行わないため、Constellation はカテゴリベースの配置になる。
 *
 * 環境変数: NOTION_API_KEY, NOTION_PODCAST_DB_ID
 * 未設定の場合は 503 を返し、フロントは static JSON にフォールバックする。
 */

import { NextRequest, NextResponse } from 'next/server';
import { Client } from '@notionhq/client';
import { rateLimit } from '@/src/lib/rate-limit';
import type { PodcastData, Episode, Cluster } from '@/components/podcast-notes/types';
import {
  CATEGORY_COLORS,
  DEFAULT_CATEGORY_COLOR,
  normalizeCategoryName,
} from '@/components/podcast-notes/types';

const NOTION_DB_ID = process.env.NOTION_PODCAST_DB_ID;
const NOTION_API_KEY = process.env.NOTION_API_KEY;

// Notion の property 型（簡易）
function extractRichText(richText: { plain_text?: string }[] | undefined): string {
  if (!richText || !Array.isArray(richText)) return '';
  return richText.map((t) => t.plain_text || '').join('');
}

function extractPageMetadata(page: {
  id: string;
  created_time?: string;
  cover?: { external?: { url?: string }; file?: { url?: string } };
  properties: Record<
    string,
    | { title?: { plain_text?: string }[] }
    | { select?: { name?: string } }
    | { date?: { start?: string } }
    | { url?: string }
    | { number?: number }
  >;
}): Omit<Episode, 'embedding2d' | 'cluster' | 'summary' | 'keyLearnings'> {
  const props = page.properties;
  const rawCategory = (props.Category as { select?: { name?: string } })?.select?.name ?? null;
  const category = rawCategory ? normalizeCategoryName(rawCategory) : null;
  const nameProp = props.Name as { title?: { plain_text?: string }[] } | undefined;
  const podcastProp = props.Podcast as { select?: { name?: string } } | undefined;
  const releaseProp = props['Release Date'] as { date?: { start?: string } } | undefined;
  const urlProp = props.URL as { url?: string } | undefined;
  const durationProp = props['1. Duration'] as { number?: number } | undefined;

  return {
    id: page.id,
    title: extractRichText(nameProp?.title) || '(Untitled)',
    podcast: podcastProp?.select?.name || 'Unknown',
    podcastCover: page.cover?.external?.url || page.cover?.file?.url || '',
    category,
    tags: [category].filter(Boolean),
    date: releaseProp?.date?.start || (page.created_time?.split('T')[0] ?? ''),
    url: urlProp?.url || '',
    durationMinutes: durationProp?.number ?? 0,
    summary: '',
    keyLearnings: [],
  };
}

/** エピソード ID から決定的な 0..1 の値を生成（Constellation の位置を安定させるため） */
function deterministicJitter(id: string, seed: number): number {
  let h = seed;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return (h % 1000) / 1000;
}

function categoryBasedPositioning(
  episodes: { id: string; category: string | null }[]
): [number, number][] {
  const categories = [...new Set(episodes.map((e) => e.category || 'Others'))];
  const angleStep = (2 * Math.PI) / Math.max(1, categories.length);

  return episodes.map((ep) => {
    const catIdx = categories.indexOf(ep.category || 'Others');
    const angle = angleStep * catIdx;
    const j1 = deterministicJitter(ep.id, 1);
    const j2 = deterministicJitter(ep.id, 2);
    const j3 = deterministicJitter(ep.id, 3);
    const radius = 3 + j1 * 2;
    const jitterAngle = angle + (j2 - 0.5) * angleStep * 0.7;
    const dx = (j3 - 0.5) * 1.5;
    return [Math.cos(jitterAngle) * radius + dx, Math.sin(jitterAngle) * radius + dx * 0.5];
  });
}

function buildClusters(
  episodes: Episode[],
  positions: [number, number][]
): Cluster[] {
  const categories = [...new Set(episodes.map((e) => e.category || 'Others'))];
  const assignments = episodes.map((e) => categories.indexOf(e.category || 'Others'));
  const k = categories.length;
  const centroids: [number, number][] = categories.map((_, c) => {
    const pts = positions.filter((_, i) => assignments[i] === c);
    if (pts.length === 0) {
      const angle = (2 * Math.PI / k) * c;
      return [Math.cos(angle) * 3, Math.sin(angle) * 3];
    }
    const sum = pts.reduce((a, p) => [a[0] + p[0], a[1] + p[1]], [0, 0]);
    return [sum[0] / pts.length, sum[1] / pts.length];
  });

  return categories.map((label, id) => ({
    id,
    label,
    center: centroids[id],
    color: CATEGORY_COLORS[label] || DEFAULT_CATEGORY_COLOR,
    episodeCount: episodes.filter((e) => (e.category || 'Others') === label).length,
  }));
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
  const { success } = rateLimit(ip, { limit: 20, windowMs: 60_000 });
  if (!success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  if (!NOTION_API_KEY || !NOTION_DB_ID) {
    return NextResponse.json(
      { error: 'Podcast notes API not configured (missing NOTION_API_KEY or NOTION_PODCAST_DB_ID)' },
      { status: 503 }
    );
  }

  const notion = new Client({ auth: NOTION_API_KEY });
  const episodesMeta: ReturnType<typeof extractPageMetadata>[] = [];
  let cursor: string | undefined;

  try {
    do {
      const response = await notion.databases.query({
        database_id: NOTION_DB_ID,
        start_cursor: cursor,
        page_size: 100,
        sorts: [{ property: 'Release Date', direction: 'descending' }],
      });

      const pages = response.results as Parameters<typeof extractPageMetadata>[0][];
      for (const page of pages) {
        episodesMeta.push(extractPageMetadata(page));
      }
      cursor = response.next_cursor ?? undefined;
    } while (cursor);

    const positions = categoryBasedPositioning(episodesMeta);
    const categories = [...new Set(episodesMeta.map((e) => e.category || 'Others'))].sort();
    const episodesWithCluster: Episode[] = episodesMeta.map((ep, i) => ({
      ...ep,
      embedding2d: positions[i],
      cluster: categories.indexOf(ep.category || 'Others'),
    }));

    const clusters = buildClusters(episodesWithCluster, positions);

    const podcastMap = new Map<
      string,
      { name: string; cover: string; episodeCount: number; primaryTags: Set<string> }
    >();
    for (const ep of episodesWithCluster) {
      if (!podcastMap.has(ep.podcast)) {
        podcastMap.set(ep.podcast, {
          name: ep.podcast,
          cover: ep.podcastCover,
          episodeCount: 0,
          primaryTags: new Set(),
        });
      }
      const pod = podcastMap.get(ep.podcast)!;
      pod.episodeCount++;
      ep.tags.forEach((t) => pod.primaryTags.add(t));
    }
    const podcasts = [...podcastMap.values()].map((p) => ({
      name: p.name,
      cover: p.cover,
      episodeCount: p.episodeCount,
      primaryTags: [...p.primaryTags],
    })).sort((a, b) => b.episodeCount - a.episodeCount);

    const tagDistribution: Record<string, number> = {};
    for (const ep of episodesWithCluster) {
      for (const tag of ep.tags) {
        tagDistribution[tag] = (tagDistribution[tag] || 0) + 1;
      }
    }

    const output: PodcastData = {
      episodes: episodesWithCluster,
      podcasts,
      clusters,
      stats: {
        totalEpisodes: episodesWithCluster.length,
        totalPodcasts: podcasts.length,
        totalCategories: Object.keys(tagDistribution).length,
        tagDistribution,
      },
      meta: {
        generatedAt: new Date().toISOString(),
        hasEmbeddings: false,
      },
    };

    return NextResponse.json(output, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    });
  } catch (err) {
    console.error('Podcast notes API error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch from Notion' },
      { status: 502 }
    );
  }
}
