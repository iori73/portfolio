// 案B「Paper & Light」— 質感主導 / 既存サンセリフ維持・写真は任意
//
// 光を「写真」ではなく「地の裏で常に光っている暖色レイヤー + 紙の粒子」で作る。
// 写真が1枚も無くても世界観が成立するのが案Aとの決定的な差。
// 見出しは既存の Switzer をそのまま大きく使い、字間だけ seremoni 由来の
// -0.045em（--tracking-tighter）で締める。既存タイポ資産を捨てない方向。
//
// コピーは既存 messages/en.json の文言をそのまま使用（新規の一人称コピーは書かない）。
import Reveal from '../Reveal';
import Switcher from '../Switcher';

const NAV = ['About', 'Work', 'Experiment', 'Blog'];

export default function PreviewB() {
  return (
    <div className="pv pv-b">
      <Reveal />

      {/* ── ナビ ───────────────────────────────────────────────── */}
      <header className="pv-nav">
        <span className="pv-wordmark" style={{ fontWeight: 500, letterSpacing: '-0.03em' }}>
          Iori Kawano
        </span>
        <nav className="pv-nav__links">
          {NAV.map((item) => (
            <a key={item} href="#" className="pv-nav__link pv-caps">
              {item}
            </a>
          ))}
        </nav>
        <a href="#" className="pv-cta pv-cta--pill pv-caps">
          Get in touch
        </a>
      </header>

      {/* ── ヒーロー: 光の上に浮かぶ紙スラブ ───────────────────── */}
      <section className="pv-hero pv-shell">
        <div className="pv-slab pv-hero__slab pv-grain pv-reveal">
          <h1 className="pv-hero__title">Iori Kawano</h1>
          <div className="pv-hero__grid">
            <p className="pv-hero__en">
              Curiosity drives my work and life. I explore what makes design meaningful today, when
              anyone can create.
            </p>
            <p className="pv-hero__jp pv-jp">
              好奇心が私の仕事と人生を動かしています。
              <br />
              誰もがつくれる時代に、デザインに「意味」をもたらすものを探っています。
            </p>
          </div>
        </div>
      </section>

      {/* ── 光の帯（写真を置けばここが実写になる） ───────────────── */}
      <section className="pv-shell">
        <div className="pv-lightband pv-light pv-light--hero pv-grain pv-reveal" />
      </section>

      {/* ── Work ─────────────────────────────────────────────── */}
      <section className="pv-work pv-shell">
        <h2 className="pv-section-title pv-reveal">Selected work</h2>
        <p className="pv-section-sub pv-reveal" data-delay="1">
          Design and development case studies, in English and Japanese.
        </p>

        <article className="pv-slab pv-entry pv-reveal">
          <div className="pv-entry__media">
            <img src="/work/ukiyoe/thumbnail-en.webp" alt="Ukiyoe: Layer by Layer" />
          </div>
          <div className="pv-entry__body">
            <div className="pv-entry__head">
              <h3 className="pv-entry__title">Ukiyoe: Layer by Layer</h3>
              <span className="pv-tag">UI</span>
              <span className="pv-tag">Context Engineering</span>
            </div>
            <p className="pv-entry__desc">
              Experiencing the evolution of woodblock printing through interactive animation
            </p>
            <p className="pv-entry__desc">
              An interactive web experience that visualizes the evolution of ukiyoe woodblock
              printing techniques — from monochrome sumizuri-e to the full-color nishiki-e — through
              scroll-driven layer animations and a curated artwork timeline.
            </p>
          </div>
        </article>

        <article className="pv-slab pv-entry pv-reveal">
          <div className="pv-entry__media pv-light pv-light--a pv-grain" />
          <div className="pv-entry__body">
            <div className="pv-entry__head">
              <h3 className="pv-entry__title">Figma Plugins &amp; Widgets</h3>
              <span className="pv-tag">Figma Plugin</span>
              <span className="pv-tag">AI Vibe Coding</span>
            </div>
            <p className="pv-entry__desc">
              Plugins and widgets born from real workflow problems — built through dialogue with AI.
            </p>
            <p className="pv-entry__desc">
              Personal utilities and enterprise design system infrastructure, all cultivated through
              vibe-coding.
            </p>
          </div>
        </article>
      </section>

      {/* ── 静かなタイポ帯（案A のマーキーに対応する位置） ───────── */}
      <section className="pv-quiet pv-shell pv-shell--narrow">
        <div className="pv-quiet__rule" />
        <p className="pv-quiet__text pv-jp pv-reveal">
          誰もがつくれる時代に、デザインに「意味」をもたらすものを探っています。
        </p>
      </section>

      {/* ── フッター ──────────────────────────────────────────── */}
      <footer className="pv-footer pv-shell">
        <div className="pv-footer__row">
          <p className="pv-footer__mark" style={{ fontWeight: 500, letterSpacing: '-0.045em' }}>
            Iori Kawano
          </p>
          <div className="pv-footer__meta pv-caps">
            <p style={{ margin: 0 }}>X · GitHub · Note · LinkedIn · Behance</p>
          </div>
        </div>
      </footer>

      <Switcher current="b" />
    </div>
  );
}
