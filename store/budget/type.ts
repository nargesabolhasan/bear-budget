import { BudgetType } from "@/types/global";

export type GroupedBudgetType = {
  [month: string]: Record<string, BudgetType>;
};

export interface BudgetStore {
  budgets: GroupedBudgetType;
  addBudget: (budget: BudgetType) => void;
  removeBudget: (tag: BudgetType["tag"], currentMonth: number) => void;
  removeThisMonth: (month: number) => void;
  editBudget: (
    tag: BudgetType["tag"],
    newTagId: BudgetType["tag"],
    oldMonth: number,
    data: BudgetType,
  ) => void;
  clear: () => void;
}
