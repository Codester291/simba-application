module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {},
  variants: {
    extend: {
      tableLayout: ['responsive', 'hover', 'focus'],
    },
  },
  plugins: [],
}
