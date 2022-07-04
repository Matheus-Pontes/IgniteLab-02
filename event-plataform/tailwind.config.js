/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Quais arquivos vou utilizar o tailwind
    './src/**/*.tsx'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Roboto, sans-serif',
      },
      colors: {
        green: {
          300: '#00B37E',
          500: '#00875F',
          700: '#015F43',
        },
        blue: {
          500: '#81D8F7',
        },
        orange: {
          500: '#FBA94C',
        },
        red: {
          500: '#F75A68',
        },
        gray: {
          100: '#E1E1E6',
          200: '#C4C4CC',
          300: '#8D8D99',
          500: '#323238',
          600: '#29292E',
          700: '#121214',
          900: '#09090A'
        }
      },
      backgroundImage: {
        blur: 'url(/src/assets/blur-background.png)'
      },
      screens: {
        // => @media (min-width: 640px) { ... }
        tablet: '640px',
        
        // => @media (min-width: 1024px) { ... }
        laptop: '1024px',
        
        // => @media (max-width: 1048px) { ... }
        lg: {'max': '1048px'},
  
        // => @media (min-width: 1280px) { ... }
        desktop: '1280px',
      }
    },
  },
  plugins: [],
}
