import { BudgetType } from "@/types/global";

export interface BudgetStore {
  budgets: Record<BudgetType["id"], BudgetType>;
  addBudget: (budget: BudgetType) => void;
  removeBudget: (id: BudgetType["id"]) => void;
  editBudget: (id: BudgetType["id"], data: Partial<BudgetType>) => void;
  clear: () => void;
}
