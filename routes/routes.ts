export const tagRoutes = {
  createTag: { href: "/create-tag" },
  tagList: { href: "/tag-list" },
  editTag: (id: string) => `/create-tag/${id}`,
};
export const transactionRoutes = {
  translationList: { href: "/translation-list" },
  addTranslation: { href: "/add-transaction" },
  editTransaction: (id: string) => `/add-transaction/${id}`,
};
export const budgetRoutes = {
  createBudget: { href: "/create-budget" },
  budgetList: { href: "/budget-list" },
  editBudget: (id: string) => `/create-budget/${id}`,
};
export const settingRoute = {
  href: `/setting`,
};

export const loginRoute = {
  href: `/login`,
};
