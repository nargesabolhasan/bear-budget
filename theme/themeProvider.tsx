"use client";

import { ReactNode } from "react";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import { CacheProvider } from "@emotion/react";
import rtlPlugin from "@mui/stylis-plugin-rtl";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";

interface ThemeProviderProps {
  children: ReactNode;
}

export default function IThemeProvider({ children }: ThemeProviderProps) {
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  return (
    <CacheProvider value={cacheRtl}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </CacheProvider>
  );
}
