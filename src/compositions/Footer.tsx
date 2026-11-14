// /src/compositions/Footer.tsx
'use client';

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

// Inline SVG icon components with fill: currentColor for flexible color control
const XIcon = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M31.8067 11.8125H35.9434L26.9082 22.1367L37.5371 36.1875H29.2168L22.6953 27.6679L15.2422 36.1875H11.0996L20.7617 25.1425L10.5723 11.8125H19.1035L24.9922 19.5996L31.8067 11.8125ZM30.3536 33.7148H32.6445L17.8555 14.1562H15.3945L30.3536 33.7148Z"
      fill="currentColor"
    />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M38.6223 38.6233H32.7729V28.3882C32.7729 25.5805 31.5342 24.0143 29.3129 24.0143C26.8956 24.0143 25.461 25.6463 25.461 28.3882V38.6233H19.6116V19.6125H25.461V21.7505C25.461 21.7505 27.2963 18.5304 31.4319 18.5304C35.5674 18.5304 38.6223 21.0544 38.6223 26.278V38.6233ZM12.9461 16.5723C10.9734 16.5723 9.375 14.9608 9.375 12.9734C9.375 10.986 10.9734 9.37598 12.9461 9.37598C14.9188 9.37598 16.5157 10.9875 16.5157 12.9734C16.5157 14.9593 14.9174 16.5723 12.9461 16.5723ZM9.375 38.6233H16.6868V19.6125H9.375V38.6233Z"
      fill="currentColor"
    />
  </svg>
);

const GitHubIcon = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g clipPath="url(#clip0_552_17870)">
      <path
        d="M17.379 36.4028C17.379 36.564 17.1935 36.6931 16.9597 36.6931C16.6936 36.7173 16.5081 36.5883 16.5081 36.4028C16.5081 36.2415 16.6936 36.1124 16.9274 36.1124C17.1694 36.0883 17.379 36.2173 17.379 36.4028ZM14.8709 36.0398C14.8145 36.2012 14.9758 36.3865 15.2178 36.435C15.4274 36.5156 15.6694 36.435 15.7178 36.2738C15.7661 36.1124 15.613 35.9269 15.371 35.8543C15.1613 35.7979 14.9274 35.8786 14.8709 36.0398ZM18.4355 35.9028C18.2017 35.9592 18.0404 36.1124 18.0645 36.2979C18.0887 36.4592 18.2985 36.564 18.5404 36.5076C18.7742 36.4512 18.9355 36.2979 18.9113 36.1366C18.8872 35.9834 18.6693 35.8786 18.4355 35.9028ZM23.742 5C12.5565 5 4 13.4918 4 24.6771C4 33.6206 9.62903 41.2736 17.6693 43.9671C18.7016 44.1527 19.0646 43.5155 19.0646 42.9914L19.0403 38.0399C19.0403 38.0399 13.3951 39.2495 12.2097 35.6367C12.2097 35.6367 11.2903 33.2898 9.96775 32.685C9.96775 32.685 8.12098 31.4191 10.0968 31.4432C10.0968 31.4432 12.1048 31.6044 13.2097 33.5238C14.9758 36.6366 17.9354 35.7414 19.0888 35.2092C19.2742 33.9189 19.7984 33.0237 20.3791 32.4915C15.871 31.9915 11.3226 31.3383 11.3226 23.5803C11.3226 21.3627 11.9355 20.2498 13.2258 18.8304C13.0161 18.3062 12.3306 16.145 13.4354 13.3547C15.121 12.8305 19 15.5321 19 15.5321C20.613 15.0805 22.3468 14.8467 24.0646 14.8467C25.7824 14.8467 27.5161 15.0805 29.1292 15.5321C29.1292 15.5321 33.0082 12.8225 34.6936 13.3547C35.7984 16.1531 35.1129 18.3062 34.9033 18.8304C36.1936 20.2578 36.9839 21.3708 36.9839 23.5803C36.9839 31.3626 32.234 31.9834 27.7258 32.4915C28.4678 33.1286 29.0968 34.3384 29.0968 36.2334L29.0727 42.9753C29.0727 43.4995 29.4435 44.1365 30.4677 43.951C38.5323 41.2736 44 33.6206 44 24.6771C44 13.4918 34.9274 5 23.742 5ZM11.8387 32.8141C11.7339 32.8947 11.7581 33.0802 11.8952 33.2335C12.0242 33.3625 12.2097 33.4189 12.3145 33.3142C12.4194 33.2335 12.3952 33.048 12.2581 32.8947C12.129 32.7656 11.9436 32.7094 11.8387 32.8141ZM10.9678 32.1609C10.9113 32.2657 10.9919 32.3948 11.1532 32.4754C11.2823 32.556 11.4436 32.5319 11.5 32.4189C11.5565 32.3141 11.4758 32.1851 11.3145 32.1045C11.1532 32.056 11.0242 32.0802 10.9678 32.1609ZM13.5806 35.0319C13.4516 35.1367 13.5 35.3786 13.6855 35.5317C13.871 35.7173 14.1049 35.7414 14.2096 35.6124C14.3145 35.5076 14.2661 35.2656 14.1049 35.1125C13.9275 34.9269 13.6855 34.9028 13.5806 35.0319ZM12.6613 33.8464C12.5323 33.927 12.5323 34.1367 12.6613 34.3221C12.7903 34.5076 13.0081 34.5883 13.1129 34.5076C13.2419 34.4028 13.2419 34.1931 13.1129 34.0077C13 33.8222 12.7903 33.7416 12.6613 33.8464Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="clip0_552_17870">
        <rect width="40" height="39" fill="white" transform="translate(4 5)" />
      </clipPath>
    </defs>
  </svg>
);

