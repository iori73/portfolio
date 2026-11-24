import React from 'react';
import { ArrowDown, FileText } from 'lucide-react';
import type { Bi } from '@/src/data/bilingualBooks';
import { AP_IMG, AP_THUMB } from '@/src/data/articlePipeline';

interface Props {
  lang: keyof Bi;
  body: string;
  heading: string;
}

function Num({ n }: { n: number }) {
  return (
    <span className="relative inline-flex items-center justify-center shrink-0 w-6 h-6 rounded-full bg-ink text-surface font-space-grotesk text-label leading-none">
      {n}
    </span>
  );
}

function StepLabel({ n, children, heading }: { n: string; children: React.ReactNode; heading: string }) {
  return (
    <h3 className={`flex items-baseline gap-3 text-title mb-4 ${heading}`}>
      <span className="font-space-grotesk text-title-sm text-ink-tertiary">{n}</span>
      {children}
    </h3>
  );
}

function Down() {
  return (
    <div aria-hidden className="flex justify-center py-6 text-ink-tertiary">
      <ArrowDown className="size-6" strokeWidth={1.5} />
    </div>
  );
}

/** サムネイルの作り方の図解: 私が渡すもの → AI が型にはめ込む（型の枠と中身の対応）→ 私が仕上げる。 */
export default function ThumbnailExample({ lang, body, heading }: Props) {
  const T = AP_THUMB;
  return (
    <div>
      {/* A. 私が渡すもの */}
      <div>
        <StepLabel n="A" heading={heading}>
          {T.input.title[lang]}
        </StepLabel>
        <div className="flex items-start gap-4 rounded-media border border-line-subtle p-5 md:p-6">
          <FileText className="size-7 shrink-0 text-ink-secondary" strokeWidth={1.5} aria-hidden />
          <p className={`text-body-lg ${body}`}>{T.input.body[lang]}</p>
        </div>
      </div>

      <Down />

      {/* B. AI が型にはめ込む */}
      <div>
        <StepLabel n="B" heading={heading}>
          {T.fill.title[lang]}
        </StepLabel>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <figure className="min-w-0">
            {/* 型（スケルトン）: rules v3 の版面を % で描いた枠 */}
            <div
              className="relative w-full aspect-[1280/670] rounded-media bg-surface-muted border border-line-subtle overflow-hidden"
              role="img"
              aria-label={T.fill.templateCaption[lang]}
            >
              {T.slots.map((s, i) => (
                <div
                  key={s.label.en}
                  className="absolute border-2 border-dashed border-ink-tertiary rounded-sm flex items-center justify-center"
                  style={{ left: `${s.box.left}%`, top: `${s.box.top}%`, width: `${s.box.width}%`, height: `${s.box.height}%` }}
                >
                  <Num n={i + 1} />
                </div>
              ))}
            </div>
            <figcaption className={`mt-3 text-body text-ink-secondary ${body}`}>{T.fill.templateCaption[lang]}</figcaption>
          </figure>

          <ol className="flex flex-col gap-5 min-w-0">
            {T.slots.map((s, i) => (
              <li key={s.label.en} className="grid grid-cols-[1.5rem_1fr] gap-x-3">
                <Num n={i + 1} />
                <div className="min-w-0">
                  <p className={`text-body-lg font-medium ${body}`}>{s.label[lang]}</p>
                  <p className={`text-body text-ink-secondary ${body}`}>{s.rule[lang]}</p>
                  <p className={`mt-1 text-body text-ink break-words ${body}`}>
                    <span className="text-ink-tertiary">{lang === 'jp' ? 'この記事では：' : 'In this article: '}</span>
                    {s.value[lang]}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <Down />

      {/* C. 私が仕上げる */}
      <div>
        <StepLabel n="C" heading={heading}>
          {T.finish.title[lang]}
        </StepLabel>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <figure className="min-w-0">
            <img
              src={`${AP_IMG}/thumbnail-kamon.webp`}
              alt={T.finish.imageAlt[lang]}
              width={1280}
              height={670}
              loading="lazy"
              className="w-full h-auto rounded-media border border-line-subtle"
            />
            <figcaption className={`mt-3 text-body text-ink-secondary ${body}`}>
              {T.finish.caption[lang]}
              <span className="block mt-1 text-body-sm text-ink-tertiary">{T.finish.credit}</span>
            </figcaption>
          </figure>
          <ul className={`flex flex-col gap-3 text-body-lg list-disc pl-5 min-w-0 ${body}`}>
            {T.finish.items.map((it) => (
              <li key={it.en}>{it[lang]}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
