/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'side': {
          DEFAULT: '#5F68F6',
          dark: '#787ff6',
        },
        'main': {
          DEFAULT: '#5F68F6',
          // DEFAULT: '#1ca7ec',
          light: '#F3F3F6',
          // light: '#FFF',
        },
        'chat': {
          DEFAULT: '#787ff6',
        },
      }
    },
  },
  plugins: [],
}

