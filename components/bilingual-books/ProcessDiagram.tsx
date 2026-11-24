import React from 'react';
import { AudioLines, CalendarClock, Component, Rows3, ScrollText, type LucideIcon } from 'lucide-react';
import type { BBStepIcon, Bi } from '@/src/data/bilingualBooks';

const ICONS: Record<BBStepIcon, LucideIcon> = {
  rights: ScrollText,
  chunks: Rows3,
  audio: AudioLines,
  cover: Component,
  release: CalendarClock,
};

interface Props {
  steps: Array<{ icon: BBStepIcon; label: Bi }>;
  lang: keyof Bi;
}

/** 5工程の流れ。Podcast Notes の PipelineSection と同じ見た目（丸アイコン＋ラベル＋矢印）。 */
export default function ProcessDiagram({ steps, lang }: Props) {
  return (
    <ol className="flex flex-wrap justify-center gap-x-5 gap-y-8 md:gap-2" aria-label={lang === 'jp' ? '作り方の流れ' : 'How it is made'}>
      {steps.map((step, i) => {
        const Icon = ICONS[step.icon];
        return (
          <React.Fragment key={step.icon}>
            <li className="flex flex-col items-center text-center min-w-[88px] md:min-w-0 md:flex-1">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-surface-muted flex items-center justify-center mb-3 text-ink-secondary">
                <Icon className="size-7 md:size-8 shrink-0" strokeWidth={1.5} aria-hidden />
              </div>
              <span className="font-space-grotesk text-label text-ink-tertiary">{String(i + 1).padStart(2, '0')}</span>
              <span className={`text-body text-ink whitespace-nowrap ${lang === 'jp' ? 'font-noto-sans-jp font-medium' : 'font-space-grotesk font-semibold'}`}>
                {step.label[lang]}
              </span>
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
