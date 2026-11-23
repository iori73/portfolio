import type { ReactNode } from 'react';
import { getCategoryTagStyle } from './types';

interface CategoryTagProps {
  /** Category name, e.g. "Business". */
  category: string;
  /** Notion color name for this category, when the episode carries it. */
  notionColor?: string | null;
  children?: ReactNode;
  className?: string;
}

/**
 * A podcast category tag, drawn the way Notion draws the same select option
 * (dark same-hue text on a light tint). Colors come from the Notion database —
 * see NOTION_COLORS in ./types.
 */
export default function CategoryTag({ category, notionColor, children, className = '' }: CategoryTagProps) {
  return (
    <span className={`font-space-grotesk ${className}`} style={getCategoryTagStyle(category, notionColor)}>
      {children ?? category}
    </span>
  );
}
