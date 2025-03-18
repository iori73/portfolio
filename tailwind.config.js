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
        white: '#ffffff',
        black: '#000000',
        gray: {
          100: '#f2f2f2',
          200: '#ebebeb',
          300: '#e3e3e3',
          800: '#2d2d2d',
          900: '#2a2929',
        },
        blue: {
          900: '#002a38',
        },
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
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
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
        'sf-pro': ['"SF Pro"', 'system-ui', 'sans-serif'],
        'sf-mono': ['"SF Mono"', 'ui-monospace', 'monospace'],
      },

      fontSize: {
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
