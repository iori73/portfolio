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
        'helvetica-neue': [
          'Helvetica Neue',
          'Helvetica',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
        merriweather: ['Merriweather Sans', 'system-ui', 'sans-serif'],
        'space-mono': ['Space Mono', 'ui-monospace', 'monospace'],
        'noto-sans-jp': ['Noto Sans JP', 'sans-serif'],
      },
      fontSize: {
        // shadcn/ui準拠: fontWeightは含めず、fontSizeとlineHeightのみ定義
        // fontWeightは別クラス（font-normal, font-medium, font-semibold, font-bold）で制御

        /* Body Scale (line-height: 1.4 = 140%) */
        'body-xs': ['14px', { lineHeight: '1.4' }],
        'body-sm': ['16px', { lineHeight: '1.4' }], // 旧: body-s-140
        'body-base': ['18px', { lineHeight: '1.4' }], // 旧: body-m-140
        'body-lg': ['21px', { lineHeight: '1.4' }], // 旧: body-l-140
        'body-xl': ['24px', { lineHeight: '1.4' }], // 旧: body-xl-140
        'body-2xl': ['28px', { lineHeight: '1.4' }], // 旧: body-xxl-140
        'body-3xl': ['32px', { lineHeight: '1.4' }], // 旧: body-xxxl-140
        'body-4xl': ['40px', { lineHeight: '1.4' }], // 旧: body-xxxxl-140

        /* Heading Scale (line-height: 1.2 = 120%) */
        'heading-sm': ['21px', { lineHeight: '1.2' }], // 旧: heading-xxxs-120
        'heading-base': ['24px', { lineHeight: '1.2' }], // 旧: heading-xxs-120
        'heading-lg': ['28px', { lineHeight: '1.2' }], // 旧: heading-xs-120
        'heading-xl': ['32px', { lineHeight: '1.2' }], // 旧: heading-s-120
        'heading-2xl': ['40px', { lineHeight: '1.2' }], // 旧: heading-m-120
        'heading-3xl': ['48px', { lineHeight: '1.2' }], // 旧: heading-l-120
        'heading-4xl': ['56px', { lineHeight: '1.2' }], // 旧: heading-xl-m-120

        /* Caption Scale (line-height: 1.2 = 120%) - 必要最小限のみ */
        'caption-xs': ['12px', { lineHeight: '1.2' }], // 旧: caption-xxs-120
        'caption-sm': ['14px', { lineHeight: '1.2' }], // 旧: caption-xs-120
        'caption-base': ['16px', { lineHeight: '1.2' }], // 旧: caption-s-120
        'caption-lg': ['18px', { lineHeight: '1.2' }], // 旧: caption-m-120
        'caption-xl': ['21px', { lineHeight: '1.2' }], // 旧: caption-l-120
        'caption-2xl': ['24px', { lineHeight: '1.2' }], // 旧: caption-xl-120
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
