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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon-180.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/apple-touch-icon-152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/icons/apple-touch-icon-120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/icons/apple-touch-icon-76.png"
        />
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
