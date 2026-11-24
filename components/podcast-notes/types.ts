export interface Chapter {
  timestamp: string;     // e.g. "05:00", "01:23:45"
  title: string;
}

/**
 * 本人が Notion ページに手で書いたブロック。AI 生成の summary / keyLearnings とは
 * 区別して扱うため、見出し単位のセクションとして持つ。
 * detail API（/api/podcast-notes/[id]）のレスポンスにのみ載る — 一覧 API は
 * ページ本文を取得しないので Episode には足さない。
 */
export interface NoteBlock {
  type: 'paragraph' | 'bulleted' | 'numbered' | 'quote' | 'callout' | 'code';
  text: string;
  /** callout の絵文字アイコン（あれば） */
  icon?: string;
  /** callout / toggle 配下の入れ子ブロック（深さ2まで） */
  children?: NoteBlock[];
}

export interface OwnNoteSection {
  heading: string;
  blocks: NoteBlock[];
}

export interface Episode {
  id: string;
  title: string;
  podcast: string;
  podcastCover: string;
  category: string | null;
  /** Notion color name of the Category option (e.g. "blue"); see NOTION_COLORS. */
  categoryColor?: string | null;
  tags: string[];
  date: string;
  url: string;
  durationMinutes: number;
  summary: string;
  keyLearnings: string[];
  chapters?: Chapter[];
  hasTranscript?: boolean;
  embedding2d: [number, number];
  cluster: number;
}

export interface Podcast {
  name: string;
  cover: string;
  episodeCount: number;
  primaryTags: string[];
}

export interface Cluster {
  id: number;
  label: string;
  center: [number, number];
  color: string;
  episodeCount: number;
}

export interface PodcastStats {
  totalEpisodes: number;
  totalPodcasts: number;
  totalCategories: number;
  tagDistribution: Record<string, number>;
}

export interface PodcastData {
  episodes: Episode[];
  podcasts: Podcast[];
  clusters: Cluster[];
  stats: PodcastStats;
  meta: {
    generatedAt: string;
    hasEmbeddings: boolean;
  };
}

/* ═══ Category colors — synced with the Notion "Podcast Notes Database" ═══
 *
 * Source of truth: the color of each Category select option in Notion. Every
 * episode carries it as `categoryColor` (Notion's color name, e.g. "blue"),
 * read from `properties.Category.select.color` by the generator and the API.
 * Change a color in Notion → the site follows on the next data sync.
 *
 * NOTION_COLORS are Notion's own light-mode tag colors, read from the rendered
 * public Notion page (paint-foam-7ff.notion.site) on 2026-11-23:
 *   text / bg — exactly what a Notion tag shows (dark same-hue text on a tint).
 *               Every pair is ≥7:1, so tags pass WCAG AA (the old palette used the
 *               category color itself as text: Business was 1.29:1).
 *   base      — the hue Notion tints the tag with (the rgb inside its bg). Used
 *               where the color is the mark itself: dots, bars, the constellation.
 *               default/gray have a near-black base, so they use a mid grey.
 */
export type NotionColor =
  | 'default' | 'gray' | 'brown' | 'orange' | 'yellow'
  | 'green' | 'blue' | 'purple' | 'pink' | 'red';

export const NOTION_COLORS: Record<NotionColor, { text: string; bg: string; base: string }> = {
  default: { text: '#2C2C2B', bg: 'rgba(42, 28, 0, 0.07)', base: '#8F8E8A' },
  gray: { text: '#494846', bg: 'rgba(28, 19, 1, 0.11)', base: '#8F8E8A' },
  brown: { text: '#584437', bg: 'rgba(127, 51, 0, 0.157)', base: '#7F3300' },
  orange: { text: '#6A4222', bg: 'rgba(196, 88, 0, 0.204)', base: '#C45800' },
  yellow: { text: '#655121', bg: 'rgba(209, 156, 0, 0.282)', base: '#D19C00' },
  green: { text: '#2A533C', bg: 'rgba(0, 96, 38, 0.157)', base: '#006026' },
  blue: { text: '#264A72', bg: 'rgba(0, 118, 217, 0.204)', base: '#0076D9' },
  purple: { text: '#553B69', bg: 'rgba(92, 0, 163, 0.14)', base: '#5C00A3' },
  pink: { text: '#68354E', bg: 'rgba(183, 0, 78, 0.153)', base: '#B7004E' },
  red: { text: '#6D3531', bg: 'rgba(206, 24, 0, 0.165)', base: '#CE1800' },
};

/* Used only until the data carries `categoryColor` (i.e. before the first sync
 * after this change), and for categories missing from Notion. Read off a
 * screenshot of the Notion Category options, 2026-11-23. Education / Health /
 * News were ambiguous in the screenshot; the next sync replaces them with the
 * real values. */
const CATEGORY_NOTION_FALLBACK: Record<string, NotionColor> = {
  'Startup & VC': 'brown',
  'Science': 'blue',
  'Others': 'default',
  'News': 'brown',
  'Health': 'orange',
  'Education': 'red',
  'Design & Art': 'pink',
  'Career': 'green',
  'Business': 'blue',
  'Biology & Nature': 'green',
  'Technology': 'purple',
  'AI': 'red',
};

const isNotionColor = (c: unknown): c is NotionColor =>
  typeof c === 'string' && c in NOTION_COLORS;

// name → Notion color, filled from whichever episodes have been loaded.
const registry: Record<string, NotionColor> = {};

/** Call once with the loaded episodes, before rendering them. */
export function registerCategoryColors(
  episodes: { category?: string | null; categoryColor?: string | null }[]
): void {
  for (const ep of episodes) {
    if (ep.category && isNotionColor(ep.categoryColor)) registry[ep.category] = ep.categoryColor;
  }
}

export function categoryNotionColor(name: string | null | undefined, explicit?: string | null): NotionColor {
  if (isNotionColor(explicit)) return explicit;
  const key = normalizeCategoryName(name || 'Others');
  return registry[key] || CATEGORY_NOTION_FALLBACK[key] || 'default';
}

/** Tag colors (text + tint), exactly as Notion shows the option. */
export function getCategoryTagStyle(name: string | null | undefined, explicit?: string | null) {
  const c = NOTION_COLORS[categoryNotionColor(name, explicit)];
  return { color: c.text, backgroundColor: c.bg };
}

/** Identity color for marks (dots, bars, constellation points). Not for text. */
export function getCategoryColor(name: string | null | undefined, explicit?: string | null): string {
  return NOTION_COLORS[categoryNotionColor(name, explicit)].base;
}

export function normalizeCategoryName(name: string): string {
  if (name === 'Al') return 'AI';
  return name;
}

export const DEFAULT_CATEGORY_COLOR = NOTION_COLORS.default.base;
