import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#ededed",
      },
      backgroundImage: {
        "header-gradient":
          "linear-gradient(to right, #004457, #194d5d,#36515c,#36515c,#69615d,#69615d, #44555c,#36525c)",
        "parallax-main": "url('/home.jpg')",
      },
      fontFamily: {
        title: ["var(--font-alegreya)", "serif"],
        text: ["var(--font-lora)", "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