const NoteIcon = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Background with 80% opacity white and rounded corners */}
    <rect x="4" y="4" width="40" height="40" rx="4" fill="rgb(255 255 255 / 60%)" />
    <path
      d="M15.2793 15.3879C18.6412 15.3879 23.2434 15.2165 26.5482 15.3063C30.9791 15.4205 32.6519 17.3544 32.709 22.1198C32.7661 24.8207 32.709 32.5401 32.709 32.5401H27.9109V22.536C27.8538 20.6592 27.3234 19.7698 25.8791 19.5984C24.3532 19.427 20.0773 19.5739 20.0773 19.5739V32.5482H15.2793V15.3879Z"
      fill="currentColor"
    />
  </svg>
);

const MediumIcon = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g clipPath="url(#clip0_553_17889)">
      <path
        d="M8.3546 3.90967C6.35525 4.28651 4.5862 6.03463 4.15702 8.06538C3.94766 9.09122 3.94766 38.4639 4.15702 39.4897C4.59666 41.5728 6.36572 43.279 8.44881 43.6559C9.31763 43.8128 38.6903 43.8128 39.559 43.6559C41.6736 43.279 43.5054 41.4472 43.8823 39.3327C44.0392 38.4639 44.0392 9.09122 43.8823 8.2224C43.61 6.70457 42.5005 5.17628 41.1711 4.47493C39.7998 3.75266 40.6477 3.78406 23.9515 3.79453C14.9493 3.805 8.66863 3.84687 8.3546 3.90967ZM20.2355 16.5233C21.722 16.8793 23.4701 18.0621 24.3493 19.2974C25.3962 20.7628 25.8149 22.0609 25.8149 23.7775C25.8044 25.086 25.616 25.9024 25.0507 27.0749C22.6221 32.0889 15.6924 32.7274 12.3323 28.2578C11.317 26.9074 10.8773 25.5571 10.8773 23.7775C10.8773 22.0189 11.3274 20.6372 12.3428 19.2869C14.1747 16.8479 17.1894 15.7906 20.2355 16.5233ZM30.8917 16.963C33.4877 18.282 34.3671 24.7406 32.4828 28.645C31.6035 30.4769 30.316 31.1469 29.1017 30.3722C27.0605 29.0743 26.1184 24.2067 27.1547 20.3232C27.5839 18.7007 28.505 17.298 29.3739 16.9211C29.8449 16.7117 30.4312 16.7327 30.8917 16.963ZM36.0942 17.5597C37.3922 18.8681 37.5597 27.2214 36.3141 29.6185C36.0105 30.2152 35.6441 30.1629 35.3196 29.472C34.8276 28.4357 34.5658 26.426 34.5658 23.7252C34.5658 20.543 34.9219 18.3343 35.5499 17.6224C35.8012 17.3504 35.8744 17.3398 36.0942 17.5597Z"
        fill="currentColor"
      />
      {/* Internal 3 circles - transparent */}
      <path
        d="M20.2371 16.5264C21.7235 16.8824 23.4716 18.0651 24.3509 19.3005C25.3977 20.7659 25.8164 22.064 25.8164 23.7805C25.8059 25.0891 25.6175 25.9055 25.0523 27.078C22.6237 32.092 15.694 32.7305 12.3339 28.2608C11.3186 26.9105 10.8789 25.5602 10.8789 23.7805C10.8789 22.022 11.329 20.6403 12.3444 19.2899C14.1762 16.851 17.191 15.7937 20.2371 16.5264Z"
        fill="transparent"
      />
      <path
        d="M30.892 16.9815C33.488 18.3005 34.3673 24.7592 32.4831 28.6636C31.6038 30.4955 30.3163 31.1655 29.102 30.3908C27.0608 29.0928 26.1186 24.2252 27.155 20.3417C27.5842 18.7192 28.5053 17.3166 29.3741 16.9397C29.8452 16.7303 30.4315 16.7513 30.892 16.9815Z"
        fill="transparent"
      />
      <path
        d="M36.0948 17.5828C37.3928 18.8913 37.5602 27.2446 36.3146 29.6416C36.011 30.2383 35.6447 30.1861 35.3201 29.4952C34.8282 28.4589 34.5664 26.4491 34.5664 23.7484C34.5664 20.5661 34.9225 18.3575 35.5505 17.6456C35.8017 17.3735 35.875 17.363 36.0948 17.5828Z"
        fill="transparent"
      />
    </g>
    <defs>
      <clipPath id="clip0_553_17889">
        <rect width="40" height="40" fill="white" transform="translate(4 4)" />
      </clipPath>
    </defs>
  </svg>
);

