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
  users?: number;
  likes?: number;
}

export const plugins: PluginData[] = [
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
    users: 2900,
    likes: 28,
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
    users: 279,
    likes: 3,
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
    iconImage: '/work/figma-plugins/si-icon.png',
    thumbnail: '/work/figma-plugins/si-cover-cropped.png',
    users: 4,
    likes: 0,
  },
  {
    id: 'screenshot-reorganizer',
    name: 'Screenshot Reorganizer',
    type: 'Plugin',
    category: 'personal',
    description:
      'Reorganizes imported screenshot frames on the Figma canvas — sorting, aligning, and grouping them into a clean grid layout for efficient design review.',
    tags: ['Plugin', 'Organization', 'Layout'],
    accentColor: '#FF7262',
  },
  {
    id: 'arrow-connect',
    name: 'Arrow Connect',
    type: 'Plugin',
    category: 'personal',
    description:
      'Draws directional connector arrows between selected frames or components. Useful for flow diagrams, user journeys, and architecture visualizations.',
    tags: ['Plugin', 'Diagram', 'Flow'],
    accentColor: '#F24E1E',
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
