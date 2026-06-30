import statsData from './pluginStats.json';

export type PluginCategory = 'personal' | 'client-ds';
export type PluginStatus = 'published' | 'coming-soon';

export interface PluginData {
  id: string;
  name: string;
  type: 'Plugin' | 'Widget';
  category: PluginCategory;
  status?: PluginStatus;
  description: string;
  tags: string[];
  link?: string;
  accentColor: string;
  iconImage?: string;
  thumbnail?: string;
  users?: number;
  likes?: number;
}

/** Formats an install/user count, e.g. 3600 -> "3.6k". Shared across cards. */
export function formatUsers(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  return String(n);
}

// Live stats fetched at build time from Figma (scripts/fetch-figma-stats.mjs),
// keyed by plugin id. Missing/failed entries fall back to the inline values below.
const liveStats: Record<string, { users?: number; likes?: number }> = statsData;

// Only published plugins are listed. users/likes are the last-known fallback;
// the build-time fetch overrides them with real numbers when available.
const basePlugins: PluginData[] = [
  {
    id: 'pptx-to-figma',
    name: 'PPTX to Figma',
    type: 'Plugin',
    category: 'personal',
    description:
      'Converts PowerPoint (.pptx) files into fully editable Figma designs — preserving text styles, shapes, tables, images, and theme colors. Each slide becomes a separate Frame.',
    tags: ['Plugin', 'Import', 'PowerPoint'],
    link: 'https://www.figma.com/community/plugin/1579722656902401183',
    accentColor: '#1ABCFE',
    iconImage: '/work/figma-plugins/pptx-icon.png',
    thumbnail: '/work/figma-plugins/pptx-cover.png',
    users: 10200,
    likes: 100,
  },
  {
    id: 'perfect-markdown',
    name: 'Perfect Markdown',
    type: 'Widget',
    category: 'personal',
    description:
      'Renders Markdown inside Figma and FigJam with full syntax support — tables, code blocks, task lists, and light/dark themes.',
    tags: ['Widget', 'Markdown', 'FigJam'],
    link: 'https://www.figma.com/community/widget/1594023679858160179',
    accentColor: '#A259FF',
    iconImage: '/work/figma-plugins/pm-icon.png',
    thumbnail: '/work/figma-plugins/pm-cover.png',
    users: 707,
    likes: 13,
  },
  {
    id: 'bulk-screenshot-importer',
    name: 'Bulk Screenshot Importer',
    type: 'Plugin',
    category: 'personal',
    description:
      'Imports screenshots into Figma with folder structure preserved as Sections. Smart Import mode uses AI to detect scroll sequences and group app screenshots by section.',
    tags: ['Plugin', 'Import', 'AI'],
    link: 'https://www.figma.com/community/plugin/1609935194251849962',
    accentColor: '#0ACF83',
    iconImage: '/work/figma-plugins/bsi-icon.png',
    thumbnail: '/work/figma-plugins/bsi-cover.png',
    users: 36,
    likes: 0,
  },
];

// Merge live (fetched) stats over the inline fallbacks.
export const plugins: PluginData[] = basePlugins.map((p) => ({
  ...p,
  users: liveStats[p.id]?.users ?? p.users,
  likes: liveStats[p.id]?.likes ?? p.likes,
}));
