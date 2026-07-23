import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { BudgetStore } from "./type";

export const useBudgetStore = create<BudgetStore>()(
  devtools(
    persist(
      (set, get) => ({
        budgets: {},

        addBudget: (newItem) =>
          set(
            ({ budgets }) => {
              const update = { ...budgets };
              update[newItem.isoMonth] ??= {};
              update[newItem.isoMonth][newItem.tag] = newItem;
              return { budgets: update };
            },
            false,
            "addBudget",
          ),

        removeBudget: (id, currentMonth) =>
          set(
            ({ budgets }) => {
              const update = { ...budgets };
              delete update[currentMonth]?.[id];
              return { budgets: update };
            },
            false,
            "removeBudget",
          ),

        editBudget: (newTagId, oldTagId, oldMonth, data) => {
          set(
            ({ budgets }) => {
              const update = { ...budgets };
              if (oldMonth === data.isoMonth) {
                delete update[oldMonth]?.[oldTagId];
                update[oldMonth] ??= {};
                update[oldMonth][newTagId] = data;
                return {
                  budgets: update,
                };
              } else {
                delete update[oldMonth];
                update[data.isoMonth] ??= {};
                delete update[data.isoMonth]?.[oldTagId];
                update[data.isoMonth][newTagId] = data;
                return {
                  budgets: update,
                };
              }
            },
            false,
            "removeBudget",
          );
        },
        removeThisMonth: (month: number) =>
          set(
            ({ budgets }) => {
              delete budgets[month];
              return { budgets };
            },
            false,
            "removeBudget",
          ),
        clear: () => set({ budgets: {} }, false, "clear"),
      }),
      { name: "budgets" },
    ),
    { name: "BudgetsStore" },
  ),
);
