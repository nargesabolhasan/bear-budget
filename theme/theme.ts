// theme.ts
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    danger: true;
    warning: true;
  }
}

const theme = createTheme({
  palette: {
    primary: { main: "#4CAF50" },
    secondary: { main: "#FF5722" },
    //@ts-ignore
    danger: { main: "#ef4444", contrastText: "#fff" },
    warning: { main: "#facc15", contrastText: "#fff" },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { color: "danger", variant: "contained" },
          style: {
            backgroundColor: "#ef4444",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#dc2626",
            },
          },
        },
        {
          props: { color: "danger", variant: "outlined" },
          style: {
            border: "1px solid #ef4444",
            color: "#ef4444",
            "&:hover": { border: "1px solid #dc2626", color: "#dc2626" },
          },
        },
      ],
    },
  },
});

export default theme;
