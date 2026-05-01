import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1e3a5f',
          light: '#2d5282',
          900: '#112238',
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        premium: '0 4px 20px -2px rgba(30, 58, 95, 0.05), 0 12px 40px -4px rgba(30, 58, 95, 0.08)',
        'premium-hover': '0 10px 30px -4px rgba(30, 58, 95, 0.08), 0 20px 60px -8px rgba(30, 58, 95, 0.12)',
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.1)',
      },
    },
  },
  plugins: [],
} satisfies Config
