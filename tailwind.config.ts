import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './styles/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      light: {
        colors: {
          background: '#FFFFFF', // or DEFAULT
          foreground: '#11181C', // or 50 to 900 DEFAULT
          primary: '#f9c97c',
          secondary: '#00f6ff',
          dimWhite: 'rgba(255, 255, 255, 0.7)',
          dimBlue: 'rgba(9, 151, 124, 0.1)',
        },
      },
      dark: {
        colors: {
          background: '#000000', // or DEFAULT
          foreground: '#ECEDEE', // or 50 to 900 DEFAULT
          primary: '00040f',
          secondary: '#00f6ff',
          dimWhite: 'rgba(255, 255, 255, 0.7)',
          dimBlue: 'rgba(9, 151, 124, 0.1)',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    screens: {
      xs: '480px',
      ss: '620px',
      sm: '768px',
      md: '1060px',
      lg: '1200px',
      xl: '1700px',
    },
  },
  plugins: [],
};
export default config;
