import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "@/app/**/*.{js,ts,jsx,tsx,mdx}",
    "@/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#4f46e5",
      },
      spacing: {
        "72": "18rem",
      },
    },
  },
  plugins: [],
};

export default config;
