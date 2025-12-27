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
import { useTranslation } from "react-i18next";

interface ThemeProviderProps {
  children: ReactNode;
}

export default function IThemeProvider({ children }: ThemeProviderProps) {
  const { theme, systemTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);
  const [queryClient] = useState(() => new QueryClient());

  const { i18n } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    setMounted(true);
  }, []);

  const resolvedTheme = theme === "system" ? systemTheme : theme;

  // Determine direction from language
  const direction = lang === "fa" ? "rtl" : "ltr";

  // Create MUI theme with direction
  const muiTheme = useMemo(() => {
    const theme = getTheme(
      (resolvedTheme ?? "light") as "light" | "dark",
      direction
    );
    return { ...theme, direction };
  }, [resolvedTheme, direction]);

  // Create RTL cache only if needed
  const cache = useMemo(() => {
    if (direction === "rtl") {
      return createCache({
        key: "muirtl",
        stylisPlugins: [prefixer, rtlPlugin],
      });
    } else {
      return createCache({
        key: "mui",
      });
    }
  }, [direction]);

  // Set html dir attribute dynamically
  useEffect(() => {
    document.documentElement.setAttribute("dir", direction);
  }, [direction]);

  if (!mounted) return null;

  return (
    <CacheProvider value={cache}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </MuiThemeProvider>
    </CacheProvider>
  );
}
