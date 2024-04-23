import type { Config } from "tailwindcss";

// tailwind.config.js
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        marquee: {
          '0%': { transform: 'translate3d(0, var(--translate-y-from), 0)' },
          '100%': { transform: 'translate3d(0, var(--translate-y), 0)' }
        },
        flashing: {
          '100%' : {opacity: '0'}
        }

      },      
      animation: {
        roll: 'marquee 5s ease-in-out forwards',
        flash: 'flashing 1s alternate infinite'
      }
    }
  },
  plugins: [],
};
export default config;
