/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'oswald': ['Oswald', 'sans-serif'],
      },
      colors: {
        'pvf-red': '#EB1017',
        'pvf-red-light': '#F1585D',
        'pvf-red-lighter': '#F15C61',
        'pvf-red-pale': '#F49393',
        'pvf-red-button': '#E81919',
        'pvf-red-border': '#EB4345',
        'pvf-red-google': '#F07272',
        'pvf-red-google-text': '#F38B8B',
        'gray-text': '#7B838C',
        'gray-placeholder': '#A3A9AE',
        'gray-light': '#9FA5AB',
        'gray-border': '#E0E3E4',
        'gray-border-2': '#E2E4E7',
        'gray-remember': '#A4A9AF',
        'gray-subtitle': '#969696',
      }
    },
  },
  plugins: [],
}

