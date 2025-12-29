"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import IButton from "@/components/atoms/button";
import { useTranslation } from "react-i18next";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <IButton
      color={"secondary"}
      className={"!text-dark w-full"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark"
        ? `☀️ ${t("setting.dark")}`
        : `🌙 ${t("setting.light")}`}
    </IButton>
  );
}
