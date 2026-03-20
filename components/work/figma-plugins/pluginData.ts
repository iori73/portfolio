export type PluginCategory = 'personal' | 'client-ds';

export interface PluginData {
  id: string;
  name: string;
  type: 'Plugin' | 'Widget';
  category: PluginCategory;
  description: string;
  tags: string[];
  link?: string;
  accentColor: string;
  iconImage?: string;
  thumbnail?: string;
  users?: string;
  likes?: number;
}

export const samplePlugins: PluginData[] = [
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
    users: '250',
    likes: 3,
  },
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
    users: '2.5k',
    likes: 25,
  },
  {
    id: 'variable-migrator',
    name: 'Variable Migrator',
    type: 'Plugin',
    category: 'client-ds',
    description:
      'Migrates legacy and external library variable references to the target design system. Uses RGBA color matching with tolerance scoring and scope validation.',
    tags: ['Plugin', 'Design System', 'Migration'],
    accentColor: '#0ACF83',
  },
  {
    id: 'design-study-generator',
    name: 'Design Study Generator',
    type: 'Plugin',
    category: 'client-ds',
    description:
      'Auto-generates brand study screen variations across multiple layout patterns. Produces PC and SP variants with design tokens applied.',
    tags: ['Plugin', 'Design System', 'Prototyping'],
    accentColor: '#FF7262',
  },
];
