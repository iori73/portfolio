// Shape cvData for rendering. Shared by the /cv page (Collapsible cards) and
// the print tree (flat, always-expanded blocks) so the block order and the
// empty-block filter cannot drift between the two.

import type { WorkProject } from '@/src/data/cvData';

/** Order of the detail blocks, with their i18n label keys under the `cv` namespace. */
export const DETAIL_BLOCKS = [
  { key: 'context', labelKey: 'caseContext' },
  { key: 'goal', labelKey: 'caseGoal' },
  { key: 'deliverables', labelKey: 'caseDeliverables' },
  { key: 'outcome', labelKey: 'caseOutcome' },
] as const;

export type ProjectBlock = { labelKey: string; items: string[] };

/** Detail blocks that actually have content, in canonical order. */
export function buildProjectBlocks(project: WorkProject, lang: 'en' | 'jp'): ProjectBlock[] {
  return DETAIL_BLOCKS.flatMap(({ key, labelKey }) => {
    const items = project.detail?.[key]?.[lang];
    return items && items.length > 0 ? [{ labelKey: labelKey as string, items }] : [];
  });
}
