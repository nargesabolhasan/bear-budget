import { TransactionEnum } from "@/types/global";

export type TargetType =
  | TransactionEnum.EXPENSE
  | TransactionEnum.INCOME
  | null;
export enum TargetUnion {
  SAVE_TARGET = "saveTarget",
  DEBT_TARGET = "debtTarget",
  CREDIT_TARGET = "creditTarget",
}
