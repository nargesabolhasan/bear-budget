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
    icon: "/favicon.ico",
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

        {/* Apple PWA meta */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </head>

      <body className="!bg-neutral_light h-screen flex flex-col">
        <LanguageProvider>
          <ThemeModeProvider>
            <IThemeProvider>
              <IHeader />

              <FilteredDateProvider>
                <main className="flex-1 overflow-y-auto -webkit-overflow-scrolling-touch mt-[100px] p-1 md:p-4 print:mt-0">
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
