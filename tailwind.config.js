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
        merriweather: ['Merriweather Sans', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
        'space-mono': ['Space Mono', 'ui-monospace', 'monospace'],
        'jetbrains-mono': ['JetBrains Mono', 'ui-monospace', 'monospace'],
        'sf-pro': ['"SF Pro"', 'system-ui', 'sans-serif'],
        'sf-mono': ['"SF Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // カスタムサイズ（既存のTailwindクラスと重複しない名前）
        'custom-h1': ['2.5rem', { lineHeight: '1.1', fontWeight: '700' }], // 40px
        'custom-h2': ['1.75rem', { lineHeight: '1.2', fontWeight: '600' }], // 28px
        'custom-h3': ['1.5rem', { lineHeight: '1.2', fontWeight: '500' }], // 24px
        'custom-body': ['1.25rem', { lineHeight: '1.6', fontWeight: '400' }], // 20px
        // 注意: 'sm'を上書きすると text-sm (Tailwindデフォルト: 14px) が 16px になります
        // もし意図的でない場合は、'custom-sm'などに変更してください
        /* Heading */
        'heading-xl-m-120': [
          '56px',
          {
            lineHeight: '120%',
            fontWeight: '600',
          },
        ],
        'heading-l-120': [
          '48px',
          {
            lineHeight: '120%',
            fontWeight: '600',
          },
        ],
        'heading-m-120': [
          '40px',
          {
            lineHeight: '120%',
            fontWeight: '600',
          },
        ],
        'heading-s-120': [
          '32px',
          {
            lineHeight: '120%',
            fontWeight: '600',
          },
        ],
        'heading-xs-120': [
          '28px',
          {
            lineHeight: '120%',
            fontWeight: '600',
          },
        ],
        'heading-xxs-120': [
          '24px',
          {
            lineHeight: '120%',
            fontWeight: '600',
          },
        ],
        'heading-xxxs-120': [
          '21px',
          {
            lineHeight: '120%',
            fontWeight: '600',
          },
        ],
        /* Body */
        'body-xxxxl-140': [
          '40px',
          {
            lineHeight: '140%',
            fontWeight: '400',
          },
        ],
        'body-xxxl-140': [
          '32px',
          {
            lineHeight: '140%',
            fontWeight: '400',
          },
        ],
        'body-xxl-140': [
          '28px',
          {
            lineHeight: '140%',
            fontWeight: '400',
          },
        ],
        'body-xl-140': [
          '24px',
          {
            lineHeight: '140%',
            fontWeight: '400',
          },
        ],
        'body-l-140': [
          '21px',
          {
            lineHeight: '140%',
            fontWeight: '400',
          },
        ],
        'body-m-140': [
          '18px',
          {
            lineHeight: '140%',
            fontWeight: '400',
          },
        ],
        'body-s-140': [
          '16px',
          {
            lineHeight: '140%',
            fontWeight: '400',
          },
        ],
        'body-xs-140': [
          '14px',
          {
            lineHeight: '140%',
            fontWeight: '400',
          },
        ],
        /* Caption */
        'caption-xl-120': [
          '24px',
          {
            lineHeight: '120%',
            fontWeight: '400',
          },
        ],
        'caption-l-120': [
          '21px',
          {
            lineHeight: '120%',
            fontWeight: '400',
          },
        ],
        'caption-m-120': [
          '18px',
          {
            lineHeight: '120%',
            fontWeight: '400',
          },
        ],
        'caption-s-120': [
          '16px',
          {
            lineHeight: '120%',
            fontWeight: '400',
          },
        ],
        'caption-xs-120': [
          '14px',
          {
            lineHeight: '120%',
            fontWeight: '400',
          },
        ],
        'caption-xxs-120': [
          '12px',
          {
            lineHeight: '120%',
            fontWeight: '400',
          },
        ],
        'caption-xxxs-120': [
          '10px',
          {
            lineHeight: '120%',
            fontWeight: '400',
          },
        ],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
