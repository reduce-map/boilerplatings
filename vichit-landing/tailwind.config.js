const colors = require('tailwindcss/colors')

// fix tailwind console errors
delete colors.lightBlue
delete colors.warmGray
delete colors.trueGray
delete colors.coolGray
delete colors.blueGray

module.exports = {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
      xanadu: '#678872',
    },
    extend: {
      screens: {
        lb: '992px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
