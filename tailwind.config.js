/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          default: '#f97316',
        },
      },
      backgroundImage: {
        'gradient-red-orange': 'linear-gradient(213deg, rgba(255,77,39,1) 0%, rgba(78,27,27,1) 100%)',
      },
      boxShadow: {
        'custom-shadow': '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}