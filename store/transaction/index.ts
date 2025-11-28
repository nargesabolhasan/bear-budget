import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import {
  GroupedTransactionType,
  TransactionStore,
} from "@/store/transaction/type";

export const useTransactionStore = create<TransactionStore>()(
  devtools(
    persist(
      (set, get) => ({
        transactions: {},

        addTransaction: (tx) =>
          set((state) => {
            const d = new Date(tx.date);
            const year = d.getFullYear();
            const month = d.getMonth() + 1;

            const updated = { ...state.transactions };
            updated[year] ??= {};
            updated[year][month] ??= [];
            updated[year][month].push(tx);

            // optional: sort by date
            updated[year][month].sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            );

            return { transactions: updated };
          }),

        removeTransaction: (id, year, month) =>
          set((state) => {
            const updated = { ...state.transactions };
            updated[year][month] = (updated[year][month] ?? []).filter(
              (tx) => tx.id !== id
            );
            return { transactions: updated };
          }),

        removeByYearMonth: (year: number, month: number) =>
          set((state) => {
            const updated = { ...state.transactions };

            if (updated[year]) {
              delete updated[year][month];
              if (Object.keys(updated[year]).length === 0) {
                delete updated[year];
              }
            }

            return { transactions: updated };
          }),

        editTransaction: (id, data, oldYear, oldMonth) =>
          set((state) => {
            const updated = { ...state.transactions };

            const oldList = updated[oldYear]?.[oldMonth] ?? [];
            const oldTx = oldList.find((tx) => tx.id === id);

            if (!oldTx) return { transactions: updated };

            const newTx = { ...oldTx, ...data };

            const newDate = new Date(newTx.date);
            const newYear = newDate.getFullYear();
            const newMonth = newDate.getMonth() + 1;

            updated[oldYear][oldMonth] = oldList.filter((t) => t.id !== id);
            if (updated[oldYear][oldMonth].length === 0) {
              delete updated[oldYear][oldMonth];
              if (Object.keys(updated[oldYear]).length === 0) {
                delete updated[oldYear];
              }
            }

            updated[newYear] ??= {};
            updated[newYear][newMonth] ??= [];
            updated[newYear][newMonth].push(newTx);

            // 6. Optional sorting
            updated[newYear][newMonth].sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            );

            return { transactions: updated };
          }),

        getTransactions: (year, month) =>
          get().transactions[year]?.[month] ?? [],

        groupedByType: (
          year: number,
          month: number
        ): GroupedTransactionType => {
          const state = get();
          const txs = state.transactions[year]?.[month] ?? [];

          return txs.reduce((acc: GroupedTransactionType, tx) => {
            const key = tx.tag.type || "Uncategorized";

            if (!acc[key]) {
              acc[key] = { transactions: [], totalAmount: 0 };
            }

            acc[key].transactions.push(tx);
            acc[key].totalAmount += Number(tx.amount); // convert string to number

            return acc;
          }, {});
        },
      }),

      { name: "transactions" }
    )
  )
);
