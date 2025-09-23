/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#657997',
        secondary: {
          light: '#cec5b8',
          dark: '#d1d0cb',
        },
        accent: '#606060',
        brand: {
          white: '#ffffff',
        }
      },
      fontFamily: {
        'heading': ['Anton', 'sans-serif'],
        'body': ['Quicksand', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
