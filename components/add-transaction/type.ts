import { TransactionType } from "@/types/global";

export type TransactionProps = {
  submitHandler: (transaction: TransactionFormData) => void;
};

export const enum FormTransactionEnum {
  AMOUNT = "amount",
  TAG = "tag",
  DATE = "date",
  DESCRIPTION = "description",
}

export type TransactionFormData = Omit<TransactionType, "id">;
