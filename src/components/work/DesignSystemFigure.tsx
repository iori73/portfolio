import { Shippori_Mincho, Noto_Serif_JP, Roboto } from 'next/font/google';

// 先方サイトのテーマが使う3書体。この図の見本の表示にだけ読み込む（他のページには影響しない）。
const shippori = Shippori_Mincho({ weight: '400', preload: false, display: 'swap' });
const notoSerif = Noto_Serif_JP({ weight: '400', preload: false, display: 'swap' });
const roboto = Roboto({ weight: '400', subsets: ['latin'], display: 'swap' });

export type DesignSystemData = {
  fontsTitle: string;
  fonts: { role: string; name: string; text: string[] }[];
  sizesTitle: string;
  sizes: string[];
  colorsTitle: string;
  colors: [string, string][];
  spacingTitle: string;
  spacing: number[];
  maxWidth: string;
};

/**
 * 先方サイトのテーマのデザインシステムの図（フォント・文字サイズ・色・余白）。画像でなく文字として組む。
 * 書体の見本は実際のフォントで表示し、色は HEX を文字で、余白は実寸の四角で示す。
 * 数値・文言は messages の `nakahatsuSy.dsFig`。Figma の `Figure/Design system` と同じ内容（片方を直したらもう片方も直す）。
 *
 * 2026-11-06 河野さんの指示: 2列の面に背景色を付けない（上のカラーパレットと、面の見え方が重なるため）。
 * 文字は図の規則（見出し 17px 以上、説明 14px 以上）のうち、読みやすい側（本文 17px）に。間隔は Tailwind の 8px 刻み（gap-3/4/6/10/12）。
 */
export default function DesignSystemFigure({ f, label }: { f: DesignSystemData; label: string }) {
  const fontClass = [shippori.className, notoSerif.className, roboto.className];
  const section = 'text-body-lg font-medium text-ink';
  return (
    <figure aria-label={label} className="grid w-full gap-12 md:grid-cols-2 md:gap-10">
      <div className="flex flex-col gap-10">
        <p className={section}>{f.fontsTitle}</p>
        {f.fonts.map((ft, i) => (
          <div key={ft.name} className="flex flex-col gap-3">
            <p className="text-body text-ink-tertiary">{ft.role}</p>
            <p className={`${fontClass[i]} text-[32px] leading-[1.4] text-ink`}>{ft.name}</p>
            <div className="flex flex-col gap-3">
              {ft.text.map((p) => (
                <p key={p} className="text-body text-ink-secondary">{p}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <p className={section}>{f.sizesTitle}</p>
          <ul className="flex flex-col gap-3">
            {f.sizes.map((s) => (
              <li key={s} className="text-body text-ink">{s}</li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-4">
          <p className={section}>{f.colorsTitle}</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-6">
            {f.colors.map(([name, hex]) => (
              <li key={hex} className="flex items-center gap-4">
                <span aria-hidden="true" className="h-14 w-14 shrink-0 border border-[#dad6ce]" style={{ backgroundColor: hex }} />
                <span className="flex flex-col gap-1">
                  <span className="text-body text-ink">{name}</span>
                  <span className={`${roboto.className} text-body text-ink-tertiary`}>{hex}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-6">
          <p className={section}>{f.spacingTitle}</p>
          <div className="flex items-end justify-between gap-6">
            <ul className="flex items-end gap-6">
              {f.spacing.map((n) => (
                <li key={n} className="flex flex-col items-center gap-3">
                  <span aria-hidden="true" className="block bg-ink" style={{ width: n, height: n }} />
                  <span className={`${roboto.className} text-body text-ink-tertiary`}>{n}</span>
                </li>
              ))}
            </ul>
            {/* 本文の最大幅の図（Figma 586:861 の型）: 画面（1440x1024 の比率）を実線の枠で、内側の 1280 幅を点線のガイドで示し、
                ガイドの幅に合わせた目盛りの下に「1280」。地は透明（図の面の色が見える）。 */}
            <div className="flex w-36 flex-col items-center gap-2" aria-hidden="true">
              <span className="relative block h-[102px] w-full rounded-[2px] border-2 border-[#212629]">
                <span className="absolute inset-y-0 left-[6px] right-[6px] border-x border-dashed border-[#21272a]" />
              </span>
              <span className="block h-2 w-32 border-x border-b border-[#6b665c]" />
              <span className="text-body text-ink-tertiary">{f.maxWidth}</span>
            </div>
          </div>
        </div>
      </div>
    </figure>
  );
}
