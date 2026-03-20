/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '*.{js,ts,jsx,tsx,mdx}',
    'app/**/*.{ts,tsx}',
    'components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
        },
        ink: {
          DEFAULT: 'var(--ink)',
          secondary: 'var(--ink-secondary)',
          tertiary: 'var(--ink-tertiary)',
          muted: 'var(--ink-muted)',
        },
        surface: {
          DEFAULT: 'var(--surface)',
          muted: 'var(--surface-muted)',
        },
        line: {
          subtle: 'var(--line-subtle)',
          section: 'var(--line-section)',
        },
        accent: {
          DEFAULT: '#007aff', // Appleブルー
        },
        white: '#ffffff',
        black: '#000000',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      // フォントファミリーとフォントサイズの拡張
      fontFamily: {
        switzer: [
          'Switzer',
          'Helvetica Neue',
          'Helvetica',
          '-apple-system',
          'sans-serif',
        ],
        'helvetica-neue': [
          'Helvetica Neue',
          'Helvetica',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
        merriweather: ['Merriweather Sans', 'system-ui', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'system-ui', 'sans-serif'],
        'noto-sans-jp': ['Noto Sans JP', 'sans-serif'],
      },
      fontSize: {
        /* ═══ New semantic scale (Spotify Encore-inspired) ═══ */
        /* Responsive sizes via CSS variables — no md: prefix needed */
        'display': ['var(--text-size-4xl)', { lineHeight: '1.1' }],
        'headline': ['var(--text-size-3xl)', { lineHeight: '1.2' }],
        'title-lg': ['var(--text-size-2xl)', { lineHeight: '1.2' }],
        'title': ['var(--text-size-xl)', { lineHeight: '1.25' }],
        'title-sm': ['var(--text-size-lg)', { lineHeight: '1.3' }],
        'body-lg': ['var(--text-size-lg)', { lineHeight: '1.6' }],
        'body': ['var(--text-size-base)', { lineHeight: '1.6' }],
        'body-sm': ['var(--text-size-sm)', { lineHeight: '1.5' }],
        'label': ['var(--text-size-sm)', { lineHeight: '1.3' }],
        'caption': ['var(--text-size-xs)', { lineHeight: '1.3' }],

        /* ═══ Legacy scale (kept for backward compatibility) ═══ */

        /* Body Scale — 本文・説明文 */
        /* NOTE: body-sm and body-lg are defined in the new semantic scale above */
        'body-xs': ['13px', { lineHeight: '1.5' }],
        'body-base': ['16px', { lineHeight: '1.6' }],
        'body-xl': ['20px', { lineHeight: '1.5' }],
        'body-2xl': ['24px', { lineHeight: '1.4' }],
        'body-3xl': ['28px', { lineHeight: '1.4' }],
        'body-4xl': ['32px', { lineHeight: '1.3' }],

        /* Heading Scale — 見出し（変更なし） */
        'heading-sm': ['21px', { lineHeight: '1.2' }],
        'heading-base': ['24px', { lineHeight: '1.2' }],
        'heading-lg': ['28px', { lineHeight: '1.2' }],
        'heading-xl': ['32px', { lineHeight: '1.2' }],
        'heading-2xl': ['40px', { lineHeight: '1.2' }],
        'heading-3xl': ['48px', { lineHeight: '1.2' }],
        'heading-4xl': ['56px', { lineHeight: '1.2' }],

        /* Caption Scale — ラベル・タグ・メタ */
        'caption-xs': ['11px', { lineHeight: '1.3' }],
        'caption-sm': ['12px', { lineHeight: '1.3' }],
        'caption-base': ['14px', { lineHeight: '1.3' }],
        'caption-lg': ['16px', { lineHeight: '1.3' }],
        'caption-xl': ['18px', { lineHeight: '1.3' }],
        'caption-2xl': ['20px', { lineHeight: '1.3' }],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
