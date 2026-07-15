/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f0f5',
          100: '#b3d1e0',
          200: '#80b2cb',
          300: '#4d93b6',
          400: '#1a74a1',
          500: '#203045', // Cor principal da marca
          600: '#1a2640',
          700: '#131c2b',
          800: '#0d1316',
          900: '#060901',
        },
        'hero-slate': '#4a5a72',
        whatsapp: '#3E8E5E',
        'whatsapp-hover': '#34784F',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        fortegb: {
          "primary": "#203045",
          "secondary": "#1a74a1",
          "accent": "#4d93b6",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      },
    ],
  },
}


