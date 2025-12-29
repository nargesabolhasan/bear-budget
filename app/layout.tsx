import "./globals.css";
import { ReactNode } from "react";
import GlobalToaster from "@/components/atoms/toaster";
import IHeader from "@/components/molecules/header";
import DialogContainer from "@/components/molecules/dialogContainer";
import IThemeProvider from "@/theme/themeProvider";
import { ThemeModeProvider } from "@/context/themeSwitchProvider";
import "@/i18n/client";
import LanguageProvider from "@/context/i18nextProvider";

export const metadata = {
  title: "Bear Budget",
  description: "Using App Router, TS, MUI and Tailwind",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" sizes="180x180" href="/setting.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/setting.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/setting.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/setting.png" />

        {/* Android Chrome Icons */}
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/icons/setting.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/icons/setting.png"
        />

        {/* Theme color */}
        <meta name="theme-color" content="#000000" />

        {/* Apple PWA meta */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </head>
      <body className="!bg-neutral_light h-screen flex flex-col">
        <LanguageProvider>
          <ThemeModeProvider>
            <IThemeProvider>
              <IHeader />
              <main className="flex-1 overflow-y-auto -webkit-overflow-scrolling-touch mt-[100px] p-2 md:p-4 print:mt-0">
                {children}
              </main>
              <GlobalToaster />
              <DialogContainer />
            </IThemeProvider>
          </ThemeModeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
