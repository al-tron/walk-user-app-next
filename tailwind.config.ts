import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
      },
      colors: {
        brand: {
          lightest: '#638368',
          light: '#4f7354',
          DEFAULT: '#3c6442',
          dark: '#2c4c31',
        },
        logo: {
          DEFAULT: '#fffaff',
          dark: '#ecebec',
        },
        polyline: '#4264fb',
        loadingBaseColor: '#ebebeb',
      },
      backgroundImage: {
        curve: "url('/img/layout/curve.svg')",
        curveDark: "url('/img/layout/curve--dark.svg')",
      },
    },
    screens: {
      xxs: '360px',
      xs: '400px',
      xs2: '481px',
      sm: '576px',
      sm2: '640px',
      md: '768px',
      lg: '992px',
      xl: '1024px',
      xxl: '1240px',
    },
  },
  plugins: [],
}

export default config
