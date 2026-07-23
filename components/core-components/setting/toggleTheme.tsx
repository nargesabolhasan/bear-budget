"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ISwitch from "@/components/atoms/switch";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { t } = useTranslation();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <section className="flex w-full flex-col items-center gap-2">
      <p>{t("setting.theme")} </p>
      <ISwitch
        color={"secondary"}
        value={theme as string}
        leftValue={"light"}
        rightValue={"dark"}
        rightTitle={`🌙 ${t("setting.dark")}`}
        leftTitle={`☀️ ${t("setting.light")}`}
        onChange={setTheme}
      />
    </section>
  );
}
