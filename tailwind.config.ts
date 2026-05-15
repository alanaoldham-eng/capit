import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#051225",
          900: "#071a33",
          800: "#0d2748",
          700: "#123862",
        },
        cardano: {
          500: "#246BFE",
          600: "#1554D1",
          100: "#EAF1FF",
        },
      },
      boxShadow: {
        soft: "0 24px 80px rgba(7, 26, 51, 0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
