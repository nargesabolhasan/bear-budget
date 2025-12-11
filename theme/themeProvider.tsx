"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import rtlPlugin from "@mui/stylis-plugin-rtl";
import { prefixer } from "stylis";
import createCache from "@emotion/cache";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTheme as useNextTheme } from "next-themes";
import getTheme from "./theme";

interface ThemeProviderProps {
  children: ReactNode;
}

export default function IThemeProvider({ children }: ThemeProviderProps) {
  const { theme, systemTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    setMounted(true);
  }, []);

  const resolvedTheme = theme === "system" ? systemTheme : theme;

  const muiTheme = useMemo(
    () => getTheme((resolvedTheme ?? "light") as "light" | "dark"),
    [resolvedTheme]
  );

  const cacheRtl = useMemo(
    () =>
      createCache({
        key: "muirtl",
        stylisPlugins: [prefixer, rtlPlugin],
      }),
    []
  );

  if (!mounted) {
    return null;
  }

  return (
    <CacheProvider value={cacheRtl}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </MuiThemeProvider>
    </CacheProvider>
  );
}
