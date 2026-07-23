"use client";

import { useTranslation } from "react-i18next";
import ISwitch from "@/components/atoms/switch";
import React from "react";

export default function ToggleLanguage() {
  const { i18n } = useTranslation();

  const toggleLanguage = (val: string) => {
    i18n.changeLanguage(val);
  };

  return (
    <section className="flex w-full flex-col items-center gap-2">
      <p>{i18n.t("setting.language")} </p>
      <ISwitch
        color={"primary"}
        value={i18n.language}
        leftValue={"fa-IR"}
        rightValue={"en-US"}
        leftTitle={i18n.t("global.fa")}
        rightTitle={i18n.t("global.en")}
        onChange={toggleLanguage}
      />
    </section>
  );
}
