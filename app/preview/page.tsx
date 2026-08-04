// /preview — 2案の入口。判断材料（何が同じで、何が違うか）をここに置く。
//
// 決着（2026-08-04）: 案A / 案B のどちらも全面採用しなかった。
// 本番に取り込んだのは **地色 salt #ebe8de だけ**（+ それに合わせたニュートラルの
// 振り直しと WCAG 再調整）。案Aの Instrument Serif、アーチ/ドームのメディア、
// マーキー帯、案Bの紙スラブは採用していない。
//
// このツリーを残しているのは、次にアートディレクションを触るときの出発点として。
// app/[locale]/ の兄弟なのでサイトのトークンも chrome も継承せず、本番への影響はゼロ。
// スタイルは全て .pv 配下にスコープされている（preview.css 参照）。
// middleware.ts の matcher が /preview を除外しているのは、next-intl が
// /en/preview へリライトして404になるのを防ぐため。
//
// 実機で見るときは写真が無い点に注意。案Aの帯とアーチは本来「写真が入る枠」で、
// public/preview-photos/ に hero.jpg / harbor-1〜3.jpg を置けば差し込まれる。
// 無い場合は同色域のグラデーションに落ちるので、今見えているものは案Aの実力ではない。
import Link from 'next/link';
import Switcher from './Switcher';

const SHARED = [
  '地色 salt #ebe8de（純白 #fcfbfc をやめる）',
  '墨 #2b2b2b（純黒 #0a0a0a をやめる — これだけで硬さが取れる）',
  'アクセントは珊瑚 #ea677e と海青 #85a9c0 の2色のみ',
  '紙の粒子を mix-blend-mode: multiply で全面に薄く',
  'easing は ease-out (0,0,.2,1) 1種、duration は .2 / .5 / .6s のみ',
  'スクロール表現は opacity + translateY を delay .2s でずらすだけ',
];

export default function PreviewIndex() {
  return (
    <div className="pv pv-grain">
      <div className="pv-index pv-shell">
        <h1>Art Direction Preview</h1>
        <p className="pv-index__lead">
          seremoni.com のアートディレクションを、ポートフォリオのトップページに適用した2案。
          本番のページ・デザイントークンには一切影響していない（このディレクトリを消せば元通り）。
          共通の土台は同じで、<strong>「写真にどれだけ依存するか」</strong>と
          <strong>「ディスプレイセリフを入れるか」</strong>の2軸だけが違う。
        </p>

        <div className="pv-index__cards">
          <Link href="/preview/a" className="pv-index__card">
            <h2>案A — Harbor</h2>
            <p>
              写真主導。全面クリーム地に、ドーム / アーチ型のメディアと高コントラストの
              ディスプレイセリフ。マーキー帯あり。seremoni に最も近いが、
              <strong>良い写真が無いと成立しない</strong>。
            </p>
            <div className="pv-index__swatches">
              <span className="pv-index__swatch" style={{ background: '#ebe8de' }} />
              <span className="pv-index__swatch" style={{ background: '#2b2b2b' }} />
              <span className="pv-index__swatch" style={{ background: '#ea677e' }} />
              <span className="pv-index__swatch" style={{ background: '#85a9c0' }} />
            </div>
          </Link>

          <Link href="/preview/b" className="pv-index__card">
            <h2>案B — Paper &amp; Light</h2>
            <p>
              質感主導。光を写真ではなく「地の裏の暖色レイヤー + 紙の粒子」で作り、
              その上に紙のスラブを浮かせる。見出しは既存の Switzer のまま字間だけ締める。
              <strong>写真ゼロでも成立し、写真が増えるほど良くなる</strong>。
            </p>
            <div className="pv-index__swatches">
              <span className="pv-index__swatch" style={{ background: '#ebe8de' }} />
              <span className="pv-index__swatch" style={{ background: '#f7f5ee' }} />
              <span className="pv-index__swatch" style={{ background: '#2b2b2b' }} />
              <span className="pv-index__swatch" style={{ background: '#85a9c0' }} />
            </div>
          </Link>
        </div>

        <h2 style={{ marginBottom: 16 }}>2案で共通している土台</h2>
        <ul className="pv-index__lead" style={{ paddingLeft: '1.2em', marginBottom: 48 }}>
          {SHARED.map((line) => (
            <li key={line} style={{ marginBottom: 6 }}>
              {line}
            </li>
          ))}
        </ul>

        <div className="pv-index__note">
          <strong>自分で撮った写真を入れるには</strong>
          <br />
          コードを触らずに差し替えられる。
          <code>public/preview-photos/</code> に次の名前で置いてリロードするだけ:
          <br />
          <code>hero.jpg</code>（ヒーロー全面 / 光・海・空）、
          <code>harbor-1.jpg</code>
          <code>harbor-2.jpg</code>
          <code>harbor-3.jpg</code>（ドーム3連 / 港・街・手元）。
          <br />
          ファイルが無い間は、同じ色域のグラデーションに自動で落ちる。
        </div>
      </div>

      <Switcher current="index" />
    </div>
  );
}
