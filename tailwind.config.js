const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'header': ['Oswald', ...defaultTheme.fontFamily.sans],
        'sans': ['Source Sans Pro', ...defaultTheme.fontFamily.sans],
      },
      transitionDuration: {
        '6000': '6000ms',
      }
    },
  },
  plugins: [],
};
