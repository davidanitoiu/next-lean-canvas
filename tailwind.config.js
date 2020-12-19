module.exports = {
  purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateRows: {
        'textarea': 'auto 1fr',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
