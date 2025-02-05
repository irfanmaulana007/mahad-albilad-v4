import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './contexts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        '4xl': '2.25rem',
        '3xl': '1.875rem',
        '2xl': '1.43rem',
        xl: '1.28rem',
        lg: '1.14rem',
        base: '1rem',
        sm: '0.85rem',
        xs: '0.71rem',
        '2xs': '0.57rem',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: '#204a3e',
        'gray-light': '#adb3b8',
      },
    },
  },
  plugins: [],
} satisfies Config
