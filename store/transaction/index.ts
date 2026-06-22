import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import {
  GroupedTransactionType,
  TransactionStore,
} from "@/store/transaction/type";
import { useTagsStore } from "@/store/tags";
import { TransactionType } from "@/types/global";

const option = {
  calendar: "persian",
  language: "en-US",
};

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
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
            );

            return { transactions: updated };
          }),

        removeTransaction: (id) =>
          set((state) => {
            const updated = structuredClone(state.transactions);

            for (const year of Object.keys(updated)) {
              const y = Number(year);

              for (const month of Object.keys(updated[y])) {
                const m = Number(month);

                updated[y][m] = updated[y][m].filter((tx) => tx.id !== id);

                if (updated[y][m].length === 0) {
                  delete updated[y][m];
                }
              }

              if (Object.keys(updated[y]).length === 0) {
                delete updated[y];
              }
            }

            return { transactions: updated };
          }),

        removeByYearMonth: (date, isJalali) =>
          set(({ transactions }) => {
            const updated = { ...transactions };

            if (isJalali) {
              const callback = (item: TransactionType) => {
                const convertedDate = new Intl.DateTimeFormat("en-US", option)
                  .format(new Date(item.date))
                  .split("/");
                return parseInt(convertedDate[0]) !== date.notIso.month;
              };

              const findJalaliDate = (targetY: number, targetM: number) => {
                if (!!updated[targetY] && !!updated[targetY][targetM]) {
                  updated[targetY][targetM] = updated?.[targetY]?.[
                    targetM
                  ]?.filter((item: TransactionType) => {
                    return callback(item);
                  });
                }

                updated[date.year][date.month] = updated?.[date.year]?.[
                  date.month
                ]?.filter((item) => {
                  return callback(item);
                });

                if (updated[date.year][date.month].length === 0) {
                  delete updated[date.year][date.month];
                }
                if (Object.keys(updated[date.year]).length === 0) {
                  delete updated[date.year];
                }

                if (updated[targetY][targetM].length === 0) {
                  delete updated[targetY][targetM];
                }
                if (Object.keys(updated[targetY]).length === 0) {
                  delete updated[targetY];
                }

                return {
                  transactions: { ...updated },
                };
              };

              if (date.month === 12) {
                return findJalaliDate(date.year + 1, 1);
              } else {
                return findJalaliDate(date.year, date.month + 1);
              }
            } else {
              if (updated[date.year]) {
                delete updated[date.year][date.month];
                if (Object.keys(updated[date.year]).length === 0) {
                  delete updated[date.year];
                }
              }

              return { transactions: updated };
            }
          }),

        editTransaction: (id, data) =>
          set((state) => {
            const updated = structuredClone(state.transactions);

            let foundTx: TransactionType | null = null;

            outerLoop: for (const year of Object.keys(updated)) {
              const y = Number(year);

              for (const month of Object.keys(updated[y])) {
                const m = Number(month);

                const index = updated[y][m].findIndex((tx) => tx.id === id);

                if (index !== -1) {
                  foundTx = {
                    ...updated[y][m][index],
                    ...data,
                  };

                  updated[y][m].splice(index, 1);

                  if (updated[y][m].length === 0) {
                    delete updated[y][m];
                  }

                  if (Object.keys(updated[y]).length === 0) {
                    delete updated[y];
                  }

                  break outerLoop;
                }
              }
            }

            if (!foundTx) {
              return { transactions: updated };
            }

            const d = new Date(foundTx.date);

            const newYear = d.getFullYear();
            const newMonth = d.getMonth() + 1;

            updated[newYear] ??= {};
            updated[newYear][newMonth] ??= [];

            updated[newYear][newMonth].push(foundTx);

            updated[newYear][newMonth].sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
            );

            return {
              transactions: updated,
            };
          }),

        getTransactions: (year, month, isJalali = false, notIsoMonth = 0) => {
          const transactions = get().transactions?.[year]?.[month] ?? [];

          const callback = (nextMonthTxs: TransactionType[]) => {
            return [...nextMonthTxs, ...transactions].filter((item) => {
              const convertedDate = new Intl.DateTimeFormat("en-US", option)
                .format(new Date(item.date))
                .split("/");
              return parseInt(convertedDate[0]) === notIsoMonth;
            });
          };

          if (isJalali) {
            if (month === 12) {
              const nextMonthTxs = get().transactions[year + 1]?.[1] ?? [];
              return callback(nextMonthTxs);
            } else {
              const nextMonthTxs = get().transactions[year]?.[month + 1] ?? [];
              return callback(nextMonthTxs);
            }
          } else {
            return transactions;
          }
        },

        groupedByType: (
          year: number,
          month: number,
          isJalali = false,
          notIsoMonth = 0,
        ): GroupedTransactionType => {
          const state = get();
          const txs = state.transactions[year]?.[month] ?? [];
          const { tags } = useTagsStore();
          const handleGroupedTransactionType = (list: TransactionType[]) => {
            return list.reduce((acc: GroupedTransactionType, tx) => {
              const key = tags?.[tx.tag]?.transactionType || "Uncategorized";
              if (!acc[key]) {
                acc[key] = { transactions: [], totalAmount: 0 };
              }

              acc[key].transactions.push(tx);
              acc[key].totalAmount += Number(tx.amount);

              return acc;
            }, {});
          };
          if (isJalali) {
            if (month === 12) {
              return {
                ...handleGroupedTransactionType(
                  get().getTransactions(year, month, isJalali, notIsoMonth),
                ),
              };
            } else {
              return {
                ...handleGroupedTransactionType(
                  get().getTransactions(year, month, isJalali, notIsoMonth),
                ),
              };
            }
          }
          return handleGroupedTransactionType(txs);
        },

        clearAllTransactions: () =>
          set(() => ({
            transactions: {},
          })),
      }),

      { name: "transactions" },
    ),
  ),
);
