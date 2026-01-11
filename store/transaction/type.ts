import { TransactionType } from "@/types/global";
import { FilteredDateContextType } from "@/context/filteredDateContext";

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
  removeByYearMonth: (date: FilteredDateContextType, isJalali: boolean) => void;
  editTransaction: (
    id: string,
    data: Partial<TransactionType>,
    year: number,
    month: number
  ) => void;
  getTransactions: (
    year: number,
    month: number,
    isJalali?: boolean,
    notIsoMonth?: number
  ) => TransactionType[];
  groupedByType: (
    year: number,
    month: number,
    isJalali?: boolean,
    notIsoMonth?: number
  ) => GroupedTransactionType;
  clearAllTransactions: () => void;
}
