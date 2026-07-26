/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          primary: "#ffffff",
          textLight: "#1f2937",
          textDark: "#4b5563",
        },
        dark: {
          primary: "#0A192F",
          textLight: "#CCD6F6",
          textDark: "#8892B0",
        },
        secondary: "#00B4C6",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
}