// Source: simple-icons (raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/substack.svg), 24x24 viewBox scaled x2 to match this file's 48x48 convention.
// 2026-09-23: unlike the other icons here, the source glyph runs edge-to-edge in its
// own viewBox (no built-in padding), so at the same 40x40 render size it read visibly
// larger/heavier than X/GitHub/etc. Scaled down + centered in a group to match their
// effective padding instead of changing the shared svg width/height.
const SubstackIcon = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g transform="translate(6, 6) scale(0.75)">
      <path
        d="M45.078 16.484H2.92V10.812h42.16v5.672zM2.92 21.624V48L24 36.22 45.08 48V21.624H2.92zM45.08 0H2.92v5.672h42.16V0z"
        fill="currentColor"
      />
    </g>
  </svg>
);

// Platform data with width percentage (usage frequency) and opacity (posting frequency)
// Icon components use fill: currentColor for flexible color control
// widthPercent/opacity below (2026-09-23) are derived from 河野's actual usage
// description, not estimated: X/note/LinkedIn opened daily (equal tier, ~70/wk
// combined), GitHub used frequently but passively via Claude Code (not actively
// opened), Substack every 2-3 days, Medium every 4-5 days. Converted to a
// relative weekly-frequency score (X=note=LinkedIn=7, GitHub=5, Substack=7/2.5,
// Medium=7/4.5), then widthPercent = that score's share of 100 (Medium floored
// to 7 for min touch-target width, rest rescaled to still sum to 100), and
// opacity = that score min-max normalized to [0.15, 1.0].
// Note: this makes X/note/LinkedIn's opacity identical (all 1.0, solid black) —
// an honest result of them being reported as equally daily, not a bug.
const PLATFORM_DATA = [
  {
    id: 'twitter',
    name: 'X',
    href: 'https://twitter.com/iori73wsy',
    Icon: XIcon,
    widthPercent: 22.6,
    opacity: 1.0,
  },
  {
    id: 'note',
    name: 'note',
    href: 'https://note.com/io_73',
    Icon: NoteIcon,
    widthPercent: 22.6,
    opacity: 1.0,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/iori-kawano-131a4122a/',
    Icon: LinkedInIcon,
    widthPercent: 22.6,
    opacity: 1.0,
  },
  {
    id: 'github',
    name: 'GitHub',
    href: 'https://github.com/iori73',
    Icon: GitHubIcon,
    widthPercent: 16.1,
    opacity: 0.69,
  },
  {
    id: 'substack',
    name: 'Substack',
    href: 'https://substack.com/@iori67',
    Icon: SubstackIcon,
    widthPercent: 9.0,
    opacity: 0.34,
  },
  {
    id: 'medium',
    name: 'Medium',
    href: 'https://medium.com/@iori73',
    Icon: MediumIcon,
    widthPercent: 7.0, // floored for min touch-target width; raw share was ~5.1%
    opacity: 0.15,
  },
];

