import { TransactionEnum, TransactionType } from "@/types/global";

export type TransactionInfoType = {
  transactions: TransactionType[];
  totalAmount: number;
};

export type GroupedTransactionType = Record<
  TransactionEnum | string,
  TransactionInfoType
>;

export interface TransactionStore {
  transactions: TransactionType[];
  addTransaction: (transaction: TransactionType) => void;
  removeTransaction: (id: TransactionType["id"]) => void;
  editTransaction: (
    id: TransactionType["id"],
    data: Partial<TransactionType>
  ) => void;
  clearAll: () => void;
  groupedByType: () => GroupedTransactionType;
}
