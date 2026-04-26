import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F4EFE6',
        'paper-deep': '#ECE5D6',
        'paper-warm': '#E8DFCC',
        ink: '#0D2A35',
        teal: '#1A4856',
        'teal-deep': '#0F3340',
        'teal-soft': '#2C6478',
        'teal-pale': '#BFD2D8',
        signal: '#D8553A',
        'signal-soft': '#E58A6F',
        rule: 'rgba(13, 42, 53, 0.16)',
        'rule-soft': 'rgba(13, 42, 53, 0.08)',
        muted: '#6B7C82',
        'on-deep': '#F4EFE6',
        'on-deep-mute': 'rgba(244, 239, 230, 0.60)',
      },
      fontFamily: {
        sans: ['var(--font-geist)', 'sans-serif'],
        serif: ['var(--font-newsreader)', 'serif'],
        mono: ['var(--font-plex)', 'monospace'],
      },
      borderRadius: {
        pill: '999px',
        lg: '14px',
        md: '12px',
        sm: '8px',
        xs: '6px',
      },
      transitionDuration: {
        fast: '160ms',
        base: '250ms',
      },
    },
  },
  plugins: [],
};

export default config;
