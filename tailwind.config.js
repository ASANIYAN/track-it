/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      boxShadow: {
        'one': '-1px 0px 0px 0px #E9EBF0 inset',
        'darkOne': '-1px 0px 0px 0px #384047 inset',
        'two': '0px -1px 0px 0px #E9EBF0 inset',
        'darkTwo': '0px -1px 0px 0px #384047 inset',
        'three': '0px 8px 16px 0px rgba(33, 30, 30, 0.16)',
        'darkThree': '0px 6px 22px 0px rgba(0, 0, 0, 0.10)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        color1: '#323338',
        color2: '#848588',
        color3: '#5F48EA',
        color4: '#E8ECEE',
        color5: '#C1C2C3',
        color6: '#08C7E0',
        color7: '#46474C',
        color8: '#5B5C60',
        color9: '#98999B',
        color10: '#E6E9EF',
        color11: '#6F7074',
        color12: '#F5F6F8',
        darkColor1: '#1E272E',
        darkColor2: '#222B32',
        darkColor3: '#A9ACAE',
        darkColor4: '#384047',
        darkColor5: '#2B343B',
        darkColor6: '#CECFD0',
        error: '#E44258'

      },
      screens: {
        'xxxs': '280px',
         // => @media (min-width: 280px) { ... }
        'xxs': '320px',
         // => @media (min-width: 320px) { ... }
        'xs': '480px',
         // => @media (min-width: 480px) { ... }
        's': '576px',
         // => @media (min-width: 576px) { ... }
        ...defaultTheme.screens
      },
    },
  },
  plugins: [],
}
