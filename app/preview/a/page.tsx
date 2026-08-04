// 案A「Harbor」— 写真主導 / ディスプレイセリフ導入
//
// seremoni に最も忠実な方向。全面クリーム地、アーチ・ドーム型のメディア、
// 高コントラストのディスプレイセリフ（Instrument Serif = Store Norske Gangster
// の代替。あちらは商用フォントのため）、マーキー、珊瑚と海青のアクセント。
//
// コピーは既存 messages/en.json の文言をそのまま使用（新規の一人称コピーは書かない）。
import Reveal from '../Reveal';
import Switcher from '../Switcher';

const NAV = ['About', 'Work', 'Experiment', 'Blog'];

const MARQUEE = [
  'DESIGN SYSTEMS',
  'UI',
  'CONTEXT ENGINEERING',
  'FIGMA PLUGINS',
  'BILINGUAL EN / JP',
  'PROTOTYPING',
];

export default function PreviewA() {
  return (
    <div className="pv pv-a">
      <Reveal />

      {/* ── ナビ ───────────────────────────────────────────────── */}
      <header className="pv-nav">
        <nav className="pv-nav__links">
          {NAV.map((item) => (
            <a key={item} href="#" className="pv-nav__link pv-caps">
              <span className="pv-nav__dot" />
              {item}
            </a>
          ))}
        </nav>
        <span className="pv-wordmark pv-serif">Iori Kawano</span>
        <a href="#" className="pv-cta pv-caps">
          Get in touch
          <span aria-hidden>▸</span>
        </a>
      </header>

      {/* ── ヒーロー: 光（写真スロット / 無ければグラデーション） ── */}
      <section className="pv-hero pv-light pv-light--hero pv-grain">
        <div className="pv-hero__scrim" />
        <div className="pv-hero__inner pv-shell">
          <h1 className="pv-hero__title">Iori Kawano</h1>
          <p className="pv-hero__sub pv-caps">UI / UX Designer — Tokyo</p>
        </div>
      </section>

      {/* ── イントロ: EN / JP ─────────────────────────────────── */}
      <section className="pv-intro pv-shell">
        <div className="pv-intro__grid">
          <div className="pv-reveal">
            <p className="pv-intro__lead">
              Curiosity drives my work and life. I explore what makes design meaningful today, when
              anyone can create.
            </p>
          </div>
          <div className="pv-reveal" data-delay="1">
            <p className="pv-intro__jp pv-jp">
              好奇心が私の仕事と人生を動かしています。
              <br />
              誰もがつくれる時代に、デザインに「意味」をもたらすものを探っています。
            </p>
          </div>
        </div>
      </section>

      {/* ── ドーム3連 ─────────────────────────────────────────── */}
      <section className="pv-shell">
        <div className="pv-domes">
          {[
            { label: 'Work', light: 'pv-light--a' },
            { label: 'Experiment', light: 'pv-light--b' },
            { label: 'Blog', light: 'pv-light--c' },
          ].map((dome, i) => (
            <a key={dome.label} href="#" className="pv-dome pv-reveal" data-delay={String(i + 1)}>
              <div className={`pv-dome__media pv-light pv-grain ${dome.light}`} />
              <p className="pv-dome__label pv-caps">{dome.label}</p>
            </a>
          ))}
        </div>
      </section>

      {/* ── マーキー（seremoni 唯一の keyframes を踏襲） ────────── */}
      <div className="pv-marquee">
        <div className="pv-marquee__track pv-caps">
          {[0, 1].map((dup) => (
            <span key={dup} className="pv-marquee__item" aria-hidden={dup === 1}>
              {MARQUEE.map((word) => (
                <span key={word}>
                  {word} <span style={{ color: 'var(--coral)' }}>✳</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── Work ─────────────────────────────────────────────── */}
      <section className="pv-work pv-shell">
        <h2 className="pv-section-title pv-reveal">Selected work</h2>
        <p className="pv-section-sub pv-reveal" data-delay="1">
          Design and development case studies, in English and Japanese.
        </p>

        <article className="pv-entry pv-reveal">
          <div className="pv-entry__media">
            <img src="/work/ukiyoe/thumbnail-en.webp" alt="Ukiyoe: Layer by Layer" />
          </div>
          <div className="pv-entry__head">
            <h3 className="pv-entry__title">Ukiyoe: Layer by Layer</h3>
            <span className="pv-tag">UI</span>
            <span className="pv-tag">Context Engineering</span>
          </div>
          <p className="pv-entry__desc">
            Experiencing the evolution of woodblock printing through interactive animation
          </p>
          <p className="pv-entry__desc">
            An interactive web experience that visualizes the evolution of ukiyoe woodblock printing
            techniques — from monochrome sumizuri-e to the full-color nishiki-e — through
            scroll-driven layer animations and a curated artwork timeline.
          </p>
        </article>

        <article className="pv-entry pv-reveal">
          <div className="pv-entry__media pv-light pv-light--b pv-grain" />
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
        </article>
      </section>

      {/* ── フッター ──────────────────────────────────────────── */}
      <footer className="pv-footer pv-shell">
        <div className="pv-footer__row">
          <p className="pv-footer__mark pv-serif">Iori Kawano</p>
          <div className="pv-footer__meta pv-caps">
            <p style={{ margin: 0 }}>X · GitHub · Note · LinkedIn · Behance</p>
          </div>
        </div>
      </footer>

      <Switcher current="a" />
    </div>
  );
}
