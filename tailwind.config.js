module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        sidebar: '33.3%',
        '1/2': '50%',
        full: '100%',
        '1/3': '33.3%',
      },
      backgroundImage: () => ({
        atlas: "url('resources/atlas.jpg')",
        cms: "url('resources/cms.jpg')",
        delphi: "url('resources/delphi.jpg')",
      }),
      fontFamily: {
        sans: ['Ubuntu', 'Sans-serif'],
      },
      colors: {
        primary: 'red',
        light: '#3D52D5',
        dark: '#090C9B',
        navbar: '#503067',
      },
    },
  },
  variants: {},
  plugins: [],
}
