import { TransactionType } from "@/types/global";

export interface TransactionStore {
  transactions: TransactionType[];
  addTransaction: (transaction: TransactionType) => void;
  removeTransaction: (id: TransactionType["id"]) => void;
  editTransaction: (
    id: TransactionType["id"],
    data: Partial<TransactionType>
  ) => void;
  clearAll: () => void;
}
