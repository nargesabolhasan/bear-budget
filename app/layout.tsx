import "./globals.css";
import { ReactNode } from "react";
import ThemeRegistry from "../components/ThemeRegistry";
import GlobalToaster from "@/components/atoms/toaster";

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
          {children}
          <GlobalToaster />
        </ThemeRegistry>
      </body>
    </html>
  );
}
