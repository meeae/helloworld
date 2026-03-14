/** @type {import('tailwindcss').Config} */
const config = {
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
          danger: '#C8290A',
          warning: '#854F0B',
          safe: '#3B6D11',
          info: '#185FA5',
        },
      },
    },
  },
  plugins: [],
}

module.exports = config
