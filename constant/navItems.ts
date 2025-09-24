import { budgetRoutes, tagRoutes, transactionRoutes } from "@/constant/routes";

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
    label: budgetRoutes.budgetList.name,
    key: budgetRoutes.budgetList.href,
    href: budgetRoutes.budgetList.href,
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
];
