import type { Config } from "tailwindcss";
import { tailwindColors } from "@/theme/tailwind-colors";

const config: Config = {
  content: [
    "@/app/**/*.{js,ts,jsx,tsx,mdx}",
    "@/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ...tailwindColors,
      },
      spacing: {
        "72": "18rem",
      },
    },
  },
  plugins: [],
};

export default config;
