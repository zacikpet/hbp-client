module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      translate: {
        menu0: '0px',
        menu1: '1px',
        menu2: '2px',
        menu3: '3px',
        menu4: '4px',
        menu5: '5px',
        menu6: '6px',
        menu7: '7px',
        menu8: '8px',
        menu9: '9px',
        menu10: '10px',
        menu11: '11px',
        menu12: '12px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
