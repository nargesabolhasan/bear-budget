import { budgetRoutes, tagRoutes } from "@/constant/routes";

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
];
