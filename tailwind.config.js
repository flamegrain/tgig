/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mbta: {
          red: '#DA291C',
          orange: '#ED8B00',
          green: '#00843D',
          blue: '#003DA5',
          silver: '#7C878E',
          purple: '#80276C',
        },
        brand: {
          50: '#f0fdf4',
          500: '#10b981',
          600: '#059669',
          900: '#064e3b',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-green': '0 0 25px -5px rgba(16, 185, 129, 0.4)',
        'glow-red': '0 0 25px -5px rgba(218, 41, 28, 0.35)',
        'glow-orange': '0 0 25px -5px rgba(237, 139, 0, 0.35)',
        'glow-blue': '0 0 25px -5px rgba(0, 61, 165, 0.35)',
      }
    },
  },
  plugins: [],
};
