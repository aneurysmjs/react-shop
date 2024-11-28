const path = require('node:path');
const tailwindcssForms = require('@tailwindcss/forms');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  /**
   * @see https://github.com/tailwindlabs/tailwindcss/issues/6393#issuecomment-1080723375
   */
  content: ['./*.html', './src/**/*.tsx'],
  plugins: [tailwindcssForms],
  theme: {
    extend: {
      animation: {
        pulse: 'pulse 1.5s infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
};
