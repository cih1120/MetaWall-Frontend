// @ts-nocheck
import type { Config } from "tailwindcss";
import animations from '@midudev/tailwind-animations'
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#03438D',
          light: '#E2EDFA',
        },
        'error': '#F57375',
        'block': '#EFECE7',
        'accent': '#EEC32A',
        'gray': {
          light: '#EFECE7',
          DEFAULT: '#9B9893',
          dark: '#000400',
        }
      },
      fontFamily: {
        azere: ['var(--font-azere-mono)'],
        paytoneOne: ['var(--font-paytone-one)'],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(), animations],
};
export default config;
