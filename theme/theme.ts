import { createTheme } from "@mui/material/styles";
import { tailwindColors } from "./tailwind-colors";

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    primary: true;
    danger: true;
    warning: true;
  }
}

declare module "@mui/material/styles" {
  interface Palette {
    danger: Palette["primary"];
    warning: Palette["warning"];
  }
  interface PaletteOptions {
    danger?: PaletteOptions["primary"];
    warning?: PaletteOptions["warning"];
  }
}

const theme = createTheme({
  direction: "rtl",
  palette: {
    primary: { main: tailwindColors.primary },
    danger: { main: tailwindColors.danger, contrastText: "#fff" },
    warning: { main: tailwindColors.warning, contrastText: "#000" },
  },
});

export default theme;
