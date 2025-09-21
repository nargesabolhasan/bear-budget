import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { TransactionType } from "@/types/global";
import {
  GroupedTransactionType,
  TransactionStore,
} from "@/store/transaction/type";
import { useTagsStore } from "@/store/tags";

export const useTransactionStore = create<TransactionStore>()(
  devtools(
    persist(
      (set, get) => ({
        transactions: [],

        addTransaction: (transaction) =>
          set(
            (state) => {
              const newTransactionDate = new Date(transaction.date);
              const updatedTransactions = [...state.transactions];

              const index = updatedTransactions.findIndex(
                (t) => new Date(t.date) < newTransactionDate
              );
              if (index === -1) {
                updatedTransactions.push(transaction);
              } else {
                updatedTransactions.splice(index, 0, transaction);
              }

              return { transactions: updatedTransactions };
            },
            false,
            "addTransaction"
          ),

        removeTransaction: (id) =>
          set(
            {
              transactions: get().transactions.filter(
                (transaction) => transaction.id !== id
              ),
            },
            false,
            "removeTransaction"
          ),

        editTransaction: (id, data) => {
          const updatedList = get().transactions.map(
            (transaction: TransactionType) =>
              transaction.id === id ? { ...transaction, ...data } : transaction
          );
          set({ transactions: updatedList }, false, "editTransaction");
        },

        clearAll: () => set({ transactions: [] }, false, "clearAll"),

        groupedByType: () => {
          const { tags } = useTagsStore();
          const transactions = get().transactions;

          const tagMap = Object.fromEntries(tags.map((t) => [t.id, t]));

          const grouped: GroupedTransactionType = {};

          transactions.forEach((tx) => {
            const tag = tagMap[tx.tag.id];
            if (!tag) return;

            const type = tag.transactionType;

            if (!grouped[type]) {
              grouped[type] = { transactions: [], totalAmount: 0 };
            }

            grouped[type].transactions.push(tx);
            grouped[type].totalAmount += Number(tx.amount);
          });

          return grouped;
        },
      }),
      { name: "transactions" }
    ),
    { name: "TransactionsStore" }
  )
);
