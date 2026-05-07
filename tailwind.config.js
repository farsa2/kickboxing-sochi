/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#DC2626',
          dark: '#991B1B',
          light: '#EF4444',
        },
        surface: {
          DEFAULT: '#0A0A0A',
          card: '#141414',
          elevated: '#1C1C1C',
        },
        muted: {
          DEFAULT: '#737373',
          foreground: '#A3A3A3',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Oswald', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
