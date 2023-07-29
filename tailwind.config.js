/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'side': {
          DEFAULT: '#787ff6',
          dark: '#0e7490',
        },
        'main': {
          DEFAULT: '#1ca7ec',
          dark: '#1ca7ec',
        },
        'chat': {
          DEFAULT: '#00927e',
        },
      }
    },
  },
  plugins: [],
}

