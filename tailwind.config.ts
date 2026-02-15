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
        primary: '#3dd6f5',
        secondary: '#7f13ec',
        danger: '#f20d0d',
        surface: {
          dark: '#0a1628',
          darker: '#060e1a',
          glass: 'rgba(10, 22, 40, 0.7)',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        hebrew: ['Heebo', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(61, 214, 245, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(61, 214, 245, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
