import "./globals.css";
import { ReactNode } from "react";

import GlobalToaster from "@/components/atoms/toaster";
import IHeader from "@/components/molecules/header";
import DialogContainer from "@/components/molecules/dialogContainer";

import IThemeProvider from "@/theme/themeProvider";
import { ThemeModeProvider } from "@/context/themeSwitchProvider";
import "@/i18n/client";
import LanguageProvider from "@/context/i18nextProvider";
import { FilteredDateProvider } from "@/context/filteredDateContext";

export const metadata = {
  title: "Bear Budget",
  description: "You can manage your transaction with Bear Budget :)",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Theme color */}
        <meta name="theme-color" content="#9ab973" />

        {/* iOS PWA support */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />

        {/* IMPORTANT: iOS Home Screen icon */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />

        {/* Fallback icons */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body className="!bg-neutral_light flex h-screen flex-col">
        <LanguageProvider>
          <ThemeModeProvider>
            <IThemeProvider>
              <IHeader />

              <FilteredDateProvider>
                <main className="-webkit-overflow-scrolling-touch mt-[100px] flex-1 overflow-y-auto p-1 md:p-4 print:mt-0">
                  {children}
                </main>
              </FilteredDateProvider>

              <GlobalToaster />
              <DialogContainer />
            </IThemeProvider>
          </ThemeModeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
