/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        surface: '#131313',
        'surface-low': '#0e0e0e',
        'surface-high': '#2a2a2a',
        'surface-bright': '#3a3a3a',
        primary: '#cdbdff',
        'primary-container': '#5d21df',
        secondary: '#bdf4ff',
        'secondary-container': '#1a4a52',
      },
      backdropBlur: {
        glass: '20px',
      },
    },
  },
  plugins: [],
}
