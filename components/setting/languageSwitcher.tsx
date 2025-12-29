"use client";

import { useTranslation } from "react-i18next";
import ISwitch from "@/components/atoms/switch";
import React from "react";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = (val: string) => {
    i18n.changeLanguage(val);
  };

  return (
    <section className="flex flex-col gap-2 items-center w-full">
      <p>{i18n.t("setting.language")} </p>
      <ISwitch
        color={"primary"}
        value={i18n.language}
        leftValue={"fa"}
        rightValue={"en"}
        leftTitle={i18n.t("global.fa")}
        rightTitle={i18n.t("global.en")}
        setValue={toggleLanguage}
      />
    </section>
  );
}
