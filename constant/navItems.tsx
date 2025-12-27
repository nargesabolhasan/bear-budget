import {
  budgetRoutes,
  settingRoute,
  tagRoutes,
  transactionRoutes,
} from "@/routes/routes";
import { Setting2 } from "iconsax-react";
import React from "react";
import i18n from "i18next";

export const navItems = [
  { label: i18n.t("header.home"), key: "/", href: "/" },
  {
    label: i18n.t("header.newTag"),
    key: tagRoutes.createTag.href,
    href: tagRoutes.createTag.href,
  },
  {
    label: i18n.t("global.tags"),
    key: tagRoutes.tagList.href,
    href: tagRoutes.tagList.href,
  },
  {
    label: i18n.t("header.newTransaction"),
    key: transactionRoutes.addTranslation.href,
    href: transactionRoutes.addTranslation.href,
  },
  {
    label: i18n.t("global.transactions"),
    key: transactionRoutes.translationList.href,
    href: transactionRoutes.translationList.href,
  },
  {
    label: i18n.t("header.newBudget"),
    key: budgetRoutes.createBudget.href,
    href: budgetRoutes.createBudget.href,
  },
  {
    label: i18n.t("global.budgets"),
    key: budgetRoutes.budgetList.href,
    href: budgetRoutes.budgetList.href,
  },
  {
    label: (
      <div className={"flex gap-1 items-center"}>
        <Setting2 size="25" color="var(--color-brown)" variant="Outline" />
        {i18n.t("setting.setting")}
      </div>
    ),
    key: settingRoute.href,
    href: settingRoute.href,
    color: "!bg-secondary",
  },
];
