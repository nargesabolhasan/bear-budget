import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { BudgetStore } from "./type";
import { BudgetType } from "@/types/global";

export const useBudgetStore = create<BudgetStore>()(
  devtools(
    persist(
      (set, get) => ({
        budgets: {},

        addBudget: (budget: BudgetType) =>
          set(
            { budgets: { ...get().budgets, [budget.id]: budget } },
            false,
            "addBudget"
          ),

        removeBudget: (id: BudgetType["id"]) =>
          set(
            {
              budgets: Object.fromEntries(
                Object.entries(get().budgets).filter(([key]) => key !== id)
              ),
            },
            false,
            "removeBudget"
          ),

        editBudget: (id: BudgetType["id"], data: Partial<BudgetType>) =>
          set(
            {
              budgets: {
                ...get().budgets,
                [id]: { ...get().budgets[id], ...data },
              },
            },
            false,
            "editBudget"
          ),

        clear: () => set({ budgets: {} }, false, "clear"),
      }),
      { name: "budgets" }
    ),
    { name: "BudgetsStore" }
  )
);
