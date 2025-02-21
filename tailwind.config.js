/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  daisyui: {
    themes: [
      {
        dark: {
          ...require('daisyui/src/theming/themes').dark,
          'primary': 'green',
          'primary-content': 'black',
          'secondary': 'white',
          'accent': 'black',
          'base-100': 'white',
          'neutral': '#222222',
        },
      },
    ],
    styled: true,
    base: true,
    utils: true,
    logs: false,
    rtl: false,
    prefix: 'd-',
  },
  plugins: [
    require('daisyui'),
  ],
}
