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
      <body>
        <IThemeProvider>
          <IHeader navItems={navItems} />
          {children}
          <GlobalToaster />
          <DialogContainer />
        </IThemeProvider>
      </body>
    </html>
  );
}
