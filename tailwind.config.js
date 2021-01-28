module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: () => ({
        atlas: "url('resources/atlas.jpg')",
        cms: "url('resources/cms.jpg')",
        delphi: "url('resources/delphi.jpg')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
