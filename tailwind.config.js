module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        '3k': '2500px',
        '4k': '3500px',
      },
      colors: {
        primary: '#3B790F',
        light: 'white',
        dark: '#111827',
        onprimary: 'white',
        onlight: 'black',
        ondark: 'white',
        osndark: '#D1D5DB',
        'gray-850': '#18212F',
        'gray-950': '#090C14'
      },
      spacing: {
        px: '1px',
        '1/2': '50%',
        full: '100%',
        '1/3': '33.3%',
        'screen-1/2': 'calc(100vh / 2)',
        'screen-1/3': 'calc(100vh / 3)',
        'screen-2/3': 'calc(2 * 100vh / 3)',
        'screen-1/4': 'calc(100vh / 4)',
        'screen-3/4': 'calc(3 * 100vh / 4)',
        wscreen: '100vw',
        page: 'calc(100vh - 4rem)',
      },
      minHeight: {
        page: 'calc(100vh - 12rem)',
      },
      maxHeight: {
        '144': '36rem'
      },
      backgroundImage: () => ({
        atlas: "url('resources/atlas.jpg')",
        cms: "url('resources/cms.jpg')",
        cdf: "url('resources/cdf.jpg')",
        delphi: "url('resources/delphi.jpg')",
        d0: "url('resources/d0.jpg')",
        opal: "url('resources/opal.jpeg')",
        l3: "url('resources/l3.jpg')",
        aleph: "url('resources/aleph.jpg')",
      }),
      fontFamily: {
        sans: ['Lato', 'Sans-serif'],
      },
    },
  },
  variants: {
    extend: {
      textOpacity: ['dark'],
      boxShadow: ['dark'],
      width: ['hover'],
      backgroundImage: ['dark'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
