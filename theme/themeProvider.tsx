"use client";

import { ReactNode } from "react";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";

interface ThemeProviderProps {
  children: ReactNode;
}

export default function IThemeProvider({ children }: ThemeProviderProps) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
