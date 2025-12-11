"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import IButton from "@/components/atoms/button";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <IButton
      color={"secondary"}
      className={"!text-dark w-full"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? "☀️ Light mode" : "🌙 Dark mode"}
    </IButton>
  );
}
