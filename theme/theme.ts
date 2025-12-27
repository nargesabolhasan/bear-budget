import { createTheme } from "@mui/material/styles";

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

const cssVar = (name: string, fallback: string) => {
  if (typeof window === "undefined") return fallback; // SSR safe
  return (
    getComputedStyle(document.documentElement).getPropertyValue(name).trim() ||
    fallback
  );
};

const primary = cssVar("--color-primary", "#9ab973");
const secondary = cssVar("--color-secondary", "#cca07e");
const info = cssVar("--color-neutral", "#FAFAFA");
const danger = cssVar("--color-danger", "#F44336");
const dark = cssVar("--color-dark", "#050505");

const getTheme = (
  mode: "light" | "dark" = "light",
  direction: "ltr" | "rtl" = "ltr"
) => {
  return createTheme({
    direction,
    palette: {
      mode,
      primary: { main: primary },
      secondary: { main: secondary },
      info: { main: info },
      danger: { main: danger },
    },
    typography: {
      fontFamily: `"Vazirmatn", "PlaywriteNZGuides","inter","Satisfy","elms" sans-serif`,
    },
    components: {
      MuiInputLabel: {
        styleOverrides: {
          root: {
            direction: direction,
            textAlign: direction === "rtl" ? "right" : "left",
            transformOrigin: direction === "rtl" ? "top right" : "top left",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            direction: direction,
            textAlign: direction === "rtl" ? "right" : "left",
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          slotProps: {
            input: { dir: "auto" },
            inputLabel: { dir: "auto" },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: primary,
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          select: {
            direction: direction,
            textAlign: direction === "rtl" ? "end" : "start",
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            color: dark,
          },
        },
      },
    },
  });
};

export default getTheme;
