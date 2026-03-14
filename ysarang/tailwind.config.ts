import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#D44A00',
          dark: '#A83800',
          light: '#FFF0E8',
        },
        status: {
          danger: '#C8290A', // D-7 이하, 긴급
          warning: '#854F0B', // D-8~14
          safe: '#3B6D11', // D-15 이상
          info: '#185FA5',
        },
      },
      fontFamily: {
        sans: [
          'Pretendard',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}

export default config

