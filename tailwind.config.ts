import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";

// tailwind.config.js
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      gray: "#C8D8E7",
      red: "#9C000D",
      gold: "#FEAE2B",
      blue: "#001935",
      white: "#FFFFFF",
      black: "#000000",
    },
    fontFamily: {
      display: ["var(--font-futura)", "sans-serif"],
      segment: ["var(--font-segment)", "sans-serif"],
    },
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
        winning: {
          "0%": {
            "text-shadow":
              "0 0 10px #fff, 0 0 20px #f0edcc, 0 0 30px #e1d89e, 0 0 40px #f0e467",
          },
          "100%": {
            "text-shadow":
              "0 0 10px #fff, 0 0 20px #f0edcc, 0 0 30px #e1d89e, 0 0 40px #f0e467, 0 0 50px #ebdd4b, 0 0 60px #eddd37, 0 0 70px #f0df30",
          },
        },
        scroll: {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(-250%, 0)" },
        },
      },
      animation: {
        roll3: "marquee 4s ease-in-out forwards",
        roll4: "marquee 4.5s ease-in-out forwards",
        roll5: "marquee 5s ease-in-out forwards",
        flash: "flashing 1s ease-in-out infinite",
        winning: "winning 0.7s infinite alternate linear",
        scrolling: "scroll 10s linear infinite",
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
  plugins: [
    function ({ addUtilities }: PluginAPI) {
      addUtilities({
        ".stroke-and-paint": {
          "-webkit-text-stroke": "5px black",
          "paint-order": "stroke fill",
        },
      });
    },
  ],
};
export default config;
