export const tagRoutes = {
  createTag: { name: "New Tag", href: "/create-tag" },
  tagList: { name: "Tags", href: "/tag-list" },
  editTag: (id: string) => `/create-tag/${id}`,
};
export const translationRoutes = {
  translationList: { name: "Transactions", href: "/translation-list" },
  addTranslation: { name: "New Transaction", href: "/add-translation" },
};
export const budgetRoutes = {
  createBudget: { name: "New Budget", href: "/create-budget" },
  budgetList: { name: "Budgets", href: "/budget-list" },
};
