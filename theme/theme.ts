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
    warning: Palette["primary"];
  }
  interface PaletteOptions {
    danger?: PaletteOptions["primary"];
    warning?: PaletteOptions["primary"];
  }
}

const theme = createTheme({
  palette: {
    primary: { main: tailwindColors.primary },
    danger: { main: tailwindColors.danger, contrastText: "#fff" },
    warning: { main: tailwindColors.warning, contrastText: "#000" },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { color: "primary", variant: "contained" },
          style: {
            backgroundColor: tailwindColors.primary,
            color: "#fff",
            "&:hover": { backgroundColor: tailwindColors.hover_primary },
          },
        },
        {
          props: { color: "danger", variant: "contained" },
          style: {
            backgroundColor: tailwindColors.danger,
            color: "#fff",
            "&:hover": { backgroundColor: tailwindColors.hover_danger },
          },
        },
        {
          props: { color: "warning", variant: "contained" },
          style: {
            backgroundColor: tailwindColors.warning,
            color: "#000",
            "&:hover": { backgroundColor: tailwindColors.hover_warning },
          },
        },
      ],
    },
  },
});

export default theme;
