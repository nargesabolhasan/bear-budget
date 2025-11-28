export const tagRoutes = {
  createTag: { name: "New Tag", href: "/create-tag" },
  tagList: { name: "Tags", href: "/tag-list" },
  editTag: (id: string) => `/create-tag/${id}`,
};
export const transactionRoutes = {
  translationList: { name: "Transactions", href: "/translation-list" },
  addTranslation: { name: "New Transaction", href: "/add-transaction" },
  editTransaction: (id: string) => `/add-transaction/${id}`,
};
export const budgetRoutes = {
  createBudget: { name: "New Budget", href: "/create-budget" },
  budgetList: { name: "Budgets", href: "/budget-list" },
  editBudget: (id: string) => `/create-budget/${id}`,
};
export const dateFilterRoutes = {
  name: `Date Filter`,
  href: `/date-filter`,
};
