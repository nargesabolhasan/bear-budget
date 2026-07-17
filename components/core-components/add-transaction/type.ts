import { TransactionType } from "@/types/global";
import { ReactNode } from "react";

export type TransactionProps = {
  submitHandler: (transaction: TransactionFormData) => void;
  title?: string | ReactNode;
};

export const enum FormTransactionEnum {
  AMOUNT = "amount",
  TAG = "tag",
  DATE = "date",
  DESCRIPTION = "description",
}

export type TransactionFormData = Omit<TransactionType, "id">;
