import React from 'react';
import { FileCheck2, GitCompare, ListChecks, MousePointerClick, PenLine, Target, type LucideIcon } from 'lucide-react';
import type { Bi } from '@/src/data/bilingualBooks';
import type { APStepIcon } from '@/src/data/articlePipeline';

const ICONS: Record<APStepIcon, LucideIcon> = {
  intent: Target,
  draft: PenLine,
  review: ListChecks,
  lint: FileCheck2,
  editor: MousePointerClick,
  recover: GitCompare,
};

interface Props {
  steps: Array<{ icon: APStepIcon; label: Bi }>;
  lang: keyof Bi;
  /** 一覧ページ用: 矢印なしの3列グリッド（半分の幅に収める） */
  compact?: boolean;
}

/** 6工程の流れ。Bilingual Books の ProcessDiagram と同じ見た目（丸アイコン＋番号＋ラベル＋矢印）。 */
export default function ProcessDiagram({ steps, lang, compact = false }: Props) {
  const labelFont = lang === 'jp' ? 'font-noto-sans-jp font-medium' : 'font-space-grotesk font-semibold';
  const ariaLabel = lang === 'jp' ? '記事づくりの流れ' : 'How an article moves through the pipeline';

  if (compact) {
    return (
      <ol className="grid grid-cols-3 gap-x-4 gap-y-8" aria-label={ariaLabel}>
        {steps.map((step, i) => {
          const Icon = ICONS[step.icon];
          return (
            <li key={step.icon} className="flex flex-col items-center text-center min-w-0">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-surface-muted flex items-center justify-center mb-3 text-ink-secondary">
                <Icon className="size-7 md:size-8 shrink-0" strokeWidth={1.5} aria-hidden />
              </div>
              <span className="font-space-grotesk text-label text-ink-tertiary">{String(i + 1).padStart(2, '0')}</span>
              <span className={`text-body text-ink ${labelFont}`}>{step.label[lang]}</span>
            </li>
          );
        })}
      </ol>
    );
  }

  return (
    <ol className="flex flex-wrap justify-center gap-4 md:gap-2" aria-label={ariaLabel}>
      {steps.map((step, i) => {
        const Icon = ICONS[step.icon];
        return (
          <React.Fragment key={step.icon}>
            <li className="flex flex-col items-center text-center w-[calc(33%-12px)] md:w-auto md:flex-1">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-surface-muted flex items-center justify-center mb-3 text-ink-secondary">
                <Icon className="size-7 md:size-8 shrink-0" strokeWidth={1.5} aria-hidden />
              </div>
              <span className="font-space-grotesk text-label text-ink-tertiary">{String(i + 1).padStart(2, '0')}</span>
              <span className={`text-body text-ink ${labelFont}`}>{step.label[lang]}</span>
            </li>
            {i < steps.length - 1 && (
              <li aria-hidden className="hidden md:flex items-start pt-5 text-ink-tertiary text-body shrink-0">
                →
              </li>
            )}
          </React.Fragment>
        );
      })}
    </ol>
  );
}
