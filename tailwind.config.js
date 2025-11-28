const { tailwindColors } = require("./theme/tailwind-colors");
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ...tailwindColors,
      },
      fontFamily: {
        vazir: ["Vazirmatn", "sans-serif"],
        playwrite: ["PlaywriteNZGuides", "sans-serif"],
        inter: ["inter", "sans-serif"],
        satisfy: ["satisfy", "sans-serif"],
        elms: ["elms", "sans-serif"],
      },
    },
  },
  plugins: [],
};
