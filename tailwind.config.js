module.exports = {
  purge: ["./src/**/*.svelte"],
  darkMode: false, // or 'media' or 'class'
  theme: {

    extend: {
      screens: {
        '3xl': '1800px'
      },
      gridTemplateColumns: {
        '20': 'repeat(20, minmax(0, 1fr))',
        '25': 'repeat(25, minmax(0, 1fr))'
      },
      fontSize: {
      '10xl': '10rem',
      '11xl': '11rem',
      '12xl': '12rem',
      '13xl': '13rem',
      '14xl': '14rem',
      '15xl': '15rem'
     }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
