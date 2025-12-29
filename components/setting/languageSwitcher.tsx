"use client";

import { useTranslation } from "react-i18next";
import IButton from "@/components/atoms/button";
import { useEffect } from "react";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === "fa" ? "en" : "fa";
    i18n.changeLanguage(nextLang);
  };

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <section className="flex items-center gap-2 w-full">
      <IButton onClick={toggleLanguage} className={"w-full !text-dark"}>
        {i18n.language === "fa"
          ? i18n.t("setting.language", { value: i18n.t("global.en") })
          : i18n.t("setting.language", { value: i18n.t("global.fa") })}
      </IButton>
    </section>
  );
}
