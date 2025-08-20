import { create } from "zustand";
import { TransactionType } from "@/types/global";
import { devtools, persist } from "zustand/middleware";
import { TransactionStore } from "@/store/transaction/type";

export const useTransactionStore = create<TransactionStore>()(
  devtools(
    persist(
      (set, get) => ({
        transactions: [],
        addTransaction: (transaction) =>
          set(
            { transactions: [...get().transactions, transaction] },
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
            (transaction: TransactionType) => {
              return transaction.id === id
                ? { ...transaction, ...data }
                : transaction;
            }
          );
          set({ transactions: updatedList }, false, "editTransaction");
        },
        clearAll: () => set({ transactions: [] }, false, "clearAll"),
      }),
      { name: "transactions" }
    ),
    { name: "TagsStore" }
  )
);
