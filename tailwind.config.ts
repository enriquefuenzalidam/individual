/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pangea: [ 'Pangea Trial', 'sans-serif' ],
        eggaramond: [ 'EB Garamond', 'serif' ]
      },
    },
  },
  plugins: [
    plugin(function (api) {
      api.addUtilities({
        '.fade-mask-to-bottom': {
          '-webkit-mask-image': 'linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
          'mask-image': 'linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
        },
        '.fade-mask-to-right': {
          '-webkit-mask-image': 'linear-gradient(to right, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
          'mask-image': 'linear-gradient(to right, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)',
        },
        '.fade-mask-to-left-to-right': {
          '-webkit-mask-image': 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
          'mask-image': 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
        },
      });
    }),
  ],
}
export default config;
