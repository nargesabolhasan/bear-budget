import {
  budgetRoutes,
  settingRoute,
  tagRoutes,
  transactionRoutes,
} from "@/routes/routes";
import {
  Home,
  MoneyAdd,
  MoneyChange,
  Save2,
  SaveAdd,
  Setting2,
  Tag,
  TagCross,
} from "iconsax-react";

export const navItems = [
  { labelKey: "header.home", key: "/", href: "/", icon: Home },
  {
    labelKey: "header.newTag",
    key: tagRoutes.createTag.href,
    href: tagRoutes.createTag.href,
    icon: TagCross,
  },
  {
    labelKey: "global.tags",
    key: tagRoutes.tagList.href,
    href: tagRoutes.tagList.href,
    icon: Tag,
  },
  {
    labelKey: "header.newTransaction",
    key: transactionRoutes.addTranslation.href,
    href: transactionRoutes.addTranslation.href,
    icon: MoneyAdd,
  },
  {
    labelKey: "global.transactions",
    key: transactionRoutes.translationList.href,
    href: transactionRoutes.translationList.href,
    icon: MoneyChange,
  },
  {
    labelKey: "header.newBudget",
    key: budgetRoutes.createBudget.href,
    href: budgetRoutes.createBudget.href,
    icon: SaveAdd,
  },
  {
    labelKey: "global.budgets",
    key: budgetRoutes.budgetList.href,
    href: budgetRoutes.budgetList.href,
    icon: Save2,
  },
  {
    labelKey: "setting.setting",
    key: settingRoute.href,
    href: settingRoute.href,
    icon: Setting2,
    color: "!bg-secondary dark:!text-brown",
  },
];
