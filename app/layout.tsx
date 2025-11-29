import "./globals.css";
import { ReactNode } from "react";
import GlobalToaster from "@/components/atoms/toaster";
import IHeader from "@/components/molecules/header";
import { navItems } from "@/constant/navItems";
import DialogContainer from "@/components/molecules/dialogContainer";
import IThemeProvider from "@/theme/themeProvider";

export const metadata = {
  title: "Bear Budget",
  description: "Using App Router, TS, MUI and Tailwind",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
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
        <IThemeProvider>
          <IHeader navItems={navItems} />
          <main className={"mt-[90px] p-2 md:p-4 print:mt-0 grow"}>
            {children}
          </main>
          <GlobalToaster />
          <DialogContainer />
        </IThemeProvider>
      </body>
    </html>
  );
}
