import {
  budgetRoutes,
  settingRoute,
  tagRoutes,
  transactionRoutes,
} from "@/routes/routes";
import { Setting2 } from "iconsax-react";
import React from "react";

export const navItems = [
  { label: "Home", key: "/", href: "/" },
  {
    label: tagRoutes.createTag.name,
    key: tagRoutes.createTag.href,
    href: tagRoutes.createTag.href,
  },
  {
    label: tagRoutes.tagList.name,
    key: tagRoutes.tagList.href,
    href: tagRoutes.tagList.href,
  },
  {
    label: transactionRoutes.addTranslation.name,
    key: transactionRoutes.addTranslation.href,
    href: transactionRoutes.addTranslation.href,
  },
  {
    label: transactionRoutes.translationList.name,
    key: transactionRoutes.translationList.href,
    href: transactionRoutes.translationList.href,
  },
  {
    label: budgetRoutes.createBudget.name,
    key: budgetRoutes.createBudget.href,
    href: budgetRoutes.createBudget.href,
  },
  {
    label: budgetRoutes.budgetList.name,
    key: budgetRoutes.budgetList.href,
    href: budgetRoutes.budgetList.href,
  },
  {
    label: (
      <div className={"flex gap-1 items-center"}>
        <Setting2 size="25" color="var(--color-brown)" variant="Outline" />
        {settingRoute.name}
      </div>
    ),
    key: settingRoute.href,
    href: settingRoute.href,
    color: "!bg-secondary",
  },
];
