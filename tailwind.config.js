/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zen: {
          bg: '#F8F5F1',
          linen: '#F4EFEB',
          sand: '#D2C0A7',
          stone: '#E5DACB',
          matcha: '#889D35',
          moss: '#6E8027',
          deep: '#4E5C1B',
          charcoal: '#3C3C32',
          dark: '#25251F',
          gold: '#C8A97E',
          softGold: '#EAD7BA',
          muted: '#717163'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      letterSpacing: {
        'widest-lg': '0.25em',
        'widest-xl': '0.35em',
      }
    },
  },
  plugins: [],
}

