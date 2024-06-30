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
      margin: {
        '72': '18rem', // 72 * 4px = 288px
        '80': '20rem', // 80 * 4px = 320px
        '96': '24rem', // 96 * 4px = 384px
        '128': '32rem', // 128 * 4px = 512px
        '144': '36rem', // 144 * 4px = 576px
        '160': '40rem', // 160 * 4px = 640px
        '192': '48rem', // 192 * 4px = 768px
      },
    },
  },
  plugins: [],
}
