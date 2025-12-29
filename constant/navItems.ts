import {
  budgetRoutes,
  settingRoute,
  tagRoutes,
  transactionRoutes,
} from "@/routes/routes";
import { Setting2 } from "iconsax-react";

export const navItems = [
  { labelKey: "header.home", key: "/", href: "/" },
  {
    labelKey: "header.newTag",
    key: tagRoutes.createTag.href,
    href: tagRoutes.createTag.href,
  },
  {
    labelKey: "global.tags",
    key: tagRoutes.tagList.href,
    href: tagRoutes.tagList.href,
  },
  {
    labelKey: "header.newTransaction",
    key: transactionRoutes.addTranslation.href,
    href: transactionRoutes.addTranslation.href,
  },
  {
    labelKey: "global.transactions",
    key: transactionRoutes.translationList.href,
    href: transactionRoutes.translationList.href,
  },
  {
    labelKey: "header.newBudget",
    key: budgetRoutes.createBudget.href,
    href: budgetRoutes.createBudget.href,
  },
  {
    labelKey: "global.budgets",
    key: budgetRoutes.budgetList.href,
    href: budgetRoutes.budgetList.href,
  },
  {
    labelKey: "setting.setting",
    key: settingRoute.href,
    href: settingRoute.href,
    icon: Setting2,
    color: "!bg-secondary dark:!text-brown",
  },
];
