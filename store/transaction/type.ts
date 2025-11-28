import { TransactionType } from "@/types/global";

export type GroupedYM = {
  [year: string]: {
    [month: string]: TransactionType[];
  };
};

export type TransactionInfoType = {
  transactions: TransactionType[];
  totalAmount: number;
};

export type GroupedTransactionType = Record<string, TransactionInfoType>;

export interface TransactionStore {
  transactions: GroupedYM;
  addTransaction: (tx: TransactionType) => void;
  removeTransaction: (id: string, year: number, month: number) => void;
  removeByYearMonth: (year: number, month: number) => void;
  editTransaction: (
    id: string,
    data: Partial<TransactionType>,
    year: number,
    month: number
  ) => void;
  getTransactions: (year: number, month: number) => TransactionType[];
  groupedByType: (year: number, month: number) => GroupedTransactionType;
  clearAllTransactions: () => void;
}
