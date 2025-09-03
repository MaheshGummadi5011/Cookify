// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Add 'Inter' to the sans-serif font family
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        // Add some custom brand colors
        'primary': '#3B82F6', // Blue-500
        'primary-hover': '#2563EB', // Blue-600
      }
    },
  },
  plugins: [],
}