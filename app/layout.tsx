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
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
        {/* Apple PWA Icon (Safari) */}
        <link rel="apple-touch-icon" href="/setting.png" />
        {/* Favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* PWA for iOS */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </head>
      <body className={"!bg-neutral_light h-screen flex flex-col"}>
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
