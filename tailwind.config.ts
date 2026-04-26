import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        'paper-deep': 'var(--paper-deep)',
        'paper-warm': 'var(--paper-warm)',
        ink: 'var(--ink)',
        teal: 'var(--teal)',
        'teal-deep': 'var(--teal-deep)',
        'teal-soft': 'var(--teal-soft)',
        'teal-pale': 'var(--teal-pale)',
        signal: 'var(--signal)',
        'signal-soft': 'var(--signal-soft)',
        rule: 'var(--rule)',
        'rule-soft': 'var(--rule-soft)',
        muted: 'var(--muted)',
        'on-deep': 'var(--on-deep)',
        'on-deep-mute': 'var(--on-deep-mute)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Geist', 'Söhne', '-apple-system', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Newsreader', 'Iowan Old Style', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'IBM Plex Mono', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        pill: '999px',
      },
    },
  },
  plugins: [],
};

export default config;
