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
          "0%": { transform: "translate3d(0, var(--translate-y-from), 0)" },
          "100%": { transform: "translate3d(0, var(--translate-y), 0)" },
        },
        flashing: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        glow: {
          "0%": {
            filter:
              "drop-shadow(0px 0px 2px #fff) drop-shadow(0px 0px 4px #f0edcc) drop-shadow(0px 0px 6px #e1d89e)",
          },
          "100%": {
            filter:
              "drop-shadow(0px 0px 2px #fff) drop-shadow(0px 0px 4px #f0edcc) drop-shadow(0px 0px 6px #e1d89e) drop-shadow(0px 0px 8px #f0e467) drop-shadow(0px 0px 15px #ebdd4b)",
          },
        },
      },
      animation: {
        roll3: "marquee 4s ease-in-out forwards",
        roll4: "marquee 4.5s ease-in-out forwards",
        roll5: "marquee 5s ease-in-out forwards",
        flash: "flashing 1s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(var(--tw-gradient-stops))",
        "dark-blue-black": "linear-gradient(138deg, #364156 29%, #000000 100%)",
        "gold-trans": "linear-gradient(138deg, #eeb500 29%, #4a3b00 100%)",
      },
      textShadow: {
        "black-lg": "100 100 99px #000000",
      },
    },
  },
  plugins: [],
};
export default config;
