const { tailwindColors } = require("./theme/tailwind-colors");
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ...tailwindColors,
      },
    },
  },
  plugins: [],
};
