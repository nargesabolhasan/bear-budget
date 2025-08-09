import "./globals.css";
import { ReactNode } from "react";
import ThemeRegistry from "../components/ThemeRegistry";
import GlobalToaster from "@/components/atoms/toaster";
import "antd/dist/reset.css";
import IHeader from "@/components/molecules/header";
import { navItems } from "@/constant/navItems";

export const metadata = {
  title: "Income and Expenses",
  description: "Using App Router, TS, MUI and Tailwind",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <IHeader navItems={navItems} />
          {children}
          <GlobalToaster />
        </ThemeRegistry>
      </body>
    </html>
  );
}
