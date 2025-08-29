/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0f1720',
        'card-bg': '#151c25',
        'muted': '#9fb0c3',
        'cyan': '#06b6d4',
        'cyan-dark': '#0891b2',
      }
    },
  },
  plugins: [],
}
