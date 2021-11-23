module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      FontFace: {
        roboto: ['"Roboto"', 'sans-serif'],
        comforter: ['Comforter Brush', 'cursive']
      }
    }
  },
  variants: {
    extend: {
      tableLayout: ['responsive', 'hover', 'focus'],
    },
  },
  plugins: [],
}