// Helper to pick a contrast-safe icon color for a block of the given posting-frequency
// opacity (2026-09-23, replaces a smooth white->dark gradient interpolated purely from
// `opacity`). That gradient could converge with the block's own background at mid-range
// opacity — e.g. GitHub at opacity 0.55 rendered an icon color and a composited
// background only ~23 RGB values apart, making the icon effectively invisible. Instead,
// composite the block's actual background (black at `opacity` over the footer's #EFF1F1
// ground) and pick whichever of white/dark ink has higher WCAG contrast against it. The
// "shade = posting frequency" encoding still lives entirely in the background; the icon
// glyph itself just needs to stay legible at any opacity.
const FOOTER_GROUND_CHANNEL = 0xef; // #EFF1F1
const ICON_DARK = { hex: '#151515', channel: 0x15 };

const srgbToLinear = (c: number): number => {
  const cs = c / 255;
  return cs <= 0.04045 ? cs / 12.92 : ((cs + 0.055) / 1.055) ** 2.4;
};

const grayRelativeLuminance = (channel: number): number => {
  const lin = srgbToLinear(channel);
  return 0.2126 * lin + 0.7152 * lin + 0.0722 * lin;
};

const contrastRatio = (l1: number, l2: number): number => {
  const [lighter, darker] = l1 >= l2 ? [l1, l2] : [l2, l1];
  return (lighter + 0.05) / (darker + 0.05);
};

const getIconColor = (opacity: number): string => {
  const bgChannel = FOOTER_GROUND_CHANNEL * (1 - opacity);
  const bgLum = grayRelativeLuminance(bgChannel);
  const whiteContrast = contrastRatio(bgLum, 1);
  const darkContrast = contrastRatio(bgLum, grayRelativeLuminance(ICON_DARK.channel));
  return whiteContrast >= darkContrast ? '#FFFFFF' : ICON_DARK.hex;
};

export default function Footer() {
  const t = useTranslations('footer');

  // 本文とフッターの間の余白（ページ root の my-24 の下マージン）が「意図された余白」に
  // 読めるよう上端に境界線を引く。ページ側の縦リズムは触らない。
  return (
    <footer className="w-full relative border-t border-line-section">
      <div className="w-full mx-auto">
        {/* Header Container */}
        <div className="flex flex-col items-start gap-3 pt-8 px-6">
          {/* Legend Container */}
          <div className="flex flex-col gap-2">
            {/* Legend Item 1: Width */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5 w-20 justify-between">
                <div className="w-3 h-3 bg-black/70" />
                <div className="w-6 h-3 bg-black/70" />
                <div className="w-9 h-3 bg-black/70" />
              </div>
              <span
                className="tracking-[-0.4px] font-space-grotesk text-caption text-ink"
                style={{ lineHeight: '1.164' }}
              >
                {t('legendSize')}
              </span>
            </div>

            {/* Legend Item 2: Color shades */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5 w-20 justify-between">
                <div className="w-3 h-3 bg-black/70" />
                <div className="w-3 h-3 bg-black/40" />
                <div className="w-3 h-3 bg-black/20" />
                <div className="w-3 h-3 bg-black/10" />
              </div>
              <span
                className="tracking-[-0.4px] font-space-grotesk text-caption text-ink"
                style={{ lineHeight: '1.164' }}
              >
                {t('legendColor')}
              </span>
            </div>
          </div>
        </div>

        {/* Treemap Section */}
        {/* Desktop: Single row (h-[80px]) */}
        {/* Mobile: Two rows (h-[160px]) with proper touch targets */}
        <div className="relative w-full h-[160px] md:h-[120px] mt-2 md:mt-4 overflow-hidden">
          {/* Background gradient (2026-09-22: aligned to --surface #EFF1F1, was #EAE9E1 —
              a hardcoded near-duplicate of the old --surface that had already drifted) */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, #EFF1F1 0%, #FFFFFF 100%)',
            }}
          />

          {/* Platform blocks - Desktop: single row, Mobile: treemap grid */}
          {/* Desktop layout */}
          <div className="relative hidden md:flex h-full items-center">
            {PLATFORM_DATA.map((platform) => {
              const IconComponent = platform.Icon;
              // Calculate icon color with smooth gradient from #FFFFFF to #151515 based on posting frequency
              const iconColor = getIconColor(platform.opacity);

              return (
                <Link
                  key={platform.id}
                  href={platform.href}
                  target="_blank"
                  rel="noreferrer"
                  className="h-full flex items-end justify-start p-4 transition-opacity hover:opacity-80"
                  style={{
                    width: `${platform.widthPercent}%`,
                    backgroundColor: `rgba(0, 0, 0, ${platform.opacity})`,
                    color: iconColor,
                  }}
                  aria-label={platform.name}
                >
                  {/* Icon - 40x40px with currentColor fill for flexible color control, opacity 100% */}
                  <div className="w-10 h-10 flex items-center justify-center" style={{ flexShrink: 0, opacity: 1 }}>
                    <IconComponent />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Mobile treemap layout - 2 rows */}
          {/* Row split is index-based (first half / remaining half, by count) and row
              totals are computed from PLATFORM_DATA below rather than hardcoded, so
              adding/removing a platform can't silently desync the normalization math. */}
          <div className="relative md:hidden h-full">
            {(() => {
              const splitIndex = Math.ceil(PLATFORM_DATA.length / 2);
              const row1 = PLATFORM_DATA.slice(0, splitIndex);
              const row2 = PLATFORM_DATA.slice(splitIndex);
              const row1Total = row1.reduce((sum, p) => sum + p.widthPercent, 0);
              const row2Total = row2.reduce((sum, p) => sum + p.widthPercent, 0);

              const renderRow = (row: typeof PLATFORM_DATA, rowTotal: number) => (
                <div className="flex h-1/2">
                  {row.map((platform) => {
                    const IconComponent = platform.Icon;
                    // Calculate icon color with smooth gradient from #FFFFFF to #151515 based on posting frequency
                    const iconColor = getIconColor(platform.opacity);

                    return (
                      <Link
                        key={platform.id}
                        href={platform.href}
                        target="_blank"
                        rel="noreferrer"
                        className="h-full flex items-end justify-start p-3 md:p-6 transition-opacity active:opacity-60"
                        style={{
                          width: `${(platform.widthPercent / rowTotal) * 100}%`, // Normalize to row total
                          backgroundColor: `rgba(0, 0, 0, ${platform.opacity})`,
                          color: iconColor,
                        }}
                        aria-label={platform.name}
                      >
                        {/* Icon - 40x40px with currentColor fill for flexible color control, opacity 100% */}
                        <div
                          className="w-10 h-10 flex items-center justify-center"
                          style={{ flexShrink: 0, opacity: 1 }}
                        >
                          <IconComponent />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              );

              return (
                <>
                  {renderRow(row1, row1Total)}
                  {renderRow(row2, row2Total)}
                </>
              );
            })()}
          </div>
        </div>

        {/* 終端バンド（copyright）は置かない。treemap より明るい面が最下段に来ると、
            バンドだけが浮いて見える（2026-08-04 実機で確認）。
            「ページの終わり」は treemap の色面そのものが担い、ラバーバンドは
            globals.css の overscroll-behavior-y: none で止めている。 */}
      </div>
    </footer>
  );
}
